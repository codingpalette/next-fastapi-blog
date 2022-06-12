from typing import Optional
from fastapi import FastAPI, Depends
from routes import user

from sqlalchemy.orm import Session
from database.connection import get_db, Base, engine
from config import conf
config = conf()

app = FastAPI()

def create_app():

    Base.metadata.create_all(bind=engine)
    docs = config['DOCS']
    app = FastAPI(docs_url="/docs" if docs == 'True' else None, redoc_url=None)

    origins = [
        'http://localhost:3000',
    ]

    @app.get("/")
    def read_root():
        return {"Hello": "World"}


    @app.get("/test")
    def read_root(db: Session = Depends(get_db)):
        print(db)
        return {"Hello": "World"}

    app.include_router(user.router, tags=["user"], prefix="/api")

    return app

app = create_app()


