import React, { useEffect, useState } from 'react'
import Viewer from 'components/Viewer'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft, faChevronLeft, faChevronRight, faTimes, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons'
import NotFound from 'components/NotFound'
const page = (props) => {

    const [subs, setSubs] = useState(null)
    const [total_subs, setTotal_subs] = useState(props.data.total)
    const [mode, setMode] = useState(null)
    const [meme_index_count, set_meme_index_count] = useState(0)
    const [selectees, setSelectees] = useState([])

    useEffect(() => {

        setSubs(props.data.submission)
        setTotal_subs(props.data.total)
        setMode(props.data.mode)

    }, [])

    const handel_next = () => {
        if (meme_index_count === total_subs - 1) {
            set_meme_index_count(0)
            return
        }
        set_meme_index_count(meme_index_count + 1)

    }

    const handel_previous = () => {
        if (meme_index_count === 0) {
            set_meme_index_count(total_subs - 1)
            return
        }
        set_meme_index_count(meme_index_count - 1)

    }

    const handel_select = () => {

        setSelectees(
            [
                ...selectees, {
                    id: props.data.submission[meme_index_count].id,
                    url: props.data.submission[meme_index_count].url
                }
            ]
        );
    }


    const handel_save = () => {

        const data = { submission_ids: [] }


        selectees.map((e) =>{
            data.submission_ids = [
                ...data.submission_ids,e.id
            ]
        })

        console.log(data)



        fetch(`${process.env.NEXT_PUBLIC_SERVERNAME}/save`, {
            method: "POST",
            body: data,
            headers:{"Content-Type": "application/json"}
        }).then((res) => res.status)
            .then((code) => {
                if (code === 200) {
                    console.log("ok")
                }

            });


    }


    return (
        <div className="flex flex-col">

            <div className="flex flex-col md:flex-row justify-evenly gap-10 ">
                <div className='w-fit p-2 '>
                    <Viewer id={props.data.submission[meme_index_count].id} title={props.data.submission[meme_index_count].title} author={props.data.submission[meme_index_count].author} score={props.data.submission[meme_index_count].score} url={props.data.submission[meme_index_count].url} sno={meme_index_count + 1} />
                    <div className="w-full flex justify-between ">
                        <div className=" md:ml-24 ">
                            <button onClick={handel_previous} className="bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent  duration-100 border-r-0">
                                <FontAwesomeIcon icon={faChevronLeft} className="mx-1" />
                                {/* Prev */}
                            </button>
                            <button onClick={handel_next} className="bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent  duration-100 border-l-0">

                                {/* Next */}
                                <FontAwesomeIcon icon={faChevronRight} className="mx-1" />
                            </button>
                        </div>
                        <div className="">
                            <button onClick={handel_select} className="bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent duration-100">
                                <FontAwesomeIcon icon={faPlus} className="mx-1" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Select and other sections */}
                <div className="md:h-[60vh] flex flex-col md:w-2/6 w-full mx-2 mt-20 border-4 border-black">
                    <p className='text-xl md:text-4xl font-semibold my-4 text-center sticky top-0 z-50 bg-white'>Selected Memes</p>
                    <div className=" h-full">
                        <div className="h-full max-h-[435px] overflow-y-scroll flex flex-wrap justify-center">

                            {
                                selectees.length === 0 ? <NotFound /> : selectees.map((e, index) => {
                                    return (
                                        <div key={index} className="m-2 rounded-sm w-fit relative">

                                            <FontAwesomeIcon size='lg' className='absolute left-[95%] -top-2 cursor-pointer text-gray-600 hover:text-black' icon={faTimes} onClick={
                                                () => {
                                                    setSelectees(selectees.filter(a => a.id !== e.id));
                                                }
                                            } ></FontAwesomeIcon>
                                            <Image src={e.url} alt="abs" width={90} height={90} placeholder='blur' blurDataURL={process.env.NEXT_PUBLIC_IMAGEBLURDATA} />
                                        </div>

                                    )
                                })
                            }

                        </div>
                    </div>
                    {/* save button */}
                    {
                        selectees.length === 0 ? "" : (

                            <div className="w-full flex justify-end p-2">
                                <button onClick={handel_save} className="bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded duration-100 bottom-0"><FontAwesomeIcon icon={faCheck}  className="mx-1" /></button>
                            </div>
                        )
                    }
                </div>

            </div>
            {/* Info box */}

            <div className="mx-2 md:mx-20 my-10">
                <h2 className='text-4xl font-semibold uppercase '>Info</h2>
                <details>
                    <div className="flex justify-start md:flex-row flex-col gap-20 my-3">

                        <div>
                            <p className='text-2xl  font-semibold ' >Search Info</p>
                            <p>Sub-Reddit - "{props.subredditinfo[0]}"</p>
                            <p>Mode - "{props.subredditinfo[1]}"</p>
                            <p>Limit - "{props.subredditinfo[2]}"</p>
                            <p>Count - "{props.data.total}"</p>
                            <p>Time - "{props.data.time}"</p>
                        </div>

                        <div>
                            <p className='text-2xl  font-semibold ' >Post-info</p>
                            <p>Sub-Reddit - "{props.subredditinfo[0]}"</p>
                            <p>Author - {props.data.submission[meme_index_count].author} </p>
                            <p>ID - {props.data.submission[meme_index_count].id}</p>
                            <p>url - <a href={props.data.submission[meme_index_count].url}> {props.data.submission[meme_index_count].url}</a></p>
                            <p>Upvote_ratio - {props.data.submission[meme_index_count].upvote_ratio}</p>
                            <p>Score - {props.data.submission[meme_index_count].score}</p>
                            <p>Created_at - {props.data.submission[meme_index_count].created_at}</p>
                            <p>Title - {props.data.submission[meme_index_count].title}</p>
                        </div>

                        <div>
                            <p className='text-2xl  font-semibold ' >Selectees</p>
                            <p>{selectees.length === 0 ? "0 selectees found" :  selectees.map(e => {
                                return (

                                    <span key={e.id}>{e.id},</span>

                                )
                            }
                            )}</p>
                        </div>
                    </div>
                </details>
            </div>
        </div >

    )
}

export async function getServerSideProps(context) {
    const params = context.query.subreddit

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVERNAME}/get/${params[0]}/${params[1]}/${params[2]}`)
    // const res = await fetch(`${process.env.NEXT_PUBLIC_SERVERNAME}/test`)
    const data = await res.json()

    return {
        props: { data: data, subredditinfo: params }, // will be passed to the page component as props
    };
}

export default page

