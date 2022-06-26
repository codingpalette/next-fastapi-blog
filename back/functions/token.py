from fastapi import HTTPException
import datetime
import jwt
from config import conf
config = conf()

# 토큰 생성 함수
def create_token(type, user_info):
    key = config['TOKEN_KEY']
    alg = 'HS256'
    # days->날짜 hours->시간, minutes->분, seconds->초
    if type == "access_token":
        payload = {
            "id": user_info.id,
            "email": user_info.email,
            "nickname": user_info.nickname,
            "level": user_info.level,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
        }
    else:
        payload = {'exp': datetime.datetime.utcnow() + datetime.timedelta(days=14)}

    return jwt.encode(payload=payload, key=key, algorithm=alg)