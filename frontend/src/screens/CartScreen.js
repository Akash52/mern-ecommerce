import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../Components/Message'
import { addToCart } from '../actions/cartActions'
const CartScreen = ({ match, location, history }) => {
  //Here We Get Product ID
  const productId = match.params.id

  //Here we Get number of QTY
  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  //console.log(qty)

  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  return <>Cart</>
}

export default CartScreen
