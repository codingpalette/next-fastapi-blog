import React, {useEffect, useState} from 'react'
import {faBars, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {SubmitHandler, useForm} from "react-hook-form";
import {useQueryClient} from "react-query";
import {HeaderBox} from "./styles";
import SideBar from "../SideBar";
import Button from "../Button";
import Modal from "../Modal";
import Input from "../Input";
import Form from "../Form";
import axios from "axios";
import {IUser, UserBase} from "../../../types/db";


const Header = () => {
  const queryClient = useQueryClient()

  const userData: IUser | undefined = queryClient.getQueryData('user_check')
  
  const { register, formState: { errors }, setValue, handleSubmit } = useForm<UserBase>();

  // 사이드바 상태 값
  const [sideBarActive, setSideBarActive] = useState(false)
  // 사이드바 열기 이벤트
  const sideBarOpen = () => {
    setSideBarActive(true)
  }
  // 사이드바 닫기 이벤트
  const sideBarClose = () => {
    setSideBarActive(false)
  }

  // 인증 모달 상태 값
  const [authModalActive, setAuthModalActive] = useState(false)
  // 인증 모달 열기 이벤트
  const authModalOpen = () => {
    setAuthModalActive(true)
  }
  // 인증 모달 닫기 이벤트
  const authModalClose = () => {
    setAuthModalActive(false)
    authFormReset()
  }
  // 인증 폼 리셋 이벤트
  const authFormReset = () => {
    setValue('email', '')
    setValue('password', '')
    setValue('nickname', '')
  }
  // 로그인, 회원가입 모드 값
  const [authMode, setAuthMode] = useState('login')
  // 모드 변경 이벤트
  const authModeChange = () => {
    setAuthMode(authMode === 'login' ? 'create' : 'login')
  }
  // 로그인, 회원가입 이벤트
  const onSubmit : SubmitHandler<UserBase> = async (data) => {
    const { email, password, nickname } = data
    try {
      let res: any = ''
      if (authMode === 'login') {
        res = await axios.post('/api/user/login', {
          email,
          password
        })
      } else {
        res = await axios.post('/api/user', {
          email,
          password,
          nickname
        })
      }
      if (res.data.result === 'success') {
        await queryClient.invalidateQueries('user_check')
        alert(res.data.message)
      }
    } catch (e: any) {
      // console.error(e)
      if (e.response.data.detail) {
        alert(e.response.data.detail.message)
      } else {
        alert('에러가 발생 했습니다.')
      }
    } finally {
      authFormReset()
    }
  };

  // 로그아웃 이벤트
  const logOut = async () => {
    try {
      const res = await axios.post('/api/user/logout')
      if (res.data.result === "success") {
        await queryClient.invalidateQueries('user_check')
        alert(res.data.message)
      }
    } catch (e: any) {
      if (e.response.data.detail) {
        alert(e.response.data.detail.message)
      } else {
        alert('에러가 발생 했습니다.')
      }
    }
  }

  return(
    <>
      <HeaderBox className="w-full p-4 flex gap-x-4">
        <Button
          icon={<FontAwesomeIcon icon={faBars} />}
          onClick={sideBarOpen}
          aria-label="사이드바 열기 버튼"
          className="ml-auto"
        >
          MENU
        </Button>
        <Button
          icon={<FontAwesomeIcon icon={faUser} />}
          onClick={authModalOpen}
        >
          USER
        </Button>
      </HeaderBox>
      <SideBar active={sideBarActive} closeEvent={sideBarClose} />
      <Modal
        active={authModalActive}
        closeEvent={authModalClose}
        title="유저"
        footer={[
          <Button key="back" onClick={authModalClose}>
            닫기
          </Button>,
          <Button key="submit" onClick={userData ? logOut : handleSubmit(onSubmit)} >
            {userData ? '로그아웃' : authMode === 'login' ? '로그인' : '회원가입'}
          </Button>,
        ]}
      >
        <div>
          {userData ? (
            <>
              <div>
                {userData.nickname} 님 환영합니다.
              </div>
            </>
          ) : (
            <>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Item label="이메일" name="email">
                  <Input id="email" placeholder="이메일" register={{...register("email", { required: true })}}  />
                </Form.Item>
                <Form.Item label="비밀번호" name="password">
                  <Input id="password" placeholder="비밀번호" type="password" register={{...register("password", { required: true })}}  />
                </Form.Item>
                {authMode === 'create' && (
                  <Form.Item label="닉네임" name="nickname">
                    <Input id="nickname" placeholder="닉네임" register={{...register("nickname", { required: true })}}  />
                  </Form.Item>
                )}
              </Form>
              <div className="flex justify-end">
                <Button onClick={authModeChange}>{authMode === 'login' ? '회원가입 하기' : '로그인 하기'}</Button>
              </div>
            </>
          )}

        </div>
      </Modal>
    </>
  )
}

export default Header