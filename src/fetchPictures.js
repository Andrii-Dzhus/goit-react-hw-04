import axios from "axios";

export const fetchPictures = async (topic, page) => {
  const response = await axios.get(`https://api.unsplash.com/search/photos`, {
    params: {
      client_id: "g9eI6A02mIPS3VTVXW560HuQAkrLGm4jueqzIGu4fiQ",
      query: topic,
      page: page,
      per_page: 12,
    },
  });
  return response.data.results;
};
