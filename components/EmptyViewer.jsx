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
                <p className='w-full rounded py-2 bg-slate-700 animate-pulse' ></p>
                <hr />

                <FontAwesomeIcon size='3x' icon={faCaretUp} ></FontAwesomeIcon>
                <p className='w-full rounded py-2 bg-slate-700 animate-pulse'></p>
                <FontAwesomeIcon size='3x' icon={faCaretDown}></FontAwesomeIcon>
            </div>


            <div className="flex flex-col">
                <div className="">
                    <p className='md:mx-0 mx-1 font-semibold text-3xl w-2/3 md:text-4xl rounded py-2 bg-slate-700 animate-pulse ' ></p>
                    <p className='md:mx-0 mx-1  w-1/3 my-3 rounded py-2 bg-slate-700 animate-pulse'></p>
                </div>

                <div className="relative border-4 md:w-auto w-screen border-black p-2">
                    {/* <Image src={empty} width={800} height={800} className='md:aspect-video object-contain border-2' alt='Meme'  /> */}
                    <div className="md:aspect-video animate-pulse w-full md:w-[750px] h-[650px] bg-slate-700 border-2"></div>
                </div>
            </div>
        </div>
    )
}

export default EmptyViewer
