import AuthForm from '@/components/AuthForm'
import H1 from '@/components/H1'
import Link from 'next/link'
import React from 'react'

const Login = () => {
  return (
<main >
  <H1 className='text-center mb-5'>Login Page</H1>
    <AuthForm type="login"/>
    <p className='text-sm mt-4 text-zinc-500' >
      No account yet? {" "}
      <Link className='text-medium ' href='/signup'>Sign up</Link> 
    </p>
</main>
  )
}

export default Login