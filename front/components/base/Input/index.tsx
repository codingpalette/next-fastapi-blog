import React from 'react'
import {InputBox} from "./styles";

interface InputProps {
  type: string
  placeholder?: string
  className?: string;
  maxLength?: number
  style?: React.CSSProperties;
};


const Input = ({type, placeholder, className, maxLength, style} : InputProps) => {
  return(
    <>
      <InputBox
        type={type}
        placeholder={placeholder}
        className={`${className} px-3 py-1`}
        maxLength={maxLength}
        style={style}
      />
    </>
  )
}

Input.defaultProps = {
  type: 'text',
  className: '',
};


export default Input