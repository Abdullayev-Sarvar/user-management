import React from 'react'
import Banner from '../../components/banner/Banner'
import Footer from '../../components/footer/Footer'
import Users from '../../components/users/Users'
import About from '../../components/about/About'

const Home = () => {
  return (
    <>
      <Banner />
      <Users/>
      <About />
      <Footer />
    </>
  )
}

export default Home