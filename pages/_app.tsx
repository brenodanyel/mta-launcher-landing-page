import type { AppProps } from 'next/app';
import MUIWrapper from './wrappers/mui.wrapper';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MUIWrapper>
      <Component {...pageProps} />
    </MUIWrapper>
  );
}
