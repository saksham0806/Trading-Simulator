import uuid
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, Float, String, DATE
from sqlalchemy.dialects.postgresql import UUID, ARRAY

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
    curr_prices = Column(Float)
    max_prices_24 = Column(Float)
    min_prices_24 = Column(Float)
    max_prices_1 = Column(Float)
    min_prices_1 = Column(Float)
    prices = Column(ARRAY(Float))
    times = Column(ARRAY(Float))

class transactions(Base):
    __tablename__ = "transactions"
    transaction_id = Column(UUID(as_uuid=True),primary_key=True,default=uuid.uuid4)
    uuid = Column(UUID(as_uuid=True))
    symbol = Column(String)
    quantity = Column(Integer)
    action = Column(String)
    transaction_date = Column(DATE)

class holdings(Base):
    __tablename__ = "holdings"
    uuid = Column(UUID(as_uuid=True))
    symbol = Column(String)
    quantity = Column(Integer)

    



