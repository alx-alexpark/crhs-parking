import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';

// https://github.com/vercel/next.js/discussions/58305#discussioncomment-7785006
import ReactDOMServer from 'next/dist/compiled/react-dom/cjs/react-dom-server-legacy.browser.development';

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function renderToString(component: React.ReactNode) {
  return ReactDOMServer.renderToString(component);

  // https://react.dev/reference/react-dom/server/renderToString#removing-rendertostring-from-the-client-code
  const div = document.createElement('div');
  const root = createRoot(div);
  flushSync(() => {
    root.render(component);
  });

  return div.innerHTML;
}

export function formatDate(
  date: Date,
  {
    locale,
    options,
  }: { locale?: string; options?: Intl.DateTimeFormatOptions } = {}
) {
  return new Intl.DateTimeFormat(
    locale ?? 'en-US',
    options ?? {
      dateStyle: 'long',
      timeZone: 'America/Chicago',
    }
  ).format(date);
}
