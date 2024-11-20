import logging
import json
import os
import boto3
import uuid
from fastapi import APIRouter, Depends, Query, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from datetime import datetime
from typing import List, Optional
from botocore.exceptions import ClientError
from .models import Recipe,Meal, SessionLocal
from .schemas import RecipeCreate, RecipeResponse, RecipeUpdate
from dotenv import load_dotenv

logger = logging.getLogger(__name__)

router = APIRouter()

load_dotenv()
s3_client = boto3.client('s3', aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"), aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"))
S3_BUCKET_NAME = "kitchen-served-images"


def model_to_dict(obj):
  return {c.name: getattr(obj, c.name) for c in obj.__table__.columns}

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

@router.get("/api/recipes", response_model=List[RecipeResponse])
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

  # logger.info(f"Successfully fetched {len(recipes)} recipes")
  # recipes_dict = [model_to_dict(recipe) for recipe in recipes]
  # logger.info(json.dumps(recipes_dict, indent=2, default=str))

  return [
    RecipeResponse(
        meal_name=recipe.meal.name,
        meal_id=recipe.meal_id,
        recipe_id=recipe.recipe_id,
        recipe_name=recipe.recipe_name,
        ingredients=recipe.ingredients,
        cooking_time=recipe.cooking_time,
        image_url=recipe.image_url
  ) for recipe in recipes
  ]

@router.delete("/api/recipes/{recipe_id}")
def delete_ingredient(recipe_id: int, db: Session = Depends(get_db)):
  db_recipe = db.query(Recipe).filter(Recipe.recipe_id == recipe_id).first()
  if not db_recipe:
    raise HTTPException(status_code=404, detail="Recipe not found")

  db.delete(db_recipe)
  db.commit()
  return {"detail": "Recipe deleted successfully"}

async def upload_image_to_s3(file: UploadFile) -> str:
    """
    Upload an image to S3 and return the URL
    """
    try:
        file_extension = file.filename.split('.')[-1]
        unique_filename = f"{uuid.uuid4()}.{file_extension}"

        contents = await file.read()

        s3_client.put_object(
            Bucket=S3_BUCKET_NAME,
            Key=f"recipe-images/{unique_filename}",
            Body=contents,
            ContentType=file.content_type
        )

        image_url = f"recipe-images/{unique_filename}"
        return image_url

    except ClientError as e:
        logger.error(f"Error uploading to S3: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to upload image")
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to process image")


@router.post("/api/recipes")
async def create_recipe(
        recipe_name: str = Form(...),
        meal_id: int = Form(...),
        ingredients: str = Form(...),
        cooking_time: str = Form(...),
        image: UploadFile = File(None),
        db: Session = Depends(get_db)
):
    try:
        image_url = None
        if image:
            if not image.content_type.startswith('image/'):
                raise HTTPException(status_code=400, detail="File must be an image")
            image_url = await upload_image_to_s3(image)

        # Create recipe
        db_recipe = Recipe(
            meal_id=meal_id,
            recipe_name=recipe_name,
            ingredients=ingredients,
            cooking_time=cooking_time,
            image_url=image_url,
            created_by="fe-app",
            created_date=datetime.utcnow(),
            updated_by="fe-app",
            updated_date=datetime.utcnow()
        )

        db.add(db_recipe)
        db.commit()
        db.refresh(db_recipe)

        return {
            "recipe_id": db_recipe.recipe_id,
            "recipe_name": db_recipe.recipe_name,
            "image_url": db_recipe.image_url,
            "meal_id": db_recipe.meal_id,
            "ingredients": db_recipe.ingredients,
            "cooking_time": db_recipe.cooking_time
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating recipe: {str(e)}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to create recipe")
