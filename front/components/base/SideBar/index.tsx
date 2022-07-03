import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {SideBarNavBox} from "./styles";
import Button from "../Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import NavBtn from "../NavBtn";

const menuList = [
  {id: 1, name: 'Home', path: '/'},
  {id: 2, name: 'Post', path: '/post'},
  {id: 3, name: 'About', path: '/about'},
  {id: 4, name: 'Game', path: '/game'},
]

interface SideBarProps {
  active: boolean;
  closeEvent?: (e?: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
  // children: React.ReactNode;
  // className?: string;
};

const SideBar = ({active, closeEvent}: SideBarProps) => {
  const router = useRouter()
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
        <SideBarNavBox active={active} className="absolute right-0 top-0 h-full z-20">
          <div className="title px-4 py-3 flex items-center justify-between">
            <span>메뉴</span>
            <Button onClick={closeEvent} shape="icon" icon={<FontAwesomeIcon icon={faXmark} size="lg" />}  />
          </div>
          <aside className="w-full p-4" aria-label="Sidebar">
            <nav className="">
              <ul className="w-full flex flex-col gap-y-4">
                {menuList.map(v => (
                  <li key={v.id}>
                    <Link href={v.path}>
                      <a>
                        <NavBtn className={v.path === router.pathname ? 'active' : ''}>
                          {v.name}
                        </NavBtn>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </SideBarNavBox>
      </div>
    </>
  )
}

export default SideBar