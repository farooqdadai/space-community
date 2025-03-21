"use client";

import IUserContext from "@/interfaces/IUserContext";
import { getUserDataFromCookie } from "@/libs/functions";
import axios from "axios";
import { useSession } from "next-auth/react";
import { createContext, use, useContext, useEffect, useState } from "react";
const intialData: IUserContext = {
  userData: ({} as any),
  users: [],
  setUserData: () => { },
};

const UserContext = createContext<IUserContext>(intialData);

export function useUser() {
  return useContext(UserContext);
}

export default function UserProvider({
  children,
}: any) {
  const [userData, setUserData] = useState<{}>({})
  const session = useSession()
  const [users, setUsers] = useState<any[]>([])

  console.log({users});
  
  const fetchUserData = async () => {
    console.log("fetchUserData")
    try {
      const response = await axios.post('/api/user/getCurrentUser', {
        uuid: session.data?.user?.id
      })
      const data = response.data;

      console.log({data});
      
      
      const date =  new Date(data.createdAt)
      const options: any = { year: 'numeric', month: 'short', day: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-US', options);
      
      setUserData({ ...data, createdAt: formattedDate});
    } catch (error) {
      console.error({ error });

    }
    // const data = await getUserDataFromCookie()

  }

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/user/getUsers')
      const data = response.data;
      setUsers(data);
    } catch (error) {
      console.error({ error });

    }
  }

  useEffect(() => {
    fetchUsers()
  }, []);


  useEffect(() => {
    if (session.status == "loading") return
    if (session.status === "unauthenticated") return
    if (session.status === "authenticated") {
      console.log("fetchUserData");

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
        users,
        setUserData
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
