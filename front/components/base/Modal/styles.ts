import styled from '@emotion/styled'
import {palette} from "../../../lib/globalStyles";

export const ModalContent = styled.div<{Width: string}>`
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: ${props => props.Width};
  background-color: ${palette.back};
  
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
`