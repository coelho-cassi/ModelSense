import React, { ChangeEvent, useState } from "react";
import axios from "axios";

interface UploadButtonSmProps {
  className?: string;
}

const UploadButtonSm: React.FC<UploadButtonSmProps> = ({ className }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      try {
        const formData = new FormData();
        formData.append("data", file);

        // Replace 'http://localhost:8000' with your Django backend server URL
        const response = await axios.post(
          "http://localhost:8000/playground/upload_data/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "Access-Control-Request-Headers": "content-type, mode", // Add 'mode' to the headers
            },
          }
        );

        // Handle the response as needed
        console.log("File uploaded successfully", response.data);
      } catch (error) {
        console.error("Error uploading file", error);
      }
    }
  };

  return (
    <div className="flex items-center">
      <label
        htmlFor="upload"
        className=" cursor-pointer bg-primary_button hover:bg-primary_hover text-primary_text font-nunito font-nunito_600 text-m p-3 rounded-md shadow-sm"
      >
        Upload Data
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

export default UploadButtonSm;
