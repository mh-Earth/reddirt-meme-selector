import React, { useEffect, useState } from 'react'
import Viewer from 'components/Viewer'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faTimes, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons'
import NotFound from 'components/NotFound'
import Alert from 'components/Alert'
import { useRouter } from 'next/router'
import Loading from 'components/Loading'
import NoMemeFound from 'components/NoMemeFound'

const SubReddit = () => {

    const [subs, setSubs] = useState([])
    const [meme_index_count, set_meme_index_count] = useState(0)
    const [selectees, setSelectees] = useState([])
    const [Saving, setSaving] = useState(false)
    const [alert, setAlert] = useState(false)
    const [alertType, setAlertType] = useState("primary")
    const [alertMassage, setAlertMassage] = useState("")
    const [loading, setLoading] = useState(true)
    const [RequestTime, setRequestTime] = useState()
    const [hasAdmin, setHasAdmin] = useState(false)
    const router = useRouter()
    const { subreddit } = router.query

    const trigger_alert = (type, message) => {
        setAlert(true)
        setAlertType(type)
        setAlertMassage(message)
    }

    useEffect(() => {
        setLoading(true);
        fetch(`${process.env.NEXT_PUBLIC_SERVERNAME}/api/get/${subreddit[0]}/${subreddit[1]}/${subreddit[2]}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`, { cache: "no-cache" })
        .then((res) => res.json())
        .then((data) => {
            setLoading(false);
            setSubs(data.submission)
            setRequestTime(data.time)
            setHasAdmin(data.hasAdmin)
        });
    }, []);


    const handel_next = () => {
        if (meme_index_count === subs.length - 1) {
            set_meme_index_count(0)
            return
        }
        set_meme_index_count(meme_index_count + 1)

    }

    const handel_previous = () => {
        if (meme_index_count === 0) {
            set_meme_index_count(subs.length - 1)
            return
        }
        set_meme_index_count(meme_index_count - 1)

    }

    const handel_select = () => {
        const isUnique = selectees.every(sub => {
            return sub.name !== subs[meme_index_count].name
        })
        if (isUnique) {

            setSelectees(
                [
                    ...selectees, {
                        name: subs[meme_index_count].name,
                        url: subs[meme_index_count].url,
                        title: subs[meme_index_count].title
                    }
                ]
            );
        }
    }


    const handel_save = () => {

        const data = { submissions: [], api_key: process.env.NEXT_PUBLIC_API_KEY, password: "" }


        let password = prompt("Enter your password", '')

        if (password != null) {
            data.password = password
        }

        selectees.map((e) => {
            data.submissions = [
                ...data.submissions, e
            ]
        })

        console.log(selectees)


        setSaving(true)
        fetch(`${process.env.NEXT_PUBLIC_SERVERNAME}/api/save/reddit`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        }).then((res) => res.ok)
            .then((ok) => {
                if (ok) {
                    setSaving(false)
                    trigger_alert('primary', "Your memes has been saved successfully")

                    selectees.map((selectee) => {
                        setSubs((prevSubs) => prevSubs.filter((sub) => sub.name !== selectee.name));
                    });

                    setSelectees([])
                    set_meme_index_count(0)


                }

                else {

                    setSaving(false)
                    trigger_alert('danger', ` ${code} !! Something went wrong.`)

                }

            })
            .catch((error) => {

                if (error.response && error.response.status) {
                    setSaving(false)
                    trigger_alert('danger', `${error.response.status}!! Something went wrong`)
                } else {
                    setSaving(false)
                    trigger_alert('danger', ` ${'Failed to save your meme(s)'}`)
                }
            })
    }

    // keyboard key down events
    const handelKeyDown = (event) => {
        switch (event.key) {
            case 'Enter':
                handel_select()
                break;
            case 'ArrowLeft':
                handel_previous()
                break;
            case 'ArrowRight':
                handel_next()
                break;
            default:
                break;
        }

    }


    const handel_alert = () => {
        setAlert(false)
    }


    if (loading)
        return (
            <>
                {alert ? <Alert handel_close={handel_alert} massage={alertMassage} type={alertType} /> : ""}
                <Loading />
            </>
        )


    return (
        <div onKeyDown={handelKeyDown} className="flex flex-col">

            {alert ? <Alert handel_close={handel_alert} massage={alertMassage} type={alertType} /> : ""}


            <div className="flex flex-col md:flex-row justify-evenly gap-10 ">
                <div className='w-fit p-2 '>

                    {
                        subs.length === 0 ? <NoMemeFound /> : (subs[meme_index_count] !== undefined ? <Viewer key={subs[meme_index_count].id} id={subs[meme_index_count].id} title={subs[meme_index_count].title} author={subs[meme_index_count].author} score={subs[meme_index_count].score} url={subs[meme_index_count].url} sno={meme_index_count + 1} handel_next_event={handel_next} handel_previous_event={handel_previous} handel_select_event={handel_select} /> : "")

                    }
                    <div className={`w-full flex justify-between ${subs.length === 0 ? 'hidden' : ''}`}>
                        <div className=" md:ml-20 ">
                            <button onClick={handel_previous} className="bg-transparent md:hover:bg-black text-black font-semibold md:hover:text-white py-2 px-4 border border-black md:hover:border-transparent  duration-100 border-r-0">
                                <FontAwesomeIcon icon={faChevronLeft} className="mx-1" />
                                {/* Prev */}
                            </button>
                            <button onClick={handel_next} className="bg-transparent md:hover:bg-black text-black font-semibold md:hover:text-white py-2 px-4 border border-black md:hover:border-transparent  duration-100 border-l-0">

                                {/* Next */}
                                <FontAwesomeIcon icon={faChevronRight} className="mx-1" />
                            </button>
                        </div>
                        <div className="">
                            <button onClick={handel_select} className="bg-transparent md:hover:bg-black text-black font-semibold md:hover:text-white py-2 px-4 border border-black md:hover:border-transparent duration-100">
                                <FontAwesomeIcon icon={faPlus} className="mx-1" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Select and other sections */}
                <div className="md:h-[60vh] flex flex-col md:w-2/6 w-full md:mx-2 mt-20 md:border-4 border-2 border-black">
                    <p className='text-xl md:text-3xl font-semibold my-4 text-center top-0 z-50 bg-white'>Save Them...</p>
                    <div className=" h-full">
                        <div className="h-full max-h-[435px] overflow-y-scroll flex flex-wrap justify-center">

                            {
                                selectees.length === 0 ? <NotFound /> : selectees.map((e, index) => {
                                    return (
                                        <div key={index} className="m-2 rounded-sm w-fit relative">

                                            <FontAwesomeIcon size='lg' className='absolute left-[90%] -top-2 cursor-pointer text-gray-600 md:hover:text-black' icon={faTimes} onClick={
                                                () => {
                                                    setSelectees(selectees.filter(a => a.name !== e.name));
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
						selectees.length !== 0 && hasAdmin ? (

							<div className="w-full flex justify-end p-2">
								{
									deleting ? <button onClick={handel_remove} className="bg-transparent md:hover:bg-black text-black font-semibold md:hover:text-white py-2 px-4 border border-black md:hover:border-transparent rounded duration-100 bottom-0"><svg aria-hidden="true" className="w-5 h-5 text-gray-200 animate-spin dark:text-black fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
										<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
									</svg></button> : <button onClick={handel_remove} className="bg-transparent md:hover:bg-black text-black font-semibold md:hover:text-white py-2 px-4 border border-black md:hover:border-transparent rounded duration-100 bottom-0"><FontAwesomeIcon icon={faCheck} className="mx-1" /></button>
								}
							</div>
						) : (
							<center>No admin user found!!</center>
						)
					}
                </div>

            </div>
            {/* Info box */}
            {subs.length !== 0 && subs[meme_index_count] !== undefined ? (
                <div className="mx-2 md:mx-20 my-5">
                    <h2 className='text-4xl font-semibold uppercase '>Info</h2>
                    <details>
                        <div className="flex justify-start md:flex-row flex-col gap-20 my-3">

                            <div>
                                <p className='text-2xl  font-semibold ' >Search Info</p>
                                <p>Sub-Reddit - {subreddit[0]}</p>
                                <p>Mode - {subreddit[1]}</p>
                                <p>Asked for - {subreddit[2]}</p>
                                <p>Get - {subs.length}</p>
                                <p>Request Time - {RequestTime}</p>
                            </div>

                            <div>
                                <p className='text-2xl  font-semibold ' >Post-info</p>
                                <p>Sub-Reddit - {subreddit[0]}</p>
                                <p>Name - {subs[meme_index_count].name} </p>
                                <p>Author - {subs[meme_index_count].author} </p>
                                <p>ID - {subs[meme_index_count].id}</p>
                                <p>Image Url - <a href={subs[meme_index_count].url}> {subs[meme_index_count].url.length > 25 ? subs[meme_index_count].url.slice(0, 25) + "..." : subs[meme_index_count].url}</a></p>
                                <p>Upvote_ratio - {subs[meme_index_count].upvote_ratio}</p>
                                <p>Score - {subs[meme_index_count].score}</p>
                                <p>Created_at - {subs[meme_index_count].created_at}</p>
                                <p>Title - {subs[meme_index_count].title}</p>
                            </div>

                            <div>
                                <p className='text-2xl  font-semibold ' >Selectees</p>
                                <p>{selectees.length === 0 ? "0 selectees found" : selectees.map(e => {
                                    return (
                                        <p key={e.name}>{e.name},</p>
                                    )
                                }
                                )}</p>
                            </div>
                        </div>
                    </details>
                </div>
            ) : ""
            }
            {/* debug box */}
            {/* <div className="mx-2 md:mx-20">
                <details className=''>
                    <summary className='my-3'>Debugger options</summary>
                    <button onClick={() => console.log(subs)} className="bg-transparent md:hover:bg-black text-black font-semibold md:hover:text-white py-2 px-4 border border-black md:hover:border-transparent mx-1 rounded duration-100 bottom-0">Log submissions</button>
                    <button onClick={() => console.log(meme_index_count)} className="bg-transparent md:hover:bg-black text-black font-semibold md:hover:text-white py-2 px-4 border border-black mx-1 md:hover:border-transparent rounded duration-100 bottom-0">Log memeIndexCounter</button>
                    <button onClick={() => console.log(selectees)} className="bg-transparent md:hover:bg-black text-black font-semibold md:hover:text-white py-2 px-4 border mx-1 border-black md:hover:border-transparent rounded duration-100 bottom-0">Log Selectees</button>
                    <button onClick={() => console.log(total_subs)} className="bg-transparent md:hover:bg-black text-black font-semibold md:hover:text-white py-2 px-4 border mx-1 border-black md:hover:border-transparent rounded duration-100 bottom-0">Log Total subs</button>
                </details>

            </div> */}
        </div >
    )



}

export default SubReddit

