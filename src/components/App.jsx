import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import styles from './Styles/styles.module.css';
import { fetchImages } from './api';

const ITEMS_PER_PAGE = 12;

class App extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
    query: '',
    page: 1,
    showModal: false,
    largeImageUrl: '',
    totalHits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.fetchImages(query, page);
    }
  }

  handleSearchSubmit = (query) => {
    this.setState({ query, page: 1, images: [], totalHits: 0 });
  };

  fetchImages = (query, page) => {
    this.setState({ loading: true });

    fetchImages(query, page)
      .then((response) => {
        const totalHits = response.data.totalHits;
        this.setState((prevState) => ({
          images: page === 1 ? response.data.hits : [...prevState.images, ...response.data.hits],
          totalHits,
          loading: false,
        }));
      })
      .catch((error) => {
        this.setState({ error: 'Failed to load images', loading: false });
      });
  };

  handleLoadMore = () => {
    const { page, totalHits } = this.state;
    const maxPage = Math.ceil(totalHits / ITEMS_PER_PAGE);

    if (page < maxPage) {
      this.setState((prevState) => ({
        page: prevState.page + 1,
      }));
    }
  };

  render() {
    const { images, loading, showModal, largeImageUrl } = this.state;
    const showLoadMoreButton = images.length > 0 && !loading && images.length < this.state.totalHits;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {loading && <Loader />}
        {showLoadMoreButton && <Button onClick={this.handleLoadMore} />}
        {showModal && <Modal largeImageUrl={largeImageUrl} onClose={this.closeModal} />}
      </div>
    );
  }
}

export default App;

// import React, { Component } from 'react';
// import Searchbar from './Searchbar/Searchbar';
// import ImageGallery from './ImageGallery/ImageGallery';
// import Button from './Button/Button';
// import Loader from './Loader/Loader';
// import Modal from './Modal/Modal';
// import styles from './Styles/styles.module.css';
// import { fetchImages } from './api';

// const ITEMS_PER_PAGE = 12;

// class App extends Component {
//   state = {
//     images: [],
//     loading: false,
//     error: null,
//     query: '',
//     page: 1,
//     showModal: false,
//     largeImageUrl: '',
//     totalHits: 0,
//     maxPage: false,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { query, page } = this.state;
//     if (prevState.query !== query || prevState.page !== page) {
//       this.fetchImages(query, page);
//     }
//   }

//   handleSearchSubmit = (query) => {
//     this.setState({ query, page: 1, images: [], totalHits: 0 });
//   };

//   fetchImages = (query, page) => {
//     this.setState({ loading: true });

//     fetchImages(query, page)
//       .then((response) => {
//         this.setState((prevState) => ({
//           images: [...prevState.images, ...response.data.hits],
//           maxPage: page < Math.ceil(response.data.totalHits / ITEMS_PER_PAGE),
//         }));
//       })
//       .catch((error) => {
//         this.setState({ error: 'Failed to load images', loading: false });
//       });
//   };

//   handleLoadMore = () => {
//     const { page, maxPage } = this.state;

//     if (page < maxPage) {
//       this.setState((prevState) => ({
//         page: prevState.page + 1,
//       }));
//     }
//   };

//   handleImageClick = (largeImageUrl) => {
//     this.setState({ largeImageUrl, showModal: true });
//   };

//   closeModal = () => {
//     this.setState({ showModal: false, largeImageUrl: '' });
//   };

//   render() {
//     const { images, loading, showModal, largeImageUrl } = this.state;

//     return (
//       <div className={styles.App}>
//         <Searchbar onSubmit={this.handleSearchSubmit} />
//         <ImageGallery images={images} onImageClick={this.handleImageClick} />
//         {loading && <Loader />}
//         {images.length > 0 && !loading && <Button onClick={this.handleLoadMore} />}
//         {showModal && <Modal largeImageUrl={largeImageUrl} onClose={this.closeModal} />}
//       </div>
//     );
//   }
// }

// export default App;
