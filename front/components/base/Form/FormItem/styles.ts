import styled from '@emotion/styled'
import {palette} from "../../../../lib/globalStyles";

export const ItemBox = styled.div`
  .label_box{
    .square{
      display: block;
      width: 15px;
      height: 15px;
      background-color: ${palette.backActive};
    }
    label{
      font-size: 0.9rem;
    }
  }
 
`