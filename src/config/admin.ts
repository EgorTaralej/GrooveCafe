/**
 * Парола за админ панела (/admin) – САМО ЗА ДЕМО.
 *
 * Проверката се прави в браузъра и НЕ е сигурна: всеки, който отвори кода на
 * сайта, може да я види. В реалната версия входът ще минава през бекенд
 * (напр. Supabase / Firebase Auth) и данните ще се пазят в база данни.
 *
 * Паролата може да се смени с променлива `VITE_ADMIN_PASSWORD` във файл `.env`.
 */
export const ADMIN_PASSWORD: string =
  (import.meta.env.VITE_ADMIN_PASSWORD as string | undefined) ?? 'demo1234'
