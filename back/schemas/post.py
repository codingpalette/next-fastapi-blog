from typing import Optional
from pydantic import BaseModel


class PostBase(BaseModel):
    # pass
    title: str
    # class Config:
    #     orm_mode = True


class PostSet(BaseModel):
    user_id: Optional[int] = None
    category_id: int
    title: str
    tag_list = []
    content: str
