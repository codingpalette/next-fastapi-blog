import React from 'react'
import Header from "../../components/base/Header";
import {ContentBox, Pattern} from "./styles";


interface MainContainerProps {
  children: React.ReactNode;
};


const MainContainer = ({children}: MainContainerProps) => {
  return(
    <>
      <div className="w-full h-full">
        <Header />
        <Pattern className="pattern">
          <div className="container">
            <div className="pattern-inner"></div>
          </div>
        </Pattern>
        <ContentBox className="p-4">
          {children}
        </ContentBox>
      </div>
    </>
  )
}

export default MainContainer