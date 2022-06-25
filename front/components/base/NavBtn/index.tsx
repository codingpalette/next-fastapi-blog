import React from 'react'
import {NabBtnBox} from "./styles";

interface NavBtnProps {
  children?: React.ReactNode;
  className?: string;
  // icon?: React.ReactNode;
  // onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  // shape: 'default' | 'icon'
};

const NavBtn = ({children, className}: NavBtnProps) => {
  return(
    <>
      <NabBtnBox className={`${className} w-full p-2 flex items-center relative`}>
        <span className="square"></span>
        <div className="ml-2">
          {children}
        </div>
      </NabBtnBox>
    </>
  )
}

export default NavBtn