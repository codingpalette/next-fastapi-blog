from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from starlette.requests import Request
from sqlalchemy.orm import Session
from database.connection import get_db
import schemas
from crud import crud_catetory
from functions import token, func
from config import conf

config = conf()

router = APIRouter(
    prefix="/category",
)

# 카테고리 생성
@router.post('', summary="카테고리 생성")
async def category_set(request: Request, post_data: schemas.CategorySet, db: Session = Depends(get_db)):
    # 로그인 여부 확인
    login_info = await func.login_info_get(request)
    if not login_info:
        raise HTTPException(status_code=401, detail={"result": "fail", "message": "로그인 후 이용해 주세요."})

    # 권한 체크
    await func.user_authority_check(login_info, 10)

    # 카테고리 생성
    await crud_catetory.category_set(db, post_data)

    # 카테고리 순서 정렬
    await crud_catetory.category_sort(db)

    return JSONResponse({"result": "success", "message": "카테고리 생성 성공"})
