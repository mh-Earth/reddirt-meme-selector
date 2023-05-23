import React from 'react'
import EmptyViewer from 'components/EmptyViewer'
const Loading = () => {
    return (
        <div className="flex flex-col">


            <div className="flex flex-col md:flex-row justify-evenly gap-10 ">
                <div className='w-fit'>
                    <EmptyViewer />

                    <div className="w-full flex justify-between ">
                        <div className=" md:ml-20 ">
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
                <div className=" md:h-[60vh] md:flex hidden flex-col md:w-2/6 w-full mx-2 mt-20 border-4 border-black">
                    <p className='text-xl md:text-4xl font-semibold my-4 text-center sticky top-0 z-50 bg-white'>Selected Memes</p>
                    <div className=" h-full p-2">
                        <div className="h-full flex flex-wrap justify-center bg-slate-700 animate-pulse">

                        </div>
                    </div>
                    {/* save button */}
                </div>

            </div>
        </div >
    )
}

export default Loading
// animate-pulse
// 