from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from starlette.requests import Request
from sqlalchemy.orm import Session

import schemas
from database.connection import get_db
from schemas import post
from crud import crud_post, crud_tag, crud_post_tag
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

    # 포스트를 저장한다
    post_info = await crud_post.post_set(db, post_data)

    # 포스트 저장이 성공하면 태그저장을 한다.
    # 태그 리스트를 반복 돌리고 생성된 태그인지 확인을 하고 있으면 기존 태그 아이디를 참고 없으면 새로 생성한다
    for data in post_data.tag_list:
        tag_info = await crud_tag.tag_get(db, data)

        if not tag_info:
            tag_info = await crud_tag.tag_set(db, data)

        await crud_post_tag.post_tag_set(db, tag_info.id, post_info.id)
    return JSONResponse({"result": "success", "message": "저장 성공"})

