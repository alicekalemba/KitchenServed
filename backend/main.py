from fastapi import FastAPI
from .ingredient_endpoints import router as ingredient_router
from .recipe_endpoints import router as recipe_router

app = FastAPI()

app.include_router(ingredient_router)
app.include_router(recipe_router)
