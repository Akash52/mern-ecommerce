import React from 'react'
import { Container } from 'react-bootstrap'
import Footer from './Component/Footer'
import Header from './Component/Header'

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <h1>Content !</h1>
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
