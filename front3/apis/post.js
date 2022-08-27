import axios from "axios";

export const post_set = async (value, content, tagList) => {
  const {title, category_id} = value;
  if (title === '') {
    return {"data": {"result": "fail", "message": '제목을 입력해 주세요.'}}
  }
  if (category_id === '') {
    return {"data": {"result": "fail", "message": '카테고리를 선택해 주세요.'}}
  }
  const data = {
    ...value,
    content,
    tag_list: tagList
  }
  console.log(data)
  try {
    return await axios.post('/api/post', data)
  } catch (e) {
    if (e.response?.data?.detail) {
      return {"data": {"result": "fail", "message": e.response.data.detail.message}}
    } else {
      return {"data": {"result": "fail", "message": '에러가 발생 했습니다.'}}
    }
  }
}