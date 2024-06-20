import React, { ReactNode } from 'react'
import Navbar from './Navbar';
import './Layout.css'


interface LayoutProps {
    children: ReactNode;
  }
  
export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}
