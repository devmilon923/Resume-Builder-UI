"use client";
import React from "react";
import { SocialPostCard, Post } from "@/components/social-post-card";
import { CreatePost } from "@/components/create-post";
import { useGetAllPosts } from "@/utils/api/endpoints";
import { Loader2 } from "lucide-react";

const DUMMY_POSTS: Post[] = [
  {
    id: 1,
    author: {
      name: "Sarah Jenkins",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      isVerifyed: true,
      profession: "Senior Product Designer",
    },
    content: "Just finished the new design system documentation! It's been a long journey but seeing everything come together is so satisfying. Can't wait for the team to start using it. 🚀 #DesignOps #ProductDesign",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    likesCount: 1240,
    commentsCount: 42,
    feeling: {
      emoji: "😊",
      label: "accomplished",
    },
    comments: [
      {
        id: 101,
        author: {
          name: "David Chen",
          image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
        },
        content: "This looks incredible! The attention to detail in the spacing scales is exactly what we needed.",
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        likesCount: 12,
        repliesCount: 4,
      },
    ],
  },
  {
    id: 2,
    author: {
      name: "Marcus Aurelius",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
      isVerifyed: false,
      profession: "Full Stack Developer",
    },
    content: "Has anyone tried the new React 19 features? The 'use' hook is a game changer for data fetching. No more useEffect boilerplate for simple async operations!",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    likesCount: 85,
    commentsCount: 3, // Won't show comment section
  },
  {
    id: 3,
    author: {
      name: "Elena Rodriguez",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
      isVerifyed: true,
      profession: "Creative Director",
    },
    content: "Monday mornings are for fresh coffee and even fresher ideas. ☕️✨",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    likesCount: 450,
    commentsCount: 12,
    feeling: {
      emoji: "☕️",
      label: "caffeinated",
    },
    comments: [
      {
        id: 201,
        author: {
          name: "James Wilson",
          image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
        },
        content: "Couldn't agree more! The best way to start the week.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        likesCount: 5,
        repliesCount: 2,
      },
    ],
  },
];

const HomePage: React.FC = () => {
  const { data, isLoading } = useGetAllPosts();
  // const posts: Post[] = data;
  const posts: Post[] = DUMMY_POSTS;
  console.log("posts", posts);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );
  }

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
          {posts?.map((post) => (
            <SocialPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
