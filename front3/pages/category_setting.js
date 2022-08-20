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
import EditeModal from "../components/categorySetting/EditeModal";
import DeleteModal from "../components/categorySetting/DeleteModal";
import {useRecoilState} from "recoil";
import {singleCategory} from "../stores/categoryState";

const Category_setting = () => {
  const router = useRouter()

  // 유저 정보 가져오기
  const { data: userData, error: userError, mutate: userMutate } = useSWR('/api/user/check', fetcher)

  // 카테고리 상세 데이터 값
  const [useSingleCategory, setUseSingleCategory] = useRecoilState(singleCategory)

  // 카테고리 추가 모달 상태 값
  const [editeModalActive, setEditeModalActive] = useState(false)
  // 카테고리 추가 모달 열기 이벤트
  const editeModalOpen = () => {
    setEditeModalActive(true)
  }
  // 카테고리 추가 모달 닫기 이벤트
  const editeModalClose = () => {
    setEditeModalActive(false)
    setUseSingleCategory(null)
  }


  // 체크박스 리스트 값
  const [selected, setSelected] = useState([]);

  // 삭제 모달 생태 값
  const [deleteModalActive, setDeleteModalActive] = useState(false)
  // 삭제 모달 열기 이벤트
  const deleteModalOpen = () => {
    if (selected.length === 0) {
      alertOpen('error', "삭제할 리스트를 선택해 주세요.")
      return
    }
    setDeleteModalActive(true)
  }
  // 삭제 모달 닫기 이벤트
  const deleteModalClose = () => {
    setDeleteModalActive(false)
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
            <Button variant="contained" color="error" onClick={deleteModalOpen}>삭제</Button>
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
            <ListTable selected={selected} setSelected={setSelected} editeModalOpen={editeModalOpen} />
          </Suspense>
        </ErrorBoundary>
      </Layout>

      <EditeModal modalActive={editeModalActive} modalClose={editeModalClose}  />

      <DeleteModal modalActive={deleteModalActive} modalClose={deleteModalClose} checkList={selected} />

      <AlertBox alertActive={alertActive} alertClose={alertClose} alertText={alertText} alertType={alertType} />
    </>
  )
}

export default Category_setting;