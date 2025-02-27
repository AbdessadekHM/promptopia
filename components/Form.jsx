import Link from 'next/link'
import { useEffect } from 'react'


const Form = ({type, post, setPost, submitting, handleSubmit}) => {
  useEffect(() => {
    if(type == "Update"){
      console.log({
        prompt: post.prompt,
        tag: post.tag
      })
    }
  },[])
  return (
    <section className="flex-col w-full max-w-full flex-start">
      <h1 className='text-left head_text'>
        <span className="blue_gradient">
          {type} Post
        </span>
      </h1>
      <p className='max-w-md text-left desc'>
        {type} & Share Amazing Prompts with the world, and let your imagination run wild with any ai powered plateform
      </p>
      <form 
       action=""
       onSubmit={handleSubmit}
       className='flex flex-col w-full max-w-2xl mt-10 gap-7 glassmorphism'
      >
        <label htmlFor="">
          <span className='text-base font-bold text-gray-700 font-satoshi'>
            Your AI Prompt
          </span>

          <textarea
           value={post.prompt}  
           onChange={(e)=>setPost({
            ...post,
            prompt: e.target.value 
           })}
           placeholder='Write Your Prompt Here'
           required
           className='form_textarea'
          />
        </label>

        <label htmlFor="">
          <span className='text-base font-bold text-gray-700 font-satoshi'>
            Tag
          </span>
           <span>(#product, #webdevelopement, #idea)</span>
          <input
           value={post.tag}  
           onChange={(e)=>setPost({
            ...post,
            tag: e.target.value 
           })}
           placeholder='#tag'
           required
           className='form_input'
          />
        </label>
        <div className='gap-4 mx-3 mb-5 flex-end'>
           <Link href="/" className='text-sm text-gray-500'>
            Cancel
           </Link>
           <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
           >
            {submitting ? `${type}...` : type}
           </button>
        </div>
      </form>
    </section>
  )
}

export default Form