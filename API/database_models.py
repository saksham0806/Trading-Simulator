import uuid
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, Float, String, DATE, ForeignKey, CheckConstraint, Index
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from sqlalchemy.orm import relationship

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    uuid = Column(UUID(as_uuid=True),primary_key=True,default=uuid.uuid4)
    username = Column(String,unique=True, index=True)
    password = Column(String, nullable=False)
    balance = Column(Integer,default=0)

    __table_args__ = (
        CheckConstraint("balance > 0", name="balance_positive"),
    )

    transactions = relationship(
        "Transactions",
        back_populates="user",
        cascade="all, delete-orphan"
    )
    holdings = relationship(
        "Holdings",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    

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

class Transactions(Base):
    __tablename__ = "transactions"
    transaction_id = Column(UUID(as_uuid=True),primary_key=True,default=uuid.uuid4)
    user_uuid = Column(UUID(as_uuid=True), ForeignKey("users.uuid",ondelete="CASCADE"), nullable=False)
    symbol = Column(String)
    quantity = Column(Integer)
    action = Column(String)
    transaction_date = Column(DATE)

    user = relationship("User", back_populates="transactions")

    __table_args__ = (
        CheckConstraint("quantity > 0", name="quantity_positive"),
        CheckConstraint("action IN ('BUY', 'SELL')", name="check_valid_action"),
    )

    

class Holdings(Base):
    __tablename__ = "holdings"
    holdings_id = Column(UUID(as_uuid=True),primary_key=True,default=uuid.uuid4)
    user_uuid = Column(UUID(as_uuid=True),ForeignKey("users.uuid",ondelete="CASCADE"),nullable=False)
    symbol = Column(String)
    quantity = Column(Integer)


    user = relationship("User", back_populates="holdings")

    __table_args__ = (
        CheckConstraint("quantity >= 0", name="check_holdings_non_negative"),
    )


