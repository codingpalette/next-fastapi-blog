from typing import Optional
from fastapi import APIRouter, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from starlette.requests import Request
from sqlalchemy.orm import Session
from database.connection import get_db
from crud import crud_user
from schemas import user

router = APIRouter(
    prefix="/user",
)


# 테스트
@router.get('/test')
def user_test(db: Session = Depends(get_db)):

    return True