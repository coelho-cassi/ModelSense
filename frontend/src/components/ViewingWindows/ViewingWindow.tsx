import React, { useState, useEffect } from "react";
import RenderedModel from "../RenderedModel/RenderedModel";

interface ViewingWindowProps {
  className?: string;
}

const ViewingWindow: React.FC<ViewingWindowProps> = ({ className }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const checkImageStatus = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/playground/model_to_png"
      );
      if (response.ok) {
        const blob = await response.blob();
        setImageSrc(URL.createObjectURL(blob));
        setLoading(false);
      } else {
        throw new Error("PNG not generated yet.");
      }
    } catch (error) {
      setError("Error fetching image.");
      console.error(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!imageSrc) {
        checkImageStatus();
      }
    }, 2000); // Poll every 5000 milliseconds (5 seconds)

    return () => clearInterval(interval);
  }, [imageSrc]);

  return (
    <div className={`relative w-100 h-128 ${className}`}>
      {/* White Rectangle (Bottom) */}
      <div className="absolute inset-0 bg-secondary_bg rounded-lg opacity-80 shadow"></div>

      {/* Image or Loading/Error Message */}
      {loading && !error && <div>Loading image...</div>}
      {error && <div>Error: {error}</div>}
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Loaded Image"
          className="absolute inset-0 object-cover w-full h-full rounded-lg"
        />
      )}
    </div>
  );
};

export default ViewingWindow;
