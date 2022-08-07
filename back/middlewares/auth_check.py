from starlette.requests import Request
from fastapi.responses import JSONResponse
from functions import func
import json


async def access_control(request: Request, call_next):
    print(2222)

    check = await level_check(request)

    return await call_next(request)


async def level_check(request):
    #권한 체크 시작
    url = request.url.path
    url_split = url.split("/")
    cookies = request.cookies
    access_token = cookies.get("access_token")
    login_info = await func.login_info_get(request)
    request_body = await request.body()
    if request_body:
        request_body = json.loads(request_body.decode("UTF-8"))

    print(request_body)


    return True