import React, { useState, useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

const Timeline: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const waveSurferRef = useRef<HTMLDivElement | null>(null);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!waveSurferRef.current) {
        return;
    }
    // Create a new WaveSurfer instance if a file is added
    if (files.length > 0) {
      const waveSurfer = WaveSurfer.create({
        container: waveSurferRef.current,
        waveColor: 'lightblue',
        progressColor: 'purple',
      });

      waveSurfer.load(URL.createObjectURL(files[0]));

      setDuration(waveSurfer.getDuration()); // Set duration on load

      // Handle playback on click
      waveSurferRef.current!.addEventListener('click', () => {
        if (waveSurfer.isPlaying()) {
          waveSurfer.pause();
        } else {
          waveSurfer.play();
        }
      });

      return () => {
        waveSurfer.destroy(); // Clean up WaveSurfer on component unmount
      };
    }
  }, [files]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer!.files;

    // Check if dropped files are audio files
    const audioFiles = Array.from(droppedFiles)
      .filter((file: File) => file.type.startsWith('audio/'));

    if (audioFiles.length > 0) {
      setFiles(audioFiles);
    } else {
      alert('Please drop only audio files.');
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timeline" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      {files.length > 0 ? (
        <div className="wavesurfer-container" ref={waveSurferRef}>
          <div className="timeline-scale">
            {Array.from({ length: Math.ceil(duration) }, (_, i) => (
              <div key={i} className="timeline-tick">
                {i === Math.ceil(duration) - 1 ? formatTime(duration) : ''}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Drop your audio file here</p>
      )}
      <span className="duration">{formatTime(duration)}</span>
    </div>
  );
};

export default Timeline;
