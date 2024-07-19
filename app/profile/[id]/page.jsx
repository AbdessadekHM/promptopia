'use client'

import {useState, useEffect} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'

import Profile from '@/components/Profile'

const UserProfile = () => {
    const {id} = useParams();
    const [user, setUser] = useState({});

    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        const fetchUser = async ()=>{
        try {
            const response = await fetch(`/api/users/${id}`);
            const data = await response.json();
            setUser(data);
        } catch (error) {
        console.log("error",error) 
        }
        }
        fetchUser();
    },[]);
    useEffect(() => {  
        const fetchPosts = async (id)=>{
        try {
            const response = await fetch(`/api/users/${id}/posts`);
            const data = await response.json();
            setPosts(data);
        } catch (error) {
        console.log("error",error) 
        }
        }

        if(user._id) fetchPosts(user._id);
    },[user])
  return (
    <>
    <Profile
        name={user.username}
        desc="Welcome to your personalized profile page"
        data={posts}
    />
</>
  )
}

export default UserProfile;