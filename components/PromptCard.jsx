'use client'
import {useState} from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
const PromptCard = ({post, handleTagClick, handleEdit, handleDelete}) => {
  const [copied, setCopied] = useState("");

  const {data:session} = useSession();

  const pathName = usePathname();

  const router = useRouter();
  
  const handleCopy =  ()=>{

    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(()=>setCopied(''),3000);
  }
  const handleProfileClick = () => {
    if(post.creator._id !== session?.user.id){
      router.push(`/profile/${post.creator._id}`);
    }
    router.push('/profile')
  }
  return (
    <div className="prompt_card">
      <div className='flex items-start justify-between gap-5'>
        <div className='flex items-center justify-start flex-1 gap-3 cursor-pointer'>
          <Image 
            src={post.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='object-contain rounded-full'
            onClick={handleProfileClick}
          />
          <div className='flex flex-col'>
            <h3 className='font-bold text-gray-900 font-satoshi'>
              @{post.creator.username}
              <p className='text-sm text-gray-500 font-inter'>
                {post.creator.email}
              </p>
            </h3>
          </div>
        </div>
        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={copied === post.prompt
              ? '/assets/icons/tick.svg'
              : '/assets/icons/copy.svg'
            }
            alt='copy'
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className='my-4 text-sm text-gray-700 font-satoshi '>
        {post.prompt}
        
      </p>
      <p className='text-sm cursor-pointer font-inter blue_gradient'
        onClick={()=>handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
      {session?.user.id === post.creator._id && 
      pathName==='/profile' &&(
        <div className='gap-4 pt-3 mt-5 border-t border-gray-100 flex-center'>
          <p
            className='text-sm cursor-pointer font-inter green_gradient'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='text-sm cursor-pointer font-inter orange_gradient'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard