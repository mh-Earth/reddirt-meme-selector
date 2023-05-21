import React from 'react'
import empty from "../public/empty.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
const EmptyViewer = () => {
    return (
        <div className=" m-auto flex justify-evenly  my-5">

            <div className="flex-col mx-5 mt-16 text-xl hidden md:flex">

                <hr />
                <p className='text-center text-3xl' >0</p>
                <hr />

                <FontAwesomeIcon size='3x' icon={faCaretUp} ></FontAwesomeIcon>
                <p>1000</p>
                <FontAwesomeIcon size='3x' icon={faCaretDown}></FontAwesomeIcon>
            </div>


            <div className="flex flex-col">
                <div className="">
                    <p className='font-semibold text-3xl md:text-4xl' >............................</p>
                    <p className=' text-sm text-gray-700'>..........</p>
                </div>

                <div className="relative border-4 border-black p-2">
                    <Image src={empty} width={800} height={800} className='md:aspect-video object-contain border-2' alt='Meme'  />
                </div>
            </div>
        </div>
    )
}

export default EmptyViewer
