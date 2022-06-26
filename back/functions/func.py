from fastapi import HTTPException
from functions import token


async def login_info_get(request):
    login_info = await token.access_token_check(request.cookies['access_token'])

    if not login_info:
        raise HTTPException(status_code=401, detail={"result": "fail", "message": "로그인 정보가 없습니다."})

    return login_info
