from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from database.connection import get_db
from schemas import user
from crud import crud_user
import bcrypt

router = APIRouter(
    prefix="/user",
)

# 유저 회원가입
@router.post('')
def user_set(post_data: user.UserSet, db: Session = Depends(get_db)):
    email_info = crud_user.user_get_email(db, post_data.email)
    if email_info:
        raise HTTPException(status_code=401,  detail={"result": "fail", "message": "이미 사용중인 이메일 입니다."})
    nickname_info = crud_user.user_get_nickname(db, post_data.nickname)
    if nickname_info:
        raise HTTPException(status_code=401,  detail={"result": "fail", "message": "이미 사용중인 닉네임 입니다."})
    hashed_password = bcrypt.hashpw(post_data.password.encode('utf-8'), bcrypt.gensalt())
    save_password = hashed_password.decode('utf-8')
    post_data.password = save_password
    save_user = crud_user.user_set(db, post_data)
    if save_user:
        return JSONResponse(status_code=201, content={"result": "success", "message": "회원가입에 성공 했습니다"})
    else:
        raise HTTPException(status_code=501, detail={"result": "fail", "message": "회원가입에 실패 했습니다."})


# 테스트
@router.get('/test')
def user_test(db: Session = Depends(get_db)):

    return True