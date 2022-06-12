from sqlalchemy.orm import Session
from models.user import User
from schemas import user

def get_user_by_nickname(db: Session, req: user.UserNickname) -> User:
    return db.query(User).filter(User.nickname == req.nickname).first()