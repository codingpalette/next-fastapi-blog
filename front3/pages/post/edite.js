import React, {useEffect, useState} from 'react'
import dynamic from "next/dynamic";
import {useForm, Controller} from "react-hook-form";
import Layout from "../../components/Layout";
import {Box, Button, Chip, MenuItem, TextField} from "@mui/material";
import 'suneditor/dist/css/suneditor.min.css';
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import {useRouter} from "next/router";
import Link from "next/link";
import Grid2 from '@mui/material/Unstable_Grid2';
import AlertBox from "../../components/base/AlertBox";
import LoadingButton from "@mui/lab/LoadingButton";
import {post_set} from "../../apis/post"; // Grid version 2



const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const Edite = () => {
  const router = useRouter()

  // 유저 정보 가져오기
  const { data: userData, error: userError, mutate: userMutate } = useSWR('/api/user/check', fetcher)

  // 카테고리 리스트 가져오기
  const {data: categoryList, mutate: categoryMutate} = useSWR('/api/category/list', fetcher)

  // 포스트 작성 폼 값
  const { control, handleSubmit, setValue, getValues, reset } = useForm({
    defaultValues: {
      title: '',
      category_id: '',
    }
  });
  const [content, setContent] = useState('')

  const [tagList, setTagList] = useState([])
  const [tagInput, setTagInput] = useState('')
  const onChangeTagInput = (e) => {
    // console.log(e)
    setTagInput(e.target.value)
  }
  /** 태그 추가하는 이벤트 */
  const tagCreate = (e) => {
    if (e.code === "Enter" || e.code === "Space") {
      if (tagList.find(v => v === tagInput)) {
        alertOpen('error', '이미 등록된 태그 입니다.')
      } else {
        setTagList([...tagList, tagInput])
        setTagInput('')
      }
    }
  }
  /** 태그 삭제하는 이벤트 */
  const tagDelete = (e) => {
    setTagList(tagList.filter(v => v !== e))
  }


  // 버튼 로딩 상태 값
  const [buttonLoading, setButtonLoading] = useState(false)
  // 포스트 작성 이벤트
  const onSubmit = async (value) => {
    setButtonLoading(true)
    const res = await post_set(value, content, tagList)
    if (res.data.result === "fail") {
      alertOpen('error', res.data.message)
      setButtonLoading(false)
      return
    } else {
      alertOpen('success', res.data.message)
      setButtonLoading(false)
      // await router.push(`/post/dev?category_id=${value.category_id}`)
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


  return(
    <>
      <Layout title="포스트" subTitle="작성">
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="title"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="제목"
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
          {categoryList && (
            <Controller
              name="category_id"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  label="카테고리"
                  size="small"
                  fullWidth
                  select
                  sx={{marginBottom: '1rem'}}
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  required
                >
                  {categoryList && categoryList.map(v => (
                    <MenuItem key={v.id} value={v.id}>
                      {v.category}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          )}
          <TextField
            label="태그 추가"
            fullWidth
            size="small"
            sx={{marginBottom: '1rem'}}
            variant="outlined"
            value={tagInput}
            onChange={onChangeTagInput}
            onKeyPress={tagCreate}
          />
        </Box>

        <Box sx={{marginBottom: '1rem', display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
          {tagList.map((v, i) => (
            <Chip key={v} label={v} variant="outlined" onDelete={() =>tagDelete(v)} />
          ))}
        </Box>

        <SunEditor
          lang="ko"
          setContents={content}
          onChange={setContent}

          setOptions={{
            buttonList: [
              ["undo", "redo"],
              ["font", "fontSize"],
              [
                "bold",
                "underline",
                "italic",
                "strike",
                "subscript",
                "superscript"
              ],
              ["fontColor", "hiliteColor"],
              ["align", "list", "lineHeight"],
              ["outdent", "indent"],
              ["table", "horizontalRule", "link", "image", "video"],
              ["preview", "print"],
              ["removeFormat"]
            ]
          }}
        />
        <Grid2 mt={2} xs display="flex" alignItems="center" justifyContent="space-between">
          <Link href='/post/dev' >
            <Button component="a">작성취소</Button>
          </Link>
          <Grid2 container spacing={2}>
            <Grid2>
              <Button color="info" variant="outlined">임시저장</Button>
            </Grid2>
            <Grid2>
              <LoadingButton
                type="submit"
                variant="contained"
                onClick={handleSubmit(onSubmit)}
                loading={buttonLoading}
              >
                작성
              </LoadingButton>
            </Grid2>
          </Grid2>
        </Grid2>
      </Layout>
      <AlertBox alertActive={alertActive} alertClose={alertClose} alertText={alertText} alertType={alertType} />
    </>
  )
}

export default Edite