import axios from "axios";
import {checkNumber} from "../utils/stringCheck";

// 카테고리 추가 API
export const category_set = async (value) => {
  const {category, seq, level} = value;
  if (category === '') {
    return {"data": {"result": "fail", "message": '카테고리를 입력해 주세요.'}}
  }
  if (seq === '') {
    return {"data": {"result": "fail", "message": '순서를 입력해 주세요.'}}
  }
  if (!checkNumber(seq)) {
    return {"data": {"result": "fail", "message": '순서는 숫자만 입력해 주세요.'}}
  }
  if (seq < 1) {
    return {"data": {"result": "fail", "message": '순서를 1이상 입력해 주세요.'}}
  }
  if (level === '') {
    return {"data": {"result": "fail", "message": '레벨을 입력해 주세요.'}}
  }
  if (level < 1) {
    return {"data": {"result": "fail", "message": '레벨을 1이상 입력해 주세요.'}}
  }
  try {
    if (!value.id) {
      return await axios.post(`/api/category`, value)
    } else {
      return await axios.put(`/api/category`, value)
    }
  } catch (e) {
    if (e.response?.data?.detail) {
      return {"data": {"result": "fail", "message": e.response.data.detail.message}}
    } else {
      return {"data": {"result": "fail", "message": '에러가 발생 했습니다.'}}
    }
  }
}

// 카테고리 삭제 API
export const category_delete = async (list) => {
  try {
    return await axios.post(`/api/category/delete`, {
      delete_ids: list
    })
  } catch (e) {
    if (e.response?.data?.detail) {
      return {"data": {"result": "fail", "message": e.response.data.detail.message}}
    } else {
      return {"data": {"result": "fail", "message": '에러가 발생 했습니다.'}}
    }
  }
}

// 카테고리 하나 불러오기 API
export const category_get = async (id) => {
  try {
    return await axios.get(`/api/category?id=${id}`)
  } catch (e) {
    if (e.response?.data?.detail) {
      return {"data": {"result": "fail", "message": e.response.data.detail.message}}
    } else {
      return {"data": {"result": "fail", "message": '에러가 발생 했습니다.'}}
    }
  }
}

// 카테고리 수정 API
export const category_put = async (post_data) => {
  try {
    console.log(post_data)
  } catch (e) {
    if (e.response?.data?.detail) {
      return {"data": {"result": "fail", "message": e.response.data.detail.message}}
    } else {
      return {"data": {"result": "fail", "message": '에러가 발생 했습니다.'}}
    }
  }
}