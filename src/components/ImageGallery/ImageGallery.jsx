import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, onImageClick }) => {
  const uniqueImages = images.filter((image, index, self) => {
    return index === self.findIndex((img) => img.id === image.id);
  });

  return (
    <ul className={styles.ImageGallery}>
      {uniqueImages.map((image) => (
        <ImageGalleryItem key={image.id} image={image} onImageClick={onImageClick} />
      ))}
    </ul>
  );
};

export default ImageGallery;
