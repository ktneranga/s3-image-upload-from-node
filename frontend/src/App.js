import { useState } from "react";
import "./App.css";
import axios from "axios";
import { server } from "./server";

function App() {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const formData = new FormData();

    formData.append("file", image);

    try {
      const res = await axios.post(`${server}/images`, formData, config);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form style={{ width: "50%" }} onSubmit={handleSubmit} method="post">
        <label style={{ marginBottom: 10, display: "block" }}>Image</label>
        <input
          type="file"
          style={{ marginBottom: 10, display: "block", padding: 10 }}
          onChange={handleInputChange}
        />
        <button style={{ width: "100%", padding: 10 }}>Submit</button>
      </form>
      <img src={`${server}/images/images1684465160899-849737337.png`} alt="" />
    </div>
  );
}

export default App;
