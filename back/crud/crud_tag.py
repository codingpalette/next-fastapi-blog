from fastapi import HTTPException
from sqlalchemy.orm import Session
from models.post import Post
from models.tag import Tag
import schemas


# 태그 생성 함수
async def tag_set(db: Session, tag: str) -> Tag:
    try:
        db_obj = Tag(
            tag=tag
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj
    except Exception as e:
        # print(e)
        raise HTTPException(status_code=500, detail={"result": "fail", "message": "서버에 문제가 발생했습니다"})


# 태그 이름으로 찾는 함수
async def tag_get(db: Session, tag: str) -> Tag:
    try:
        return db.query(Tag).filter(Tag.tag == tag).first()
    except Exception as e:
        # print(e)
        raise HTTPException(status_code=500, detail={"result": "fail", "message": "서버에 문제가 발생했습니다"})
