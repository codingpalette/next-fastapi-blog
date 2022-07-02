from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from starlette.requests import Request
from sqlalchemy.orm import Session
from database.connection import get_db
from schemas import post
from crud import crud_post
from functions import token, func
from config import conf
from dotmap import DotMap
import bcrypt
import datetime
import jwt

config = conf()

router = APIRouter(
    prefix="/post",
)


# 테스트
@router.get('/test')
def test():
    return True


# 테스트2
@router.post('/test')
async def test2(request: Request, post_data: post.PostBase, db: Session = Depends(get_db)):
    return crud_post.post_set(db, post_data)
