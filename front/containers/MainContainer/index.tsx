import React from 'react'
import Header from "../../components/base/Header";

interface MainContainerProps {
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