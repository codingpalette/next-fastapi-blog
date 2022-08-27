from sqlalchemy import Column, String, Integer, DateTime, func, PickleType, ForeignKey
from database.connection import Base
from sqlalchemy.orm import relationship

class Post(Base):
    __tablename__ = "post"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id", ondelete='CASCADE'), nullable=False)
    category_id = Column(Integer, ForeignKey("category.id"))
    title = Column(String(255), index=True, nullable=False)
    tag_list = Column(PickleType)
    content = Column(PickleType)
    created_at = Column(DateTime(6), default=func.utc_timestamp(), nullable=False)
    updated_at = Column(DateTime(6), default=func.utc_timestamp(), onupdate=func.utc_timestamp(), nullable=False)
    deleted_at = Column(DateTime(6))

    category = relationship("Category", back_populates="post")
    user = relationship("User", back_populates="post")