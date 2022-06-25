import styled from '@emotion/styled'
import {palette} from "../../../lib/globalStyles";

export const NabBtnBox = styled.div`
  color: ${palette.text};
  background-color: ${palette.back};
  box-sizing: border-box;
  &:hover{
    box-shadow: 5px 5px 10px rgba(0,0,0,0.19), 3px 3px 3px rgba(0,0,0,0.23);
    transform: translate(-1px, -1px);
  }
  .square{
    display: block;
    width: 15px;
    height: 15px;
    background-color: ${palette.backActive};
  }
  &.active{
    color: ${palette.textActive};
    background-color: ${palette.backActive};
    transform: translate(-1px, -1px);
    box-shadow: 5px 5px 10px rgba(0,0,0,0.19), 3px 3px 3px rgba(0,0,0,0.23);
    .square{
      background-color: ${palette.back};
    }
  }

  transition: 0.2s ease-in-out;;
 
`