import React from 'react'
import {Card, Modal} from "@mui/material";
import {ModalContent} from "./styles";
import {useRecoilState} from "recoil";
import {themeState} from "../../stores/themeState";

const ModalBox = ({modalActive, modalClose, maxWidth = '450px'}) => {
  const [useTheme, setUseTheme] = useRecoilState(themeState)

  return(
    <>
      <Modal
        open={modalActive}
        onClose={modalClose}
      >
        <ModalContent maxWidth={maxWidth}>
          <Card sx={{ width: '100%', padding: '1rem' }}>
            sdfdsfds
          </Card>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalBox