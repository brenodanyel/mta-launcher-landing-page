import { Box, Container } from "@mui/material";
import { GetStaticProps } from 'next';
import { getServer, getServerProfile } from '../../../../services';
import removeMd from "remove-markdown";
import Head from 'next/head';
import Header from '../../../../components/header';
import ServerProfile from '../../../../components/server-profile';

export type Profile = {
  id: string;
  ip: string;
  port: number;
  description: string;
  logo: string;
  externalLinks: {
    id: string;
    name: string;
    url: string;
  }[],
  active: boolean;
  createdAt: Date;
  removeAt: Date | null;
  ownerId: string;
  onwer?: {
    email: string;
    id: string;
    username: string;
  };

};

export type Player = {
  name: string,
  ping?: number,
};

export type Server = {
  name: string,
  ip: string,
  port: number;
  httpPort?: number,
  game: string,
  gameType: string,
  mapName: string,
  version: string,
  passworded: boolean,
  playerCount: number,
  playerSlots: number,
  players?: Player[];
};

type ServerProfileProps = {
  profile: Profile;
  server: Server;
};

export default function ServerProfilePage(props: ServerProfileProps) {
  const { profile, server } = props;

  if (!server) {
    return null;
  }

  if (!profile) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{server.name}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={server.name} />
        <meta property="og:description" content={removeMd(profile.description).slice(0, 200) + '...'} />
        <meta property="og:image" content={profile.logo || 'https://mtasa-launcher.s3.amazonaws.com/mta-logo.png'} />
        <link rel="icon" href={profile.logo || 'https://mtasa-launcher.s3.amazonaws.com/mta-logo.png'} />
      </Head>
      <Box
        sx={{
          background: 'url(/background.png) no-repeat center center ',
          backgroundSize: 'cover',
        }}
      >
        <Box
          sx={{
            background: 'radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 85%, rgba(0,0,0,1) 100%)',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            overflow: 'hidden'
          }}
        >
          <Header />

          <Container
            maxWidth="lg"
            sx={{
              padding: '1em',
              flexGrow: 1,
              overflow: 'auto',
            }}
          >
            <ServerProfile server={server} profile={profile} />
          </Container>
        </Box>
      </Box>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const ip = params?.serverIp as string;
  const port = Number(params?.serverPort as string);

  const profile = await getServerProfile(ip, port);
  const server = await getServer(ip, port);

  return {
    props: {
      profile,
      server,
    },
    notFound: !profile || !server,
    revalidate: 180,
  };
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}