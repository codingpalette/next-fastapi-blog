import axios from "axios";

export const category_set = async (value) => {
  console.log(value)
  const {category, seq, level} = value;
  if (category === '') {
    return {"data": {"result": "fail", "message": '카테고리를 입력해 주세요.'}}
  }
  if (seq === '') {
    return {"data": {"result": "fail", "message": '순서를 입력해 주세요.'}}
  }
  if (level === '') {
    return {"data": {"result": "fail", "message": '레벨을 입력해 주세요.'}}
  }
  try {
    return await axios.post(`/api/category`, value)
  } catch (e) {
    if (e.response?.data?.detail) {
      return {"data": {"result": "fail", "message": e.response.data.detail.message}}
    } else {
      return {"data": {"result": "fail", "message": '에러가 발생 했습니다.'}}
    }
  }
}