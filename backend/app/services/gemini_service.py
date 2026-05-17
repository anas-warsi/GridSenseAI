import google.generativeai as genai
from app.config.settings import settings
import json
import asyncio
import time
import random
from datetime import datetime, timedelta

# Global Throttling State
_last_request_time = 0
_backoff_until = 0
_consecutive_errors = 0

def _get_model():
    if not settings.GEMINI_API_KEY:
        return None
    genai.configure(api_key=settings.GEMINI_API_KEY)
    # USER REQUEST: Use ONLY gemini-2.5-flash
    return genai.GenerativeModel("gemini-2.5-flash")

async def _call_gemini(prompt: str, retry_count=3) -> str:
    """Unified helper with exponential backoff and rate limit protection."""
    global _last_request_time, _backoff_until, _consecutive_errors
    
    model = _get_model()
    if not model: return ""
    
    current_time = time.time()
    if current_time < _backoff_until:
        print(f"[AI Cooldown] Throttling active for {int(_backoff_until - current_time)}s")
        return ""

    # Debounce: ensure at least 5s between calls
    elapsed = current_time - _last_request_time
    if elapsed < 5:
        await asyncio.sleep(5 - elapsed)

    for attempt in range(retry_count):
        try:
            _last_request_time = time.time()
            response = await asyncio.to_thread(model.generate_content, prompt)
            _consecutive_errors = 0
            return response.text.strip()
        except Exception as e:
            _consecutive_errors += 1
            wait_time = min(30 * (2 ** attempt), 300) # Exp backoff
            if "429" in str(e) or "quota" in str(e).lower():
                print(f"[AI Rate Limit] Quota exceeded. Backing off for {wait_time}s")
                _backoff_until = time.time() + wait_time
                break
            print(f"[AI Error] Attempt {attempt+1} failed: {e}")
            await asyncio.sleep(5)
            
    return ""

async def generate_autonomous_grid_report(grid_state: dict, memory: list = None) -> list:
    """
    Unified Autonomous Intelligence Engine.
    Uses context memory and grid state to generate unique operational insights.
    """
    transformers = grid_state.get('transformers', [])
    complaints = grid_state.get('complaints', [])
    
    # Topic Rotation
    categories = [
        "Predictive Maintenance", "Feeder Balancing", "Voltage Analysis", 
        "Load Optimization", "Anomaly Clustering", "Infrastructure Resilience",
        "Cascading Outage Risk", "Thermal Stress Patterns"
    ]
    primary_topic = random.choice(categories)

    # Format Memory
    recent_context = "\n".join([f"- {m.message}" for m in memory[-10:]]) if memory else "No recent history."

    prompt = f"""
You are the GridSense AI Unified Operational Intelligence Engine.
Location: Baduzai 1st, Shahjahanpur, UP.

CONTEXT MEMORY (Recent Insights):
{recent_context}

CURRENT GRID STATE:
- Transformers: {json.dumps([{ 'name': t.name, 'load': t.current_load, 'health': t.health, 'status': t.status } for t in transformers])}
- Active Anomalies: {len([c for c in complaints if c.status != 'resolved'])}

PRIMARY OPERATIONAL FOCUS: {primary_topic}

TASK:
Analyze the grid state. Avoid repeating ANY wording or concepts from the Context Memory.
Generate 1 to 2 NEW, HIGHLY UNIQUE operational insights in a senior electrical engineer style.

REQUIREMENTS:
1. Use technical, command-center language.
2. Refer to specific transformers if relevant.
3. Combine load trends with anomaly clusters.
4. Output ONLY a JSON list of objects: [{{"type": "critical|warning|info", "message": "...", "confidence": 0.XX}}]

Style Example: "Localized voltage drop signatures detected across Sector-4 feeder corridor; correlates with TR-02 secondary winding thermal accumulation."

Respond ONLY with valid JSON.
"""
    
    response_text = await _call_gemini(prompt)
    if not response_text:
        return _generate_fallback_autonomous_insights(grid_state)

    try:
        # Clean JSON
        if "```" in response_text:
            response_text = response_text.split("```")[1]
            if response_text.startswith("json"): response_text = response_text[4:]
        
        results = json.loads(response_text)
        if isinstance(results, list):
            for r in results: r["source"] = "gemini_autonomous"
            return results
        return []
    except Exception as e:
        print(f"[AI Parsing Error] {e}")
        return _generate_fallback_autonomous_insights(grid_state)

def _generate_fallback_autonomous_insights(grid_state: dict) -> list:
    """Stable fallback logic for when Gemini is throttled or fails."""
    # Simple dynamic fallback
    transformers = grid_state.get('transformers', [])
    high_load = [t for t in transformers if t.current_load > 80]
    
    msg = f"Operational monitoring continues. {len(high_load)} transformers exhibiting peak demand load." if high_load else "Grid distribution remains within nominal parameters across all monitored sectors."
    
    return [{
        "type": "info",
        "message": msg,
        "confidence": 0.95,
        "source": "system_stabilization"
    }]

async def analyze_complaint(complaint_type: str, severity: str, details: str = None, location: str = None) -> dict:
    """Unified complaint intelligence pipeline."""
    prompt = f"""
Analyze this Grid Anomaly:
- Type: {complaint_type}
- Initial Severity: {severity}
- Details: {details}

Respond with JSON:
{{
  "severity_prediction": "critical|high|warning",
  "risk_score": 0-100,
  "recommendation": "...",
  "ai_summary": "...",
  "confidence": 0.XX
}}
"""
    response_text = await _call_gemini(prompt)
    fallback = {
        "severity_prediction": severity,
        "risk_score": 70,
        "recommendation": "Standard field team dispatch initiated.",
        "ai_summary": f"GridSense AI is processing the {complaint_type} report. Initial triage suggest {severity} impact.",
        "confidence": 0.85,
        "source": "fallback"
    }
    
    if not response_text: return fallback

    try:
        if "```" in response_text:
            response_text = response_text.split("```")[1]
            if response_text.startswith("json"): response_text = response_text[4:]
        res = json.loads(response_text)
        res["source"] = "gemini"
        return res
    except:
        return fallback

async def generate_grid_insight(transformers: list, complaints: list) -> str:
    """Generate high-level operational briefing."""
    prompt = f"Summarize grid health in 1 professional command-center sentence. Context: {len(transformers)} transformers, {len(complaints)} issues. Max load: {max([t.current_load for t in transformers] + [0])}%."
    return await _call_gemini(prompt) or "Grid distribution monitoring active. Stabilized parameters detected."
