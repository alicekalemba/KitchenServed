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