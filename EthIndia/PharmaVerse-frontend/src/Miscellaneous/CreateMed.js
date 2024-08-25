import { Button } from "@mui/material";
import React, { useState } from "react";
import { ContractContext } from "../Context/ContractContext";
import { useContext } from "react";
import { UploadToIPFS } from "../Utils/UploadToIpfs";

const CreateMed = () => {
  const { Services } = useContext(ContractContext); // Access the create_medicine function from the context

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [img, setImg] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedImg = event.target.files[0];
    if (selectedImg) {
      setImg(URL.createObjectURL(selectedImg));
      setUploadedFile(selectedImg); // Set the uploaded file
    }
  };
  const handleCancelUpload = () => {
    setUploadedFile(null);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Check if any required fields are empty
    if (!name || !description || quantity <= 0) {
      alert("Please fill in all fields correctly.");
      return;
    }

    // Check if a file is uploaded
    if (!uploadedFile) {
      alert("Please upload an image.");
      return;
    }

    try {
      const ipfsResponse = await UploadToIPFS(uploadedFile);

      if (ipfsResponse.success) {
        // Get the IPFS hash
        const ipfsHash = ipfsResponse.data.hash;
        

        console.log(ipfsHash)

        // Call create_medicine function with form data and IPFS hash
        const response = await Services.create_medicine(
          name,
          description,
          ipfsHash
        );
        console.log(response)

        if (response.success) {
          // Medicine created successfully, you can navigate to a success page or perform any other actions
          alert("Medicine created successfully");
        } else {
          alert("Failed to create medicine. Please try again.");
        }
      } else {
        alert("Failed to upload the file to IPFS. Please try again.");
      }
    } catch (error) {
      console.error("Error creating medicine: ", error);
      alert("Error creating medicine. Please try again.");
    }
  };

  return (
    <div>
      <form className="form">
        <span className="title">Create Medicine</span>
        <input
          type="text"
          className="input"
          placeholder="Medicine Name"
          value={name}
          onChange={handleNameChange}
        />
        <input
          type="text"
          className="input"
          placeholder="Medicine Description"
          value={description}
          onChange={handleDescriptionChange}
        />
        <input
          type="number"
          min="0"
          className="input"
          placeholder="Material Quantity"
          style={{ width: "90%" }}
          value={quantity}
          onChange={handleQuantityChange}
        />

        <div className="addsubmit">
          <input
            id="file"
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }} // Hide the default file input
          />
          <label className="custum-file-upload" htmlFor="file">
            <div class="icon">
              {img ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <img src={img} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '100px' }} />
                  <Button variant="outlined" color="error" type="button" onClick={handleCancelUpload} className="cancel-button">
                    Cancel Upload
                  </Button></div>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clip-rule="evenodd" fill-rule="evenodd"></path> </g></svg>
              )}
            </div>


            {!uploadedFile && (
              <div className="text">
                <span>Click to upload image</span>
              </div>
            )}
          </label>
          <button type="button" className="button3" onClick={handleFormSubmit}>
            <span className="button__text">Add Item</span>
            <span className="button__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
                stroke="currentColor"
                height="24"
                fill="none"
                className="svg"
              >
                <line y2="19" y1="5" x2="12" x1="12"></line>
                <line y2="12" y1="12" x2="19" x1="5"></line>
              </svg>
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateMed;
