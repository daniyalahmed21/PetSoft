import Image from 'next/image'
import React from 'react'
import logo from "../../public/logo.svg"
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href='/'>
    <Image src={logo} alt='logo' />
    </Link>
  )
}

export default Logo