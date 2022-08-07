from typing import Optional
from fastapi import FastAPI, Depends
from routes import user, post, category
from fastapi.middleware.cors import CORSMiddleware
from middlewares.auth_check import access_control
from starlette.middleware.base import BaseHTTPMiddleware
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

    # app.add_middleware(middleware_class=BaseHTTPMiddleware, dispatch=access_control)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.get("/")
    def read_root():
        return {"Hello": "World"}

    @app.get("/test")
    def read_root(db: Session = Depends(get_db)):
        print(db)
        return {"Hello": "World"}

    app.include_router(user.router, tags=["유저"], prefix="/api")
    app.include_router(post.router, tags=["포스트"], prefix="/api")
    app.include_router(category.router, tags=["카테고리"], prefix="/api")

    return app


app = create_app()
