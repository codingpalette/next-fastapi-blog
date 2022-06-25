import React from 'react'
import {ButtonBox} from "./styles";

export type ButtonProps = {
  children?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  shape: 'default' | 'icon'
};

const Button = ({children, className, icon, onClick, shape}: ButtonProps) => {
  return(
    <>
      <ButtonBox
        type="button"
        onClick={onClick}
        shape={shape}
        className={`${className} ${shape === 'icon' && 'justify-center'} px-3 py-2 flex text-sm items-center`}
      >
        {icon && <span className={`${shape === 'default' && 'mr-2'}`}>{icon}</span>}
        <span>
          {children}
        </span>
      </ButtonBox>
    </>
  )
}

Button.defaultProps = {
  className: '',
  shape: 'default'
};

export default Button