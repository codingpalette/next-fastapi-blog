import React, {useState} from 'react'
import {HeaderBox} from "./styles";
import SideBar from "../SideBar";
import Button from "../Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

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

  return(
    <>
      <HeaderBox className="w-full p-4 flex">
        <Button
          icon={<FontAwesomeIcon icon={faBars} />}
          onClick={sideBarOpen}
          aria-label="사이드바 열기 버튼"
          className="ml-auto"
        >
          MENU
        </Button>
      </HeaderBox>
      <SideBar active={sideBarActive} closeEvent={sideBarClose} />
    </>
  )
}

export default Header