import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Alert from 'components/Alert'

const Settings = () => {


	const [Limit, setLimit] = useState(0)
	const [mode, setMode] = useState()
	const [is_reversed, setIs_reversed] = useState(false)
	const [saving, setSaving] = useState(false)
	const [reseting, setReseting] = useState(false)
	const [hasAdmin,setHasAdmin] = useState()
	const [alert, setAlert] = useState(false)
	const [alertType, setAlertType] = useState("primary")
	const [alertMassage, setAlertMassage] = useState("")
	const router = useRouter()

	useEffect(() => {


		fetch(`${process.env.NEXT_PUBLIC_SERVERNAME}/api/settings?api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
			.then((res) => res.json())
			.then((data) => {
				setLimit(data.limit)
				setMode(data.mode)
				setIs_reversed(data.is_reversed)

			}).catch((error) => {
				if (error.response && error.response.status) {
					setSaving(false)
					trigger_alert('danger', `${error.response.status}!! Something went wrong`)
				} else {
					setSaving(false)
					trigger_alert('danger', ` ${'Failed to load your settings'}`)
				}
			});

		fetch(`${process.env.NEXT_PUBLIC_SERVERNAME}/api/admin/check?api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
			.then((res) => res.json())
			.then((data) => {
				setHasAdmin(data.admin)
			});
	}, [])

	const handel_limit = (e) => { setLimit(e.target.value) }
	const handel_modes = (e) => { setMode(e.target.value) }
	const handel_is_reversed = (e) => { setIs_reversed(!is_reversed) }
	const handel_alert = () => { setAlert(false) }

	const handel_admin_view = () => {
		let password = prompt("Enter Password", "")
		if (password != null) {
			// get a gentarated url 
			const data = {"password":password}
			fetch(`${process.env.NEXT_PUBLIC_SERVERNAME}/api/admin/genarate_url?api_key=${process.env.NEXT_PUBLIC_API_KEY}`, {
				method: "POST",
				body: JSON.stringify(data),
				headers: { "Content-Type": "application/json" }
			}).then((res) => res.json())
				.then((data) => {
					if (data.slug === undefined){
						setReseting(false)
						trigger_alert("danger","Worng password!!")

					}
					else{
						router.push(`admin/${data.slug}`)

					}

				}).catch((error) => {
					if (error.response && error.response.status) {
						setReseting(false)
						trigger_alert('danger', `${error.response.status}!! Something went wrong`)

					} else {
						setReseting(false)
						trigger_alert('danger', ` ${'Failed to load your settings'}`)
					}
				});
		}

	}


	const trigger_alert = (type, message) => {
		setAlert(true)
		setAlertType(type)
		setAlertMassage(message)
	}

	const handel_reset = () => {
		setReseting(true)
		fetch(`${process.env.NEXT_PUBLIC_SERVERNAME}/api/settings?api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
			.then((res) => res.json())
			.then((data) => {
				setLimit(data.limit)
				setMode(data.mode)
				setIs_reversed(data.is_reversed)
				setReseting(false)

			}).catch((error) => {
				if (error.response && error.response.status) {
					setReseting(false)
					trigger_alert('danger', `${error.response.status}!! Something went wrong`)

				} else {
					setReseting(false)
					trigger_alert('danger', ` ${'Failed to load your settings'}`)
				}
			});
	}
	const handel_save = () => {
		setSaving(true);
		const data = {
			"limit": Limit,
			"mode": mode,
			"is_reversed": is_reversed,
			"api_key": process.env.NEXT_PUBLIC_API_KEY
		}

		fetch(`${process.env.NEXT_PUBLIC_SERVERNAME}/api/settings`, {
			method: "POST",
			body: JSON.stringify(data),
			headers: { "Content-Type": "application/json" }
		})
			.then((res) => res.status)
			.then((d) => {
				setSaving(false);
				router.replace('/')
			}).catch((error) => {

				if (error.response && error.response.status) {
					setSaving(false)
					trigger_alert('danger', `${error.response.status}!! Something went wrong`)
				} else {
					setSaving(false)
					trigger_alert('danger', ` ${'Failed to save your change(s)'}`)
				}
			});

	}

	const handel_create_admin = () =>{
		router.push('admin/create')
	}


	return (
		<>
			{alert ? <Alert handel_close={handel_alert} massage={alertMassage} type={alertType} /> : ""}
			<div className='my-10 flex w-full justify-center items-center flex-col p-2'>

				<div className="container md:border-2 border-black p-4 md:p-8 md:shadow-lg">

					<h1 className='text-3xl font-medium text-center mb-2' >Modifiy you search type</h1>
					<div className="">
						<p className='md:text-xl text-lg font-medium' >Limit</p>
						<div className="flex items-center mb-1">
							<label className='text-xl m-2' htmlFor="limit">Limit</label>
							<input onChange={handel_limit} value={Limit} className='w-full cursor-pointer' type="range" name="limit" id="limit" min="10" max="100" />
							<p className='text-xl font-medium mx-2' >{Limit}</p>
						</div>
						<div>
							<p className='md:text-xl text-xl mb-2 font-medium'>Mode</p>
							<div className="flex justify-between md:justify-normal">
								<div onClick={handel_modes} className="text-xl font-medium">
									<input onChange={() => { }} className='mx-2 cursor-pointer' type="radio" id="new" name="mode" value="new" checked={mode === "new"} />
									<label className={`${mode === 'new' ? 'text-blue-700/90' : 'text-black'}`} htmlFor="new">New</label>
								</div>
								<div onClick={handel_modes} className="text-xl font-medium">
									<input onChange={() => { }} className='mx-2 cursor-pointer' type="radio" id="day" name="mode" value="day" checked={mode === "day"} />
									<label className={`${mode === 'day' ? 'text-blue-700/90' : 'text-black'}`} htmlFor="day">Day</label>
								</div>
								<div onClick={handel_modes} className="text-xl font-medium">
									<input onChange={() => { }} className='mx-2 cursor-pointer' type="radio" id="hot" name="mode" value="hot" checked={mode === "hot"} />
									<label className={`${mode === 'hot' ? 'text-blue-700/90' : 'text-black'}`} htmlFor="hot">Hot</label>
								</div>
								<div onClick={handel_modes} className="text-xl font-medium">
									<input onChange={() => { }} className='mx-2 cursor-pointer' type="radio" id="rising" name="mode" value="rising" checked={mode === "rising"} />
									<label className={`${mode === 'rising' ? 'text-blue-700/90' : 'text-black'}`} htmlFor="rising">Rising</label>
								</div>
							</div>

						</div>
					</div>
					<h1 className='mb-2' ></h1>
					<div className="">
						<p className='md:text-xl text-xl font-medium'>Order</p>
						<div onClick={handel_is_reversed} className="text-xl font-medium mx-4">
							<label title='For something i cannot tell (TODO)' htmlFor="is_reversed">Reversed</label>
							<input onChange={() => { }} className='mx-2 cursor-pointer' type="checkbox" id="is_reversed" name="is_reversed" checked={is_reversed} />
						</div>
						<div>

						</div>
					</div>
					<div className="w-full gap-3 flex justify-end mt-5 mt:my-auto">


						{
							reseting ? <button onClick={handel_reset} className="bg-transparent md:hover:bg-black text-black font-semibold md:hover:text-white py-2 px-4 border border-gray-600 md:hover:border-transparent duration-100 bottom-0"><svg aria-hidden="true" className="w-5 h-5 mx-3 text-gray-200 animate-spin dark:text-black fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
								<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
							</svg></button> : <button onClick={handel_reset} className="bg-transparent md:hover:bg-green-800 text-black font-semibold md:hover:text-white py-2 px-4 border border-green-800 md:hover:border-transparent duration-100 bottom-0">Reset</button>
						}

						{
							saving ? <button onClick={handel_save} className="bg-transparent md:hover:bg-black text-black font-semibold md:hover:text-white py-2 px-4 border border-gray-600 md:hover:border-transparent duration-100 bottom-0"><svg aria-hidden="true" className="w-5 h-5 mx-3 text-gray-200 animate-spin dark:text-black fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
								<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
							</svg></button> : <button onClick={handel_save} className="bg-transparent md:hover:bg-red-800 text-black font-semibold md:hover:text-white py-2 px-4 border border-red-800 md:hover:border-transparent duration-100 bottom-0">Save</button>
						}
					</div>
				</div>
				{ hasAdmin ? (
					<div className="container md:border-2 border-red-700 m-4 p-4 md:p-7 md:shadow-lg">

					<div className="flex w-full justify-between items-center">
						<div>
							<p className='text-xl font-bold ' >Admin Panel</p>
							<p className='leading-none text-sm text-gray-600 my-0'>Only authorized user can visit this page</p>
						</div>

						<button onClick={handel_admin_view} className="bg-transparent text-black font-semibold  py-2 px-4 border border-black md:hover:border-black duration-100 bottom-0">View</button>

					</div>

				</div>

				):
				(
					<div className="container md:border-2 border-green-700 m-4 p-4 md:p-7 md:shadow-lg">

					<div className="flex w-full justify-between items-center">
						<div>
							<p className='text-xl font-bold ' >Add Admin</p>
							{/* <p className='leading-none text-sm text-gray-600 my-0'>Add Admin</p> */}
						</div>

						<button onClick={handel_create_admin} className="bg-transparent text-black font-semibold  py-2 px-4 border border-black md:hover:border-black duration-100 bottom-0">Add</button>

					</div>

				</div>
					
				)

				}

			</div>
		</>

	)
}

export default Settings
