import styled from '@emotion/styled'
import {palette} from "../../../lib/globalStyles";
import {css} from "@emotion/react";
import transitions from "../../../lib/transitions";

export const ModalContent = styled.div<{active: boolean, Width: string}>`
  transform: translateX(-50%);
  width: 100%;
  max-width: ${props => props.Width};
  background-color: ${palette.back2};

  ${(props) => props.active
          ? css`
      animation: ${transitions.popInFromBottom} 0.2s forwards ease-in-out;
    `
          : css`
      animation: ${transitions.popOutToBottom} 0.2s forwards ease-in-out;
    `
  }
  
  .title_box{
    background-color: ${palette.backActive};
    color: ${palette.textActive};
  }

  .square{
    display: block;
    width: 15px;
    height: 15px;
    background-color: ${palette.back};
  }
  
  .line{
    width: 90%;
    height: 1.5px;
    background-color: ${palette.back};
    transform: translateX(5%);
  }
`