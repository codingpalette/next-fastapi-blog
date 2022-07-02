from typing import Optional
from pydantic import BaseModel


class PostBase(BaseModel):
    # pass
    title: str
    # class Config:
    #     orm_mode = True
