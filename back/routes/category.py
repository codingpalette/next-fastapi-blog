from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from starlette.requests import Request
from sqlalchemy.orm import Session
from database.connection import get_db
import schemas
import crud
from functions import token, func
from config import conf
from dotmap import DotMap
import bcrypt
import datetime
import jwt


config = conf()

router = APIRouter(
    prefix="/category",
)

# 카테고리 생성
@router.post('', summary="카테고리 생성")
async def category_set(request: Request, post_data: schemas.CategorySet, db: Session = Depends(get_db)):
    return await crud.CRUDCategory.category_set(db, post_data)
