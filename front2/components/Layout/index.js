import React from 'react'
import {LayoutBox} from "./styles";
import Header from "../Header";
import Footer from "../Footer";

const Layout = ({children}) => {
  return(
    <>
      <Header />
      <LayoutBox>
        {children}
      </LayoutBox>
      <Footer />
    </>
  )
}

export default Layout