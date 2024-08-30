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

  useEffect(() => {
    if (topic === "") {
      return;
    }
    async function getPictures() {
      try {
        setLoading(true);
        setError(false);
        const newPictures = await fetchPictures(topic, page);
        setPictures(prevState => [...prevState, ...newPictures]);
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
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleImageClick = imageSrc => {
    setSelectedImage(imageSrc);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };
  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <ImageGallery items={pictures} onImageClick={handleImageClick} />
      {pictures.length > 0 && <LoadMoreBtn onClick={handleLoadMore} />}
      {error && <ErrorMessage />}
      {loading && <Loader />}
      <ImageModal
        isOpen={!!selectedImage}
        onClose={closeModal}
        imageSrc={selectedImage}
      />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
