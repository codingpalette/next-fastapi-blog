import styled from '@emotion/styled'
import { css } from '@emotion/react';
import transitions from "../../../lib/transitions";
import {palette} from "../../../lib/globalStyles";

export const SideBarNavBox = styled.div<{ active: boolean }>`
  width: 250px;
  background-color: #D8D2B9;
  .title{
    background-color: ${palette.backActive};
    color: ${palette.textActive};
  }
  
  ${(props) => props.active 
    ? css`
      animation: ${transitions.sideInFromRight} 0.2s forwards ease-in-out;
    ` 
    : css`
      animation: ${transitions.sideOutToRight} 0.2s forwards ease-in-out;
    ` 
  }
  
  nav{
    //background-color: ${palette.back};
  }
`