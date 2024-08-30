import { useState, useEffect } from "react";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import SearchBar from "../SearchBar/SearchBar";
import { fetchPictures } from "../../fetchPictures";
import ImageGallery from "../ImageGallery/ImageGallery";
import { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";

export default function App() {
  const [topic, setTopic] = useState("");
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (topic === "") {
      setHasMore(false);
      return;
    }

    async function getPictures() {
      try {
        setLoading(true);
        setError(false);
        const newPictures = await fetchPictures(topic, page);

        if (newPictures.length === 0) {
          setHasMore(false);
        } else {
          setPictures(prevState => [...prevState, ...newPictures]);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getPictures();
  }, [topic, page]);

  const handleSearch = newTopic => {
    setTopic(newTopic);
    setPage(1);
    setPictures([]);
    setHasMore(true);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = imageSrc => {
    setSelectedImage(imageSrc);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    if (pictures.length > 0) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [pictures]);

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <ImageGallery items={pictures} onImageClick={handleImageClick} />

      {error && <ErrorMessage />}
      {loading && <Loader />}
      {hasMore && <LoadMoreBtn onClick={handleLoadMore} />}

      <ImageModal
        isOpen={!!selectedImage}
        onClose={closeModal}
        imageSrc={selectedImage}
      />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
