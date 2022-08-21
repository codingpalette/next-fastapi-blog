import React, {useEffect, useState} from 'react'
import dynamic from "next/dynamic";
import {useForm, Controller} from "react-hook-form";
import Layout from "../../../components/Layout";
import {Box, MenuItem, TextField} from "@mui/material";
import {login} from "../../../apis/user";

import 'suneditor/dist/css/suneditor.min.css';
import useSWR from "swr";
import fetcher from "../../../utils/fetcher";
import {useRouter} from "next/router";




const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const Edite = () => {
  const router = useRouter()

  const [content, setContent] = useState('')

  // 카테고리 리스트 가져오기
  const {data: categoryList, mutate: categoryMutate} = useSWR('/api/category/list', fetcher)

  // 포스트 작성 폼 값
  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      login_id: '',
      category_id: '',
    }
  });


  // 로그인 이벤트
  const onSubmit = async (value) => {
    console.log(value)
  }

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
            name="login_id"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="아이디"
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
      </Layout>
    </>
  )
}

export default Edite