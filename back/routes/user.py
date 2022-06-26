from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from starlette.requests import Request
from sqlalchemy.orm import Session
from database.connection import get_db
from schemas import user
from crud import crud_user
from functions import token, func
import bcrypt
import datetime

router = APIRouter(
    prefix="/user",
)


# 유저 체크
@router.get('/check', summary="유저 체크")
async def user_check(request: Request):
    cookies = request.cookies
    access_token = cookies.get("access_token")
    refresh_token = cookies.get("refresh_token")

    if not access_token or not refresh_token:
        return JSONResponse(status_code=401, content={"result": "fail", "message": "인증실패"})

    token_check = await token.token_check(access_token, refresh_token)
    if not token_check:
        return JSONResponse(status_code=401, content={"result": "fail", "message": "인증실패"})

    access_token_time = datetime.datetime.utcnow() + datetime.timedelta(days=1)
    content = {"result": "success", "message": "유저인증에 성공했습니다."}
    response = JSONResponse(content=content)
    response.set_cookie(
        key="access_token",
        value=token_check,
        secure=True,
        httponly=True,
        expires=access_token_time.strftime("%a, %d %b %Y %H:%M:%S GMT"),
    )
    response.set_cookie(key="access_token", value=token_check)
    return response


# 유저 회원가입
@router.post('', summary="회원가입")
async def user_set(request: Request, post_data: user.UserSet, db: Session = Depends(get_db)):
    """
    :param request: \n
    :param post_data: \n
    :param db: \n
    :return:
    """
    # 로그인 여부 확인
    login_info = await func.login_info_get(request)
    if login_info:
        raise HTTPException(status_code=401, detail={"result": "fail", "message": "로그아웃 후 이용해 주세요."})

    # 이메일 체크
    email_info = crud_user.user_get_email(db, post_data.email)
    if email_info:
        raise HTTPException(status_code=401, detail={"result": "fail", "message": "이미 사용중인 이메일 입니다."})

    # 닉네임 체크
    nickname_info = crud_user.user_get_nickname(db, post_data.nickname)
    if nickname_info:
        raise HTTPException(status_code=401, detail={"result": "fail", "message": "이미 사용중인 닉네임 입니다."})

    # 비밀번호 암호화
    hashed_password = bcrypt.hashpw(post_data.password.encode('utf-8'), bcrypt.gensalt())
    save_password = hashed_password.decode('utf-8')
    post_data.password = save_password
    save_user = crud_user.user_set(db, post_data)
    if save_user:
        return JSONResponse(status_code=201, content={"result": "success", "message": "회원가입에 성공 했습니다"})
    else:
        raise HTTPException(status_code=501, detail={"result": "fail", "message": "회원가입에 실패 했습니다."})


# 유저 로그인
@router.post('/login', summary="로그인")
async def user_login(request: Request, post_data: user.UserLogin, db: Session = Depends(get_db)):
    """
    post_data: email, password \n
    """
    # 로그인 여부 확인
    login_info = await func.login_info_get(request)
    if login_info:
        raise HTTPException(status_code=401, detail={"result": "fail", "message": "로그아웃 후 이용해 주세요."})

    # 이메일 체크
    email_info = crud_user.user_get_email(db, post_data.email)
    if not email_info:
        raise HTTPException(status_code=401, detail={"result": "fail", "message": "존재하지 않는 이메일 입니다."})

    # 패스워드 체크
    password_check = bcrypt.checkpw(post_data.password.encode('utf-8'), email_info.password.encode('utf-8'))
    if not password_check:
        raise HTTPException(status_code=401, detail={"result": "fail", "message": "비밀번호가 틀립니다."})

    # 토큰 만들기
    access_token = token.create_token('access_token', email_info)
    refresh_token = token.create_token('refresh_token', email_info)
    # db에 토큰 업데이트
    token_update = crud_user.token_update(db, email_info.email, refresh_token)
    if token_update:
        access_token_time = datetime.datetime.utcnow() + datetime.timedelta(days=1)
        refresh_token_time = datetime.datetime.utcnow() + datetime.timedelta(days=14)
        content = {"result": "success", "message": "로그인 성공"}
        response = JSONResponse(content=content)
        response.set_cookie(
            key="access_token",
            value=access_token,
            secure=True,
            httponly=True,
            expires=access_token_time.strftime("%a, %d %b %Y %H:%M:%S GMT"),
        )
        response.set_cookie(
            key="refresh_token",
            value=refresh_token,
            secure=True,
            httponly=True,
            expires=refresh_token_time.strftime("%a, %d %b %Y %H:%M:%S GMT"),
        )
        return response
    else:
        raise HTTPException(status_code=501, detail={"result": "fail", "message": "로그인에 실패했습니다."})


# 테스트
@router.get('/test')
def user_test(db: Session = Depends(get_db)):
    return True
