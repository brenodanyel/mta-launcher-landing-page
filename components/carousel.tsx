import React from 'react';
import { Box, Stack } from '@mui/material';
import { Typography } from '@mui/material';
import Image from 'next/image';
import { Carousel as ReactCarousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

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
    description: "Server owners can add a custom icon for their servers and add a badge with server profile. This allows for a more personalized and unique experience for members of the server, making it feel like their own special community.",
    image: '/carousel/2.png',
  },
  {
    name: "Server Profiles",
    description: "Server owners can create a profile for their servers! so that people can have a better idea of what the server is about. This is a great way to find new servers to play on.",
    image: '/carousel/3.png',
  },
  {
    name: "Discord Rich Presence",
    description: "You can let your friends know what you're playing! Additionally, you can also share your in-game status with your friends, making it easier to connect and play together.",
    image: '/carousel/4.png',
  },
];

function Item(props: { item: Item; }) {
  const { item } = props;

  return (

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
  );
}

export default function Carousel() {
  return (
    <ReactCarousel
      autoPlay
      infiniteLoop
      useKeyboardArrows
      showThumbs={false}
    >
      {items.map((item, i) => (
        <Item key={item.name} item={item} />
      ))}
    </ReactCarousel>
  );
}