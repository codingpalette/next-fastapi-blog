import React, {useState} from 'react'
import dynamic from "next/dynamic";
import {useForm, Controller} from "react-hook-form";
import Layout from "../../../components/Layout";
import {Box, TextField} from "@mui/material";
import {login} from "../../../apis/user";

import 'suneditor/dist/css/suneditor.min.css';




const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const Edite = () => {
  const [content, setContent] = useState('')

  // 로그인 폼 값
  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      login_id: '',
      nickname: '',
      password: '',
      password_check: ''
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