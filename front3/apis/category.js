import axios from "axios";
import {checkNumber} from "../utils/stringCheck";

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
    return await axios.post(`/api/category`, value)
  } catch (e) {
    if (e.response?.data?.detail) {
      return {"data": {"result": "fail", "message": e.response.data.detail.message}}
    } else {
      return {"data": {"result": "fail", "message": '에러가 발생 했습니다.'}}
    }
  }
}

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