import React from 'react';
import MUICarousel from 'react-material-ui-carousel';
import { Paper, Button, Box, Stack } from '@mui/material';
import { Typography } from '@mui/material';
import Image from 'next/image';

type Item = {
  name: string;
  description: React.ReactNode;
  image: string;
};

const items: Item[] = [
  {
    name: "MTA Launcher",
    description: "Discover a new way to find MTA servers with a modern interface and innovative features such as server profiles and Discord rich presence.",
    image: '/carousel/1.png',
  },
  {
    name: "Better way to find servers",
    description: "Server owners can add a custom icon for their servers and add a badge with server profile.",
    image: '/carousel/2.png',
  },
  {
    name: "Server Profiles",
    description: "Server owners can create a profile for their servers! so that people can have a better idea of what the server is about. This is a great way to find new servers to play on.",
    image: '/carousel/3.png',
  },
  {
    name: "Discord Rich Presence",
    description: "You can let your friends know what you're playing on Discord!",
    image: '/carousel/4.png',
  },
];

function Item(props: { item: Item; }) {
  const { item } = props;

  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{
        padding: '1em',
        overflow: 'hidden',
      }}
    >
      <Stack spacing="1em">
        <Stack>
          <Typography variant="h4" noWrap>{item.name}</Typography>
          {item.description}
        </Stack>
        <Box
          sx={{
            position: 'relative',
            height: '50vh',
          }}
        >
          <Image
            src={item.image}
            alt={item.name}
            fill
            style={{ objectFit: 'contain' }}
            sizes="100vw"
          />
        </Box>
      </Stack>
    </Paper>
  );
}

export default function Carousel() {
  return (
    <MUICarousel
      animation="slide"
      navButtonsAlwaysVisible
      interval={5000}
    >
      {items.map((item, i) => (
        <Item key={item.name} item={item} />
      ))}
    </MUICarousel>
  );
}