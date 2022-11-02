import React from 'react';
import { List } from './ImageGallery.styled.js';

export function ImageGallery({ children }) {
  return <List className="gallery">{children}</List>;
}
