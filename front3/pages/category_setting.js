import React, {useEffect, useState} from 'react'
import Layout from "../components/Layout";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import useSWR from "swr";
import fetcher from "../utils/fetcher";
import {useRouter} from "next/router";

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
  // 로그인 이벤트
  const onSubmit = async (value) => {
    setButtonLoading(true)

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
        >
          <Grid item>
            <Button variant="contained" onClick={editeModalOpen}>추가</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="error">삭제</Button>
          </Grid>
        </Grid>

        <Dialog
          open={editeModalActive}
          onClose={editeModalClose}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle>카테고리 추가</DialogTitle>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <DialogContent>
              <div >
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
    </>
  )
}

export default Category_setting;