import React, {useEffect, useState} from 'react'
import Layout from "../../../components/Layout";
import {useRouter} from "next/router";
import useSWR, {SWRConfig} from "swr";
import fetcher from "../../../utils/fetcher";

const PostDev = ({fallback}) => {
  const router = useRouter()

  // 유저 정보 가져오기
  const { data: userData, error: userError, mutate: userMutate } = useSWR('/api/user/check', fetcher)

  // 카테고리 리스트 가져오기
  const {data: categoryList, mutate: categoryMutate} = useSWR('/api/category/list', fetcher, {
    initialData: null
  })

  const [level, setLevel] = useState(1)

  useEffect(() => {
   console.log("fallback", fallback["/api/category/list"])
  }, [fallback])

  useEffect(() => {
    console.log('userData', userData)
  }, [userData])

  useEffect(() => {
    console.log('categoryList', categoryList)
  }, [categoryList])

  useEffect(() => {
    console.log(router)
  }, [router])


  return(
    <>
      <SWRConfig value={{ fallback }}>
        <Layout>
          <div>
            sfdsf
          </div>
        </Layout>
      </SWRConfig>
    </>
  )
}

export async function getStaticProps () {
  // `getStaticProps` is executed on the server side.
  const categoryData = await fetcher('/api/category/list')
  return {
    props: {
      fallback: {
        '/api/category/list': categoryData
      }
    }
  }
}


export default PostDev