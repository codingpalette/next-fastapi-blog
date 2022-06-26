import { css } from '@emotion/react';
import emotionReset from 'emotion-reset';


export const palette = {
  text: '#46423A',
  back: '#BAB29E',
  back2: '#D8D2B9',
  textActive: '#C9C2AA',
  backActive: '#45423A'
}

export const globalStyles = css`
  ${emotionReset}

  @import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css);

  html,
  body {
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    width: 100%;
    height: 100%;
    color: ${palette.text};
  }
  #__next{
    width: 100%;
    height: 100%;
  }
  
  html{
    background-image: url("/images/etc/back_pattern.png");
    //background-color: #C8C2AA;
    //background-size: 4px 4px;
    //background-image: linear-gradient(90deg, transparent, transparent 3px, rgba(0, 0, 0, 0.07) 4px), 
    //linear-gradient(transparent, transparent 3px, rgba(0, 0, 0, 0.07) 4px);
  }

  * {
    box-sizing: border-box;
  }
  
`

