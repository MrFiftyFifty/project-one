'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Post, PaginationState } from '@/types';
import { postsService } from '@/services/postsService';

const POSTS_PER_PAGE = 10;

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: POSTS_PER_PAGE,
    totalItems: 0,
  });

  const loadPosts = useCallback(async (page: number = 1, append: boolean = false) => {
    setLoading(true);
    setError('');

    try {
      const response = await postsService.getPosts(page, POSTS_PER_PAGE);

      if (append) {
        setPosts((prev) => [...prev, ...response.posts]);
      } else {
        setPosts(response.posts);
      }

      setPagination({
        currentPage: page,
        totalPages: Math.ceil(response.total / POSTS_PER_PAGE),
        itemsPerPage: POSTS_PER_PAGE,
        totalItems: response.total,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка загрузки постов';
      setError(errorMessage);
      console.error('Ошибка загрузки постов:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMorePosts = useCallback(async () => {
    if (pagination.currentPage < pagination.totalPages && !loading) {
      await loadPosts(pagination.currentPage + 1, true);
    }
  }, [pagination.currentPage, pagination.totalPages, loading, loadPosts]);

  const searchPosts = useCallback(
    async (query: string) => {
      setSearchQuery(query);
      if (!query.trim()) {
        await loadPosts(1, false);
        return;
      }

      setLoading(true);
      setError('');

      try {
        const response = await postsService.searchPosts(query, POSTS_PER_PAGE);
        setPosts(response.posts);
        setPagination({
          currentPage: 1,

          totalPages: 1,
          itemsPerPage: response.posts.length,
          totalItems: response.total,
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Ошибка поиска постов';
        setError(errorMessage);
        console.error('Ошибка поиска постов:', err);
      } finally {
        setLoading(false);
      }
    },
    [loadPosts],
  );

  const refreshPosts = useCallback(async () => {
    if (searchQuery.trim()) {
      await searchPosts(searchQuery);
    } else {
      await loadPosts(1, false);
    }
  }, [searchQuery, loadPosts, searchPosts]);

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;

    const query = searchQuery.toLowerCase();
    return posts.filter(
      (post) => post.title.toLowerCase().includes(query) || post.body.toLowerCase().includes(query),
    );
  }, [posts, searchQuery]);

  useEffect(() => {
    loadPosts(1, false);
  }, [loadPosts]);

  return {
    posts: filteredPosts,
    loading,
    error,
    searchQuery,
    pagination,
    hasMore: pagination.currentPage < pagination.totalPages && !searchQuery.trim(),
    loadMorePosts,
    searchPosts,
    refreshPosts,
    setSearchQuery,
  };
};
