# backend/recipe_endpoints.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from .models import Recipe, SessionLocal
from .schemas import RecipeCreate, RecipeUpdate


router = APIRouter()

def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()

@router.get("/recipes")
def read_recipes(db: Session = Depends(get_db)):
  recipes = db.query(Recipe).all()
  return [
    {
      "meal_name": recipe.meal.name,
      "meal_id": recipe.meal_id,
      "recipe_name": recipe.recipe_name,
      "ingredients": recipe.ingredients,
      "cooking_time": recipe.cooking_time
    }
    for recipe in recipes
  ]

@router.get("/recipes")
def read_recipes_by_meal(meal_id: int, db: Session = Depends(get_db)):
  recipes = db.query(Recipe).filter(Recipe.meal_id == meal_id).all()
  return [
    {
      "meal_name": recipe.meal.name,
      "meal_id": recipe.meal_id,
      "recipe_name": recipe.recipe_name,
      "ingredients": recipe.ingredients,
      "cooking_time": recipe.cooking_time
    }
    for recipe in recipes
  ]

@router.post("/recipes")
def create_recipe(recipe: RecipeCreate, db: Session = Depends(get_db)):
  db_recipe = Recipe(
      meal_id=recipe.meal_id,
      recipe_name=recipe.recipe_name,
      ingredients=recipe.ingredients,
      cooking_time=recipe.cooking_time,
      created_by="fe-app",
      created_date=datetime.utcnow(),
      updated_by="fe-app",
      updated_date=datetime.utcnow()
  )
  db.add(db_recipe)
  db.commit()
  db.refresh(db_recipe)
  return db_recipe
