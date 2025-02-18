"use client"
import React from 'react'
import { Button } from './ui/button'
import { stripeCheckoutSession } from '@/app/actions/actions'

const CheckoutButton = () => {
  return (
    <Button onClick={async()=>{
        stripeCheckoutSession()
    }}>Buy lifetime access for $299</Button>
  )
}

export default CheckoutButton