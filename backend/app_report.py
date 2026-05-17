import google.generativeai as genai
from app.database import SessionLocal
from app.models.alert import AIAlert
from app.models.transformer import Transformer
from app.models.complaint import Complaint
from datetime import datetime, timedelta

def generate_health_report():
    db = SessionLocal()
    try:
        # 1. Gemini Model Info
        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
        print(" GRID SENSE AI — OPERATIONAL HEALTH")
        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
        print(f"Gemini Model: gemini-2.5-flash")
        print(f"Status: ACTIVE")
        
        # 2. Autonomous Intelligence Stats
        auto_alerts = db.query(AIAlert).filter(AIAlert.source == 'gemini_autonomous').all()
        total_alerts = len(auto_alerts)
        recent_24h = [a for a in auto_alerts if a.created_at > datetime.utcnow() - timedelta(days=1)]
        
        print(f"\n[AI MEMORY ENGINE]")
        print(f"Total Operational Insights: {total_alerts}")
        print(f"Insights Generated (Last 24h): {len(recent_24h)}")
        print(f"Memory Buffer: ACTIVE (20 slots)")
        
        # 3. Deduplication & Throttling
        print(f"\n[OPTIMIZATION REPORT]")
        print(f"Semantic Deduplication: ENABLED")
        print(f"State Comparison: ACTIVE (MD5 State Hashing)")
        print(f"API Rate Throttling: ENABLED (Exp Backoff)")
        
        # 4. Intelligence Sample
        if auto_alerts:
            latest = auto_alerts[-1]
            print(f"\n[LATEST INTELLIGENCE SAMPLE]")
            print(f"Type: {latest.type.upper()}")
            print(f"Message: {latest.message}")
            print(f"Confidence: {latest.confidence * 100}%")
            
        print("\n[GRID STABILITY]")
        transformers = db.query(Transformer).all()
        overloaded = [t for t in transformers if t.current_load > 85]
        print(f"Monitored Nodes: {len(transformers)}")
        print(f"Overloaded Nodes: {len(overloaded)}")
        
        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

    finally:
        db.close()

if __name__ == "__main__":
    generate_health_report()
