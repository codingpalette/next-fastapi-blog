import styled from '@emotion/styled'
import {Box} from "@mui/material";

export const ModalContent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem;
  box-sizing: border-box;
  width: 100%;
  
  .modal_header{
    padding: 16px 24px;
    border-bottom: ${props => props.useTheme === 'light' ? '1px solid rgba(0,0,0,.06)' : '1px solid #303030'};
    position: relative;
    min-height: 55px;

    .modal_title{
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
      word-wrap: break-word;
      max-width: calc(100% - 26px);
    }
    
    .modal_close_button{
      position: absolute;
      top: 0;
      right: 0;
      z-index: 10;
      padding: 0;
      font-weight: 700;
      line-height: 1;
      text-decoration: none;
      background: 0 0;
      border: 0;
      outline: 0;
      cursor: pointer;
      transition: color .3s;
      color: ${props => props.useTheme === 'light' ? '#00000073' : 'rgba(255, 255, 255, 0.45)'};
      &:hover{
        color: ${props => props.useTheme === 'light' ? '#000000bf' : 'rgba(255, 255, 255, 0.75)'};
      }
      
      span{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 55px;
        height: 55px;
      }
    }
  }
  
  .modal_body{
    padding: 24px;
    box-sizing: border-box;
  }
  
  .modal_footer{
    padding: 10px 16px;
    border-top: ${props => props.useTheme === 'light' ? '1px solid rgba(0,0,0,.06)' : '1px solid #303030'};
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
`