import React from 'react'
import {Box, Container, Divider} from "@mui/material";

const Footer = () => {
  return(
    <>
      <Box>
        <Divider />
        <Container sx={{padding: '1rem'}}>
          <p style={{fontSize: '12px'}}>
            Copyright © 2022- CodingPalette. All right reserved.
          </p>
        </Container>
      </Box>
    </>
  )
}

export default Footer