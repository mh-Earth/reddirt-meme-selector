import React from 'react'
import reddit_logo from "../../public/reddit.svg"
import Image from 'next/image'


const About = () => {
  return (
    <>
      <div className="h-[90vh] relative bg-slate-100 flex justify-center items-center selection:bg-red-700 text-white">
        <div className=" absolute w-5/6 h-5/6 backdrop-blur-sm ">
          <Image src={reddit_logo} fill alt='reddit logo' className='relative backdrop-opacity-50' />
        </div>
        <div className="flex justify-center items-center flex-col z-10">
          {/* <p className='text-2xl text-black' >THIS IS A MEME SELECTION APP FOR PERSONAL USE!!</p> */}
          
          <p className='text-4xl text-black font-semibold animate-bounce' >
            <a href="https://github.com/mh-Earth/reddirt-meme-selector#readme" target='_blank' >Click Here</a>
          </p>
        </div>

      </div>
    </>
  )
}

// "Welcome to my Reddit Meme Selector!

// About
// This Reddit Meme Selector is a personal project born out of my love for coding and internet culture. It's designed to be a fun way to explore and share the latest memes from Reddit.

// Why I Created This
// I'm passionate about coding and the world of internet memes, so I decided to combine the two into a unique tool. This project allows me to indulge in both interests while providing a platform for others to enjoy the best of Reddit's meme culture.

// What It Does
// Meme Selection
// You can browse various Reddit subreddits and handpick memes that resonate with you. Whether you're into wholesome memes, dank memes, or anything in between, this tool has something for everyone.

// Automatic Meme Collection
// For those with limited time, the tracking system automatically adds the highest upvoted meme from selected subreddits to the collection. It ensures a steady stream of fresh and popular memes without daily manual selection.

// Video Creation
// Once memes are chosen, a separate system compiles them into YouTube short videos. This adds another layer of entertainment, turning memes into shareable content for a wider audience.

// Demonstrating My Expertise
// Front-End
// I've utilized Next.js 12 and Tailwind CSS to create a seamless and responsive user interface. This ensures a smooth browsing experience, whether you're on a desktop or mobile device.

// Back-End
// Python scripts power the backend, ensuring efficient meme collection and tracking. This backend setup is designed for reliability and speed, so you're always presented with the latest memes.

// Automation
// Automatic daily uploads to my YouTube channel showcase my commitment to efficiency and convenience. You can rely on this tool to deliver a daily dose of hilarious and trending memes without fail.

// Why Reddit Memes?
// Reddit is a treasure trove of memes, constantly updated by a vibrant community. It's the perfect source for fresh, entertaining, and sometimes unexpected content that keeps us coming back for more.

// Get Started!
// Are you ready to dive into the world of Reddit memes and YouTube videos? Here's how to get started:

// Browse Memes: Explore different subreddits and discover memes that tickle your funny bone.

// Select Memes: Choose your favorites for automatic inclusion in the daily uploads. Your selections shape the content shared with the world.

// Automatic Uploads: Set up your YouTube channel details to enjoy automatic daily uploads. Sit back, relax, and let the memes come to you!

// Thank you for visiting my Reddit Meme Selector. I hope you enjoy the memes as much as I've enjoyed creating this project!"

export default About
