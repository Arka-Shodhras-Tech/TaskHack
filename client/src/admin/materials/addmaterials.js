import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { v4 } from 'uuid';
import { Flex } from "@chakra-ui/react";

const firebaseConfig = {
    apiKey: "AIzaSyBq36iHg3MK2o3acO9CEcK7FZkxaO3N490",
    authDomain: "paie-cell.firebaseapp.com",
    projectId: "paie-cell",
    storageBucket: "paie-cell.appspot.com",
    messagingSenderId: "616259866547",
    appId: "1:616259866547:web:85fdf8b0349cb2601e85c6",
    measurementId: "G-CNVYPEY493"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const Addmaterial = () => {
    const [load, setLoad] = useState(false);
    const [file, setFile] = useState(null);
    const [pdf, setPdf] = useState(null);
    const [title, setTitle] = useState('');
    const [uploadError, setUploadError] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [showOptions, setShowOptions] = useState(false);
    const [showFileInput, setShowFileInput] = useState(true);
    const [showButtons, setShowButtons] = useState(false);

  const handleButtonClick = () => {
    setShowButtons(true);
  };
    const openFileInput = () => {
        setShowFileInput(false);
      };
      
  const openCamera = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const videoElement = document.createElement("video");
        videoElement.srcObject = stream;
        videoElement.autoplay = true;

        videoElement.addEventListener("loadedmetadata", async () => {
            const canvas = document.createElement("canvas");
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;
            const context = canvas.getContext("2d");
            context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            const photo = canvas.toDataURL("image/jpeg");

            const blob = dataURLtoBlob(photo);
            const photoRef = ref(storage, `paiecell/Coursel/${v4()}`);

            await uploadBytes(photoRef, blob);
            setFile(photo);
            setShowOptions(false);

            stream.getTracks().forEach(track => track.stop());
            videoElement.remove();
            canvas.remove();
        });
    } catch (error) {
        console.error("Error accessing camera:", error);
        setUploadError("Error accessing camera. Please try again.");
    }
  };

  const openGallery = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = async () => {
                const photo = reader.result;
                const blob = dataURLtoBlob(photo);
                const photoRef = ref(storage, `paiecell/Coursel/${v4()}`);

                await uploadBytes(photoRef, blob);
                setFile(photo);
                setShowOptions(false);
            };
            reader.readAsDataURL(selectedFile);
        }
    };
    input.click();
  };

  const dataURLtoBlob = (dataURL) => {
    const base64 = dataURL.split(',')[1];
    const mimeType = dataURL.split(';')[0].split(':')[1];
    const bytes = window.atob(base64);
    const buffer = new ArrayBuffer(bytes.length);
    const uint8 = new Uint8Array(buffer);
    
    for (let i = 0; i < bytes.length; i++) {
        uint8[i] = bytes.charCodeAt(i);
    }
    
    return new Blob([buffer], { type: mimeType });
  };

  const uploadFile = async () => {
    if (!file || !pdf || !title.trim()) {
        alert("Please select a photo, PDF, and enter a title");
        return;
    }
    if (!pdf.type.startsWith('application/pdf')) {
        alert("Please select a valid PDF file");
        return;
    }

    setLoad(true);
    setUploadProgress(0);

    const photoRef = ref(storage, `paiecell/Coursel/${v4()}`);
    const pdfRef = ref(storage, `paiecell/Coursel/${v4()}`);

    try {
        await uploadBytes(photoRef, dataURLtoBlob(file));
        await uploadBytes(pdfRef, pdf);

        const [photoUrl, pdfUrl] = await Promise.all([
            getDownloadURL(photoRef),
            getDownloadURL(pdfRef)
        ]);

        if (!photoUrl || !pdfUrl) {
            throw new Error("Failed to upload files or get download URLs");
        }

        // Replace YOUR_SERVER_URL with the actual server URL
        await axios.post(`${process.env.REACT_APP_Server}/addphotos`, {
            title,
            photoUrl,
            pdfUrl
        });

        console.log("Data uploaded successfully!");
        setTitle('');
        setPdf(null);
    } catch (error) {
        console.error("Error uploading files:", error);
        setUploadError(error.message);
    }

    setLoad(false);
  };

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Materials</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="form-group row">
                <label htmlFor="pdf" className="col-sm-4 col-form-label">Select PDF</label>
                <div className="col-sm-8">
                  <input type="file" className="form-control-file" id="pdf" onChange={(e) => setPdf(e.target.files[0])} accept=".pdf" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="pdf" className="col-sm-4 col-form-label">Select Photo</label>
                <div className="col-sm-8">
                  {!showButtons && (
                    <input
                      type="button"
                      className="form-control"
                      value="Choose File"
                      onClick={handleButtonClick}
                    />
                  )}
                  {showButtons && (
                    <div className="btn-group" role="group" aria-label="Select Photo">
                      <button type="button" className="btn btn-primary" onClick={openCamera}>Take Photo</button>
                      <button type="button" className="btn btn-primary" onClick={openGallery}>Choose from Gallery</button>
                    </div>
                  )}
                </div>
              </div><br/>
              <button type="button" className="btn btn-primary" onClick={uploadFile} disabled={load}>Upload</button>
              {uploadError && <div className="alert alert-danger">{uploadError}</div>}
              {load && <div className="progress"><div className="progress-bar" role="progressbar" style={{ width: `${uploadProgress}%` }}>{uploadProgress}%</div></div>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}