from fastapi import HTTPException
from functions import token


# 유저 검증 함수
async def login_info_get(request):
    cookies = request.cookies
    access_token = cookies.get("access_token")
    if not access_token:
        return False

    login_info = await token.access_token_check(access_token)

    if not login_info:
        return False

    return login_info


# 유저 권한 체크
async def user_authority_check(login_info, level):
    if login_info['level'] < level:
        raise HTTPException(status_code=401, detail={"result": "fail", "message": "권한이 없습니다."})
    return True