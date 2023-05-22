import React from 'react'
import EmptyViewer from 'components/EmptyViewer'
const Loading = () => {
    return (
        <div className="flex flex-col">


            <div className="flex flex-col md:flex-row justify-evenly gap-10 ">
                <div className='w-fit p-2 '>
                    <EmptyViewer />

                    <div className="w-full flex justify-between ">
                        <div className=" md:ml-24 ">
                            <button className=" p-1 bg-transparent text-black font-semibold border border-black   duration-100 border-r-0  animate-pulse">
                                <div className="bg-slate-700 py-4 px-8"></div>
                                {/* Prev */}
                            </button>
                            <button className=" p-1 bg-transparent  text-black font-semibold border border-black   duration-100 border-l-0  animate-pulse">
                                <div className="bg-slate-700 py-4 px-8"></div>

                                {/* Next */}
                            </button>
                        </div>
                        <div className="">
                            <button className=" p-1 bg-transparent   text-black font-semibold  border border-black  duration-100  animate-pulse">
                                <div className="bg-slate-700 py-4 px-8"></div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Select and other sections */}
                <div className="md:h-[60vh] flex flex-col md:w-2/6 w-full mx-2 mt-20 border-4 border-black">
                    <p className='text-xl md:text-4xl font-semibold my-4 text-center sticky top-0 z-50 bg-white'>Selected Memes</p>
                    <div className=" h-full p-2">
                        <div className="h-full flex flex-wrap justify-center bg-slate-700 animate-pulse">

                        </div>
                    </div>
                    {/* save button */}
                </div>

            </div>
            {/* Info box */}
            <div className="mx-2 md:mx-20">
                <h2 className='text-4xl font-semibold uppercase '>Info</h2>
                <details>
                    <div className="flex justify-start md:flex-row flex-col gap-20 my-3">

                        <div>
                        </div>

                        <div>
                        </div>

                        <div>
                            <p className='text-2xl  font-semibold ' >Selectees</p>
                        </div>
                    </div>
                </details>
            </div>

        </div >
    )
}

export default Loading
// animate-pulse