import React from "react"
import { Outlet } from "react-router-dom";
import Header from '../components/Header';

export interface RootLayoutProps {
	children?: React.ReactNode
}

const RootLayout = ({ children = <Outlet /> }: RootLayoutProps) => (
	<>
        <Header/>
		<main style={{minHeight: '100vh', minWidth: "100%"}}>{children}</main> 
	</>
)

export default RootLayout;