import asyncio
import hashlib
import json
from sqlalchemy.orm import Session
from sqlalchemy import desc
from app.database import SessionLocal
from app.models.transformer import Transformer
from app.models.complaint import Complaint
from app.models.alert import AIAlert
from app.services.gemini_service import generate_autonomous_grid_report
from app.routes.status import get_system_status

# Global cache for state comparison
_last_grid_state_hash = None

def _calculate_state_hash(transformers, complaints):
    """Create a hash of the current grid state to detect meaningful changes."""
    state_data = {
        "t": [{ "id": t.id, "load": round(t.current_load, 0), "status": t.status } for t in transformers],
        "c": len([c for c in complaints if c.status != 'resolved'])
    }
    return hashlib.md5(json.dumps(state_data, sort_keys=True).encode()).hexdigest()

async def run_autonomous_monitoring():
    """
    Stable Autonomous Monitoring Engine with Memory and State Tracking.
    """
    global _last_grid_state_hash
    
    print("[Monitoring] Starting autonomous grid analysis...")
    db = SessionLocal()
    try:
        # 1. Gather current state
        transformers = db.query(Transformer).all()
        complaints = db.query(Complaint).all()
        
        # 2. State Comparison (Optimization)
        current_hash = _calculate_state_hash(transformers, complaints)
        if current_hash == _last_grid_state_hash:
            print("[Monitoring] No significant grid state change detected. Skipping Gemini cycle.")
            return

        # 3. Fetch Memory (Recent Context)
        recent_alerts = db.query(AIAlert).order_by(desc(AIAlert.created_at)).limit(20).all()
        
        stats = get_system_status(db)
        grid_state = { "transformers": transformers, "complaints": complaints, "stats": stats }
        
        # 4. Call Unified AI Engine
        insights = await generate_autonomous_grid_report(grid_state, memory=recent_alerts)
        
        if insights:
            for item in insights:
                # Deduplication: Check if message is too similar to recent history
                is_duplicate = any(item["message"][:40] == a.message[:40] for a in recent_alerts)
                if is_duplicate:
                    print(f"[Monitoring] Deduplicated similar insight: {item['message'][:30]}...")
                    continue

                new_alert = AIAlert(
                    type=item.get("type", "info"),
                    message=item.get("message", ""),
                    confidence=item.get("confidence", 0.90),
                    source=item.get("source", "gemini_autonomous")
                )
                db.add(new_alert)
            
            db.commit()
            _last_grid_state_hash = current_hash
            print(f"[Monitoring] Cycle complete. Memory-aware intelligence generated.")
            
    finally:
        db.close()

def start_monitoring_cycle():
    """Wrapper for the async monitoring function for APScheduler."""
    try:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.run_until_complete(run_autonomous_monitoring())
        loop.close()
    except Exception as e:
        print(f"[Scheduler Thread Error] {e}")
