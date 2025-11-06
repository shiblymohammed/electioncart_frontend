"use client";

import { useRef, useState, useEffect, useMemo, useCallback } from "react";

export function HeroSection() {
  // Create refs once and reuse them
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const videoRef3 = useRef<HTMLVideoElement>(null);
  const videoRef4 = useRef<HTMLVideoElement>(null);
  const videoRef5 = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const videoRefs = useMemo(
    () => [videoRef1, videoRef2, videoRef3, videoRef4, videoRef5],
    []
  );

  const containerRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const [hovering, setHovering] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [order, setOrder] = useState([0, 1, 2, 3, 4]);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [videoVariations, setVideoVariations] = useState([1, 1, 1, 1, 1]); // Track which variation (1, 2, or 3) for each video
  const [currentMobileVideo, setCurrentMobileVideo] = useState(0); // For mobile/tablet carousel
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [videosLoaded, setVideosLoaded] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [isMobile, setIsMobile] = useState(false);

  const videoNames = useMemo(() => ["G", "K", "M", "R", "S"], []);

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Preload strategy: All videos on desktop, current only on mobile
  useEffect(() => {
    if (isMobile) {
      // On mobile, only load current video
      const currentVideo = videoRefs[currentMobileVideo].current;
      if (currentVideo && !videosLoaded[currentMobileVideo]) {
        currentVideo.load();
        const newLoaded = [...videosLoaded];
        newLoaded[currentMobileVideo] = true;
        setVideosLoaded(newLoaded);
      }
    } else {
      // On desktop, preload ALL videos immediately for lightning-fast performance
      videoRefs.forEach((ref, index) => {
        if (ref.current && !videosLoaded[index]) {
          ref.current.load();
          const newLoaded = [...videosLoaded];
          newLoaded[index] = true;
          setVideosLoaded(newLoaded);
        }
      });
    }
  }, [currentMobileVideo, isMobile, videosLoaded, videoRefs]);

  const handleMouseEnter = useCallback(
    (index: number) => {
      setHovering((prev) => {
        const newHovering = [...prev];
        newHovering[index] = true;
        return newHovering;
      });

      // Use requestAnimationFrame for immediate, smooth playback
      requestAnimationFrame(() => {
        const video = videoRefs[index].current;
        if (video && video.readyState >= 2) {
          video.play().catch(() => {});
        }
      });
    },
    [videoRefs]
  );

  const handleMouseLeave = useCallback(
    (index: number) => {
      setHovering((prev) => {
        const newHovering = [...prev];
        newHovering[index] = false;
        return newHovering;
      });

      const video = videoRefs[index].current;
      if (video) {
        video.pause();
      }
    },
    [videoRefs]
  );

  const handleMouseDown = useCallback((_e: React.MouseEvent, index: number) => {
    setDraggingIndex(index);
  }, []);

  const handleDragOver = useCallback(
    (e: React.DragEvent, targetIndex: number) => {
      e.preventDefault();
      if (draggingIndex === null || draggingIndex === targetIndex) return;

      setOrder((prev) => {
        const newOrder = [...prev];
        const draggedItem = newOrder[draggingIndex];
        newOrder.splice(draggingIndex, 1);
        newOrder.splice(targetIndex, 0, draggedItem);
        return newOrder;
      });
      setDraggingIndex(targetIndex);
    },
    [draggingIndex]
  );

  const handleDragEnd = useCallback(() => {
    setDraggingIndex(null);
  }, []);

  const handleVideoClick = useCallback((videoIndex: number) => {
    setVideoVariations((prev) => {
      const newVariations = [...prev];
      newVariations[videoIndex] = (newVariations[videoIndex] % 3) + 1;
      return newVariations;
    });
  }, []);

  // Add error handling and performance optimization for videos
  useEffect(() => {
    videoRefs.forEach((ref, index) => {
      if (ref.current) {
        const video = ref.current;

        const handleError = () => {
          console.error(
            `Video ${videoNames[index]}${videoVariations[index]} failed to load, retrying...`
          );
          setTimeout(() => {
            if (video) {
              video.load();
            }
          }, 1000);
        };

        // Optimize video playback
        video.playbackRate = 1.0; // Ensure normal playback speed

        // Disable picture-in-picture to save resources
        if ("disablePictureInPicture" in video) {
          (video as HTMLVideoElement & { disablePictureInPicture: boolean }).disablePictureInPicture = true;
        }

        video.addEventListener("error", handleError);

        return () => {
          video.removeEventListener("error", handleError);
        };
      }
    });
  }, [videoRefs, videoNames, videoVariations]);

  // Mobile swipe handlers - Memoized
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentMobileVideo < 4) {
      setCurrentMobileVideo((prev) => prev + 1);
    }
    if (isRightSwipe && currentMobileVideo > 0) {
      setCurrentMobileVideo((prev) => prev - 1);
    }

    setTouchStart(0);
    setTouchEnd(0);
  }, [touchStart, touchEnd, currentMobileVideo]);

  const goToNextVideo = useCallback(() => {
    if (currentMobileVideo < 4) {
      setCurrentMobileVideo((prev) => prev + 1);
    }
  }, [currentMobileVideo]);

  const goToPrevVideo = useCallback(() => {
    if (currentMobileVideo > 0) {
      setCurrentMobileVideo((prev) => prev - 1);
    }
  }, [currentMobileVideo]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="bg-black bg-texture relative overflow-hidden h-screen"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        willChange: "transform",
      }}
    >
      {/* Enhanced Background Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/30 to-gray-900/80 pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-gray-900/40 pointer-events-none z-[1]" />

      {/* Animated Background Elements - Optimized */}
      <div
        className="absolute top-20 left-10 w-72 h-72 bg-lime-400/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none z-[1]"
        style={{ willChange: "opacity, transform" }}
      />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slower pointer-events-none z-[1]"
        style={{ willChange: "opacity, transform" }}
      />
      {/* Title and Description */}
      <div className="absolute top-[12%] left-0 right-0 z-[15] text-center px-4 animate-fadeIn">
        {/* Enhanced Background gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 backdrop-blur-[2px] pointer-events-none" />

        <div className="relative z-10">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black mb-3 sm:mb-4 md:mb-6 leading-[1.15] tracking-tight px-2"
            style={{
              fontFamily: "var(--font-laughter)",
              color: "#d9f154",
              textShadow: `
                2px 2px 0px rgba(0, 0, 0, 1),
                3px 3px 0px rgba(0, 0, 0, 0.9),
                4px 4px 0px rgba(0, 0, 0, 0.7),
                5px 5px 0px rgba(0, 0, 0, 0.5),
                6px 6px 10px rgba(0, 0, 0, 0.3)
              `,
              animation: "slideUp 0.8s ease-out",
            }}
          >
            EMPOWERING INDIA&apos;S ELECTION CAMPAIGNS WITH INNOVATION
          </h1>

          <p
            className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white font-mono max-w-5xl mx-auto leading-relaxed px-4 mb-6 sm:mb-8"
            style={{
              textShadow: "2px 2px 8px rgba(0, 0, 0, 0.8)",
              animation: "slideUp 0.8s ease-out 0.2s backwards",
              letterSpacing: "0.02em",
            }}
          >
            Revolutionize your political journey with AI, analytics, and
            technology-driven tools.
          </p>

          {/* CTA Buttons - Mobile Optimized */}
          <div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-4 sm:mt-6"
            style={{
              animation: "slideUp 0.8s ease-out 0.4s backwards",
            }}
          >
            <a
              href="#packages"
              className="group relative inline-flex items-center gap-2 sm:gap-3 bg-lime-400 hover:bg-lime-500 active:bg-lime-600 text-black font-bold text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-2xl hover:shadow-lime-400/50 w-full sm:w-auto max-w-xs sm:max-w-none"
              style={{
                fontFamily: "var(--font-laughter)",
              }}
            >
              <span>EXPLORE PACKAGES</span>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>

            <a
              href="#campaigns"
              className="group inline-flex items-center gap-2 bg-transparent hover:bg-white/10 active:bg-white/20 text-white font-bold text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 border-2 border-white/50 hover:border-white hover:scale-105 active:scale-95 backdrop-blur-sm w-full sm:w-auto max-w-xs sm:max-w-none"
            >
              <span>VIEW CAMPAIGNS</span>
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Enhanced and centered */}
      <div className="absolute bottom-4 left-0 right-0 z-[15] hidden lg:flex justify-center">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/80 text-sm font-mono drop-shadow-lg">
            Scroll to explore
          </span>
          <div className="relative">
            <div className="absolute inset-0 bg-lime-400 blur-md opacity-50" />
            <svg
              className="w-6 h-6 text-lime-400 relative"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Desktop View - 5 videos */}
      <div
        className="hidden lg:flex absolute left-0 right-0 justify-center items-end gap-3 xl:gap-4 px-4 z-[20]"
        style={{ bottom: "0" }}
      >
        {order.map((videoIndex, position) => (
          <div
            key={videoIndex}
            ref={containerRefs[videoIndex]}
            draggable
            onDragStart={(e: React.DragEvent<HTMLDivElement>) =>
              handleMouseDown(e as unknown as React.MouseEvent, position)
            }
            onDragOver={(e) => handleDragOver(e, position)}
            onDragEnd={handleDragEnd}
            onMouseEnter={() => handleMouseEnter(videoIndex)}
            onMouseLeave={() => handleMouseLeave(videoIndex)}
            className="relative group"
            style={{
              width: "17%",
              maxWidth: "280px",
              height: "75vh",
              overflow: "hidden",
              borderRadius: "12px",
              cursor: draggingIndex === position ? "grabbing" : "grab",
              transition:
                "transform 0.3s ease-out, box-shadow 0.3s ease-out, opacity 0.3s ease-out",
              transform: hovering[videoIndex]
                ? "scale(1.08) translateY(-10px) translateZ(0)"
                : "scale(1) translateZ(0)",
              zIndex:
                draggingIndex === position ? 10 : hovering[videoIndex] ? 5 : 1,
              opacity: draggingIndex === position ? 0.6 : 1,
              boxShadow: hovering[videoIndex]
                ? "0 20px 40px rgba(0, 0, 0, 0.6)"
                : "0 10px 20px rgba(0, 0, 0, 0.3)",
              willChange: hovering[videoIndex] ? "transform" : "auto",
            }}
          >
            {/* Click indicator overlay */}
            <div
              className="absolute top-3 right-3 z-20 bg-black/70 text-white text-xs px-2 py-1 rounded-full transition-opacity duration-300"
              style={{
                opacity: hovering[videoIndex] ? 1 : 0,
                pointerEvents: "none",
              }}
            >
              Click to change
            </div>

            {/* Variation indicator */}
            <div
              className="absolute bottom-3 left-3 z-20 flex gap-1"
              style={{
                pointerEvents: "none",
              }}
            >
              {[1, 2, 3].map((variant) => (
                <div
                  key={variant}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor:
                      videoVariations[videoIndex] === variant
                        ? "#d9f154"
                        : "rgba(255, 255, 255, 0.4)",
                    transform:
                      videoVariations[videoIndex] === variant
                        ? "scale(1.3)"
                        : "scale(1)",
                  }}
                />
              ))}
            </div>

            <video
              key={`${videoIndex}-${videoVariations[videoIndex]}`}
              ref={(el) => {
                if (el) {
                  (videoRefs[videoIndex] as React.MutableRefObject<HTMLVideoElement | null>).current = el;
                  // Auto-play if hovered when video element is created
                  if (hovering[videoIndex]) {
                    el.addEventListener(
                      "loadeddata",
                      () => {
                        el.play().catch(() => {});
                      },
                      { once: true }
                    );
                  }
                }
              }}
              loop
              muted
              playsInline
              preload="auto"
              onClick={() => handleVideoClick(videoIndex)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                position: "relative",
                zIndex: 10,
                cursor: "pointer",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                willChange: "auto",
                transform: "translateZ(0)",
              }}
            >
              <source
                src={`/hero/${videoNames[videoIndex]}${videoVariations[videoIndex]}.webm`}
                type="video/webm"
              />
            </video>
          </div>
        ))}
      </div>

      {/* Mobile/Tablet View - Single video carousel */}
      <div className="lg:hidden absolute bottom-0 left-0 right-0 flex items-center justify-center px-4 pb-6 z-[20]">
        {/* Previous Button - Enhanced */}
        <button
          onClick={goToPrevVideo}
          disabled={currentMobileVideo === 0}
          className="absolute left-2 sm:left-4 z-20 bg-black/70 hover:bg-black/90 active:bg-black text-white rounded-full p-2.5 sm:p-3 transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed hover:scale-110 active:scale-95 shadow-lg backdrop-blur-sm border border-white/10"
          aria-label="Previous video"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Video Container */}
        <div
          className="relative w-full max-w-sm"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Click indicator for mobile */}
          <div className="absolute top-3 right-3 z-20 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full">
            Tap to change
          </div>

          {/* Variation indicator for mobile */}
          <div className="absolute bottom-3 left-3 z-20 flex gap-1.5">
            {[1, 2, 3].map((variant) => (
              <div
                key={variant}
                className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor:
                    videoVariations[currentMobileVideo] === variant
                      ? "#d9f154"
                      : "rgba(255, 255, 255, 0.5)",
                  transform:
                    videoVariations[currentMobileVideo] === variant
                      ? "scale(1.4)"
                      : "scale(1)",
                }}
              />
            ))}
          </div>

          <div
            className="overflow-hidden rounded-xl shadow-2xl active:scale-[0.98] transition-transform duration-200"
            style={{
              height: "60vh",
              maxHeight: "550px",
              minHeight: "400px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
            }}
          >
            <video
              key={`mobile-${currentMobileVideo}-${videoVariations[currentMobileVideo]}`}
              ref={videoRefs[currentMobileVideo]}
              loop
              muted
              playsInline
              autoPlay
              preload="auto"
              onClick={() => handleVideoClick(currentMobileVideo)}
              className="w-full h-full object-contain cursor-pointer"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              }}
            >
              <source
                src={`/hero/${videoNames[currentMobileVideo]}${videoVariations[currentMobileVideo]}.webm`}
                type="video/webm"
              />
            </video>
          </div>

          {/* Dots Indicator - Enhanced */}
          <div className="flex justify-center gap-2.5 mt-5 px-4">
            {[0, 1, 2, 3, 4].map((index) => (
              <button
                key={index}
                onClick={() => setCurrentMobileVideo(index)}
                className={`h-3 rounded-full transition-all duration-300 active:scale-90 ${
                  currentMobileVideo === index
                    ? "bg-lime-400 w-10 shadow-lg shadow-lime-400/60 ring-2 ring-lime-400/30"
                    : "bg-gray-400/70 w-3 hover:bg-gray-300 active:bg-gray-200"
                }`}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Next Button - Enhanced */}
        <button
          onClick={goToNextVideo}
          disabled={currentMobileVideo === 4}
          className="absolute right-2 sm:right-4 z-20 bg-black/70 hover:bg-black/90 active:bg-black text-white rounded-full p-2.5 sm:p-3 transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed hover:scale-110 active:scale-95 shadow-lg backdrop-blur-sm border border-white/10"
          aria-label="Next video"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
