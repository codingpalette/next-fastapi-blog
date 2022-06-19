import React, {useState} from 'react'
import {HeaderBox} from "./styles";
import SideBar from "../SideBar";

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
      <HeaderBox className="w-full px-4 flex">
        <button onClick={sideBarOpen} type="button" aria-label="사이드바 열기 버튼">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </HeaderBox>
      <SideBar active={sideBarActive} closeEvent={sideBarClose} />
    </>
  )
}

export default Header