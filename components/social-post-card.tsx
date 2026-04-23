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
import { Input } from "@/components/ui/input";
import moment from "moment";

interface Author {
  name: string;
  image: string;
  isVerifyed: boolean;
  profession: string;
}

export interface Comment {
  id: string | number;
  author: {
    name: string;
    image: string;
  };
  content: string;
  createdAt: string;
  likesCount?: number;
  repliesCount?: number;
}

export interface Post {
  id: string | number;
  author: Author;
  content: string;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  feeling?: {
    emoji: string;
    label: string;
  };
  comments?: Comment[];
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
  const [replyingToCommentId, setReplyingToCommentId] = useState<
    string | number | null
  >(null);
  const [likedComments, setLikedComments] = useState<Set<string | number>>(
    new Set()
  );

  const toggleCommentLike = (id: string | number) => {
    setLikedComments((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

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
            src={post.author.image}
            alt={post.author.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex flex-wrap items-center gap-x-1.5 leading-none">
            <div className="flex items-center gap-1.5 overflow-hidden">
              <span className="truncate font-bold text-foreground tracking-tight">
                {post.author.name}
              </span>
              {post.author.isVerifyed && (
                <BadgeCheck className="size-4 fill-[#1d9bf0] text-white shrink-0" />
              )}
            </div>

            {post.feeling && (
              <div className="flex items-center gap-1 text-muted-foreground/80 text-[11px] sm:text-xs border-l border-border/50 pl-1.5 ml-0.5">
                <span className="text-muted-foreground/50 font-normal">is feeling</span>
                <span className="font-medium text-foreground/80 flex items-center gap-1">
                  <span className="text-sm leading-none">{post.feeling.emoji}</span>
                  <span className="hidden sm:inline lowercase">{post.feeling.label}</span>
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5 mt-1 text-muted-foreground/60 text-[11px]">
            <span className="truncate font-medium">{post.author.profession}</span>
            <span className="text-muted-foreground/30">•</span>
            <span className="whitespace-nowrap">
              {moment(post.createdAt).fromNow()}
            </span>
          </div>
        </div>

        <Button
          variant={isFollowing ? "outline" : "default"}
          size="sm"
          onClick={() => setIsFollowing(!isFollowing)}
          className={`h-8 cursor-pointer px-4 text-xs font-bold rounded-full transition-all duration-300 ${
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
        <p className="text-[0.9375rem] leading-relaxed text-foreground/90 whitespace-pre-wrap wrap-break-word overflow-hidden">
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
            {formatNumber(post.likesCount)}
          </span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex-1 cursor-pointer gap-2 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/5 transition-colors group"
        >
          <MessageCircle className="size-4.5" />
          <span className="text-xs font-medium">
            {formatNumber(post.commentsCount)}
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

      {post.commentsCount >= 5 && (
        <div className="border-t border-border/40 bg-muted/5 px-4 py-3 space-y-4">
          {post.comments && post.comments.length > 0 && (
            <div className="space-y-4">
              {post.comments.slice(0, 1).map((comment) => (
                <div key={comment.id} className="group">
                  <div className="flex gap-2.5">
                    <div className="size-7 shrink-0 overflow-hidden rounded-full border border-border">
                      <img
                        src={comment.author.image}
                        alt={comment.author.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="inline-block rounded-2xl bg-muted/50 px-3 py-2 max-w-[90%]">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-[11px] font-bold text-foreground">
                            {comment.author.name}
                          </span>
                          <span className="text-[10px] text-muted-foreground font-medium">
                            {moment(comment.createdAt).fromNow(true)}
                          </span>
                        </div>
                        <p className="text-[11px] text-foreground/80 leading-normal mt-0.5">
                          {comment.content}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 mt-1 pl-1">
                        <button
                          onClick={() => toggleCommentLike(comment.id)}
                          className={`text-[10px] font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                            likedComments.has(comment.id)
                              ? "text-rose-500"
                              : "text-muted-foreground hover:text-rose-500"
                          }`}
                        >
                          Like {comment.likesCount && comment.likesCount > 0 && (
                            <span className="font-medium opacity-80">{formatNumber(comment.likesCount + (likedComments.has(comment.id) ? 1 : 0))}</span>
                          )}
                        </button>
                        <button
                          onClick={() => setReplyingToCommentId(comment.id)}
                          className="text-[10px] font-bold text-muted-foreground hover:text-primary transition-colors cursor-pointer flex items-center gap-1"
                        >
                          Reply {comment.repliesCount && comment.repliesCount > 0 && (
                            <span className="font-medium opacity-80">{formatNumber(comment.repliesCount)}</span>
                          )}
                        </button>
                      </div>

                      {replyingToCommentId === comment.id && (
                        <div className="flex items-center gap-2 mt-3 animate-in fade-in slide-in-from-top-1 duration-200">
                          <div className="size-6 shrink-0 overflow-hidden rounded-full border border-border">
                            <img
                              src={post.author.image}
                              className="h-full w-full object-cover opacity-80"
                            />
                          </div>
                          <div className="relative flex-1">
                            <Input
                              autoFocus
                              placeholder={`Reply to ${comment.author.name}...`}
                              className="h-8 rounded-full bg-muted/60 border-none px-3 text-[10px] focus-visible:ring-1 focus-visible:ring-primary/20"
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setReplyingToCommentId(null)}
                            className="h-8 text-[10px] px-2 text-muted-foreground hover:text-foreground"
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {post.commentsCount > 1 && (
                <button className="text-[11px] font-bold text-muted-foreground hover:text-primary transition-colors pl-10 cursor-pointer">
                  View all {post.commentsCount} comments
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
