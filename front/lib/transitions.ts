import { keyframes } from '@emotion/react'

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const popInFromBottom = keyframes`
  0% {
    opacity: 0;
    transform: translateY(400px) translateX(-50%) scale(0.75);
  }
  75% {
    opacity: 1;
    transform: translateY(-16px) translateX(-50%) scale(1.0);
  }
  100% {
    opacity: 1;
    transform: translateY(-50%) translateX(-50%);
  }`;

const popOutToBottom = keyframes`
  0% {
    opacity: 1;
    transform: translateY(-50%) translateX(-50%) scale(1.0);
  }
  100% {
    opacity: 0;
    transform: translateY(400px) translateX(-50%) scale(0.75);
  }`;

const sideInFromRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(250px) ;
  }
  //75% {
  //  opacity: 1;
  //  transform: translateX(-16px) ;
  //}
  100% {
    opacity: 1;
    transform: translateX(0px);
  }`;

const sideOutToRight = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0px);
  }
  100% {
    opacity: 0;
    transform: translateX(250px) ;
  }
`;

const popIn = keyframes`
  0% {
    opacity: 0.7;
    transform: scale3d(0.8, 0.8, 1);
  }
  100% {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
`;

const slideUp = keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0%);
  }
`;

const slideDown = keyframes`
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(100%);
  }
`;

const transitions = {
  fadeIn,
  fadeOut,
  popInFromBottom,
  popOutToBottom,
  sideInFromRight,
  sideOutToRight,
  popIn,
  slideUp,
  slideDown,
};

export default transitions;
