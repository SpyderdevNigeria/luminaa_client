import React from 'react'
import { CiFilter } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
import { IoFilterOutline } from "react-icons/io5";
type HeaderTabProps = {
    title:string,
}
function HeaderTab({title}:HeaderTabProps) {
  return (
    <div className='flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between my-4'>
        <h1 className='text-sm md:text-xl'>{title}</h1>

        <div className='flex flex-row items-center gap-3'>
            <div className='relative '>
                <IoSearch className='absolute left-2 top-[10px] text-lg' /> 
                <input type="text" placeholder='Search' className='w-full text-sm py-2 px-8 border border-[#727272] rounded-sm md:w-sm' />
                <div className='absolute right-2 top-2 text-sm flex flex-row items-center gap-4'>
                <span>⌘</span> <span>F</span>
                </div>
            </div>
            <div className=' text-sm  py-2 px-3 flex flex-row items-center gap-2  border border-[#727272] rounded-sm '>
                <IoFilterOutline className='text-base ' /> 
                <h4>Sort</h4>
            </div>

            <div className=' text-sm  py-2 px-3 flex flex-row items-center gap-2  border  border-[#727272] rounded-sm '>
                <CiFilter className='text-base ' /> 
                <h4>Filter</h4>
            </div>
        </div>
    </div>
  )
}

export default HeaderTab