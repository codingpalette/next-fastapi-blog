from fastapi import HTTPException
from sqlalchemy.orm import Session
from models.user import User
from schemas import user

# 유저 생성 함수
def user_set(db: Session, post_data: user.UserSet) -> User:
    try:
        db_obj = User(
            email=post_data.email,
            nickname=post_data.nickname,
            password=post_data.password
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500,  detail={"result": "fail", "message": "서버에 문제가 발생했습니다"})

# 이메일 체크 함수
def user_get_email(db: Session, email: user.UserBase) -> User:
    try:
        return db.query(User).filter(User.email == email).first()
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


def get_user_by_nickname(db: Session, req: user.UserNickname) -> User:
    return db.query(User).filter(User.nickname == req.nickname).first()

