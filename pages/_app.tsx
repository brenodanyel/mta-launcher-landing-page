import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';

import MUIWrapper from '../wrappers/mui.wrapper';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MUIWrapper>
      <Component {...pageProps} />
      <Analytics />
    </MUIWrapper>
  );
}
