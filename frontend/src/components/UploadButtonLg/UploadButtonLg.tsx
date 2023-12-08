import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface UploadButtonLgProps {
  className?: string;
}

const UploadButtonLg: React.FC<UploadButtonLgProps> = ({ className }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      try {
        const formData = new FormData();
        formData.append("model", file);

        const response = await axios.post(
          "http://localhost:8000/playground/upload_model/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "Access-Control-Request-Headers": "content-type, mode",
            },
          }
        );

        // Handle the response as needed
        console.log("File uploaded successfully", response.data);

        // Redirect to "/visualization"
        navigate("/visualization");
      } catch (error) {
        console.error("Error uploading file", error);
      }
    }
  };
  return (
    <div className="flex items-center">
      <label
        htmlFor="upload"
        className=" cursor-pointer bg-primary_button hover:bg-primary_hover text-primary_text font-nunito font-nunito_600 text-2xl p-3 rounded-md"
      >
        Upload Model
      </label>
      <input
        type="file"
        id="upload"
        className="hidden"
        onChange={handleFileChange}
      />
      {selectedFile && <p className="ml-2">{selectedFile.name}</p>}
    </div>
  );
};

export default UploadButtonLg;
