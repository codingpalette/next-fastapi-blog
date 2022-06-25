import styled from '@emotion/styled'
import {css} from "@emotion/react";
import {palette} from "../../../lib/globalStyles";

export const ButtonBox = styled.button<{shape: string}>`
  background-color: ${palette.back};
  height: 36px;
  color: ${palette.text};
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