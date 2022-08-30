import React, { useState, useEffect } from 'react'
import { TextField } from '@mui/material';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import artifacts from "../../hardhat/artifacts/contracts/ANKToken.sol/TokenSwap.json";
import { ethers } from "ethers";


function ANKToken() {

  const style = {
    upperInput: `bg-[#20242A] rounded-2xl p-5 text-3xl  border border-[#20242A] hover:border-[#41444F]  flex justify-between`,
    inputbox: `bg-transparent placeholder:text-[#B2B9D2] outline-none mb-6 w-full text-2xl`,
    lowerInput: `bg-[#20242A] mb-3 rounded-2xl p-4 text-3xl  border border-[#20242A] hover:border-[#41444F]  flex justify-between`,
    btn: `bg-[#2172E5] my-2 rounded-2xl py-4 px-8 text-xl font-semibold flex items-center justify-center cursor-pointer border border-[#2172E5] hover:border-[#234169]`
  }


  const [connected, isConnected] = useState(false)
  const [celoAmount, setCeloAmount] = useState(0)
  const [tokenAmount, setTokenAmount] = useState(0)

  const deployedAddress = "0xEA7Cbd82F19abBBb46C0d38302e2647929701E0c"
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const ABI = artifacts.abi


  const connectWallet = async () => {
    try{
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.request({ method: 'eth_requestAccounts' })
        isConnected(true)
      }
    }catch(error){
      console.log("Wallet Connection Error: ", error)
    }
  }

  useEffect(() => {
    let DANKTokenPrice: number = 0.001;
    setCeloAmount(DANKTokenPrice * tokenAmount)
  }, [tokenAmount])

  useEffect(() => {
    setTokenAmount(1000 * celoAmount)
  }, [celoAmount])

  const Swap = async () => {
    const contract = await new ethers.Contract(deployedAddress, ABI, signer)
    try{
      const myAddress = await signer.getAddress()

      console.log(myAddress)

      const buy = await contract.Buy(myAddress, tokenAmount)

    }catch(error){
      console.log("Swap Token Error: ", error)
    }
  }

  useEffect(() => {
    const Asset = async () => {
      const tokenSymbol = "ANK"    // Token Symbol
      const tokenDecimals = 0.3   
      try {
        const wasAdded = window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20', 
            options: {
              address: deployedAddress, 
              symbol: tokenSymbol, 
              decimals: tokenDecimals,
            },
          },
        });
          
        if (wasAdded) {
          console.log('Thanks for your interest!');
        } else {
          console.log('Your loss!');
        }
      } catch (error) {
        console.log(error)
      }
    }
    Asset()
  }, [connected])

  return (
    <div className='flex justify-center mt-5'>
      <div className=' bg-slate-800 w-4/12 rounded-3xl flex flex-col'>
        <p className='ml-5 mt-5 font-semibold text-lg'>Swap</p>
        <div className="flex flex-col p-4">
          <div className={style.upperInput}>
            <input type="number" 
              placeholder='Celo'
              className={style.inputbox}
              pattern='^[0-9]*[.,]?[0-9]*$'
              onChange={(e) => setCeloAmount(e.target.value)}
              value={celoAmount}
            />
          </div>
          <div className="flex justify-center items-center">
            <ArrowCircleDownIcon fontSize='large' className='m-0 p-0' />
          </div>
          <input type="number" 
            className={style.lowerInput}
            placeholder='ANK Token'
            onChange={(e) => setTokenAmount(e.target.value)}
            value={tokenAmount}
          />
          <div className="current">
            <p>1 ANK = 0.001 Celo</p>
          </div>
          {connected ? 
            <button className={style.btn} onClick={Swap}>Swap Tokens</button> : 
            <button className={style.btn} onClick={connectWallet}>Connect Wallet</button>
          }
        </div>
      </div>
    </div>
  )
}

export default ANKToken