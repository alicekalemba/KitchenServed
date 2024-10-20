from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from .models import Ingredient, SessionLocal
from .schemas import IngredientCreate, IngredientUpdate

router = APIRouter()

def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()

@router.post("/ingredients")
def create_ingredient(ingredient: IngredientCreate, db: Session = Depends(get_db)):
  db_ingredient = Ingredient(
      store_id=ingredient.store_id,
      name=ingredient.name,
      price=ingredient.price,
      created_by="fe-app",
      created_date=datetime.utcnow()
  )
  db.add(db_ingredient)
  db.commit()
  db.refresh(db_ingredient)
  return db_ingredient

@router.put("/ingredients/{ingredient_id}")
def update_ingredient(ingredient_id: int, ingredient: IngredientUpdate, db: Session = Depends(get_db)):
  db_ingredient = db.query(Ingredient).filter(Ingredient.ingredient_id == ingredient_id).first()
  if not db_ingredient:
    raise HTTPException(status_code=404, detail="Ingredient not found")

  if ingredient.store_id is not None:
    db_ingredient.store_id = ingredient.store_id
  if ingredient.name is not None:
    db_ingredient.name = ingredient.name
  if ingredient.price is not None:
    db_ingredient.price = ingredient.price

  db_ingredient.updated_by = "fe-app"
  db_ingredient.updated_date = datetime.utcnow()

  db.commit()
  db.refresh(db_ingredient)
  return db_ingredient

@router.delete("/ingredients/{ingredient_id}")
def delete_ingredient(ingredient_id: int, db: Session = Depends(get_db)):
  db_ingredient = db.query(Ingredient).filter(Ingredient.ingredient_id == ingredient_id).first()
  if not db_ingredient:
    raise HTTPException(status_code=404, detail="Ingredient not found")

  db.delete(db_ingredient)
  db.commit()
  return {"detail": "Ingredient deleted successfully"}

@router.get("/ingredients")
def read_ingredients(db: Session = Depends(get_db)):
  ingredients = db.query(Ingredient).all()
  return [
    {
      "store_id": ingredient.store_id,
      "store_name": ingredient.store.name,
      "store_location": ingredient.store.location,
      "name": ingredient.name,
      "price": ingredient.price
    }
    for ingredient in ingredients
  ]