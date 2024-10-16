from fastapi import FastAPI
from .ingredient_endpoints import router as ingredient_router
from .recipe_endpoints import router as recipe_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow requests from React app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ingredient_router)
app.include_router(recipe_router)
