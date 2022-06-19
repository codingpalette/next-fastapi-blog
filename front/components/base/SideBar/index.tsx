import React, {useEffect, useState} from 'react'
import {SideBarNavBox} from "./styles";

export type SideBarProps = {
  active: boolean;
  closeEvent?: (e?: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
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
        <div onClick={closeEvent} className="absolute left-0 top-0 w-full h-full bg-black bg-opacity-40 z-10" />
        <SideBarNavBox active={active} className="absolute right-0 top-0 h-full z-20 bg-white">
          <aside className="w-full p-4" aria-label="Sidebar">
            <div className="py-4 px-3 mb-4 bg-slate-300 rounded flex align-middle">
              <button onClick={closeEvent}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <span className="ml-2">메뉴</span>
            </div>
            <div className="overflow-y-auto py-4 px-3 bg-slate-300 rounded ">
              <ul className="space-y-2">
                <li>
                  <a href="#"
                     className="flex items-center group p-2 text-base font-normal text-slate-600 rounded-lg hover:bg-gray-100">
                    <svg
                      className="w-6 h-6 text-slate-600 group-hover:text-purple-600"
                      fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                    </svg>
                    <span className="ml-3">Home</span>
                  </a>
                </li>
                <li>
                  <a href="#"
                     className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                    <svg
                      className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                    </svg>
                    <span className="flex-1 ml-3 whitespace-nowrap">Kanban</span>
                    <span
                      className="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </SideBarNavBox>
      </div>
    </>
  )
}

export default SideBar