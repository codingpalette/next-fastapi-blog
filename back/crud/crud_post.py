from fastapi import HTTPException
from sqlalchemy.orm import Session
from models.post import Post
from schemas import post


# 포스트 생성 함수
def post_set(db: Session, post_data: post.BaseModel) -> Post:
    try:
        db_obj = Post(
            title=post_data.title,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj
    except Exception as e:
        # print(e)
        raise HTTPException(status_code=500,  detail={"result": "fail", "message": "서버에 문제가 발생했습니다"})