"use client";
import React, { useState } from "react";
import { SocialPostCard, Post } from "@/components/social-post-card";
import { CreatePost } from "@/components/create-post";
import { useGetAllPosts } from "@/utils/api/endpoints";
import { Loader2 } from "lucide-react";
import { CommentSidebar } from "@/components/comment-sidebar";

const HomePage: React.FC = () => {
  const { data, isLoading } = useGetAllPosts();
  const posts: Post[] = data;
  
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleOpenComments = (post: Post) => {
    setSelectedPost(post);
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    // Delay clearing post to avoid UI jump during animation
    setTimeout(() => setSelectedPost(null), 300);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden bg-background">
      {/* Main Feed Section */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
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

            <div className="flex flex-col gap-6 pb-20">
              {posts?.map((post) => (
                <SocialPostCard 
                  key={post.id} 
                  post={post} 
                  onOpenComments={() => handleOpenComments(post)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Comment Sidebar */}
      <CommentSidebar 
        post={selectedPost}
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
      />
    </div>
  );
};

export default HomePage;
