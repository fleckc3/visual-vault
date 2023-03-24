import React, { useState } from "react";
import Parse from "parse/dist/parse.min.js";

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

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader.result.toString().replace(/^data:(.*,)?/, "");
        if (encoded.length % 4 > 0) {
          encoded += "=".repeat(4 - (encoded.length % 4));
        }
        resolve(encoded);
      };
      reader.onerror = (error) => reject(error);
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission logic here
    const file = new Parse.File("testImage.jpg", image, "image/jpg");



    file.save().then(
      function () {
        // The file has been saved to Parse.
        console.log("SAVED");
      },
      function (error) {
        // The file either could not be read, or could not be saved to Parse.
        console.log("ERROR: ", error);

      }
    );



     // create a new Parse Object instance
     const Image = new Parse.Object('Image');
     // define the attributes you want for your Object
     Image.set('name', 'testImage.jpg');
     Person.set('imageData', 'john@back4app.com');
     // save it on Back4App Data Store
     await Person.save();
     alert('Person saved!');
   } catch (error) {
     console.log('Error saving new person: ', error);
   }
  };

  return (
    <form onSubmit={handleSubmit}>
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
