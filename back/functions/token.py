from config import conf
from dotmap import DotMap
import datetime
import jwt
config = conf()


# 토큰 생성 함수
def create_token(type, user_info):
    key = config['TOKEN_KEY']
    alg = 'HS256'
    # days->날짜 hours->시간, minutes->분, seconds->초
    payload = {
        "id": user_info.id,
        "login_id": user_info.login_id,
        "nickname": user_info.nickname,
        "level": user_info.level,
    }
    if type == "access_token":
        payload["exp"] = datetime.datetime.utcnow() + datetime.timedelta(days=1)
    else:
        payload["exp"] = datetime.datetime.utcnow() + datetime.timedelta(days=14)

    return jwt.encode(payload=payload, key=key, algorithm=alg)


# 엑세스 토큰 체크
async def access_token_check(access_token):
    try:
        key = config['TOKEN_KEY']
        decode = jwt.decode(access_token, key, algorithms=['HS256'])
        return decode
    except Exception as e:
        # print(e)
        return False


# 토큰 체크
async def token_check(access_token, refresh_token):
    try:
        key = config['TOKEN_KEY']
        # access_token 으로 검사를 하고 맞으면 통과 기간이 지났으면 refresh_token 으로 검사를 해준다.
        jwt.decode(access_token, key, algorithms=['HS256'])
        return access_token
    except jwt.ExpiredSignatureError:
        # refresh_token 으로 실제 디비에 refresh_token의 유저를 가져온다
        try:
            key = config['TOKEN_KEY']
            # refresh_token 을 검사 하고 기간이 지나면 실패한다
            # 성공일 경우 새로운 access_token 을 발급해 준다.
            # print('갱신 시작')
            decode = jwt.decode(refresh_token, key, algorithms=['HS256'])
            # print(decode)
            user_info = DotMap()
            user_info.id = decode["id"]
            user_info.login_id = decode["login_id"]
            user_info.nickname = decode["nickname"]
            user_info.level = decode["level"]
            return create_token('access_token', user_info)
        except jwt.ExpiredSignatureError:
            return False
