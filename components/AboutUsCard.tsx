import React from 'react'

interface AboutUsCardProps {
    title: string;
    description: string;
}

export default function AboutUsCard(props: AboutUsCardProps) {
  return (
    <div className='bg-gradient-to-r from-purple-400 via-pink-400 to-red-300 hover:from-purple-500 hover:via-pink-500 hover:to-red-400 transition duration-700 ease-in-out p-6 rounded-md shadow'>
        <h3 className='text-xl font-bold mb-2 text-white'>{props.title}</h3>
        <p className='text-zinc-100'>
            {props.description}
        </p>
    </div>
  )
}
