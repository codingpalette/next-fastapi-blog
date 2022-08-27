from fastapi import HTTPException
from sqlalchemy.orm import Session
from models.user import User
from schemas import user


# 유저 생성 함수
def user_set(db: Session, post_data: user.UserSet) -> User:
    try:
        db_obj = User(
            login_id=post_data.login_id,
            nickname=post_data.nickname,
            password=post_data.password
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj
    except Exception as e:
        # print(e)
        raise HTTPException(status_code=500,  detail={"result": "fail", "message": "서버에 문제가 발생했습니다"})


# 로그인 아이디 체크 함수
def user_get_login_id(db: Session, login_id: user.UserBase) -> User:
    try:
        return db.query(User).filter(User.login_id == login_id).first()
    except Exception as e:
        # print(e)
        raise HTTPException(status_code=500,  detail={"result": "fail", "message": "서버에 문제가 발생했습니다"})


# 닉네임 체크 함수
def user_get_nickname(db: Session, nickname: user.UserNickname) -> User:
    try:
        return db.query(User).filter(User.nickname == nickname).first()
    except Exception as e:
        # print(e)
        raise HTTPException(status_code=500,  detail={"result": "fail", "message": "서버에 문제가 발생했습니다"})


# 아이디 체크 함수
def user_get_id(db: Session, id: int) -> User:
    try:
        return db.query(User).filter(User.id == id).first()
    except Exception as e:
        # print(e)
        raise HTTPException(status_code=500,  detail={"result": "fail", "message": "서버에 문제가 발생했습니다"})


# 리프레시 토큰 업데이트
def token_update(db: Session, post_data: user.UserBase, refresh_token: str) -> User:
    try:
        user_info = user_get_login_id(db, post_data)
        user_info.refresh_token = refresh_token
        db.commit()
        db.refresh(user_info)
        return user_info
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500,  detail={"result": "fail", "message": "서버에 문제가 발생했습니다"})


# 로그아웃
def log_out(db: Session, id: int) -> User:
    try:
        user_info = user_get_id(db, id)
        if user_info:
            user_info.refresh_token = ''
            db.commit()
            db.refresh(user_info)
        return user_info
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500,  detail={"result": "fail", "message": "서버에 문제가 발생했습니다"})