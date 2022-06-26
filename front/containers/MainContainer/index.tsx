import React from 'react'
import Header from "../../components/base/Header";
import {Pattern} from "./styles";

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
        <div>
          {children}
        </div>

      </div>
    </>
  )
}

export default MainContainer