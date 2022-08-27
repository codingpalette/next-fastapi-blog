from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from starlette.requests import Request
from sqlalchemy.orm import Session

import schemas
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

# 포스트 생성
@router.post('/', summary="포스트 생성")
async def post_set(request: Request, post_data: schemas.PostSet, db: Session = Depends(get_db)):
    # 로그인 여부 확인
    login_info = await func.login_info_get(request)
    if not login_info:
        raise HTTPException(status_code=401, detail={"result": "fail", "message": "로그인 후 이용해 주세요."})

    post_data.user_id = login_info['id']

    post_info = await crud_post.post_set(db, post_data)
    return JSONResponse({"result": "success", "message": "저장 성공"})

# 테스트
@router.get('/test')
def test():
    return True


# 테스트2
@router.post('/test')
async def test2(request: Request, post_data: post.PostBase, db: Session = Depends(get_db)):
    return crud_post.post_set(db, post_data)
