import axios from 'axios';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function renderToString(component: React.ReactNode) {
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

export async function uploadFileToBucket(file: File) {
  const { data } = await axios.post('/api/v1/student/getPresignedUrl', {
    name: file.name,
    type: file.type,
  });

  const uploadResp = await axios.put(data.url, file, {
    headers: {
      'Content-type': file.type,
      'Access-Control-Allow-Origin': '*',
    },
  });

  if (uploadResp.status !== 200) {
    return Promise.reject('Failed to upload file');
  }

  return data.filename;
}
