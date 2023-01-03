import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
  Link,
  Icon,
} from '@mui/material';

export const pages = [];

export default function Header() {
  return (
    <AppBar position='sticky' sx={{ backgroundColor: 'black', borderBottom: 1, borderBottomColor: 'divider' }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box
            sx={{
              display: 'flex',
              gap: '1em',
              flexGrow: 1,
              justifyContent: { xs: 'center', md: 'flex-start' },
            }}
          >
            <Typography
              variant='h6'
              noWrap
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                userSelect: 'none',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              MTA Launcher
            </Typography>

            <Box sx={{ ml: 'auto' }}>
              <Link href='https://app.mta-launcher.com/' color="inherit" underline='hover'>
                <Button variant="text" color="inherit" startIcon={<Icon>login</Icon>}>
                  management panel
                </Button>
              </Link>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
