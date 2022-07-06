import React from 'react'
import dynamic from "next/dynamic"
import MainContainer from "../../containers/MainContainer";
import PostContainer from "../../containers/PostContainer";
import Form from "../../components/base/Form";
import Input from "../../components/base/Input";

import ToastEditor from "../../components/toast/ToastEditor";


const PostWrite = () => {
  return(
    <>
      <MainContainer>
        <PostContainer>
          <Form>
            <Form.Item label="제목" name="title">
              <Input id="title" placeholder="제목" className="w-full"  />
            </Form.Item>
          </Form>
          <ToastEditor />
        </PostContainer>
      </MainContainer>
    </>
  )
}

export default PostWrite