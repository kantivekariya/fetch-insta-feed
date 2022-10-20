import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

const ACCESS_TOKEN = "";
const API_URL = "https://graph.instagram.com/v15.0/";

function App() {
  const [photos, setPhotos] = useState([]);

  const fetchInstFeed = async () => {
    try {
      const apiRes1 = await axios.get(
        `${API_URL}me?fields=id,username&access_token=${ACCESS_TOKEN}`
      );
      const apiRes2 = await axios.get(
        `${API_URL}me/media?fields=${apiRes1?.data.id},${apiRes1?.data.username}
&access_token=${ACCESS_TOKEN}`
      );

      const apiRes3 = apiRes2?.data?.data.map((item) =>
        axios.get(
          `${API_URL}/${item.id}?fields=id,media_type,media_url,username,timestamp
  &access_token=${ACCESS_TOKEN}`
        )
      );
      const finalRes = await axios.all(apiRes3);
      setPhotos(finalRes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInstFeed();
  }, []);

  return (
    <div className="post-wrapper">
      {/* map through our posts here */}
      {photos &&
        photos.map((item, index) => (
          <img
            key={index}
            height="200"
            width="200"
            src={item?.data?.media_url}
            alt=""
          />
        ))}
    </div>
  );
}

export default App;
