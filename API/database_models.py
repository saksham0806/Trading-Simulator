import uuid
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, Float, String
from sqlalchemy.dialects.postgresql import UUID

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    uuid = Column(UUID(as_uuid=True),primary_key=True,default=uuid.uuid4)
    username = Column(String,unique=True, index=True)
    password = Column(String)
    balance = Column(Integer,default=0)
    

    # def __init__(self, username: str, balance: int):
    #     self.username = username
    #     self.balance = balance

class Stockprices(Base):
    __tablename__ = "stockprices"
    symbol = Column(String,unique=True,primary_key=True)
    max_prices = Column(Float)
    max_prices = Column(Float)
    max_prices = Column(Float)
    max_prices = Column(Float)
