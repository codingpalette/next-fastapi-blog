from sqlalchemy import Column, String, Integer, DateTime, func, PickleType
from database.connection import Base

class Category(Base):
    __tablename__ = "category"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String(255), index=True, nullable=False)
    seq = Column(Integer)