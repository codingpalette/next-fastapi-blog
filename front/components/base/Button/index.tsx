import React from 'react'
import {ButtonBox} from "./styles";

export type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
};

const Button = ({children, className, icon}: ButtonProps) => {
  return(
    <>
      <ButtonBox type="button" className={`${className && className} px-1 py-2`} >
        {icon && <span>{icon}</span>}
        <span>
          {children}
        </span>
      </ButtonBox>
    </>
  )
}

export default Button