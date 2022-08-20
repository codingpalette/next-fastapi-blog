from typing import Optional
from pydantic import BaseModel


class CategorySet(BaseModel):
    category: str
    seq: int
    level: int


class CategoryDelete(BaseModel):
    delete_ids = []


class CategoryPut(CategorySet):
    id: int
