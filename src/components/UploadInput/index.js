import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import LoadingSpinner from "../../components/LoadingSpinner";

import "./styles.css";

const UploadInput = ({ text, onLoad, imagePreview }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(imagePreview ? imagePreview : "");

  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <label className="btn btn-info" htmlFor="image_uploads">
          <FaUpload />
          {text}
        </label>
        <input
          type="file"
          id="image_uploads"
          className="upload-input"
          accept=".jpg, .jpeg, .png"
          onChange={async event => {
            setLoading(true);
            var reader = new FileReader();

            reader.onload = function(e) {
              setImageUrl(e.target.result);
              onLoad(e.target.result);
            };

            reader.readAsDataURL(event.target.files[0]);
            setLoading(false);
          }}
        />
        {loading && <LoadingSpinner size={25} />}
      </div>
      {imageUrl && imageUrl !== "" && (
        <img
          className="upload-image-preview"
          alt="Carregando..."
          src={imageUrl}
        />
      )}
    </>
  );
};

export default UploadInput;
