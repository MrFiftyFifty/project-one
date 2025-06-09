'use client';

import { usePosts } from '@/hooks/usePosts';
import { SearchBar } from '@/components/posts/SearchBar';
import { PostsList } from '@/components/posts/PostsList';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { FileText, ArrowLeft, BarChart3, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function PostsPage() {
  const {
    posts,
    loading,
    error,
    searchQuery,
    pagination,
    hasMore,
    loadMorePosts,
    searchPosts,
    refreshPosts,
    setSearchQuery,
  } = usePosts();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/">
              <Button variant="secondary" size="sm" className="shadow-sm border-2 border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50">
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="font-medium text-gray-900">На главную</span>
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Лента постов
                </h1>
                <p className="text-gray-600 mt-1">
                  Изучайте интересные публикации и находите нужную информацию
                </p>
              </div>
            </div>

            {/* Статистика */}
            <div className="hidden md:flex items-center gap-6 bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-4">
              <div className="text-center">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <BarChart3 className="w-4 h-4" />
                  <span>Всего постов</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {pagination.totalItems}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-1 text-center">
                  Загружено
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {posts.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Поиск */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  onSearch={searchPosts}
                  loading={loading}
                  placeholder="Поиск по заголовку или содержанию поста..."
                />
              </div>
              
              <Button
                onClick={refreshPosts}
                variant="secondary"
                disabled={loading}
                className="shadow-sm border-2 border-green-200 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 font-medium px-6"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Обновить
              </Button>
            </div>

            {/* Мобильная статистика */}
            <div className="md:hidden mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-around text-center">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Всего постов</div>
                  <div className="text-lg font-bold text-gray-900">
                    {pagination.totalItems}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Загружено</div>
                  <div className="text-lg font-bold text-blue-600">
                    {posts.length}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Список постов */}
          <PostsList
            posts={posts}
            loading={loading}
            error={error}
            hasMore={hasMore}
            searchQuery={searchQuery}
            onLoadMore={loadMorePosts}
            onRefresh={refreshPosts}
          />
        </div>
      </div>

      {/* Кнопка "Наверх" */}
      <ScrollToTop />
    </div>
  );
}