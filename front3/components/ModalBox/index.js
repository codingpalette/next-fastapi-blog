import React from 'react'
import {Button, Card, Modal} from "@mui/material";
import {ModalContent} from "./styles";
import {useRecoilState} from "recoil";
import CloseIcon from '@mui/icons-material/Close';
import {themeState} from "../../stores/themeState";

const ModalBox = ({modalActive, modalClose, maxWidth = '450px', children, title, footer = []}) => {
  const [useTheme, setUseTheme] = useRecoilState(themeState)

  return(
    <>
      <Modal
        open={modalActive}
        onClose={modalClose}
      >
        <ModalContent maxWidth={maxWidth} useTheme={useTheme}>
          <Card sx={{ width: '100%' }}>
            <div className="modal_header">
              <div className="modal_title">
                {title}
              </div>
              <button type="button" className="modal_close_button" onClick={modalClose}>
                <span>
                  <CloseIcon />
                </span>
              </button>
            </div>
            <div className="modal_body">
              {children}
            </div>
            <div className="modal_footer">
              {footer.length === 0 ? (
                <>
                  <Button size="small" variant="outlined"  onClick={modalClose} >
                    닫기
                  </Button>
                </>
              ) : (
                footer.map((v) => (
                  v
                ))
              )}
            </div>

          </Card>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalBox