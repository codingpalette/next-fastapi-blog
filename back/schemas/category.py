from typing import Optional
from pydantic import BaseModel


class CategorySet(BaseModel):
    category: str
    seq: int
