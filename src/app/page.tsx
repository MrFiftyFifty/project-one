import Link from 'next/link';
import { CheckSquare, FileText, ArrowRight, Github, Code, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  const features = [
    {
      title: 'Менеджер задач',
      description: 'Создавайте, редактируйте и отслеживайте выполнение задач. Все данные сохраняются локально.',
      icon: CheckSquare,
      href: '/todos',
      color: 'blue',
      highlights: ['LocalStorage', 'Фильтрация', 'Статистика'],
    },
    {
      title: 'Лента постов',
      description: 'Просматривайте посты из JSONPlaceholder API с возможностью поиска и пагинации.',
      icon: FileText,
      href: '/posts',
      color: 'green',
      highlights: ['REST API', 'Поиск', 'Пагинация'],
    },
  ];

  const techStack = [
    'Next.js 14',
    'TypeScript',
    'Tailwind CSS',
    'React Hooks',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl shadow-lg">
              <Code className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Таским
            </h1>
          </div>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Веб-приложение с <strong>менеджером задач</strong> и <strong>лентой постов</strong>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-white/80 backdrop-blur border border-gray-200 rounded-full text-sm font-medium text-gray-700 shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature) => {
            const Icon = feature.icon;
            const colorClasses = {
              blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
              green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
            };

            return (
              <div
                key={feature.title}
                className="group bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-4 bg-gradient-to-r ${colorClasses[feature.color as keyof typeof colorClasses]} rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <div className="flex gap-2">
                      {feature.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {feature.description}
                </p>

                <Link href={feature.href}>
                  <Button className="w-full group-hover:scale-105 transition-transform duration-200">
                    Открыть
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="bg-white/60 backdrop-blur rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              О проекте
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Технические особенности
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  Современная архитектура с кастомными хуками
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  Разделение логики и представления
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  Обработка ошибок и состояний загрузки
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  Адаптивный дизайн и доступность
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Реализованный функционал
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  CRUD операции с задачами
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Интеграция с внешним API
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Поиск и фильтрация данных
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Пагинация и ленивая загрузка
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <Link
              href="https://github.com/MrFiftyFifty/project-one"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>Посмотреть код на GitHub</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
