import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Input from "./UI/Input.jsx";
import defaultImage from "../../assets/default-image-preview.png";

const ImageUploader = ({ previewImage, onImageChange }) => {
  const imageCaptureRef = useRef();

  const handleSelectFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }
    const file = event.target.files[0];
    imageCaptureRef.current = file;
    const previewUrl = URL.createObjectURL(file);
    onImageChange(file, previewUrl);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      imageCaptureRef.current = file;
      const previewUrl = URL.createObjectURL(file);
      onImageChange(file, previewUrl);
      event.dataTransfer.clearData();
    }
  };

  useEffect(() => {
    return () => {
      if (imageCaptureRef.current) {
        URL.revokeObjectURL(imageCaptureRef.current);
      }
    };
  }, []);

  return (
    <div
      className="border-dashed border border-gray-200 hover:border-gray-400 relative min-h-36 rounded"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="h-full flex items-center justify-center">
        <Input
          type="file"
          hidden
          required
          id="image"
          name="image"
          labelClass="absolute top-0 bottom-0 left-0 right-0 opacity-0 z-40 cursor-pointer"
          onChange={handleSelectFile}
        />
        <div className="max-w-36 h-36 overflow-hidden rounded-lg">
          <img
            src={previewImage || defaultImage}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

ImageUploader.propTypes = {
  previewImage: PropTypes.string,
  onImageChange: PropTypes.func.isRequired,
};

ImageUploader.defaultProps = {
  previewImage: defaultImage,
};

export default ImageUploader;
