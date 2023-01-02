import { Box, Button, Container, Icon, Link, Stack, Typography } from '@mui/material';
import Carousel from './carousel';

type HeroProps = {
  download: {
    statistics: number,
    latest: {
      url: string,
      version: string;
      size: string,
    };
  } | null;
};

export default function Hero(props: HeroProps) {
  const { download } = props;

  return (
    <Box
      sx={{
        backgroundColor: 'black',
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          height: '80vh',
          width: '100%',
          background: 'url(/background.png) no-repeat center center ',
          backgroundSize: 'contain',
          filter: 'blur(10px)',
        }}
      >
      </Box>
      <Container maxWidth="md" sx={{ zIndex: 1 }}>
        <Stack spacing="1em">
          <Carousel />
          {download && (
            <Stack sx={{ alignItems: 'center' }} spacing="0.5em">
              <Typography variant="caption" textAlign="center" noWrap>Number of downloads: {Intl.NumberFormat().format(download.statistics)}</Typography>
              <Link href={download.latest.url} download underline='none'>
                <Button startIcon={<Icon>download</Icon>} size="large">
                  Download latest version ({download.latest.version}) - {download.latest.size}
                </Button>
              </Link>
              <Link href="https://github.com/MTALauncher/Releases/releases" target="_blank" underline='none'>
                <Button variant="text" size="small">
                  download older versions
                </Button>
              </Link>
            </Stack>
          )}
        </Stack>
      </Container>
    </Box >
  );
}
