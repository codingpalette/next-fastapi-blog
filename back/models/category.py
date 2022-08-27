from sqlalchemy import Column, String, Integer, DateTime, func, PickleType
from database.connection import Base
from sqlalchemy.orm import relationship
class Category(Base):
    __tablename__ = "category"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String(255), index=True, nullable=False)
    seq = Column(Integer)
    level = Column(Integer)
    created_at = Column(DateTime(6), default=func.utc_timestamp(), nullable=False)
    updated_at = Column(DateTime(6), default=func.utc_timestamp(), onupdate=func.utc_timestamp(), nullable=False)

    post = relationship("Post", back_populates="category")

