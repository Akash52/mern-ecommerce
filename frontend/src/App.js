import React from 'react'
import { Container } from 'react-bootstrap'
import Footer from './Component/Footer'
import Header from './Component/Header'
import HomeScreen from './screens/HomeScreen'

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
