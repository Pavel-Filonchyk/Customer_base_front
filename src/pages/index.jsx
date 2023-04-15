import React, { useState, useMemo } from 'react'
//import type { NextPage } from 'next';
import Head from 'next/head'
import Auth from '../components/Auth'
import { GET_CUSTOMERS } from '../common/api'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

export const MyContext = React.createContext({
  user: null,
  setUser: () => {},
})

const Home = ({users}) => {
  const [user, setUser] = useState([{admin: 'User'}])
  const value = useMemo(
    () => ({ user, setUser }), 
    [user]
  )

  return (
    <MyContext.Provider value={value}>
      <Head>
        <title>Dashboard</title>
      </Head>
     
        <Auth
          users={users}
        />
    </MyContext.Provider>
  )
}

export default Home;

export const getServerSideProps = async () => {
  const response = await fetch(GET_CUSTOMERS)
  const users = await response.json()

  return {
      props: {users}
  }
}

