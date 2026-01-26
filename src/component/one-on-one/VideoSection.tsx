// app/components/VideoPlayer.tsx
'use client';

import { useRef, useEffect, useState } from 'react';

export default function VideoPlayer() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [hasPlayed, setHasPlayed] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [videoSize, setVideoSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                setIsInView(entry.isIntersecting);

                if (entry.isIntersecting && videoRef.current && !hasPlayed) {
                    videoRef.current.play().then(() => {
                        setHasPlayed(true);
                    }).catch((error) => {
                        console.log("Autoplay failed:", error);
                    });
                }

                if (!entry.isIntersecting && videoRef.current && !videoRef.current.paused) {
                    videoRef.current.pause();
                }
            },
            {
                threshold: 0.5,
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, [hasPlayed]);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            const handleLoadedMetadata = () => {
                setVideoSize({
                    width: video.videoWidth,
                    height: video.videoHeight
                });
            };

            video.addEventListener('loadedmetadata', handleLoadedMetadata);

            // Get video size if already loaded
            if (video.videoWidth > 0) {
                setVideoSize({
                    width: video.videoWidth,
                    height: video.videoHeight
                });
            }

            return () => {
                video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            };
        }
    }, []);

    const handleVideoClick = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    };

    // Calculate aspect ratio
    const aspectRatio = videoSize.width > 0 ? videoSize.height / videoSize.width : 9 / 16;

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white p-4 md:p-8">
            <div
                ref={containerRef}
                className="max-w-8xl w-full space-y-6"
            >
                {/* Header */}
                <div className="text-center space-y-3">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#009689]">
                        How to Book a Session
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Watch this quick tutorial to learn how to easily book your next session with us.
                    </p>
                </div>

                {/* Video Container - Adjusted for proper video display */}
                <div className="relative rounded-2xl overflow-hidden">
                    {/* Video Element - Show entire video without cropping */}
                    <div className="relative w-full flex justify-center items-center h-auto md:min-h-[400px] max-h-[70vh]">
                        <video
                            ref={videoRef}
                            className="max-w-full max-h-full"
                            style={{
                                aspectRatio: videoSize.width > 0 ? `${videoSize.width}/${videoSize.height}` : '16/9'
                            }}
                            playsInline
                            muted
                            loop={false}
                            onClick={handleVideoClick}
                            onEnded={() => {
                                if (videoRef.current) {
                                    videoRef.current.style.opacity = '0.95';
                                }
                            }}
                        >
                            <source src="https://res.cloudinary.com/dmwrrrlpb/video/upload/v1769255473/howtobooksession_gorrju.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>

                        {/* Overlay instructions */}
                        {!hasPlayed && isInView && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                                <div className="text-white text-center p-4">
                                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#009689] bg-opacity-90 flex items-center justify-center">
                                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                    <p className="font-semibold">Video will play automatically</p>
                                    <p className="text-sm opacity-80 mt-1">Click to pause/play</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center">
                    <button
                        className="px-8 py-3 bg-[#009689] text-white font-semibold rounded-lg hover:bg-[#007a6e] transition-colors duration-300 shadow-lg"
                        onClick={() => {
                            const section = document.getElementById("plans");
                            if (section) {
                                section.scrollIntoView({ behavior: "smooth" });
                            }
                        }}
                    >
                        Book Your Session Now
                    </button>
                </div>
            </div>
        </div>
    );
}