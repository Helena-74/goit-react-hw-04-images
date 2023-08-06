import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import styles from './Styles/styles.module.css';
import { fetchImages } from './api';

const ITEMS_PER_PAGE = 12;

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (query === '' || page === 0) return;

    fetchImages(query, page)
      .then((response) => {
        const totalHits = response.data.totalHits;
        setImages((prevImages) =>
          page === 1 ? response.data.hits : [...prevImages, ...response.data.hits]
        );
        setTotalHits(totalHits);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to load images');
        setLoading(false);
      });
  }, [query, page]);

  const handleSearchSubmit = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setTotalHits(0);
  };

  const handleLoadMore = () => {
    const maxPage = Math.ceil(totalHits / ITEMS_PER_PAGE);
    if (page < maxPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onImageClick={setLargeImageUrl} />
      {loading && <Loader />}
      {images.length > 0 && !loading && images.length < totalHits && <Button onClick={handleLoadMore} />}
      {showModal && <Modal largeImageUrl={largeImageUrl} onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default App;
