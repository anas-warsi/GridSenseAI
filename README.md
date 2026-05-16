# GridSense AI

GridSense AI is an AI-powered smart grid intelligence and electrical infrastructure monitoring platform designed to simulate a modern utility operations command center.

The platform combines real-time complaint management, transformer monitoring, autonomous AI analysis, predictive infrastructure intelligence, and operational visualization into a single full-stack application.

This project was built using React, FastAPI, SQLite, and Google's Gemini AI models.

---

# Project Overview

GridSense AI transforms traditional electrical complaint monitoring into an autonomous AI-driven operational intelligence system.

The platform continuously analyzes:

- Transformer load conditions
- Electrical complaints
- Risk zones
- Outage trends
- Voltage instability
- Feeder imbalance patterns
- Historical complaint density
- Grid health metrics

Using Gemini AI, the system generates dynamic operational insights similar to real-world utility infrastructure monitoring systems.

---

# Key Features

## Autonomous AI Monitoring Engine

The platform includes a background AI monitoring engine that automatically performs grid-wide operational analysis every few minutes.

The AI system can:

- Analyze transformer overload conditions
- Detect infrastructure instability
- Predict outage risks
- Generate maintenance recommendations
- Identify feeder imbalance
- Analyze voltage fluctuation patterns
- Detect complaint clustering
- Simulate smart-grid operational reasoning

---

## AI-Powered Operational Intelligence

Gemini AI generates contextual infrastructure insights instead of static alert templates.

Example AI insights:

- Transformer degradation analysis
- Preventive maintenance recommendations
- Outage propagation warnings
- Load balancing suggestions
- Risk escalation predictions
- Thermal stress detection
- Distribution instability analysis

The system maintains AI memory and deduplication logic to avoid repetitive responses.

---

## Real-Time Dashboard

The dashboard provides a command-center style interface for monitoring grid conditions.

Features include:

- Live AI feed
- Transformer monitoring
- Risk zone visualization
- Complaint tracking
- Operational statistics
- Load monitoring
- Autonomous AI summaries

---

## Complaint Management System

Users can submit electrical infrastructure complaints including:

- Power outage
- Low voltage
- Transformer sparking
- Overload issues
- Line damage
- Electrical instability

Each complaint is automatically analyzed by Gemini AI.

---

## Transformer Intelligence System

The platform simulates transformer-level monitoring including:

- Load percentage
- Operational health
- Failure prediction
- Thermal stress analysis
- Infrastructure degradation
- Risk scoring

---

## Autonomous Background Scheduler

A background scheduler continuously performs:

- Grid health analysis
- AI operational insight generation
- Transformer monitoring
- Historical trend analysis
- Infrastructure risk evaluation

The scheduler is built using APScheduler with FastAPI integration.

---

## AI Memory and Deduplication

The system stores previous operational insights and prevents repetitive AI responses using:

- AI memory buffers
- State comparison hashing
- Duplicate detection
- Context-aware operational reasoning

---

# Technology Stack

## Frontend

- React.js
- Vite
- Axios
- Tailwind CSS
- React Router
- Leaflet Maps

## Backend

- FastAPI
- SQLite
- SQLAlchemy
- APScheduler
- Pydantic
- Uvicorn

## AI Integration

- Google Gemini API
- Gemini 2.5 Flash

---

# Project Structure

```text
GridSenseAI/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── assets/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── schemas/
│   │   ├── models/
│   │   └── database.py
│   │
│   ├── requirements.txt
│   ├── seed.py
│   ├── gridsense.db
│   └── .env
│
├── README.md
└── .gitignore
