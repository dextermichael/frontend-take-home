"use client"
import React from 'react'
import { Spinner } from '@heroui/react'


export default function loading() {
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
      <Spinner size='lg' />
    </div>
  )
}
