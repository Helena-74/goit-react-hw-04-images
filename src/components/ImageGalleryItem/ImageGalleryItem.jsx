import React from 'react';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, onImageClick }) => (
  <li className={styles.ImageGalleryItem} onClick={() => onImageClick(image.largeImageURL)}>
    <img src={image.webformatURL} alt="" className={styles.ImageGalleryItemImage} />
  </li>
);

export default ImageGalleryItem;
