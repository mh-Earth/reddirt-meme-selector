import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

const NoMemeFound = () => {
    return (
        <div className=" m-auto flex justify-evenly  my-5">

            <div className="flex-col mx-5 mt-16 text-xl hidden md:flex">

                <hr />
                <p className='w-full rounded py-2 bg-slate-700 ' ></p>
                <hr />

                <FontAwesomeIcon size='3x' icon={faCaretUp} ></FontAwesomeIcon>
                <p className='w-full rounded py-2 bg-slate-700 '></p>
                <FontAwesomeIcon size='3x' icon={faCaretDown}></FontAwesomeIcon>
            </div>


            <div className="flex flex-col">
                <div className="">
                    <p className='md:mx-0 mx-1 font-semibold text-3xl w-2/3 md:text-4xl rounded py-2 bg-slate-700  ' ></p>
                    <p className='md:mx-0 mx-1  w-1/3 my-3 rounded py-2 bg-slate-700 '></p>
                </div>

                <div className="relative border-4 md:w-auto w-screen border-black p-2">
                    {/* <Image src={empty} width={800} height={800} className='md:aspect-video object-contain border-2' alt='Meme'  /> */}
                    <div className="md:aspect-video w-full md:w-[750px] flex justify-center items-center h-[650px] border-2">
                        <p className='text-4xl font-semibold'>NO MEME FOUND</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoMemeFound
