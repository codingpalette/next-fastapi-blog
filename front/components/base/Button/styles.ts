import styled from '@emotion/styled'
import {css} from "@emotion/react";
import {palette} from "../../../lib/globalStyles";

export const ButtonBox = styled.button<{shape: string}>`
  background-color: ${palette.back};
  height: 36px;
  color: ${palette.text};
  transition: 0.2s ease-in-out;
  &:hover{
    box-shadow: 5px 5px 10px rgba(0,0,0,0.19), 3px 3px 3px rgba(0,0,0,0.23);
    transform: translate(-1px, -1px);
  }
  ${(props) => props.shape === 'default' ?
          css`
            min-width: 100px;
          `
          : css`
            min-width: 0px;
            width: 36px;
          `
  }
  &.active{
    background-color: ${palette.backActive};
    color: ${palette.textActive};
  }
`