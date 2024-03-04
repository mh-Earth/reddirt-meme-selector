import React from 'react'
import reddit_logo from "../../public/reddit.svg"
import Image from 'next/image'


const About = () => {
  return (
    <>
      <div className="h-[90vh] relative bg-slate-100 flex justify-center items-center selection:bg-red-700 text-white">
        <div className=" absolute w-5/6 h-5/6 backdrop-blur-sm ">
          <Image src={reddit_logo} fill alt='reddit logo' className='relative backdrop-opacity-50' />
        </div>
        <div className="flex justify-center items-center flex-col z-10">
          {/* <p className='text-2xl text-black' >THIS IS A MEME SELECTION APP FOR PERSONAL USE!!</p> */}
          <p className='text-2xl text-black font-semibold' >
            <a href="http://github.com/mh-earth">MH-EARTH</a>
            </p>

        </div>

      </div>
    </>
  )
}

export default About
