import React from 'react'
import { TextField } from '@mui/material';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

function ANKToken() {

  const style = {
    upperInput: `bg-[#20242A] rounded-2xl p-5 text-3xl  border border-[#20242A] hover:border-[#41444F]  flex justify-between`,
    inputbox: `bg-transparent placeholder:text-[#B2B9D2] outline-none mb-6 w-full text-2xl`,
    lowerInput: `bg-[#20242A] mb-3 rounded-2xl p-4 text-3xl  border border-[#20242A] hover:border-[#41444F]  flex justify-between`,
    btn: `bg-[#2172E5] my-2 rounded-2xl py-4 px-8 text-xl font-semibold flex items-center justify-center cursor-pointer border border-[#2172E5] hover:border-[#234169]`
  }

  return (
    <div className='flex justify-center mt-5'>
      <div className=' bg-slate-800 w-4/12 rounded-3xl flex flex-col'>
        <p className='ml-5 mt-5 font-semibold text-lg'>Swap</p>
        <div className="flex flex-col p-4">
          <div className={style.upperInput}>
            <input type="number" 
              placeholder='0.0'
              className={style.inputbox}
              pattern='^[0-9]*[.,]?[0-9]*$'
            />
          </div>
          <div className="flex justify-center items-center">
            <ArrowCircleDownIcon fontSize='large' className='m-0 p-0' />
          </div>
          <input type="number" 
            className={style.lowerInput}
            placeholder='0.0'
          />
          <button 
            className={style.btn}
          >
          Swap Tokens
          </button>
        </div>
      </div>
    </div>
  )
}

export default ANKToken