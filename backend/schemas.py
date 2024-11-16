from typing import Optional
from pydantic import BaseModel

class IngredientCreate(BaseModel):
  store_id: int
  name: str
  price: float
  image_url: Optional[str] = None

class IngredientUpdate(BaseModel):
  store_id: Optional[int] = None
  name: Optional[str] = None
  price: Optional[float] = None
  image_url: Optional[str] = None

class IngredientResponse(BaseModel):
    ingredient_id: int
    store_id: int
    store_name: str
    store_location: str
    name: str
    price: float
    image_url: Optional[str] = None

    class Config:
      orm_mode = True

class RecipeCreate(BaseModel):
  meal_id: int
  recipe_name: str
  ingredients: str
  cooking_time: str
  image_url: Optional[str] = None

class RecipeUpdate(BaseModel):
  meal_id: Optional[int] = None
  recipe_name: Optional[str] = None
  ingredients: Optional[str] = None
  cooking_time: Optional[str] = None
  image_url: Optional[str] = None

class RecipeResponse(BaseModel):
  meal_name: str
  meal_id: int
  recipe_id: int
  recipe_name: str
  ingredients: str
  cooking_time: str
  image_url: Optional[str] = None

  class Config:
    orm_mode = True
