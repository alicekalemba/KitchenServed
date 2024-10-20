from sqlalchemy import Column, Integer, String, Text, DECIMAL, ForeignKey, TIMESTAMP, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
from sqlalchemy.schema import MetaData

DATABASE_URL = "postgresql://pricepulse:pricepulse123@pricepulsedb2.cji8ayyckyn5.us-east-2.rds.amazonaws.com/postgres"

# Specify the schema
metadata = MetaData(schema="kitchen_served")
Base = declarative_base(metadata=metadata)

class Meal(Base):
  __tablename__ = "meal"
  meal_id = Column(Integer, primary_key=True, index=True)
  name = Column(String(50), nullable=False)
  created_date = Column(TIMESTAMP)
  created_by = Column(String(255))
  updated_date = Column(TIMESTAMP)
  updated_by = Column(String(255))
  recipes = relationship("Recipe", back_populates="meal")

class Recipe(Base):
  __tablename__ = "recipe"
  recipe_id = Column(Integer, primary_key=True, index=True)
  meal_id = Column(Integer, ForeignKey("meal.meal_id"))
  recipe_name = Column(String(50), nullable=False)
  ingredients = Column(Text, nullable=False)
  cooking_time = Column(String(20))
  created_date = Column(TIMESTAMP)
  created_by = Column(String(255))
  updated_date = Column(TIMESTAMP)
  updated_by = Column(String(255))
  meal = relationship("Meal", back_populates="recipes")

class Store(Base):
  __tablename__ = "store"
  store_id = Column(Integer, primary_key=True, index=True)
  name = Column(String(50), nullable=False)
  location = Column(Text)
  created_date = Column(TIMESTAMP)
  created_by = Column(String(255))
  updated_date = Column(TIMESTAMP)
  updated_by = Column(String(255))
  ingredients = relationship("Ingredient", back_populates="store")

class Ingredient(Base):
  __tablename__ = "ingredient"
  ingredient_id = Column(Integer, primary_key=True, index=True)
  store_id = Column(Integer, ForeignKey("store.store_id"))
  name = Column(String(50), nullable=False)
  price = Column(DECIMAL)
  created_date = Column(TIMESTAMP)
  created_by = Column(String(255))
  updated_date = Column(TIMESTAMP)
  updated_by = Column(String(255))
  store = relationship("Store", back_populates="ingredients")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)
