import logging
import os
import uuid
import boto3
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from datetime import datetime
from typing import List, Optional
from botocore.exceptions import ClientError
from .models import Ingredient, SessionLocal
from .schemas import IngredientCreate, IngredientUpdate, IngredientResponse
from dotenv import load_dotenv
from .s3utils import upload_image_to_s3
from .constants import INGREDIENT_IMAGES_FOLDER

router = APIRouter()
logger = logging.getLogger(__name__)

def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()

@router.post("/api/ingredients", response_model=IngredientResponse)
async def create_ingredient(
  store_id: int = Form(...),
    name: str = Form(...),
    price: float = Form(...),
    image: UploadFile = File(None),
    db: Session = Depends(get_db)
):
  
    try:
       image_url = None
       if image:
          if not image.content_type.startswith('image/'):
             raise HTTPException(status_code=400, detail="File must be an image")
          image_url = await upload_image_to_s3(image, INGREDIENT_IMAGES_FOLDER)

       db_ingredient = Ingredient(
          store_id=store_id,
          name=name,
          price=price,
          image_url=image_url,
          created_by="fe-app",
          created_date=datetime.utcnow()
          
       )

       db.add(db_ingredient)
       db.commit()
       db.refresh(db_ingredient)
       
       
       return {
          "ingredient_id": db_ingredient.ingredient_id,
          "store_id": db_ingredient.store_id,
          "store_name": db_ingredient.store.name,
          "store_location": db_ingredient.store.location,
          "name": db_ingredient.name,
          "price": db_ingredient.price,
          "image_url": db_ingredient.image_url
       } 
    
    except HTTPException:
       raise
    except Exception as e:
       logger.error(f"Error creating ingredient: {str(e)}")
       db.rollback()
       raise HTTPException(status_code=500, detail="Failed to create ingredient") 

@router.delete("/api/ingredients/{ingredient_id}")
def delete_ingredient(ingredient_id: int, db: Session = Depends(get_db)):
    db_ingredient = db.query(Ingredient).filter(Ingredient.ingredient_id == ingredient_id).first()
    if not db_ingredient:
        raise HTTPException(status_code=404, detail="Ingredient not found")

    db.delete(db_ingredient)
    db.commit()
    return {"detail": "Ingredient deleted successfully"}

@router.get("/api/ingredients", response_model=List[IngredientResponse])
def read_ingredients(db: Session = Depends(get_db)):
    ingredients = db.query(Ingredient).all()
    return [
         {
          "ingredient_id": ingredient.ingredient_id,
          "store_id": ingredient.store_id,
          "store_name": ingredient.store.name,
          "store_location": ingredient.store.location,
          "name": ingredient.name,
          "price": ingredient.price,
          "image_url": ingredient.image_url
        }
        for ingredient in ingredients
    ]