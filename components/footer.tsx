import { Container, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Container
      sx={{
        marginX: 'auto',
        marginTop: 'auto',
      }}
    >
      <Typography sx={{ padding: '1em', textAlign: 'center' }}>
        DISCLAIMER: We are not endorsed or affiliated with official MTA.
      </Typography>
    </Container>
  );
}
