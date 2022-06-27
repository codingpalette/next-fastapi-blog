import React from 'react'

interface FormItemProps {
  children?: React.ReactNode;
  // className?: string;
  // icon?: React.ReactNode;
  // onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  // shape: 'default' | 'icon'
};

const FormItem = ({children}: FormItemProps) => {
  return(
    <>
      <div>
        {children}
      </div>
    </>
  )
}

export default FormItem