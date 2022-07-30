import React from 'react'
import Layout from "../../components/Layout";
import {Button} from "@mui/material";
import Link from "next/link";
import styled from "@emotion/styled";

const Post = () => {
  return(
    <>
      <Layout title="포스트">
        <TopHeader>
          <Link href="/post/edite">
            <Button variant="outlined" component="a">포스트 작성</Button>
          </Link>
        </TopHeader>
      </Layout>
    </>
  )
}

const TopHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`

export default Post