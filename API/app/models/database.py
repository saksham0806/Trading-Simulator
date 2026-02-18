# docker exec -it postgres_db psql -U admin -d postgres


import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

DB_URL = os.getenv("DB_URL")
print(DB_URL)

engine = create_engine(DB_URL)
session = sessionmaker(autocommit=False, autoflush=False,bind=engine)