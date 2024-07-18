'use client'

import {useState, useEffect} from 'react'
import PromptCard from './PromptCard'


const PromptCardList = ({data, handleClick})=>{
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post)=>{
       return <PromptCard 
        key={post._id} 
        post={post} 
        handleClick={handleClick}
       /> 
      })}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const handleSearchChange = (e) =>{

  }
  useEffect(()=>{
    const fetchPosts = async ()=>{
      try {
        const response = await fetch('/api/prompt');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
       console.log("error",error) 
      }
    }
    fetchPosts();
  },[]);
  
  return (
    <section className='feed'>
      <form action="" className='relative w-full flex-center'>
        <input 
          type="text" 
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      <PromptCardList 
        data={posts}
        handleClick={()=>{}}
      />
    </section>
  )
}

export default Feed