import React, {useState} from 'react'
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {category_delete} from "../../../apis/category";
import {useSWRConfig} from "swr";
import AlertBox from "../../base/AlertBox";

const DeleteModal = ({modalActive, modalClose, checkList}) => {
  const { mutate } = useSWRConfig()

  // 버튼 로딩 상태 값
  const [buttonLoading, setButtonLoading] = useState(false)

  const deleteEvent = async () => {
    setButtonLoading(true)
    const res = await category_delete(checkList)
    if (res.data.result === "fail") {
      alertOpen('error', res.data.message)
      setButtonLoading(false)
      return
    } else {
      alertOpen('success', res.data.message)
      setButtonLoading(false)
      await mutate("/api/category/list")
      modalClose()
    }
  }

  // 경고창 상태 값
  const [alertActive, setAlertActive] = useState(false)
  // 경고창 텍스트
  const [alertText, setAlertText] = useState('')
  // 경고창 종류
  const [alertType, setAlertType] = useState('success')
  // 경고창 열기 이벤트
  const alertOpen = (type, text) => {
    setAlertType(type)
    setAlertText(text)
    setAlertActive(true)
  }
  // 경고창 닫기 이벤트
  const alertClose = () => {
    setAlertActive(false)
  }

  return(
    <>
      <Dialog
        open={modalActive}
        onClose={modalClose}
        fullWidth
        maxWidth="xs"
      >
        <Box
          component="div"
          noValidate
        >
          <DialogTitle>카테고리 삭제</DialogTitle>
          <DialogContent>
            <p>삭제된 자료는 복구가 불가능 합니다.</p>
            <p>정말로 삭제 하시겠습니까?</p>
          </DialogContent>
          <DialogActions>
            <Button key="back" size="small" variant="outlined" onClick={modalClose}>닫기</Button>
            <LoadingButton
              key="submit"
              size="small"
              variant="contained"
              color="error"
              onClick={deleteEvent}
              loading={buttonLoading}
            >
              삭제
            </LoadingButton>
          </DialogActions>
        </Box>
      </Dialog>

      <AlertBox alertActive={alertActive} alertClose={alertClose} alertText={alertText} alertType={alertType} />
    </>
  )
}

export default DeleteModal