import React, { useState } from 'react'

const settings = () => {


	const [Limit, setLimit] = useState(50)
	const [mode, setMode] = useState()

	const handel_limit = (e) => {

		setLimit(e.target.value)

	}

	const handel_modes = (e) =>{
		setMode(e.target.value)
		console.log(mode)


	}

	return (
		<div className='flex w-full justify-center items-center flex-col '>
			<form action="" method="post" className="container border-2 border-black p-8">

				<h1 className='text-4xl font-semibold text-center mb-2' >Settings</h1>
				<div className="">
					<p className='text-2xl font-medium underline' >Select Limit</p>
					<div className="flex items-center">
						<label className='text-xl m-2' htmlFor="limit">Limit</label>
						<input onChange={handel_limit} className='' type="range" name="limit" id="limit" min="10" max="100" value={Limit} />
						<p className='text-xl font-semibold mx-2' >{Limit}</p>
					</div>
					<div>
						<p className='text-2xl font-medium underline'>Select Mode</p>
						<div className="flex">
							<div onClick={handel_modes}  className="text-xl font-semibold">
								<input className='m-2' type="radio" id="new" name="mode" value="new" />
								<label htmlFor="new">New</label>
							</div>
							<div onClick={handel_modes} className="text-xl font-semibold">
								<input className='m-2' type="radio" id="day" name="mode" value="day"/>
								<label htmlFor="day">Day</label>
							</div>
							<div onClick={handel_modes} className="text-xl font-semibold">
								<input className='m-2' type="radio" id="hot" name="mode" value="hot" />
								<label htmlFor="hot">Hot</label>
							</div>
							<div onClick={handel_modes} className="text-xl font-semibold">
								<input className='m-2' type="radio" id="rising" name="mode" value="rising" />
								<label htmlFor="rising">Rising</label>
							</div>
						</div>

					</div>
				</div>
				<div className="w-full flex justify-end">

					<button className="bg-transparent hover:bg-black text-black font-semibold hover:text-white py-1 px-4 border border-black hover:border-transparent  duration-100">
					{mode}
					</button>
				</div>
			</form>

		</div>
	)
}

export default settings
