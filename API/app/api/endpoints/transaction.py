import jwt
from dotenv import load_dotenv
from database import session, engine
import database_models

key = "asdsdgaagfwrhasethbesfhbfdedgsfhfdfgsarsadfsgdhfdgshbedhbserghbesyhxbfrthbtersdghbezadshbeadhb"
test = {
    "username" : "asd",
    "password" : "asd"
}

encoded = jwt.encode(test, key,algorithm="HS256")

print(encoded)

decoded = jwt.decode(encoded,key,algorithms="HS256")

print(decoded)




# def process_buy(accessToken: str, stockname: str, quantity: int):

    