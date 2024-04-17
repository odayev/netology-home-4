import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [img, setImg] = useState([]);
  const fileInputRef = useRef(null);

  function selectedFiles() {
    fileInputRef.current.click();
  }

  function onFileSelect() {
    const files = event.target.files;
    if (files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!img.some((e) => e.name === files[i].name)) {
        setImg((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  }

  function deleteImage(index) {
    setImg((prevImages) => 
      prevImages.filter((_, i) => i !== index)
    );
  }
  return (
    <>
      <div className="container">
        <form className="form">
          <span role="button" onClick={selectedFiles}>
            Click here
          </span>
          <input
            type="file"
            name="file"
            onChange={onFileSelect}
            multiple
            ref={fileInputRef}
          />
        </form>
        <div className="wrapper">
          {img.map((img, index) => (
            <div className="box" key={index}>
              <img src={img.url} alt={img.name} />
              <span className="delete" onClick={() => deleteImage(index)}>
                &times;
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
