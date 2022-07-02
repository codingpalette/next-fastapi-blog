import type {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
import {useEffect} from "react";
import MainContainer from "../containers/MainContainer";
import axios from "axios";
import fetcher from "../lib/fetcher";
import {useQuery} from "react-query";

const Home: NextPage = ({data}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  // const {isLoading: userCheckIsLoading} = useQuery('user_check', () => fetcher('/api/user/check'), {
  //   onSuccess: (e) => {
  //     console.log(e)
  //   },
  //   onError: (e) => {
  //     // navigate("/login")
  //   },
  // })

  return (
    <>
      <MainContainer>
        home
      </MainContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.common.Cookies = '';
  // 쿠키가 브라우저에 있는경우만 넣어서 실행
  // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
  if (context.req && cookie) {
    axios.defaults.headers.common.Cookies = cookie;
  }
  // const userData = await fetcher(`/api/user/check`);

  return {props: {data: {
    user: 'aaaa'
  }}}
}

export default Home
