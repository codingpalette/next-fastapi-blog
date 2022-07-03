import React, {useEffect} from 'react'
import {useQuery, useQueryClient} from "react-query";
import fetcher from "../lib/fetcher";
import axios from "axios";

interface SettingProps {
  children: React.ReactNode;
};


const Setting = ({children}: SettingProps) => {
  const queryClient = useQueryClient()

  const {
    isLoading: userLoading,
    isError: userIsError,
    data: userData,
    error: userError,
  } = useQuery("user_check", () => fetcher("/api/user/check"), {
    onSuccess: (data) => {
      if (data) {
        tokenRefresh()
      }
    },
    onError: (e) => {
      queryClient.setQueryData("user_check", undefined)
    },
  })

  const tokenRefresh = async () => {
    try {
      await fetcher(`/api/user/token/refresh`)
      onLoginSuccess()
    } catch (e) {
      await axios.post("/api/user/logout")
      queryClient.setQueryData("user_check", undefined)
    }
  }

  const onLoginSuccess = () => {
    const JWT_EXPIRY_TIME = 24 * 3600 * 1000 // 만료 시간 (24시간 밀리 초로 표현)
    setTimeout(() => {
      tokenRefresh()
    }, JWT_EXPIRY_TIME - 60000)
  }

  return(
    <>
      {children}
    </>
  )
}

export default Setting