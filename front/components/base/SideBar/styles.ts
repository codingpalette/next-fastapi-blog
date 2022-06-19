import styled from '@emotion/styled'
import { css } from '@emotion/react';
import transitions from "../../../lib/transitions";

export const SideBarNavBox = styled.div<{ active: boolean }>`
  width: 250px;
  ${(props) => props.active 
    ? css`
      animation: ${transitions.sideInFromRight} 0.2s forwards ease-in-out;
    ` 
    : css`
      animation: ${transitions.sideOutToRight} 0.2s forwards ease-in-out;
    ` 
  }
`