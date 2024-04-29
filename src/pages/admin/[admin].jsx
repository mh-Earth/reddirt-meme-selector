import React, { useEffect, useState } from 'react'
import Alert from 'components/Alert'
import { useRouter } from 'next/router'
import Custom404 from 'components/Custom404';

const Admin = () => {

    const router = useRouter()
    const {admin}  = router.query

    const [username, setUsername] = useState("")
    const [alert, setAlert] = useState(false)
    const [deleteing, setDeleteing] = useState(false)
    const [loadding, setLoadding] = useState(true)
    const [alertType, setAlertType] = useState("primary")
    const [alertMassage, setAlertMassage] = useState("")
    
    const handel_alert = () => { setAlert(false) }

    useEffect(() => {

        fetch(`${process.env.NEXT_PUBLIC_SERVERNAME}/api/admin/adminpanel?api_key=${process.env.NEXT_PUBLIC_API_KEY}`, {
            method: "POST",
            body: JSON.stringify({"slug":admin}),
            headers: { "Content-Type": "application/json" }
        }).then((res) => res.json())
            .then((data) => {
                if (data.code !== 404) {
                    setUsername(data.username)
                    setLoadding(false)
                }
                else{
                    setLoadding(null)
                }

            }).catch((error) => {
                if (error.response && error.response.status) {  
                    trigger_alert('danger', `${error.response.status}!! Something went wrong`)
                } else {
                    trigger_alert('danger', ` ${'Failed to load Users'}`)
                }
            });
    }, [])


    const trigger_alert = (type, message) => {
        setAlert(true)
        setAlertType(type)
        setAlertMassage(message)
    }

    const handel_delete_admin = () => {
        let password = prompt(`Enter ${username}'s password`, "")
        if (password != null) {
            const data = {
                "password": password,
                "api_key": process.env.NEXT_PUBLIC_API_KEY
            }

            fetch(`${process.env.NEXT_PUBLIC_SERVERNAME}/api/admin`, {
                method: "DELETE",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            })
                .then((res) => res.status)
                .then((d) => {
                    console.log(d)
                    if (d == '401') {
                        trigger_alert('danger', 'Worng password. This action will be reported')
                    }
                    else {
                        trigger_alert('primany', 'Admin deleted!!')
                        router.push("/settings")
                    }
                }).catch((error) => {
                    console.log(error)
                    if (error.response && error.response.status) {
                        trigger_alert('danger', `${error.response.status}!! Something went wrong`)
                    } else {
                        console.log(error.response)
                        trigger_alert('danger', ` ${'Failed to save your change(s)'}`)
                    }
                });

        }
        else {
            trigger_alert('danger', 'Control your mouse bitch')

        }

    }


    const handel_delete_submissions = () => {
        setDeleteing(true)
        let password = prompt("Please enter your password", "");
        setDeleteing(false)
        if (password != null) {
            let sure = confirm("Are you sure? This cannot be undo.")
            if (sure) {
                const data = {
                    "password": password,
                    "api_key": process.env.NEXT_PUBLIC_API_KEY
                }

                fetch(`${process.env.NEXT_PUBLIC_SERVERNAME}/api/reset`, {
                    method: "DELETE",
                    body: JSON.stringify(data),
                    headers: { "Content-Type": "application/json" }
                })
                    .then((res) => res.status)
                    .then((d) => {
                        if (d == '401') {
                            setDeleteing(false);
                            trigger_alert('danger', 'Worng password. This action will be reported')

                        }
                        else {
                            setDeleteing(false);
                            trigger_alert('primary', 'Everything has been deleted!!')

                        }
                    }).catch((error) => {

                        if (error.response && error.response.status) {
                            setDeleteing(false)
                            trigger_alert('danger', `${error.response.status}!! Something went wrong`)
                        } else {
                            setDeleteing(false)
                            trigger_alert('danger', `Failed to delete ${error.response}`)
                        }
                    });
            }
        }

    }

    if (loadding){
        return(
            // TODO add a skeleton for loading
            <p></p>
        )
    }

    else if (loadding === null){
        return(
            <Custom404/>
        )
    }
    return (
        <>
            {alert ? <Alert handel_close={handel_alert} massage={alertMassage} type={alertType} /> : ""}
            <div className='p-3'>

                <div className="md:border-2 border-black p-4 md:p-8 my-2 md:shadow-lg ">
                    <p className='text-center mb-4 text-3xl font-semibold'>Admins</p>
                    <div className="flex justify-between items-center">
                        <div className="text-lg font-semibold text-gray-800">{username.toUpperCase()}</div>
                        {
                            deleteing ? <button onClick={handel_delete_admin} className="bg-transparent md:hover:bg-black text-black font-semibold md:hover:text-white py-2 px-4 border border-red-700 md:hover:border-transparent duration-100 bottom-0"><svg aria-hidden="true" className="w-5 h-5 mx-3 text-red-700 animate-spin dark:text-black fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg></button> : <button onClick={handel_delete_admin} className="bg-red-500 md:hover:bg-red-600 text-white font-semibold px-3 py-2  transition duration-300 ease-in-out">Delete</button>
                        }
                    </div>
                </div>
                <div className="md:border-2 border-red-700 my-2 p-4 md:p-8 md:shadow-lg">

                    <h1 className='md:text-3xl text-3xl font-semibold text-center mb-4 text-red-700' >Danger Zone</h1>
                    <div className="flex justify-between items-center ">
                        <div className="">
                            <p className='text-xl font-bold text-red-700' >Delete all savings</p>
                            <p className='text-red-700 leading-relaxed text-sm my-0'>This action will delete all your saving memes premanetly </p>
                        </div>

                        {
                            deleteing ? <button onClick={handel_delete_submissions} className="bg-transparent md:hover:bg-black text-black font-semibold md:hover:text-white py-2 px-4 border border-red-700 md:hover:border-transparent duration-100 bottom-0"><svg aria-hidden="true" className="w-5 h-5 mx-3 text-red-700 animate-spin dark:text-black fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg></button> : <button onClick={handel_delete_submissions} className="bg-red-500 md:hover:bg-red-600 text-white font-semibold px-3 py-2  transition duration-300 ease-in-out">Delete</button>
                        }
                    </div>
                </div>
            </div>
        </>
    )

}
export default Admin