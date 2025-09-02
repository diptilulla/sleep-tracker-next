import Guest from '@/components/Guest';
import { currentUser } from '@clerk/nextjs/server';
import React from 'react'

export default async function HomePage() {
  const user = await currentUser();
  console.log('User on HomePage:', user);
  if(!user) {
    return <Guest/>;
  }
  return (
    
    <div className='text-red-100'>HomePage</div>
  )
}
