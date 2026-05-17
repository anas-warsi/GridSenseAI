import asyncio
import sys
import os

# Add the current directory to sys.path
sys.path.insert(0, os.path.abspath(os.curdir))

from app.services.monitoring_service import run_autonomous_monitoring
from app.config.settings import settings

async def test():
    print(f"Testing with API Key: {settings.GEMINI_API_KEY[:10]}...")
    await run_autonomous_monitoring()

if __name__ == "__main__":
    asyncio.run(test())
