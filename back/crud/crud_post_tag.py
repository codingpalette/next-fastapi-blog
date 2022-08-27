from fastapi import HTTPException
from sqlalchemy.orm import Session
from models.tag import Tag
from models.post_tag import PostTag
import schemas


# 포스트-태그 생성 함수
async def post_tag_set(db: Session, tag_id: int, post_id: int) -> PostTag:
    try:
        db_obj = PostTag(
            tag_id=tag_id,
            post_id=post_id
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail={"result": "fail", "message": "서버에 문제가 발생했습니다"})
