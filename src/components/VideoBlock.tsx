"use client";

import { Bounded } from "@/components/Bounded";
import { LazyYouTubePlayer } from "@/components/LazyYouTubePlayer";
import clsx from "clsx";
import Image from "next/image";

const MASK_CLASSES =
  "[mask-image:url(/video-mask.png)] [mask-mode:alpha] [mask-position:center_center] [mask-repeat:no-repeat] [mask-size:100%_auto]";

interface VideoBlockProps {
  youtubeVideoId?: string;
  localVideoPath?: string;
  backgroundColor?: string;
}

export function VideoBlock({ youtubeVideoId, localVideoPath, backgroundColor = "bg-zinc-900" }: VideoBlockProps) {
  return (
    <Bounded className={`bg-texture ${backgroundColor}`}>
      <h2 className="sr-only">Video Reel</h2>
      <div className="relative aspect-video">
        {/* Masks */}
        <div
          className={clsx(
            MASK_CLASSES,
            "bg-brand-lime absolute inset-0 ~translate-x-2/3 ~translate-y-2/3"
          )}
        />
        <div
          className={clsx(
            MASK_CLASSES,
            "bg-white absolute inset-0 ~translate-x-1/3 ~translate-y-1/2"
          )}
        />
        <div
          className={clsx(
            MASK_CLASSES,
            "bg-white absolute inset-0 ~translate-x-1/2 ~-translate-y-1/3"
          )}
        />
        {/* Video */}
        <div className={clsx(MASK_CLASSES, "relative h-full")}>
          {localVideoPath ? (
            <video
              className="h-full w-full object-cover"
              controls
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={localVideoPath} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            youtubeVideoId && <LazyYouTubePlayer youTubeID={youtubeVideoId} />
          )}
          {/* Texture overlay */}
          <Image
            src="/image-texture.png"
            alt=""
            fill
            className="pointer-events-none object-cover opacity-50"
          />
        </div>
      </div>
    </Bounded>
  );
}
