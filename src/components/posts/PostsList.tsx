'use client';

import { Post } from '@/types';
import { PostCard } from './PostCard';
import { Button } from '@/components/ui/Button';
import { AlertCircle, RefreshCw, Loader2, Search } from 'lucide-react';

interface PostsListProps {
  posts: Post[];
  loading: boolean;
  error: string;
  hasMore: boolean;
  searchQuery: string;
  onLoadMore: () => void;
  onRefresh: () => void;
}

export const PostsList = ({
  posts,
  loading,
  error,
  hasMore,
  searchQuery,
  onLoadMore,
  onRefresh,
}: PostsListProps) => {
  // Состояние ошибки
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-red-200 p-8">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Произошла ошибка
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {error}
          </p>
          <Button onClick={onRefresh}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Попробовать снова
          </Button>
        </div>
      </div>
    );
  }

  // Состояние загрузки (первичная загрузка)
  if (loading && posts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 text-blue-600 animate-spin mb-4" />
          <p className="text-gray-600">
            {searchQuery.trim() ? 'Ищем посты...' : 'Загружаем посты...'}
          </p>
        </div>
      </div>
    );
  }

  // Пустое состояние
  if (!loading && posts.length === 0) {
    const isSearching = searchQuery.trim().length > 0;
    
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
        <div className="text-center">
          {isSearching ? (
            <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          ) : (
            <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          )}
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {isSearching ? 'Ничего не найдено' : 'Нет доступных постов'}
          </h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            {isSearching 
              ? `По запросу &ldquo;${searchQuery}&rdquo; не найдено ни одного поста. Попробуйте изменить поисковый запрос.`
              : 'В данный момент нет доступных постов для отображения.'
            }
          </p>
          <Button onClick={onRefresh} variant="ghost">
            <RefreshCw className="w-4 h-4 mr-2" />
            Обновить
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Информация о результатах поиска */}
      {searchQuery.trim() && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <p className="text-blue-800 text-sm">
              <span className="font-medium">Показано {posts.length} из найденных постов</span>
              <span> по запросу &ldquo;{searchQuery}&rdquo;</span>
            </p>
            {posts.length === 10 && (
              <p className="text-blue-600 text-xs">
                Показаны первые 10 результатов
              </p>
            )}
          </div>
        </div>
      )}

      {/* Список постов */}
      <div className="grid gap-6">
        {posts.map((post) => (
          <PostCard 
            key={post.id} 
            post={post} 
            searchQuery={searchQuery}
          />
        ))}
      </div>

      {/* Кнопка "Загрузить еще" */}
      {hasMore && !searchQuery.trim() && (
        <div className="text-center pt-6">
          <Button
            onClick={onLoadMore}
            disabled={loading}
            loading={loading}
            size="lg"
            className="min-w-[200px]"
          >
            {loading ? 'Загружаем...' : 'Загрузить ещё'}
          </Button>
        </div>
      )}
    </div>
  );
};