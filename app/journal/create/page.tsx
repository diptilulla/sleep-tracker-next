'use client';

import addJournalEntry from '@/app/actions/addJournalEntry';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useRef, useState } from 'react'
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false }); //to disable server side rendering for this component

export default function JournalEntry() {
  const formRef = useRef<HTMLFormElement>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null); // State for alert message
  const [alertType, setAlertType] = useState<'success' | 'error' | null>(null); // State for alert type
  const [isLoading, setIsLoading] = useState(false); // State for loading spinner
  const [mood, setMood] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const clientAction = async (formData: FormData) => {
    setIsLoading(true); // Show spinner
    setAlertMessage(null); // Clear previous messages

    formData.set('mood', mood); // Add the selected sleep quality to the form data
    formData.set('title', title); // Add the selected sleep quality to the form data
    formData.set('content', content); // Add the selected sleep quality to the form data
    const { error } = await addJournalEntry(formData); // Removed `data` since it's unused

    if (error) {
      setAlertMessage(`Error: ${error}`);
      setAlertType('error'); // Set alert type to error
    } else {
      setAlertMessage('Sleep record added successfully!');
      setAlertType('success'); // Set alert type to success
      formRef.current?.reset();
      setMood(''); // Reset the mood
      setContent(''); // Reset the content
      setTitle(''); // Reset the title
    }

    setIsLoading(false); // Hide spinner
  };
  return (
    <div className='max-w-3xl mx-auto p-4'>
        <Link href='/journal' className='text-sm text-purple-600 hover:underline'>
            &larr; Back to Journal
        </Link>
        <h2 className='text-3xl font-bold mt-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent'>
            What's on your mind?
        </h2>
        <form 
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(formRef.current!);
            console.log('Form Data:', Object.fromEntries(formData.entries())); // Debugging line  
            clientAction(formData);
          }}
          className='space-y-6'
        >
        {/* Title */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your entry a title..."
            className='block w-full border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 px-4 py-2'
          />
          {/* {!title && <p className="text-red-500 text-sm">Title is required</p>} */}
        </div>

         <div className="space-y-2">
          <label className="text-sm font-medium">Date</label>
          <input
            type='date'
            name='date'
            id='date'
            className='block w-full border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 px-4 py-2'
            placeholder='Select a date'
            required
            onFocus={(e) => e.target.showPicker()} // Open the calendar on focus
            />
        </div>

        {/* Mood */}
        <div className="space-y-2">
          <label className="text-sm font-medium">How are you feeling?</label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className='block w-full border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 px-4 py-2'
          >
            <option value="">Select a mood...</option>
            <option value="🤗 Overjoyed">🤗 Overjoyed</option>
            <option value="🏆 Accomplished">🏆 Accomplished</option>
            <option value="✨ Inspired">✨ Inspired</option>
            <option value="❤️ Loved">❤️ Loved</option>
            <option value="🙏 Appreciated">🙏 Appreciated</option>
            <option value="💪 Motivated">💪 Motivated</option>
            <option value="😊 Happy">😊 Happy</option>
            <option value="🎨 Creative">🎨 Creative</option>
            <option value="📸 Nostalgic">📸 Nostalgic</option>
            <option value="😵 Restless">😵 Restless</option>
            <option value="😰 Overwhelmed">😰 Overwhelmed</option>
            <option value="😟 Anxious">😟 Anxious</option>
            <option value="😤 Frustrated">😤 Frustrated</option>
            <option value="😢 Sad">😢 Sad</option>
            <option value="😔 Lonely">😔 Lonely</option>
            <option value="😡 Angry">😡 Angry</option>
          </select>
          {/* {!mood && <p className="text-red-500 text-sm">Mood is required</p>} */}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            {mood ? `Write about why you feel ${mood.toLowerCase()}...` : "Write your thoughts..."}
          </label>
          <ReactQuill
            readOnly={isLoading} // Disable editor while loading
            theme="snow"
            value={content}
            onChange={setContent}
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["blockquote", "code-block"],
                ["link"],
                ["clean"],
              ],
            }}
          />
          {/* {!content && <p className="text-red-500 text-sm">Content is required</p>} */}
        </div>


        {/* Buttons */}
         <button
            type='submit'
            className='bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white px-4 py-2 rounded-md font-medium shadow-md transition flex items-center justify-center cursor-pointer'
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
              'Publish Entry'
            )}
          </button>
      </form>

        {/* Alert Message */}
        {alertMessage && (
          <div
            className={`mt-4 p-3 rounded-md text-sm ${
              alertType === 'success'
                ? 'bg-green-100 text-green-800 border border-green-300'
                : 'bg-red-100 text-red-800 border border-red-300'
            }`}
          >
            {alertMessage}
          </div>
        )}
    </div>
  )
}

