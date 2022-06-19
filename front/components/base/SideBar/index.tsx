import React, {useEffect, useState} from 'react'
import {SideBarNavBox} from "./styles";

export type SideBarProps = {
  active: boolean;
  closeEvent?: (e?: React.MouseEvent<HTMLDivElement>) => void;
  // children: React.ReactNode;
  // className?: string;
};

const SideBar = ({active, closeEvent}: SideBarProps) => {
  const [closed, setClosed] = useState(true);

  useEffect(() => {
    document.body.style.overflowY = active ? 'hidden' : 'initial';

    let timeoutId: any;
    if (active) {
      setClosed(false);
    } else {
      timeoutId = setTimeout(() => {
        setClosed(true);
      }, 200);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [active])

  useEffect(() => {
    return () => {
      document.body.style.overflowY = 'initial';
    };
  }, []);

  if (!active && closed) return null;

  return(
    <>
      <div className="fixed left-0 top-0 w-full h-full z-50">
        <div onClick={closeEvent} className="absolute left-0 top-0 w-full h-full bg-black bg-opacity-20 z-10" />
        <SideBarNavBox active={active} className="absolute right-0 top-0 h-full z-20 bg-white">
          sdsdfsd
        </SideBarNavBox>
      </div>
    </>
  )
}

export default SideBar