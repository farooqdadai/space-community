"use client";

import IUserContext from "@/interfaces/IUserContext";
import { getUserDataFromCookie } from "@/libs/functions";
import axios from "axios";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
const intialData: IUserContext = {
  userData: ({} as any),
  setUserData: () => { },
};

const UserContext = createContext<IUserContext>(intialData);

export function useUser() {
  return useContext(UserContext);
}

export default function UserProvider({
  children,
}: any) {
  const [userData, setUserData] = useState({})
  const session = useSession()

  const fetchUserData = async () => {

    try {
      const response = await axios.post('/api/user/getCurrentUser', {
        uuid: session.data?.user?.id
      })
      const data = response.data;
      
      setUserData(data);
    } catch (error) {
      console.error({error});

    }
    // const data = await getUserDataFromCookie()

  }

  useEffect(() => {
    if (session.status == "loading") return console.log("loading ")
    if (session.status === "unauthenticated") return console.log("unauthenticated ")
    if (session.status === "authenticated") {
      console.log("authenticated")
      fetchUserData()
    }

    // const data = getUserDataFromCookie()
    // if (data) {
    //   setUserData(data);
    // } else {
    //   setUserData({})
    // }
  }, [session.status]);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
