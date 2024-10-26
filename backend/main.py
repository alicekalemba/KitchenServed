import logging
from fastapi import FastAPI
from .ingredient_endpoints import router as ingredient_router
from .recipe_endpoints import router as recipe_router
from fastapi.middleware.cors import CORSMiddleware

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://kitchenserved.com"],  # Allow requests from FE app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ingredient_router)
app.include_router(recipe_router)

logger.info("KitchenServed BE application started")

@app.on_event("startup")
async def startup_event():
  logger.info("KitchenServed BE App is starting up")

@app.on_event("shutdown")
async def shutdown_event():
  logger.info("KitchenServed BE App is shutting down")