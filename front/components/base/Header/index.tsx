import React, {useState} from 'react'
import {HeaderBox} from "./styles";
import SideBar from "../SideBar";
import Button from "../Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faUser} from "@fortawesome/free-solid-svg-icons";
import Modal from "../Modal";

const Header = () => {

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
      >
        <div>sdfsd</div>
      </Modal>
    </>
  )
}

export default Header