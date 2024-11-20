import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function WovenImageList() {
  // Split the itemData array into two separate arrays
  const firstGalleryItems = itemData.slice(0, 6); // First 6 items for the first gallery
  const secondGalleryItems = itemData.slice(6); // Remaining items for the second gallery

  return (
    <div style={{ display: 'flex' }}>
      <ImageList sx={{ width: 500, height: 450 }} variant="woven" cols={3} gap={8}>
        {firstGalleryItems.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=161&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <ImageList sx={{ width: 500, height: 450 }} variant="woven" cols={3} gap={8}>
        {secondGalleryItems.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=161&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

const itemData = [
  {
    img: 'https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Bed',
  },
  {
    img: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Kitchen',
  },
  {
    img: 'https://images.pexels.com/photos/3775128/pexels-photo-3775128.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Sink',
  },
  {
    img: 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Books',
  },
  {
    img: 'https://images.pexels.com/photos/1462633/pexels-photo-1462633.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Chairs',
  },
  {
    img: 'https://images.pexels.com/photos/2808559/pexels-photo-2808559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Candle',
  },
  {
    img: 'https://images.pexels.com/photos/256395/pexels-photo-256395.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Laptop',
  },
  {
    img: 'https://images.pexels.com/photos/256395/pexels-photo-256395.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Doors',
  },
  {
    img: 'https://images.pexels.com/photos/933964/pexels-photo-933964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Coffee',
  },
  {
    img: 'https://images.pexels.com/photos/933964/pexels-photo-933964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Storage',
  },
  {
    img: 'https://images.pexels.com/photos/2350925/pexels-photo-2350925.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Coffee table',
  },
  {
    img: 'https://images.pexels.com/photos/5553080/pexels-photo-5553080.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Blinds',
  },
];
