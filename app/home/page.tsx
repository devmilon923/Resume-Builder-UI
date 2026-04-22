"use client";

import React from "react";
import { SocialPostCard, Post } from "@/components/social-post-card";
import { CreatePost } from "@/components/create-post";

const DUMMY_POSTS: Post[] = [
  {
    id: 1,
    author: {
      name: "Alex Thompson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      isVerified: true,
    },
    feeling: { emoji: "🚀", label: "Productive" },
    content:
      "Just finished building a new feature using Next.js and Tailwind CSS. The developer experience is absolutely incredible! 🚀 \n\nClean code and intuitive components make a huge difference in productivity. #webdev #coding #frontend",
    timestamp: "2h ago",
    likes: 124,
    comments: 18,
  },
  {
    id: 2,
    author: {
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      isVerified: false,
    },
    feeling: { emoji: "✨", label: "Inspired" },
    content:
      "Design systems are not just about components; they are about communication and consistency across teams. Clean UI is happy UI. ✨\n\nReally enjoying the process of refining our internal design language.",
    timestamp: "5h ago",
    likes: 89,
    comments: 12,
  },
  {
    id: 3,
    author: {
      name: "Marcus Aurelius",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
      isVerified: true,
    },
    feeling: { emoji: "🏛️", label: "Stoic" },
    content:
      "Concentrate every minute like a Roman—like a man—on doing what's in front of you with precise and genuine seriousness, tenderly, willingly, with justice.",
    timestamp: "1d ago",
    likes: 2450,
    comments: 432,
  },
  {
    id: 4,
    author: {
      name: "Product Hunt",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ProductHunt",
      isVerified: true,
    },
    feeling: { emoji: "🤔", label: "Curious" },
    content:
      "What's the best tool you've discovered this week? Share your finds below! 👇",
    timestamp: "4h ago",
    likes: 56,
    comments: 89,
  },
  {
    id: 5,
    author: {
      name: "David Heinemeier Hansson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DHH",
      isVerified: true,
    },
    feeling: { emoji: "🧘", label: "Focused" },
    content:
      "The best code is no code at all. But if you must write it, make it count. Simplify until it's impossible to make it any simpler. That's the secret to longevity in software.",
    timestamp: "6h ago",
    likes: 1890,
    comments: 156,
  },
  {
    id: 6,
    author: {
      name: "Tech Chronicles",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tech",
      isVerified: true,
    },
    feeling: { emoji: "⚡", label: "Excited" },
    content:
      "The evolution of web development has been staggering. From simple HTML pages to complex single-page applications, and now to server-side rendering with React Server Components. It's a journey of constant learning and adaptation.",
    timestamp: "12h ago",
    likes: 420,
    comments: 65,
  },
];

const HomePage: React.FC = () => {
  return (
    <div className="space-y-8 pb-10">
      <CreatePost />
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border/50 pb-2">
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Recent Activity
          </h1>
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            Feed
          </span>
        </div>

        <div className="flex flex-col gap-6">
          {DUMMY_POSTS.map((post) => (
            <SocialPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
