from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.config.settings import settings
from app.database import engine, Base

# Import all models so SQLAlchemy can create tables
from app.models import complaint, transformer, alert  # noqa: F401

# Import routers
from app.routes import auth, complaints, transformers, alerts, ai, reports, status
from app.services.monitoring_service import start_monitoring_cycle
from apscheduler.schedulers.background import BackgroundScheduler


# Global scheduler to prevent duplicates during reloads
_scheduler = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global _scheduler
    # Startup: create all tables
    Base.metadata.create_all(bind=engine)
    
    # Initialize Scheduler once
    if _scheduler is None:
        _scheduler = BackgroundScheduler()
        _scheduler.add_job(start_monitoring_cycle) # Immediate
        _scheduler.add_job(start_monitoring_cycle, 'interval', seconds=120)
        _scheduler.start()
        print("[OK] Autonomous Monitoring Engine: ACTIVE")
    
    print(f"[OK] GridSense AI Backend v{settings.APP_VERSION} started")
    yield
    # Shutdown
    if _scheduler:
        _scheduler.shutdown()
        _scheduler = None
    print("[STOP] GridSense AI Backend shutting down...")


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="AI-powered electricity grid intelligence backend for Baduzai 1st, Shahjahanpur",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# ─── CORS ────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.FRONTEND_URL,
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── ROUTERS ─────────────────────────────────────────────────────────────────
app.include_router(auth.router)
app.include_router(complaints.router)
app.include_router(transformers.router)
app.include_router(alerts.router)
app.include_router(ai.router)
app.include_router(reports.router)
app.include_router(status.router)


# ─── ROOT ────────────────────────────────────────────────────────────────────
@app.get("/")
def root():
    return {
        "system": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "online",
        "docs": "/docs",
        "message": "GridSense AI Backend is operational ⚡",
    }


@app.get("/health")
def health_check():
    return {"status": "healthy", "system": settings.APP_NAME}
