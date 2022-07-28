import axios from "axios";


export const login = async (value, mode) => {
  const {login_id, nickname, password, password_check} = value
  if (login_id === '') {
    return {"data": {"result": "fail", "message": "아이디를 입력해 주세요."}}
  }
  if (mode === 'join') {
    if (nickname === '') {
      return {"data": {"result": "fail", "message": "닉네임을 입력해 주세요."}}
    }
  }
  if (password === '') {
    return {"data": {"result": "fail", "message": "비밀번호를 입력해 주세요."}}
  }
  if (mode === 'join') {
    if (password_check === '') {
      return {"data": {"result": "fail", "message": "비밀번호 확인을 입력해 주세요."}}
    }
    if (password !== password_check) {
      return {"data": {"result": "fail", "message": "비밀번호가 서로 다릅니다."}}
    }
  }

  const data = {
    login_id,
    password
  }
  if (mode === 'join') {
    data.nickname = nickname
  }
  try {
    if (mode === 'login') {
      return await axios.post('/api/user/login', data)
    } else {
      return await axios.post('/api/user', data)
    }
  } catch (e) {
    if (e.response?.data?.detail) {
      return {"data": {"result": "fail", "message": e.response.data.detail.message}}
    } else {
      return {"data": {"result": "fail", "message": '에러가 발생 했습니다.'}}
    }
  }
}