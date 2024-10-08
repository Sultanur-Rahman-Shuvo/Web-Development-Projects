import { Button } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'

function Item({ item }) {
  const dispatch = useDispatch()
  function addTocart() {
    dispatch({ type: 'addToCart', payload: { ...item, quantity: 1 } })
  }
  return (
    <div className='item'>
      <h4 className='name'>{item.name}</h4>
      <div className='d-flex justify-content-center mt-3'>
        <img src={item.image} alt="" height='100' width='100' />
      </div>
      <h4 className='price mt-3'><b>Price : </b>{item.price} $/-</h4>
      <div className="d-flex justify-content-center">
        <Button className='primary' onClick={() => addTocart()}>Add To Cart</Button>
      </div>
    </div>
  )
}

export default Item