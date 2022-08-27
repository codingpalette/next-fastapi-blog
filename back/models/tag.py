from sqlalchemy import Column, String, Integer, DateTime, func, PickleType, ForeignKey
from database.connection import Base
from sqlalchemy.orm import relationship

class Tag(Base):
    __tablename__ = "tag"

    id = Column(Integer, primary_key=True, index=True)
    tag = Column(String(255), unique=True, index=True, nullable=False)
    created_at = Column(DateTime(6), default=func.utc_timestamp(), nullable=False)
    updated_at = Column(DateTime(6), default=func.utc_timestamp(), onupdate=func.utc_timestamp(), nullable=False)
    deleted_at = Column(DateTime(6))

    post_tag = relationship("PostTag", back_populates="tag")