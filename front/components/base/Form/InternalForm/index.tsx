import React from 'react'
import {FormBox} from "./styles";



interface InternalFormProps {
  children?: React.ReactNode;
  onSubmit?: (e?: React.FormEvent<HTMLFormElement>) => void;
  // className?: string;
  // icon?: React.ReactNode;
  // onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  // shape: 'default' | 'icon'
};


const InternalForm = ({children, onSubmit}: InternalFormProps) => {
  return(
    <>
      <FormBox onSubmit={onSubmit}>
        {children}
      </FormBox>
    </>
  )
}

export default InternalForm