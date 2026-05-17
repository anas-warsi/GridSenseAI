"""
Seed the GridSense AI database with realistic smart-grid data.
Run: python seed.py
"""
import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from app.database import SessionLocal, engine, Base
from app.models.complaint import Complaint
from app.models.transformer import Transformer
from app.models.alert import AIAlert, Admin
from datetime import datetime, timedelta
import random

def seed():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # ── Admin ──────────────────────────────────────────────────────────────
    if not db.query(Admin).filter(Admin.username == "admin").first():
        db.add(Admin(username="admin", password="admin123"))
        print("[OK] Admin created: admin / admin123")

    # ── Transformers ───────────────────────────────────────────────────────
    transformers_data = [
        {"name": "TR-01 Main Feeder",      "current_load": 78.4, "health": 82.0, "status": "warning",  "complaint_count": 3, "latitude": 27.8852, "longitude": 79.9082},
        {"name": "TR-02 Residential Block","current_load": 55.1, "health": 95.0, "status": "normal",   "complaint_count": 1, "latitude": 27.8841, "longitude": 79.9065},
        {"name": "TR-03 Market Zone",      "current_load": 91.7, "health": 61.0, "status": "critical", "complaint_count": 7, "latitude": 27.8863, "longitude": 79.9098},
        {"name": "TR-04 North Sector",     "current_load": 43.2, "health": 98.0, "status": "normal",   "complaint_count": 0, "latitude": 27.8875, "longitude": 79.9054},
        {"name": "TR-05 South Grid",       "current_load": 68.9, "health": 88.5, "status": "normal",   "complaint_count": 2, "latitude": 27.8831, "longitude": 79.9074},
        {"name": "TR-06 Industrial Feed",  "current_load": 87.3, "health": 72.0, "status": "warning",  "complaint_count": 5, "latitude": 27.8847, "longitude": 79.9105},
    ]
    if db.query(Transformer).count() == 0:
        for t in transformers_data:
            db.add(Transformer(**t))
        print(f"[OK] {len(transformers_data)} transformers seeded")

    # ── Complaints ─────────────────────────────────────────────────────────
    complaints_data = [
        {"type": "Power Outage",        "severity": "critical", "latitude": 27.8855, "longitude": 79.9080, "details": "Complete blackout in Block C since 6 PM. Hospital backup power active.", "status": "in_progress", "ai_analysis": "Total feeder failure detected. TR-03 overload cascade likely cause. Dispatch lineman immediately."},
        {"type": "Low Voltage",         "severity": "high",     "latitude": 27.8842, "longitude": 79.9068, "details": "Voltage fluctuating between 180-200V. Appliances damaged.", "status": "pending",     "ai_analysis": "Voltage drop of 15% below nominal. TR-02 neutral fault suspected. Inspection required within 2 hours."},
        {"type": "Transformer Sparking","severity": "critical", "latitude": 27.8864, "longitude": 79.9095, "details": "TR-03 Market Zone sparking loudly. Burning smell present. Public safety risk.", "status": "in_progress", "ai_analysis": "Thermal overload signature detected. Immediate isolation of TR-03 recommended before fire risk escalates."},
        {"type": "Line Damage",         "severity": "high",     "latitude": 27.8838, "longitude": 79.9071, "details": "Overhead line sagging dangerously after storm. Children playing nearby.", "status": "pending",     "ai_analysis": "Structural integrity failure in distribution line. Safety cordon required. Estimated repair: 3-4 hours."},
        {"type": "Frequent Tripping",   "severity": "warning",  "latitude": 27.8849, "longitude": 79.9088, "details": "Power cuts 3-4 times daily for 15-20 minutes each time.", "status": "resolved",    "ai_analysis": "Intermittent fault pattern consistent with loose connection at pole-mounted fuse. Resolved by field team."},
        {"type": "Low Voltage",         "severity": "warning",  "latitude": 27.8870, "longitude": 79.9060, "details": "Fan and pump running slow. Voltage meter shows 195V.", "status": "resolved",    "ai_analysis": "Minor voltage sag resolved by capacitor bank adjustment at TR-04. Monitor for recurrence."},
        {"type": "No Electricity",      "severity": "high",     "latitude": 27.8835, "longitude": 79.9078, "details": "Entire lane without power for 8 hours. No response from electricity board.", "status": "pending",     "ai_analysis": "Isolated section fault. Single-phase loss on distribution line. Priority: High."},
    ]
    if db.query(Complaint).count() == 0:
        base_time = datetime.utcnow() - timedelta(hours=18)
        for i, c in enumerate(complaints_data):
            db.add(Complaint(
                **c,
                created_at=base_time + timedelta(hours=i * 2 + random.randint(0, 90))
            ))
        print(f"[OK] {len(complaints_data)} complaints seeded")

    # ── AI Alerts ──────────────────────────────────────────────────────────
    alerts_data = [
        {"type": "critical", "message": "CRITICAL: TR-03 Market Zone thermal overload - load at 91.7%. Cascade failure risk is HIGH. Immediate intervention required.", "confidence": 0.97},
        {"type": "critical", "message": "CRITICAL: Power outage confirmed at Block C, Baduzai 1st. 340 households affected. AI routing field team now.", "confidence": 0.95},
        {"type": "high",     "message": "HIGH: TR-01 Main Feeder approaching warning threshold (78.4%). Load shedding recommended between 19:00-22:00.", "confidence": 0.91},
        {"type": "high",     "message": "HIGH: Voltage instability detected across 3 complaint zones. Neutral conductor inspection recommended.", "confidence": 0.89},
        {"type": "warning",  "message": "WARNING: AI predicts 68% probability of feeder instability in South Grid sector within next 4 hours based on load trend.", "confidence": 0.82},
        {"type": "warning",  "message": "WARNING: TR-06 Industrial Feed load at 87.3%. Monitor closely - approaching critical threshold.", "confidence": 0.85},
        {"type": "info",     "message": "INFO: TR-04 North Sector operating at optimal efficiency (43.2% load). No anomalies detected.", "confidence": 0.99},
        {"type": "info",     "message": "INFO: Complaint #5 resolved: Intermittent tripping at Pole-44 fixed by field team. Grid restored.", "confidence": 0.99},
        {"type": "warning",  "message": "WARNING: Monsoon load surge prediction: expect 18-23% load increase over next 72 hours. Pre-position maintenance crews.", "confidence": 0.78},
        {"type": "info",     "message": "INFO: AI grid optimization cycle complete. 3 load balancing adjustments applied across distribution network.", "confidence": 0.96},
    ]
    if db.query(AIAlert).count() == 0:
        base_time = datetime.utcnow() - timedelta(hours=6)
        for i, a in enumerate(alerts_data):
            db.add(AIAlert(
                **a,
                source="gemini",
                created_at=base_time + timedelta(minutes=i * 35 + random.randint(0, 20))
            ))
        print(f"[OK] {len(alerts_data)} AI alerts seeded")

    db.commit()
    db.close()
    print("\nGridSense AI database seeded successfully!")
    print("-" * 50)
    print("Admin Login  ->  admin / admin123")
    print("Backend URL  ->  http://localhost:8000")
    print("API Docs     ->  http://localhost:8000/docs")
    print("-" * 50)


if __name__ == "__main__":
    seed()
