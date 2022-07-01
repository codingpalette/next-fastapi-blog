import React from 'react'
import {ItemBox} from "./styles";

interface FormItemProps {
  children?: React.ReactNode;
  label?: string
  name?: string
  // className?: string;
  // icon?: React.ReactNode;
  // onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  // shape: 'default' | 'icon'
};

const FormItem = ({children, label, name}: FormItemProps) => {
  return(
    <>
      <ItemBox className="mb-4">
        <div className="mb-2 flex items-center label_box">
          <span className="square"></span>
          <label className="ml-2" htmlFor={name}>{label}</label>
        </div>
        {children}
      </ItemBox>
    </>
  )
}

export default FormItem