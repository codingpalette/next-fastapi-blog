from fastapi import HTTPException
from sqlalchemy.orm import Session
from models.post import Post
import schemas
from typing import Optional


# 포스트 생성 함수
async def post_set(db: Session, post_data: schemas.PostSet) -> Post:
    try:
        db_obj = Post(
            user_id=post_data.user_id,
            category_id=post_data.category_id,
            title=post_data.title,
            tag_list=post_data.tag_list,
            content=post_data.content
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj
    except Exception as e:
        # print(e)
        raise HTTPException(status_code=500, detail={"result": "fail", "message": "서버에 문제가 발생했습니다"})


# 포스트 리스트 가져오기 함수
async def post_list_get(db: Session, page: int, category_id: Optional[int] = None) -> Post:
    try:
        add_filter = []
        if category_id:
            add_filter.append(Post.category_id == category_id)
        print(add_filter)
        return db.query(Post).filter(*add_filter).offset(page * 5).limit(5).all()
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail={"result": "fail", "message": "서버에 문제가 발생했습니다"})
