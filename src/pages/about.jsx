import React from 'react'


const About = () => {
  //   const colors = ["blue", "green", "pink", "purple","cyan","yellow"];
  // Get a random index
  // const randomIndex = Math.floor(Math.random() * colors.length);
  // Get the random item
  // const randomColor = colors[randomIndex];

  return (
    <div className=' _attach_bg p-10' >
      <div className="container  border text-white _bg_blur rounded-lg mx-auto px-4 py-8">

        <h1 className="text-3xl md:sticky top-1 text-center font-bold mb-4">About</h1>

        <p className="mb-4 text-lg">Welcome to the Reddit Meme Selector!</p>

        <h2 className="text-xl font-bold mb-2">Description</h2>
        <p className="mb-4">
          The Reddit Meme Selector is a personal project created out of a passion for coding and internet culture.
          This tool is designed to be a fun and efficient way to explore and share the latest memes from Reddit. And make short video out of them and upload it to Youtube
        </p>

        <h2 className="text-xl font-bold mb-2">Why I Created This</h2>
        <p className="mb-4">
          This project is born from a love for coding and the endless creativity of internet memes.
          By combining these interests, the Reddit Meme Selector offers a unique platform to indulge in both worlds.
          It's not just about memes; it's about connecting with the vibrant Reddit meme community and sharing the best of their content.
        </p>

        <h2 className="text-xl font-bold mb-2">Why Reddit Memes?</h2>
        <p className="mb-4">
          Reddit is a goldmine of memes, constantly refreshed by its vibrant community. It's the perfect source for fresh, entertaining, and sometimes unexpected content that keeps us coming back for more.
        </p>

        <h2 className="text-2xl font-bold mb-2">Features</h2>

        <h3 className="text-lg font-bold mb-2">Meme Selection</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Explore Reddit Subreddits: Browse through various Reddit subreddits and handpick memes that resonate with you.</li>
          <li>Wide Range of Memes: Whether you enjoy wholesome memes, dank memes, or any other genre, this tool has something for everyone.</li>
        </ul>

        <h3 className="text-lg font-bold mb-2">Automatic Meme Collection</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Effortless Collection: For busy users, the tracking system automatically adds the highest upvoted meme from selected subreddits to the collection.</li>
          <li>Always Fresh: This ensures a constant stream of fresh and popular memes without the need for daily manual selection.</li>
        </ul>

        <h3 className="text-lg font-bold mb-2">Video Creation</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>YouTube Short Videos: Once memes are selected, a separate system compiles them into entertaining YouTube short videos.</li>
          <li>Shareable Content: This adds another layer of fun and shareability, turning memes into content that can be easily shared with friends and a wider audience.</li>
        </ul>

        <h2 className="text-xl font-bold mb-2">Demonstrating My Expertise</h2>

        <h3 className="text-lg font-bold mb-2">Front-End</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Next.js 14: The website's front-end is built using Next.js 14, a powerful and modern framework for React.</li>
          <li>Tailwind CSS: Styling is done using Tailwind CSS, providing a clean and responsive user interface across all devices.</li>
        </ul>

        <h3 className="text-lg font-bold mb-2">Back-End</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Python Scripts: The backend is powered by Python Flask, ensuring efficient meme collection, tracking, and video creation.</li>
          <li>Reliable and Speedy: These backend scripts are designed for reliability and speed, guaranteeing users are presented with the latest and greatest memes.</li>
        </ul>

        <h3 className="text-lg font-bold mb-2">Automation</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Automatic Daily Uploads: Videos are automatically uploaded to my personal YouTube channel every day.</li>
          <li>Efficiency and Convenience: This demonstrates a commitment to efficiency and convenience, providing users with a daily dose of trending and hilarious memes without fail.</li>
        </ul>


        <p>
          Thank you for visiting the Reddit Meme Selector. Enjoy the memes as much as I've enjoyed creating this project!
        </p>

        <p className="text-gray-600 text-sm mt-8">Apologies for any mistakes in the content or functionality of this site.
          <span>
            <a href="https://github.com/mh-Earth/reddirt-meme-selector" target="_blank" rel="noopener noreferrer"> git-repo </a>
          </span>
        </p>
      </div>
    </div>
  )
}


export default About
