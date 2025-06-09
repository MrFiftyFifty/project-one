import { Post } from '@/types';

class PostsService {
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com';

  // Получение постов с пагинацией
  async getPosts(page: number = 1, limit: number = 10): Promise<{ posts: Post[]; total: number }> {
    try {
      const start = (page - 1) * limit;
      const url = `${this.baseUrl}/posts?_start=${start}&_limit=${limit}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const posts: Post[] = await response.json();

      // Получаем общее количество постов из заголовков или делаем отдельный запрос
      const totalResponse = await fetch(`${this.baseUrl}/posts`);
      const allPosts: Post[] = await totalResponse.json();

      return {
        posts,
        total: allPosts.length,
      };
    } catch (error) {
      console.error('Ошибка получения постов:', error);
      throw new Error('Не удалось загрузить посты. Проверьте соединение с интернетом.');
    }
  }

  // Поиск постов по заголовку с лимитом
  async searchPosts(query: string, limit: number = 10): Promise<{ posts: Post[]; total: number }> {
    try {
      const response = await fetch(`${this.baseUrl}/posts`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const posts: Post[] = await response.json();
      const searchTerm = query.toLowerCase().trim();

      const filteredPosts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm) ||
          post.body.toLowerCase().includes(searchTerm),
      );

      return {
        posts: filteredPosts.slice(0, limit),
        total: filteredPosts.length,
      };
    } catch (error) {
      console.error('Ошибка поиска постов:', error);
      throw new Error('Не удалось выполнить поиск. Проверьте соединение с интернетом.');
    }
  }

  // Получение конкретного поста
  async getPost(id: number): Promise<Post> {
    try {
      const response = await fetch(`${this.baseUrl}/posts/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Ошибка получения поста:', error);
      throw new Error('Не удалось загрузить пост.');
    }
  }
}

export const postsService = new PostsService();
