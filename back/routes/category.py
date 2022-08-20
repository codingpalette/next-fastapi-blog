from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from starlette.requests import Request
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from database.connection import get_db
import schemas
from crud import crud_catetory
from functions import token, func
from config import conf
import time

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


# 카테고리 리스트
@router.get('/list', summary="카테고리 리스트")
async def category_list(db: Session = Depends(get_db)):
    return await crud_catetory.category_list(db)


# 카테고리 하나 가져오기
@router.get('', summary="카테고리 하나 가져오기")
async def category_get(request: Request, id: int, db: Session = Depends(get_db)):
    # 로그인 여부 확인
    login_info = await func.login_info_get(request)
    if not login_info:
        raise HTTPException(status_code=401, detail={"result": "fail", "message": "로그인 후 이용해 주세요."})

    # 권한 체크
    await func.user_authority_check(login_info, 10)

    category_info = await crud_catetory.category_get(db, id)
    if not category_info:
        raise HTTPException(status_code=401, detail={"result": "fail", "message": "해당 데이터가 없습니다."})

    json_data = jsonable_encoder(category_info)
    return JSONResponse({"result": "success", "message": "데이터 불러오기 성공", "data": json_data})


# 카테고리 삭제
@router.post('/delete', summary="카테고리 삭제")
async def category_delete(request: Request, post_data: schemas.CategoryDelete, db: Session = Depends(get_db)):
    # 로그인 여부 확인
    login_info = await func.login_info_get(request)
    if not login_info:
        raise HTTPException(status_code=401, detail={"result": "fail", "message": "로그인 후 이용해 주세요."})

    # 권한 체크
    await func.user_authority_check(login_info, 10)

    # 카테고리 삭제
    await crud_catetory.category_delete(db, post_data)

    # 카테고리 순서 정렬
    await crud_catetory.category_sort(db)

    return JSONResponse({"result": "success", "message": "카테고리 삭제 성공"})


# 카테고리 수정
@router.put('', summary="카테고리 수정")
async def category_put(request: Request, post_data: schemas.CategoryPut, db: Session = Depends(get_db)):
    # 로그인 여부 확인
    login_info = await func.login_info_get(request)
    if not login_info:
        raise HTTPException(status_code=401, detail={"result": "fail", "message": "로그인 후 이용해 주세요."})

    # 권한 체크
    await func.user_authority_check(login_info, 10)

    # 카테고리 수정
    await crud_catetory.category_put(db, post_data)

    # 카테고리 순서 정렬
    await crud_catetory.category_sort(db)
    
    return JSONResponse({"result": "success", "message": "카테고리 수정 성공"})
