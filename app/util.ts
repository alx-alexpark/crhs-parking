import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';

import axios from 'axios';
// https://github.com/vercel/next.js/discussions/58305#discussioncomment-7785006
// @ts-expect-error: this path can be found
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

export async function getPresignedUrl(file: File) {
  let { data } = await axios.post('/api/v1/student/getPresignedUrl', {
    name: file.name,
    type: file.type,
  });
  console.log('getPresignedUrl', { data });

  let uploadResp = await axios.put(data.url, file.stream, {
    headers: {
      'Content-type': file.type,
      'Access-Control-Allow-Origin': '*',
    },
  });

  const url = uploadResp.data;
  console.log('getPresignedUrl', { url });

  return url;
}
