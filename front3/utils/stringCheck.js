

// 숫자 체크
export const checkNumber = (str) => {
  const regExp= /^[0-9]/g
  return regExp.test(str)
}