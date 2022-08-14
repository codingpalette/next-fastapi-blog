from fastapi import HTTPException
from sqlalchemy.orm import Session
from models.category import Category
import schemas


async def category_set(db: Session, post_data: schemas.CategorySet) -> Category:
    try:
        db_obj = Category(
            category=post_data.category,
            seq=post_data.seq,
            level=post_data.level
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail={"result": "fail", "message": "서버에 문제가 발생했습니다"})
