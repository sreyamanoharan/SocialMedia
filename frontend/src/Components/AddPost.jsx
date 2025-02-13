import { useState } from "react";
import { Avatar, IconButton, TextField, Grid, Dialog, DialogContent } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Axios from "../axios";
import Button from '@mui/joy/Button';


const AddPost = () => {
  const [images, setImages] = useState([]); // Store multiple image URLs
  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // For full-screen image preview


  const user_id = localStorage.getItem("userId");
  console.log(user_id);
  

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array

    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "Social"); // Replace with your Cloudinary preset
        data.append("cloud_name", "ds0dvm4ol"); // Replace with your Cloudinary cloud name

        const res = await fetch("https://api.cloudinary.com/v1_1/ds0dvm4ol/image/upload", {
          method: "POST",
          body: data,
        });

        const imgData = await res.json();
        return imgData.secure_url; // Cloudinary returns `secure_url`
      })
    );

    setImages((prevImages) => [...prevImages, ...uploadedImages]); // Append new images
  };

  const handleSubmit=async(e)=>{
    e.preventDefault()
      await Axios.post('/add-post',{images,caption,user_id}).then((res)=>{
        console.log(res.data.message);
        
      })
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4 w-full">
        <form onSubmit={handleSubmit}>
      {/* Hidden Input for Image Upload */}
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        multiple // Allow multiple file selection
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />

      {/* Upload Button with Image Grid */}
      <label htmlFor="imageInput">
        <IconButton component="span" color="primary">
          {images.length > 0 ? (
            <Grid container spacing={0.5} sx={{ width: "200px", height: "auto" }}>
              {images.map((img, index) => (
                <Grid item key={index} xs={4}>
                  <Avatar
                    src={img}
                    sx={{ width: "60px", height: "60px", borderRadius: 1, cursor: "pointer" }}
                    onClick={() => setSelectedImage(img)} // Open full image on click
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <AddPhotoAlternateIcon sx={{ fontSize: 50 }} />
          )}
        </IconButton>
      </label>

      {/* Caption Input Field */}
      <TextField
        label="Add a caption"
        variant="outlined"
        fullWidth
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      {/* Full-Image Modal */}
      <Dialog open={!!selectedImage} onClose={() => setSelectedImage(null)} maxWidth="md">
        <DialogContent>
          {selectedImage && (
            <img src={selectedImage} alt="Uploaded" style={{ width: "100%", height: "auto", borderRadius: 8 }} />
          )}
        </DialogContent>
      </Dialog>
      <Button type='submit' sx={{ mt: 1 /* margin top */ }}>Add</Button>
      </form>
    </div>
  );
};

export default AddPost;
