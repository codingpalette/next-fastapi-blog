import React from 'react'
import Header from "../../components/base/Header";
import SideBar from "../../components/base/SideBar";

export type MainContainerProps = {
  /** 버튼 안의 내용 */
  children: React.ReactNode;
};


const MainContainer = ({children}: MainContainerProps) => {
  return(
    <>
      <div className="w-full h-full">
        <Header />
        <div>
          {children}
        </div>

      </div>
    </>
  )
}

export default MainContainer