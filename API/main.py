from fastapi import FastAPI, Depends
from models import User
from database import session, engine
import database_models

# database_models.Base.metadata.create_all(bind=engine)

app = FastAPI()

users = [
    User(username = "Saksham",balance = 12312,password="asd"),
    User(username = "Singh",balance = 112,password="asd"),
    User(username = "John",balance = 11212,password="asd"),
    User(username = "Doe",balance = 543112,password="asd")
]

def connect_to_db():
    db = session()
    try:
        yield db
    finally:
        db.close()

@app.get("/getUserdetails/")
def getAllUsers(db: Session = Depends(connect_to_db)):
    users = db.query(database_models.User).all()
    return users

@app.get("/getUserdetails/{username}")
def get_user_details(username:str, db: Session = Depends(connect_to_db)):
    result = db.query(database_models.User).filter(database_models.User.username == username).first()
    return result

@app.post("/addUser")
def addUser(user:User):
    db = session()
    db.add(database_models.User(**user.model_dump()))
    users.append(user)
    db.commit()
    return "added"
