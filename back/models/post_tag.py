from sqlalchemy import Column, String, Integer, DateTime, func, PickleType, ForeignKey
from database.connection import Base
from sqlalchemy.orm import relationship

class PostTag(Base):
    __tablename__ = "post_tag"

    id = Column(Integer, primary_key=True, index=True)
    tag_id = Column(Integer, ForeignKey("tag.id",  ondelete='CASCADE'), nullable=False)
    post_id = Column(Integer, ForeignKey("post.id", ondelete='CASCADE'), nullable=False)
    created_at = Column(DateTime(6), default=func.utc_timestamp(), nullable=False)
    updated_at = Column(DateTime(6), default=func.utc_timestamp(), onupdate=func.utc_timestamp(), nullable=False)
    deleted_at = Column(DateTime(6))

    tag = relationship("Tag", back_populates="post_tag")
    post = relationship("Post", back_populates="post_tag")
