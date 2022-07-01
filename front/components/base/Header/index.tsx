import React, {useState} from 'react'
import {HeaderBox} from "./styles";
import SideBar from "../SideBar";
import Button from "../Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faUser} from "@fortawesome/free-solid-svg-icons";
import {SubmitHandler, useForm} from "react-hook-form";
import Modal from "../Modal";
import Input from "../Input";
import Form from "../Form";
import axios from "axios";

type Inputs = {
  email: string
  password: string
  nickname: string
};

const Header = () => {
  const { register, formState: { errors }, setValue, handleSubmit } = useForm<Inputs>();

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
  }

  const onSubmit : SubmitHandler<Inputs> = async (data) => {
    const { email, password, nickname } = data
    try {
      const res = await axios.post('/api/user', {
        email,
        password,
        nickname
      })
      console.log(res)
    } catch (e) {
      console.error(e)
    }
  };

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
          <Button key="submit" onClick={handleSubmit(onSubmit)} >
            확인
          </Button>,
        ]}
      >
        <div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Item label="이메일" name="email">
              <Input id="email" placeholder="이메일" register={{...register("email", { required: true })}}  />
            </Form.Item>
            <Form.Item label="비밀번호" name="password">
              <Input id="password" placeholder="비밀번호" type="password" register={{...register("password", { required: true })}}  />
            </Form.Item>
            <Form.Item label="닉네임" name="nickname">
              <Input id="nickname" placeholder="닉네임" register={{...register("nickname", { required: true })}}  />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  )
}

export default Header