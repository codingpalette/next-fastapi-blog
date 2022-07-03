import React, {useEffect} from 'react'
import MainContainer from "../../containers/MainContainer";
import PostHeader from "../../components/post/PostHeader";
import {useQuery, useQueryClient} from "react-query";
import {IUser} from "../../types/db";
import fetcher from "../../lib/fetcher";
import {GetServerSideProps} from "next";

const Post = () => {
  const queryClient = useQueryClient()

  const {data: userData} = useQuery<IUser | undefined>("user_check", () => fetcher("/api/user/check"))

  return(
    <>
      <MainContainer>
        {userData && userData.level >= 10 && <PostHeader />}
      </MainContainer>
    </>
  )
}

export default Post