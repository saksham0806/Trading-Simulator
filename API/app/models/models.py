from pydantic import BaseModel

class User(BaseModel):
    username: str
    balance: int
    password:str

    # def __init__(self, username: str, balance: int):
    #     self.username = username
    #     self.balance = balance