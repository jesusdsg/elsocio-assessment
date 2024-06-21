import React from 'react'

export default function Navbar() {
  return (
    <nav className="relative px-20 py-4 flex justify-between items-center bg-white border-b border-gray">
		<a className="text-3xl font-bold leading-none text-orange-600" href="#">
            <h3>Kush Fresh</h3>
		</a>
		<div className="lg:hidden">
			<button className="navbar-burger flex items-center text-blue-600 p-3">
				<svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
					<title>Mobile menu</title>
					<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
				</svg>
			</button>
		</div>
		<ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6 gap-10">
			<li><a className="text-sm text-gray-600 hover:text-gray-500 border-b-4 border-orange-600 pb-6" href="#">Home</a></li>
			<li><a className="text-sm text-gray-400 hover:text-gray-500 hover:border-b-4 hover:border-orange-600 pb-6" href="#">About us</a></li>
            <li><a className="text-sm text-gray-400 hover:text-gray-500 hover:border-b-4 hover:border-orange-600 pb-6" href="#">Videos</a></li>
		</ul>
		<a className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200" href="#">Sign in</a>
		<a className="hidden lg:inline-block py-2 px-6 bg-orange-500 hover:bg-orange-600 text-sm text-white font-bold rounded-xl transition duration-200" href="#">Sign up</a>
	</nav>
  )
}
