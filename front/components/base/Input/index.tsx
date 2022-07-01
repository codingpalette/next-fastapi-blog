import React from 'react'
import {InputBox} from "./styles";

interface InputProps {
  type: string
  placeholder?: string
  className?: string
  maxLength?: number
  style?: React.CSSProperties
  defaultValue?: string
  register?: any
  id?: string
};


const Input = ({type, placeholder, className, maxLength, style, defaultValue, register, id} : InputProps) => {
  return(
    <>
      <InputBox
        type={type}
        placeholder={placeholder}
        className={`${className} px-3 py-1`}
        maxLength={maxLength}
        style={style}
        defaultValue={defaultValue}
        id={id}
        {...register}
      />
    </>
  )
}

Input.defaultProps = {
  type: 'text',
  className: '',
};


export default Input