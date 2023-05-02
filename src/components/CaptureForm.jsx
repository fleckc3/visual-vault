import React, { useState } from "react";

function CaptureForm() {
  const [video, setVideo] = useState(null);
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);

  const handleVideoCapture = (event) => {
    const videoFile = event.target.files[0];
    setVideo(videoFile);
  };

  const handleImageCapture = async (event) => {
    const imageFile = event.target.files[0];
    // const encodedFile = await getBase64(imageFile);
    // console.log(encodedFile);
    setImage(imageFile);
  };

  const handleAudioCapture = (event) => {
    const audioFile = event.target.files[0];
    setAudio(audioFile);
  };


  return (
    <form onSubmit={``}>
      <div>
        <label htmlFor="videoCapture">Capture Video:</label>
        <input
          type="file"
          accept="video/*"
          capture="user"
          id="videoCapture"
          onChange={handleVideoCapture}
        />
      </div>
      <div>
        <label htmlFor="imageCapture">Capture Image:</label>
        <input
          type="file"
          accept="image/*"
          capture="user"
          id="imageCapture"
          onChange={handleImageCapture}
        />
      </div>
      <div>
        <label htmlFor="audioCapture">Capture Audio:</label>
        <input
          type="file"
          accept="audio/*"
          capture="user"
          id="audioCapture"
          onChange={handleAudioCapture}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default CaptureForm;
