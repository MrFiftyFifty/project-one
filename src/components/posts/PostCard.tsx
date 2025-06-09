'use client';

import { Post } from '@/types';
import { User, Calendar, Hash } from 'lucide-react';

interface PostCardProps {
  post: Post;
  searchQuery?: string;
}

export const PostCard = ({ post, searchQuery }: PostCardProps) => {
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => {
      if (regex.test(part)) {
        return (
          <mark key={index} className="bg-yellow-200 text-yellow-900 px-1 rounded">
            {part}
          </mark>
        );
      }
      return part;
    });
  };

  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <h2 className="text-xl font-semibold text-gray-900 leading-tight">
          {searchQuery ? highlightText(post.title, searchQuery) : post.title}
        </h2>
        <div className="flex items-center text-xs text-gray-500 ml-4 flex-shrink-0">
          <Hash className="w-3 h-3 mr-1" />
          <span>#{post.id}</span>
        </div>
      </div>

      <div className="text-gray-600 leading-relaxed mb-4">
        <p>
          {searchQuery ? highlightText(post.body, searchQuery) : post.body}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center text-sm text-gray-500">
          <User className="w-4 h-4 mr-2" />
          <span>Автор: Пользователь {post.userId}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="w-4 h-4 mr-2" />
          <span>Пост #{post.id}</span>
        </div>
      </div>
    </article>
  );
};