import React, { useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {

    const [navOpen, setNavOpen] = useState(false)
    const toggleNav = () => {
        
        if (navOpen){
            setNavOpen(false)
            return
        }
        setNavOpen(true)


    }

    return (
        <nav className="text-gray-600 body-font w-screen bg-gray-100">
            <div className="container mx-auto flex flex-wrap px-5 md:py-1 justify-between  flex-row md:flex-row items-center md:border-0 border-b-2 border-black">
                <Link href={"/"} className="flex title-font items-center text-gray-900 md:mb-0 uppercase font-semibold ">
                    <svg className='text-red-800' xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 512 512"><title>ionicons-v5_logos</title><path d="M324,256a36,36,0,1,0,36,36A36,36,0,0,0,324,256Z" fill="red"></path><circle cx="188" cy="292" r="36" transform="translate(-97.43 94.17) rotate(-22.5)"></circle><path d="M496,253.77c0-31.19-25.14-56.56-56-56.56a55.72,55.72,0,0,0-35.61,12.86c-35-23.77-80.78-38.32-129.65-41.27l22-79L363.15,103c1.9,26.48,24,47.49,50.65,47.49,28,0,50.78-23,50.78-51.21S441,48,413,48c-19.53,0-36.31,11.19-44.85,28.77l-90-17.89L247.05,168.4l-4.63.13c-50.63,2.21-98.34,16.93-134.77,41.53A55.38,55.38,0,0,0,72,197.21c-30.89,0-56,25.37-56,56.56a56.43,56.43,0,0,0,28.11,49.06,98.65,98.65,0,0,0-.89,13.34c.11,39.74,22.49,77,63,105C146.36,448.77,199.51,464,256,464s109.76-15.23,149.83-42.89c40.53-28,62.85-65.27,62.85-105.06a109.32,109.32,0,0,0-.84-13.3A56.32,56.32,0,0,0,496,253.77ZM414,75a24,24,0,1,1-24,24A24,24,0,0,1,414,75ZM42.72,253.77a29.6,29.6,0,0,1,29.42-29.71,29,29,0,0,1,13.62,3.43c-15.5,14.41-26.93,30.41-34.07,47.68A30.23,30.23,0,0,1,42.72,253.77ZM390.82,399c-35.74,24.59-83.6,38.14-134.77,38.14S157,423.61,121.29,399c-33-22.79-51.24-52.26-51.24-83A78.5,78.5,0,0,1,75,288.72c5.68-15.74,16.16-30.48,31.15-43.79a155.17,155.17,0,0,1,14.76-11.53l.3-.21,0,0,.24-.17c35.72-24.52,83.52-38,134.61-38s98.9,13.51,134.62,38l.23.17.34.25A156.57,156.57,0,0,1,406,244.92c15,13.32,25.48,28.05,31.16,43.81a85.44,85.44,0,0,1,4.31,17.67,77.29,77.29,0,0,1,.6,9.65C442.06,346.77,423.86,376.24,390.82,399Zm69.6-123.92c-7.13-17.28-18.56-33.29-34.07-47.72A29.09,29.09,0,0,1,440,224a29.59,29.59,0,0,1,29.41,29.71A30.07,30.07,0,0,1,460.42,275.1Z" fill="red"></path><path d="M323.23,362.22c-.25.25-25.56,26.07-67.15,26.27-42-.2-66.28-25.23-67.31-26.27h0a4.14,4.14,0,0,0-5.83,0l-13.7,13.47a4.15,4.15,0,0,0,0,5.89h0c3.4,3.4,34.7,34.23,86.78,34.45,51.94-.22,83.38-31.05,86.78-34.45h0a4.16,4.16,0,0,0,0-5.9l-13.71-13.47a4.13,4.13,0,0,0-5.81,0Z" fill="red"></path></svg>
                    <p className="ml-3 md:mt-0 mt-1 text-lg md:text-2xl">Reddit Meme Selector</p>
                </Link>
                <nav className="md:ml-auto md:flex font-semibold hidden flex-wrap items-center text-xl justify-center ">
                    <Link href={"/"} className="mr-8 md:block  hover:text-gray-900 text-black">Home</Link>
                    <Link href={"/about"} className="mr-8 md:block  hover:text-gray-900 text-black">About</Link>
                    <Link href={"/settings"} className="mr-8 md:block  hover:text-gray-900 text-black">Settings</Link>
                    <Link href={"/display"} className="mr-8 md:block  hover:text-gray-900 text-black">Saves</Link>
                </nav>
                <FontAwesomeIcon onClick={toggleNav} className=' md:hidden text-black' icon={faBars} size="lg" />
                <div className={`md:hidden w-full text-lg ${navOpen ? " h-[183px]" : "h-0"} overflow-hidden duration-200 font-semibold`}>
                    <div className=" flex flex-col justify-evenly w-full">
                        <Link onClick={()=> setNavOpen(false)} href={"/"} className="py-2 text-black">Home</Link>
                        <Link onClick={()=> setNavOpen(false)} href={"/about"} className=" py-2 text-black">About</Link>
                        <Link onClick={()=> setNavOpen(false)} href={"/settings"} className=" py-2 text-black">Settings</Link>
                        <Link onClick={()=> setNavOpen(false)} href={"/display"} className=" py-2  text-black">Saves</Link>

                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
