import Head from 'next/head';
import { GetStaticProps } from 'next';
import { Stack } from '@mui/material';
import Header from '../components/header';
import Hero from '../components/hero';
import Footer from '../components/footer';
import { getDownloadInfo } from '../services/download-info';

type HomeProps = {
  download: {
    statistics: number,
    latest: {
      url: string,
      version: string;
      size: string,
    };
  } | null;
};

export default function Home(props: HomeProps) {
  return (
    <>
      <Head>
        <title>MTA Launcher</title>
        <meta name="description" content="Custom launcher for MTA (Multi Theft Auto)" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="MTA Launcher" />
        <meta property="og:description" content="Custom launcher for MTA (Multi Theft Auto)" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack
        sx={{
          minHeight: '100vh',
          backgroundColor: 'black'
        }}
        spacing="0.5em"
      >
        <Header />
        <Stack sx={{ justifyContent: 'space-between', flexGrow: 1 }}>
          <Hero download={props.download} />
          <Footer />
        </Stack>
      </Stack>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const download = await getDownloadInfo() || {
    statistics: 108,
    latest: {
      url: 'https://github.com/MTALauncher/Releases/releases/download/0.0.5/MTALauncher_0.0.5_x64_en-US.msi',
      version: '0.0.5',
      size: '3.9 MB',
    }
  };

  return {
    props: {
      download,
    },
    revalidate: 60,
  };
};