import React from 'react'
import Header from "../../components/base/Header";
import {Pattern} from "./styles";
import {useQuery, useQueryClient} from "react-query";
import fetcher from "../../lib/fetcher";
import axios from "axios";

interface MainContainerProps {
  children: React.ReactNode;
};


const MainContainer = ({children}: MainContainerProps) => {
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
      <div className="w-full h-full">
        <Header />
        <Pattern className="pattern">
          <div className="container">
            <div className="pattern-inner"></div>
          </div>
        </Pattern>
        <div>
          {children}
        </div>

      </div>
    </>
  )
}

export default MainContainer