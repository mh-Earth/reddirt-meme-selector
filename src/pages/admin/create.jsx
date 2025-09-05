import React, { useState } from 'react'
import Alert from 'components/Alert'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
    username: z.string().min(3, { message: 'Username must contain at most 3 character(s)' }).max(16, { message: 'Username cannot contain more then 16 character(s)' }),
    password: z.string().min(16, { message: 'Password must contain at most 16 character(s)' }).max(32, { message: 'Password cannot contain more then 32 character(s)' })
});

const Create = () => {
    const [alert, setAlert] = useState(false)
	const [alertType, setAlertType] = useState("primary")
	const [alertMassage, setAlertMassage] = useState("")
	const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    });
    const trigger_alert = (type, message) => {
        setAlert(true)
        setAlertType(type)
        setAlertMassage(message)
    }
	const handel_alert = () => { setAlert(false) }



    const handel_create = (FormData) => {
        // e.preventDefault()

        const data = {
            'username': FormData.username,
            'password': FormData.password,
            "api_key": process.env.NEXT_PUBLIC_API_KEY
        }

        fetch(`${process.env.NEXT_PUBLIC_SERVERNAME}/admin/create`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        })
            .then((res) => res.status)
            .then((d) => {
                if (d != '200') {
                    trigger_alert('danger', 'Fail to add admin.')
                }
                else {
                    trigger_alert('primany', 'Admin created')
                    router.push('/settings')

                }
            }).catch((error) => {

                if (error.response && error.response.status) {
                    console.log(error.response)
                    trigger_alert('danger', `${error.response.status}!! Something went wrong`)
                } else {
                    console.log(error.response)
                    trigger_alert('danger', ` ${'Failed to save your change(s)'}`)
                }
            });
    }


    return (

        <>
            {alert ? <Alert handel_close={handel_alert} massage={alertMassage} type={alertType} /> : ""}

            <section className="text-gray-600 body-font relative border-2 w-fit mx-auto my-10 border-black">
                <div className="container px-5 py-24 mx-auto border-2">
                    <div className="flex flex-col text-center w-full mb-5">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Create an admin user</h1>
                    </div>
                    <form onSubmit={handleSubmit(handel_create)} className="lg:w-1/2 md:w-2/3 mx-auto">
                        <div className="flex flex-wrap -m-2">
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="username" className="leading-7 text-base font-semibold text-black">Username</label>
                                    <input {...register('username')} id="username" name="username" className="w-full bg-gray-100 bg-opacity-50  border border-gray-300 focus:border-black focus:bg-white text-base outline-none text-gray-700 py-2 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" />
                                    {errors.username && <p className='text-red-700'>{errors.username.message}</p>}
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="password" className="leading-7 text-base font-semibold text-black">Password</label>
                                    <input {...register('password')} type="password" id="password" name="password" className="w-full bg-gray-100 bg-opacity-50  border border-gray-300 focus:border-black focus:bg-white text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    {errors.password && <p className='text-red-700'>{errors.password.message}</p>}
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <button onClick={handel_create} className="flex mx-auto text-black bg-transparent font-semibold border-2 border-black py-1 px-8 focus:outline-none md:hover:text-white transition md:hover:bg-black text-lg">Create</button>
                            </div>

                        </div>
                    </form>
                </div>
            </section>
        </>
    )

}



export default Create