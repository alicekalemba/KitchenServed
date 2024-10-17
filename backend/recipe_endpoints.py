from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from typing import List, Optional
from .models import Recipe,Meal, SessionLocal
from .schemas import RecipeCreate, RecipeResponse, RecipeUpdate

router = APIRouter()

def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()

def find_meal_id_for_name_like(db: Session, name: str) -> int:
  meal = db.query(Meal).filter(Meal.name.ilike(f"%{name}%")).first()
  if meal:
    return meal.meal_id
  return None

@router.get("/recipes", response_model=List[RecipeResponse])
def read_recipes(
    time_now: Optional[datetime] = Query(None),
    meal_name: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
  if time_now is not None:
    if time_now.hour < 12:
      meal_id = find_meal_id_for_name_like(db, "Breakfast")
    elif time_now.hour < 18:
      meal_id = find_meal_id_for_name_like(db, "Lunch")
    else:
      meal_id = find_meal_id_for_name_like(db, "Dinner")

    recipes = db.query(Recipe).filter(Recipe.meal_id == meal_id).all()
  elif meal_name is not None:
    meal_id = find_meal_id_for_name_like(db, meal_name)
    recipes = db.query(Recipe).filter(Recipe.meal_id == meal_id).all()
  else:
    recipes = db.query(Recipe).all()

  return [
    RecipeResponse(
        meal_name=recipe.meal.name,
        meal_id=recipe.meal_id,
        recipe_name=recipe.recipe_name,
        ingredients=recipe.ingredients,
        cooking_time=recipe.cooking_time
    ) for recipe in recipes
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
