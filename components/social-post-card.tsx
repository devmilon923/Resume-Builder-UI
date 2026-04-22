import React, { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  BadgeCheck,
  UserPlus,
  UserCheck,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Author {
  name: string;
  avatar: string;
  isVerified: boolean;
}

export interface Post {
  id: string | number;
  author: Author;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  feeling?: {
    emoji: string;
    label: string;
  };
}

const formatNumber = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return num.toString();
};

interface SocialPostCardProps {
  post: Post;
  className?: string;
}

export const SocialPostCard: React.FC<SocialPostCardProps> = ({
  post,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const TEXT_THRESHOLD = 160;
  const isLongText = post.content.length > TEXT_THRESHOLD;
  const displayContent =
    isExpanded || !isLongText
      ? post.content
      : post.content.slice(0, TEXT_THRESHOLD) + "...";
  return (
    <Card className="max-w-2xl w-full mx-auto border-none shadow-sm bg-card">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0 p-4">
        <div className="relative size-10 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 overflow-hidden">
              <span className="truncate font-semibold text-foreground tracking-tight">
                {post.author.name}
              </span>
              {post.author.isVerified && (
                <BadgeCheck className="size-4 fill-[#1d9bf0] text-white shrink-0" />
              )}
            </div>
            {post.feeling && (
              <span className="text-[10px] sm:text-xs text-muted-foreground/80 flex items-center gap-1 shrink-0 px-1.5 py-0.5 bg-muted/40 rounded-md border border-border/30">
                <span className="text-sm leading-none">{post.feeling.emoji}</span>
                <span className="hidden sm:inline font-medium">
                  feeling {post.feeling.label}
                </span>
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-muted-foreground/60 text-[11px] whitespace-nowrap">
              {post.timestamp}
            </span>
          </div>
        </div>

        <Button
          variant={isFollowing ? "outline" : "default"}
          size="sm"
          onClick={() => setIsFollowing(!isFollowing)}
          className={`h-8 px-4 text-xs font-bold rounded-full transition-all duration-300 ${
            isFollowing
              ? "border-border text-muted-foreground hover:bg-muted"
              : "bg-primary text-primary-foreground hover:opacity-90"
          }`}
        >
          {isFollowing ? (
            <span className="flex items-center gap-1">
              <UserCheck className="size-3.5" />
              Following
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <UserPlus className="size-3.5" />
              Follow
            </span>
          )}
        </Button>
      </CardHeader>

      <CardContent className="px-4 pb-4 pt-0 min-w-0">
        <p className="text-[0.9375rem] leading-relaxed text-foreground/90 whitespace-pre-wrap break-words overflow-hidden">
          {displayContent}
        </p>
        {isLongText && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-1 text-[0.9375rem] font-bold text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-blue-300 hover:underline cursor-pointer transition-colors"
          >
            {isExpanded ? "Show less" : "Show more"}
          </button>
        )}
      </CardContent>

      <CardFooter className="flex items-center gap-1 border-t bg-transparent p-1.5 px-3">
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 cursor-pointer gap-2 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/5 transition-colors group"
        >
          <Heart className="size-4.5 group-hover:fill-rose-500/10" />
          <span className="text-xs font-medium">
            {formatNumber(post.likes)}
          </span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex-1 cursor-pointer gap-2 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/5 transition-colors group"
        >
          <MessageCircle className="size-4.5" />
          <span className="text-xs font-medium">
            {formatNumber(post.comments)}
          </span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex-1 cursor-pointer gap-2 text-muted-foreground hover:text-emerald-500 hover:bg-emerald-500/5 transition-colors group"
        >
          <Share2 className="size-4.5" />
          <span className="text-xs font-medium">Share</span>
        </Button>
      </CardFooter>
    </Card>
  );
};
