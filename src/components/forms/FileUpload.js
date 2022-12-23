import React from "react";
import { useSelector } from "react-redux";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar, Badge } from "antd";

const FileUpload = ({ values, setValues, setLoading }) => {
  // redux
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {
    // e.preventDefault();
    console.log("File which are about to upload", e.target.files);
    let files = e.target.files;
    let allUploadedFiles = values.images;

    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            // resolve(uri);
            // console.log("Resized image", uri);
            axios
              .post(
                // `${process.env.REACT_APP_API}/uploadimages`,
                `http://localhost:9000/api/uploadimages`,
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                console.log("Image upload Response DATA", res);
                setLoading(false);
                allUploadedFiles.push(res.data);
                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log("Error while uploading to CLOUDINARY image", err);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleImageRemove = (public_id, url) => {
    setLoading(true);
    console.log(
      "ID of the image which is about to remove from cloudinary",
      public_id
    );
    axios
      .post(
        // `${process.env.REACT_APP_API}/removeimage`,
        `http://localhost:9000/api/removeimage`,
        { public_id },
        { headers: { authtoken: user ? user.token : "" } }
      )
      .then((res) => {
        console.log("Image Delete Response ", res);
        setLoading(false);
        const { images } = values;
        let filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        setLoading(false);
        console.log("Error while deleting images from cloudinary");
      });
  };


  return (
    <>
      <div className="row">
        {values.images &&
          values.images.map((img) => (
            <Badge
              count="X"
              key={img.public_id}
              style={{ cursor: "pointer" }}
              onClick={() => handleImageRemove(img.public_id)}
            >
              <Avatar
                key={img.public_id}
                src={img.url}
                size={100}
                shape="square"
                className="ml-3 mb-3"
              />
            </Badge>
          ))}
      </div>
      <div className="row">
        <label className="btn btn-primary btn-raised">
          Choose file
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
