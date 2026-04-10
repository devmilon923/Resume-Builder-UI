"use client";

import { Calendar, Play, User } from "lucide-react";
export interface PlaylistItem {
  resourceId: any;
  kind: "youtube#playlistItem";
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: { url: string; width: number; height: number };
      medium: { url: string; width: number; height: number };
      high: { url: string; width: number; height: number };
      standard?: { url: string; width: number; height: number };
      maxres?: { url: string; width: number; height: number };
    };
    channelTitle: string;
    playlistId: string;
    position: number;
    resourceId: {
      kind: "youtube#video";
      videoId: string;
    };
    videoOwnerChannelTitle: string;
    videoOwnerChannelId: string;
  };
}
interface YouTubeCardProps {
  item: PlaylistItem;
  index: number;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}

const YouTubeCard: React.FC<YouTubeCardProps> = ({
  item,
  index,
  isHovered,
  onHover,
}) => {
  const { snippet } = item;
  const videoId = snippet.resourceId.videoId;
  const thumbnail = snippet.thumbnails.high.url;

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      className="group relative h-full"
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Card Container */}
      <div className="h-full rounded-lg overflow-hidden bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-md flex flex-col">
        {/* Thumbnail Container */}
        <div className="relative overflow-hidden bg-gray-100 aspect-video">
          <img
            src={thumbnail}
            alt={snippet.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Play Button Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <a
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transform group-hover:scale-110 transition-all duration-300"
            >
              <Play className="w-6 h-6 text-gray-900 fill-gray-900 ml-0.5" />
            </a>
          </div>

          {/* Position Badge */}
          <div className="absolute top-2 right-2 bg-white text-gray-900 px-2 py-1 rounded text-xs font-semibold shadow-sm">
            #{index + 1}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col grow">
          {/* Title */}
          <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-600 transition-colors duration-300">
            {snippet.title}
          </h3>

          {/* Channel Info */}
          <p className="text-xs text-gray-500 mb-3">{snippet.channelTitle}</p>

          {/* Description */}
          <p className="text-xs text-gray-600 mb-3 line-clamp-2 grow">
            {snippet.description}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(snippet.publishedAt)}</span>
            </div>
            <a
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-900 text-xs font-medium rounded transition-colors duration-300"
            >
              Watch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouTubeCard;
