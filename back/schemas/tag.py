from typing import Optional
from pydantic import BaseModel


class TagSet(BaseModel):
    tag: str

