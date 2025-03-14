
"use client"

import { Avatar, Spinner } from 'flowbite-react';
import Link from 'next/link';
import ThemeSwitch from '../ThemeSwitch';
import { useUser } from '@/contexts/UserContext';
import { usePathname, useRouter } from 'next/navigation';
import { navigation } from '../Header/navigation';
import SidebarbarToCreateSpace from '../SidebarToCreateSpace';
import { useState } from 'react';
import ModalWordsOfTheDay from '../ModalWordsOfTheDay';


function Sidebar() {

  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const [isWordsOfTheDayModal, setIsWordsOfTheDayModal] = useState(false)

  const { userData } = useUser()
  return (
    <>
      
      <SidebarbarToCreateSpace open={open} setOpen={setOpen} />
      <ModalWordsOfTheDay isWordsOfTheDayModal={isWordsOfTheDayModal} setIsWordsOfTheDayModal={setIsWordsOfTheDayModal} />
      <div className="h-full">
        <div className=" fixed  inset-y-0  left-0   w-[70px] md:w-[90px] overflow-y-auto pb-4 flex flex-col justify-between  border-r  border-gray-400 dark:border-gray-700">
          <nav className="mt-4 flex flex-col justify-between ">
            <ul role="list" className="flex flex-col items-center space-y-2 ">

              <li className={`my-1 ${pathname !== "/" && "hidden"} mb-4 `}>
                <div
                  className={` group 
                    hover:opacity-60
                    bg-blue-500
                    text-gray-200
                    flex 
                    rounded-full 
                    p-3 
                    text-sm 
                    leading-6 
                    font-semibold
                }
                 `
                  }
                  onClick={() => setOpen(!open)}
                >
                  {/* <Icon className="h-6 w-6 shrink-0" aria-hidden="true" /> */}
                  <button>
                    <svg className="w-7 h-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                    </svg>
                    <span className="sr-only">Create space</span>

                  </button>

                </div>
              </li>
              {navigation.map((item) => {
                return (
                  <li key={item.name} className={`${pathname == item.href && "border-l border-blue-400   w-full"}`}>
                    <Link
                      href={item.href}
                      className={`border  group w-12 h-12 md:w-14  md:h-14 mx-auto
                    ${pathname === item.href ? 'text-white bg-blue-500 dark:bg-blue-400 ' : 'bg-gray-200 dark:bg-gray-600 border-gray-300 dark:border-transparent'}
                  dark:text-white text-gray-900
                    flex 
                rounded-full 
                p-3 
                text-sm 
                leading-6 
                font-semibold 
                
                ${pathname !== item.href ? 'hover:opacity-70  ' : ''}
                 `}
                    >
                      {/* <Icon className="h-6 w-6 shrink-0" aria-hidden="true" /> */}
                      <button className='mx-auto'>
                        {item.icon()}

                        <span className="sr-only">{item.name}</span>

                      </button>

                    </Link>
                  </li>
                )
              })}


            </ul>
          </nav>
          <nav className="mt-4 flex flex-col justify-between items-center">
            <div className={`my-1 mb-4 `}>
              <div
                className={` group 
                    hover:opacity-60
                    text-gray-200
                    flex 
                    rounded-full 
                    p-3 
                    text-sm 
                    leading-6 
                    font-semibold
                }
                 `
                }
                onClick={() => setIsWordsOfTheDayModal(!open)}
              >
                {/* <Icon className="h-6 w-6 shrink-0" aria-hidden="true" /> */}
                <button>
                  <svg className="dark:text-white text-gray-900 w-7 h-7 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7h1v12c0 .6-.4 1-1 1h-2a1 1 0 0 1-1-1V5c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v14c0 .6.4 1 1 1h11.5M7 14h6m-6 3h6m0-10h.5m-.5 3h.5M7 7h3v3H7V7Z" />
                  </svg>
                  <span className="sr-only">Words of the day button</span>

                </button>

              </div>
            </div>

            {userData?.id &&
              <div
                className="cursor-pointer hover:opacity-75 transition"
              >
                <Avatar placeholderInitials="RR" img={userData?.image} rounded />
              </div>
            }
          </nav>
        </div >
      </div >
    </>
  )
}

export default Sidebar;
