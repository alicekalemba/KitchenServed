from typing import Optional
from pydantic import BaseModel

class IngredientCreate(BaseModel):
  store_id: int
  name: str
  price: float

class IngredientUpdate(BaseModel):
  store_id: Optional[int] = None
  name: Optional[str] = None
  price: Optional[float] = None

class RecipeCreate(BaseModel):
  meal_id: int
  recipe_name: str
  ingredients: str
  cooking_time: str

class RecipeResponse(BaseModel):
  meal_name: str
  meal_id: int
  recipe_id: int
  recipe_name: str
  ingredients: str
  cooking_time: str

class RecipeUpdate(BaseModel):
  meal_id: Optional[int] = None
  recipe_name: Optional[str] = None
  ingredients: Optional[str] = None
  cooking_time: Optional[str] = None
