'use client'
import {useEffect, useState} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

import Form from '@/components/Form'

const EditPrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams(); 
    const {data: session} = useSession();
    const [submitting, setSubmitting] = useState(false);
    const promptId = searchParams.get('id');

    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    })

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();
            console.log(data)
            setPost({
                prompt: data.prompt,
                tag: data.tag,
            })
            console.log(promptId)
        }
        if(promptId){
            getPromptDetails();
            console.log("hello")
        }
    },[promptId])
    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if(!promptId) return alert("something went wrong, referesh the page");

        try {
           const response = await fetch(`/api/prompt/${promptId}`,{
            method: 'PATCH',
            body: JSON.stringify({
                prompt: post.prompt,
                tag: post.tag
            })
           }) 
           if(response.ok){
            router.push('/');
           }
        } catch (error) {
            console.log(error);
        }finally{
            setSubmitting(false);
        }
    }
  return (
    <Form 
        type = "Update"
        post = {post}
        setPost = {setPost}
        submitting = {submitting}
        handleSubmit = {updatePrompt}
    />
  )
}

export default EditPrompt