import React from 'react'
import Layout from "../../components/Layout";
// import {TopHeader} from "./styles";
import {Button} from "@mui/material";
import Link from "next/link";

const Post = () => {
  return(
    <>
      <Layout>
        <Link href="/post/edite">
          <Button variant="outlined" component="a">포스트 작성</Button>
        </Link>
        {/*<TopHeader>*/}
        {/* */}
        {/*</TopHeader>*/}
      </Layout>
    </>
  )
}

export default Post