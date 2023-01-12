import { Box, Button, Link, Paper, Icon, Stack, Typography, Container } from "@mui/material";
import { GetStaticProps } from 'next';
import { getServer, getServerProfile } from '../../../../services';
import MuiMarkdown from "mui-markdown";
import Image from 'next/image';
import Head from 'next/head';

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

export default function ServerProfile(props: ServerProfileProps) {
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
        <meta property="og:description" content="Custom launcher for MTA (Multi Theft Auto)" />
        <link rel="icon" href={profile.logo} />
      </Head>
      <Container
        maxWidth="lg"
        sx={{
          height: '100vh',
          padding: '1em',
        }}
      >
        <Paper
          sx={{
            padding: '1.5em',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            height: '100%',
            gap: '1em',
          }}
          elevation={0}
          variant="outlined"
        >
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5em',
              }}
            >
              <Box>
                <Typography variant='h6'>{server.name}</Typography>
                <Typography variant='caption'>
                  mtasa://{profile.ip}:{profile.port}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: '0.5em',
                }}
              >
                {profile.externalLinks.map((link) => (
                  <Link key={link.id} href={link.url} target="_blank" rel='noreferrer' underline='hover'>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Icon>reply</Icon>}
                    >
                      {link.name}
                    </Button>
                  </Link>
                ))}
              </Box>
            </Box>
            <Box
              sx={{
                width: '128px',
                height: '128px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0.5em',
                overflow: 'hidden',
              }}
            >
              <Image
                src={
                  profile.logo
                    ? profile.logo
                    : 'https://mtasa-launcher.s3.amazonaws.com/mta-logo.png'
                }
                onError={({ currentTarget }) => {
                  if (currentTarget.src === "https://mtasa-launcher.s3.amazonaws.com/mta-logo.png") {
                    return;
                  }
                  currentTarget.src = "https://mtasa-launcher.s3.amazonaws.com/mta-logo.png";
                }}
                alt="Logo"
                width="128"
                height="128"
                style={{
                  objectFit: 'cover',
                  borderRadius: '10px',
                }}
              />
            </Box>
          </Box>
          <Paper
            sx={{
              overflow: 'hidden',
              padding: '0.5em',
              flexGrow: 1,
            }}
            elevation={0}
            variant="outlined"
          >
            <Box sx={{
              height: '100%',
              padding: '0.5em',
              overflow: 'auto',
            }}>
              <MuiMarkdown
                options={{
                  overrides: {
                    iframe: { component: 'div', props: { hidden: true } },
                    a: { component: Link, props: { href: null } },
                    h1: {
                      component: Typography,
                      props: { variant: 'h1', fontSize: '2.5em' },
                    },
                    h2: {
                      component: Typography,
                      props: { variant: 'h2', fontSize: '2em' },
                    },
                    h3: {
                      component: Typography,
                      props: { variant: 'h3', fontSize: '1.75em' },
                    },
                    h4: {
                      component: Typography,
                      props: { variant: 'h4', fontSize: '1.5em' },
                    },
                    h5: {
                      component: Typography,
                      props: { variant: 'h5', fontSize: '1.25em' },
                    },
                    h6: {
                      component: Typography,
                      props: { variant: 'h6', fontSize: '1em' },
                    },
                  },
                }}
              >
                {profile.description}
              </MuiMarkdown>
            </Box>
          </Paper>
          <Box
            sx={{
              mt: 'auto',
              display: "flex",
              justifyContent: "flex-end",
              gap: "0.5em",
            }}
          >
            <Link href={`mtasa://${server.ip}:${server.port}`} underline="none">
              <Button variant="contained" color="primary">
                Play
              </Button>
            </Link>
          </Box>
        </Paper>
      </Container>
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