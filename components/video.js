"use client";
import { useEffect, useRef, useState } from 'react';

export default function VideoCover() {
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Play the first video once it's loaded
    video1Ref.current.addEventListener('loadedmetadata', () => {
      video1Ref.current.play();
    });
    
    setTimeout(() => {
        setShowText(true);
    }, 2000);

    // When the first video ends, play the second video and show text after 2 seconds
    video1Ref.current.addEventListener('ended', () => {
      video1Ref.current.style.display = 'none'; // Hide the first video
      video2Ref.current.style.display = 'block'; // Show the second video
      video2Ref.current.play(); // Start playing the second video

    });
  }, []);

  return (
    <div className='text-white'>
      <div className="video-container" style={{ position: 'relative' }}>
        <video ref={video1Ref} src="/video/part1.mp4" muted autoPlay style={{ width: '100%', objectFit: 'cover' }} />
        <video ref={video2Ref} src="/video/part2.mp4" muted loop preload="auto" style={{ width: '100%', objectFit: 'cover', display: 'none' }} />
        {showText && (
          <div className="text-container text-6xl font-semibold pt-12 gap-2" style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
            <TextAnimation text="Discover, Analyze, Act:" />
            <TextAnimation text="Your Gateway to Data Driven Decisions" />
          </div>
        )}
      </div>
    </div>
  );
}

// Component for rendering text with character-by-character animation
function TextAnimation({ text }) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.substring(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100); // Adjust the interval as needed for the desired speed
    return () => clearInterval(interval);
  }, [text]);

  return <div className="text">{displayText}</div>;
}
