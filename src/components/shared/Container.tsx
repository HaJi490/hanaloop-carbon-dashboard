import React from 'react'
import { PageTitle } from './PageTitle';

interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({children}: ContainerProps) {
  return (
    <div>
      <h1 className='font-bold text-4xl md:text-6xl text-gray-600 mb-10'><PageTitle /></h1>
      {children}
    </div>
  )
}
