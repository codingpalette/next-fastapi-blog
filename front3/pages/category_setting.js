import React, {useEffect, useState, Suspense} from 'react'
import Layout from "../components/Layout";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField
} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import useSWR from "swr";
import fetcher from "../utils/fetcher";
import {useRouter} from "next/router";
import {category_set} from "../apis/category";
import AlertBox from "../components/base/AlertBox";
import ListTable from "../components/categorySetting/ListTable";
import ErrorBoundary from "../components/base/ErrorBoundary";
import ErrorResult from "../components/base/ErrorResult";

const Category_setting = () => {
  const router = useRouter()

  // 유저 정보 가져오기
  const { data: userData, error: userError, mutate: userMutate } = useSWR('/api/user/check', fetcher)

  // 카테고리 추가 모달 상태 값
  const [editeModalActive, setEditeModalActive] = useState(false)
  // 카테고리 추가 모달 열기 이벤트
  const editeModalOpen = () => {
    setEditeModalActive(true)
  }
  // 카테고리 추가 모달 닫기 이벤트
  const editeModalClose = () => {
    setEditeModalActive(false)
  }

  // 로그인 폼 값
  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      category: '',
      seq: '',
      level: '',
    }
  });

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
      editeModalClose()
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

  if (userError) {
    router.push("/")
  }
  if (!userData) return <div>loading...</div>
  if (userData && userData.level < 10) {
    router.push("/")
  }

  return(
    <>
      <Layout title="카테고리 설정">
        <Grid
          container
          // direction="row"
          // justifyContent="center"
          // alignItems="center"
          spacing={1}
          marginBottom={2}
        >
          <Grid item>
            <Button variant="contained" onClick={editeModalOpen}>추가</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="error">삭제</Button>
          </Grid>
        </Grid>

        <ErrorBoundary fallback={<ErrorResult />}>
          <Suspense
            fallback={
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
            }
          >
            <ListTable />
          </Suspense>
        </ErrorBoundary>

        <Dialog
          open={editeModalActive}
          onClose={editeModalClose}
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
              <Button key="back" size="small" variant="outlined" onClick={editeModalClose}>닫기</Button>
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
      </Layout>

      <AlertBox alertActive={alertActive} alertClose={alertClose} alertText={alertText} alertType={alertType} />
    </>
  )
}

export default Category_setting;