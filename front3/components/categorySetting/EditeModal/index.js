import React, {useEffect, useState} from 'react'
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import {category_set} from "../../../apis/category";
import {useSWRConfig} from "swr";
import AlertBox from "../../base/AlertBox";

const EditeModal = ({modalActive, modalClose}) => {
  const { mutate } = useSWRConfig()


  // 로그인 폼 값
  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      category: '',
      seq: '',
      level: '',
    }
  });

  useEffect(() => {
    if (!modalActive) {
      reset()
    }
  }, [modalActive])


  // 버튼 로딩 상태 값
  const [buttonLoading, setButtonLoading] = useState(false)
  // 카테고리 추가 이벤트
  const onSubmit = async (value) => {
    // console.log('222')
    setButtonLoading(true)
    const res = await category_set(value)
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
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogTitle>카테고리 추가</DialogTitle>
          <DialogContent>
            <div style={{marginTop: '10px'}}>
              <Controller
                name="category"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    label="카테고리"
                    size="small"
                    fullWidth
                    sx={{marginBottom: '1rem'}}
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    required
                  />
                )}
              />
              <Controller
                name="seq"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    label="순번"
                    size="small"
                    type="number"
                    fullWidth
                    sx={{marginBottom: '1rem'}}
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    required
                  />
                )}
              />
              <Controller
                name="level"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    label="레벨"
                    size="small"
                    type="number"
                    fullWidth
                    sx={{marginBottom: '1rem'}}
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    required
                  />
                )}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button key="back" size="small" variant="outlined" onClick={modalClose}>닫기</Button>
            <LoadingButton
              key="submit"
              type="submit"
              size="small"
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              loading={buttonLoading}
            >
              추가
            </LoadingButton>
          </DialogActions>
        </Box>
      </Dialog>

      <AlertBox alertActive={alertActive} alertClose={alertClose} alertText={alertText} alertType={alertType} />
    </>
  )
}

export default EditeModal