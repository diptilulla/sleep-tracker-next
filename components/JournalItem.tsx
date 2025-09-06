'use client';
import { useState } from 'react';
import { Journal } from '@/types/Journal';
import Link from 'next/link';
import deleteJournalEntry from '@/app/actions/deleteJournalEntry';

const JournalItem = ({ entry }: { entry: Journal }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteEntry = async (entryId: string) => {
    setIsLoading(true); // Show loading spinner
    await deleteJournalEntry(entryId); // Perform delete operation
    setIsLoading(false); // Hide loading spinner
  };

  return (
    <li
      className={`flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-4 border-t border-t-gray-100 ${
        [
            "😵 Restless",
            "😰 Overwhelmed",
            "😟 Anxious",
            "😤 Frustrated",
            "😢 Sad",
            "😔 Lonely",
            "😡 Angry"
        ].includes(entry.mood)
          ? 'border-l-4 border-red-500'
          : 'border-l-4 border-green-500'
      }`}
    >
      <div className='flex flex-col'>
        <span className='text-sm text-gray-500'>
          {new Date(entry?.date).toLocaleDateString("en-US")}
        </span>
        <span className='text-md font-bold text-gray-600'>
            {entry?.title}
        </span>
        <span className='text-sm text-gray-600'>
          {entry?.mood}
        </span>
      </div>
      <div className='flex'>
        <Link href={`/journal/${entry.id}`}
          className='bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-600 transition cursor-pointer mr-2'
          aria-label='View journal entry'
        >
        🔍
        </Link>
        
    <button
        onClick={() => handleDeleteEntry(entry.id)}
        className={`bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition cursor-pointer ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        aria-label='Delete entry'
        disabled={isLoading} // Disable button while loading
      >
        {isLoading ? (
          <svg
            className='animate-spin h-5 w-5 text-white'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
            ></path>
          </svg>
        ) : (
          '✖'
        )}
      </button>
      </div>
      
    </li>
  );
};

export default JournalItem;