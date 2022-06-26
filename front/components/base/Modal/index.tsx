import React, {useEffect, useState} from 'react'
import {ModalContent} from "./styles";
import Button from "../Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
  title?: string
  children?: React.ReactNode;
  active: boolean;
  closeEvent?: (e?: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
  width: string;
  footer: any;
  // className?: string;
  // icon?: React.ReactNode;
  // onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  // shape: 'default' | 'icon'
};


const Modal = ({active, closeEvent, title, children, width, footer}: ModalProps) => {
  const [closed, setClosed] = useState(true);

  useEffect(() => {
    document.body.style.overflowY = active ? 'hidden' : 'initial';

    let timeoutId: any;
    if (active) {
      setClosed(false);
    } else {
      timeoutId = setTimeout(() => {
        setClosed(true);
      }, 200);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [active])

  useEffect(() => {
    return () => {
      document.body.style.overflowY = 'initial';
    };
  }, []);

  if (!active && closed) return null;

  return(
    <>
      <div className="fixed left-0 top-0 w-full h-full z-50">
        <div onClick={closeEvent} className="absolute left-0 top-0 w-full h-full bg-black bg-opacity-40 z-10" />
        <ModalContent className="absolute left-2/4 top-2/4 z-20" Width={width}>
          <div className="title_box px-4 py-3 flex items-center">
            <span className="square"></span>
            <span className="ml-3">{title}</span>
            <Button onClick={closeEvent} className="ml-auto" shape="icon" icon={<FontAwesomeIcon icon={faXmark} size="lg" />}  />
          </div>
          <div className="p-4">
            {children}
          </div>
          <div className="line"></div>
          <div className="footer p-4 flex justify-end gap-4">
            {footer.length === 0 ? (
              <>
                <Button onClick={closeEvent} >
                  닫기
                </Button>
              </>
            ) : (
              footer.map((v: any) => (
                v
              ))
            )}
          </div>
        </ModalContent>
      </div>
    </>
  )
}

Modal.defaultProps = {
  width: '520px',
  footer: []
};


export default Modal