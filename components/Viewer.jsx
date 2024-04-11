import React from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import Swipe from 'react-easy-swipe';
import abbreviateNumber from 'utils/utils';


const Viewer = (props) => {


    return (
        <div className=" m-auto flex justify-evenly  my-5">

            <div className="flex-col mx-5 mt-16 text-xl hidden md:flex">

                <hr />
                <p className='text-center text-3xl' >{props.sno}</p>
                <hr />

                <FontAwesomeIcon size='3x' icon={faCaretUp} ></FontAwesomeIcon>
                <center>
                    <p>{abbreviateNumber(props.score)}</p>
                </center>
                <FontAwesomeIcon size='3x' icon={faCaretDown}></FontAwesomeIcon>
            </div>


            <div className="flex flex-col">
                <div className="">
                    <p className='font-semibold text-3xl md:text-4xl' >{props.title.length > 40 ? props.title.slice(0, 40) + "..." : props.title}</p>
                    <p className=' text-sm text-gray-700'>{props.author}</p>
                </div>
                <div onDoubleClick={props.handel_select_event} className="relative border-4 border-black p-2">
                    <Swipe onSwipeLeft={props.handel_next_event} onSwipeRight={props.handel_previous_event}>
                        <Image key={props.id} src={props.url} width={800} height={800} className='md:aspect-video object-contain border-2' alt='Meme' placeholder='blur' blurDataURL={process.env.NEXT_PUBLIC_IMAGEBLURDATA} />
                    </Swipe>
                </div>
            </div>
        </div >
    )
}

Viewer.defaultProps = {
    id: "reddit",
    sno: 0,
    title: "This is a meme title",
    author: "unpopularcity17",
    score: 40000000,
    url: "https://i.redd.it/06rto54jdf0b1.jpg"
}

export default Viewer
