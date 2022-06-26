import styled from "@emotion/styled";
import {palette} from "../../../lib/globalStyles";

export const InputBox = styled.input`
  outline: none;
  border: 1px solid ${palette.back};
  background-color: ${palette.back};
  font-size: 14px;
  transition: all .3s;
  &::placeholder{
    color: ${palette.text};
    opacity: 0.5;
  }
  &:focus{
    border: 1px solid ${palette.backActive};
  }
`