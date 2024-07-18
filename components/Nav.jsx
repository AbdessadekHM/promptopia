"use client";

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'

const Nav = () => {
  const isUserLoggedIn = false;
  const {data: session} = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(()=>{
    const setAppProviders = async ()=>{
      const response = await getProviders();
      setProviders(response)
      console.log(response)
      console.log(session)
    }

    setAppProviders();
  },[])
  return (
    <nav className="w-full pt-3 mb-16 flex-between">
      <Link href="/" className="flex gap-2 flex-center">
        <Image 
        src="/assets/images/logo.svg" 
        alt="Promptpia Logo" 
        width={30} 
        height={30}
        className="object-contain"
        />
        <p className="logo_text">
          Promptpia
        </p>
      </Link> 
      {/* Desktop Navigation */}
      <div className="hidden sm:flex">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image} 
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
                onClick={()=> {
                  console.log("clicked")
                  setToggleDropDown((prev)=> !prev)
                }}
              />
            </Link>
          </div>
        ):(
          <>
           {providers && 
            Object.values(providers).map((provider)=>(
              <button
                type="button"
                key={provider.name}
                onClick={()=> signIn(provider.id)}
                className="black_btn" 
              >
                {provider.name}
              </button>
            ))}
          </>
        )}
      </div>
      <div className="relative flex sm:hidden">
       {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image} 
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={()=>{
                setToggleDropDown((prev)=>!prev)
              }}
            />

            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={()=> setToggleDropDown(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={()=> setToggleDropDown(false)}
                >
                  Create Prompt
                </Link>

                <button
                  type="button"
                  onClick={()=>{
                    setToggleDropDown(false);
                    signOut();
                  }}
                  className="w-full mt-5 black_btn"
                >
                  Sign Out
                </button>
              </div>

            )}
          </div>
       ):(
          <>
           {providers && 
            Object.values(providers).map((provider)=>(
              <button
                type="button"
                key={provider.name}
                onClick={()=> signIn(provider.id)}
                className="black_btn" 
              >
                Sign IN
              </button>
            ))}
          </>
       )} 
      </div>
      {/* Mobile Navigation */}
    </nav>
  )
}

export default Nav