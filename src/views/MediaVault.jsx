import { ImageList, ImageListItem, Box, Button } from "@mui/material";
import { db } from "../firebase-config";
import { ref, child, get } from "firebase/database";
import { useEffect, useState } from "react";
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';

function MediaVault({ setShowVault }) {
  const [isFullscreen, setIsFullscreen] = useState({});
  const [media, setMedia] = useState([]);
  const dbRef = ref(db);

  useEffect(() => {
    get(child(dbRef, "vaults"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setMedia(Object.values(snapshot.val()));
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dbRef]);

  return (
    <Box sx={{ mt: 10, overflow: 'hidden' }}>
      {media.length ? (
        <>
          <ImageList
            sx={{ width: "100%", height: "auto" }}
            cols={2}
            rowHeight={164}
          >
            {media.map((item) => (
              <ImageListItem key={item.name} sx={{ overflow: "hidden" }}>
                {item.type === "Image" ? (
                  <img
                    src={`${item.src}?w=164&h=auto&fit=crop&auto=format`}
                    srcSet={`${item.src}?w=164&h=auto&fit=crop&auto=format&dpr=2 2x`}
                    loading="lazy"
                    alt={item.name}
                    onClick={() =>
                      setIsFullscreen({
                        src: item.src,
                        name: item.name,
                        type: item.type,
                      })
                    }
                  />
                ) : (
                  <Box
                    onClick={() =>
                      setIsFullscreen({
                        src: item.src,
                        name: item.name,
                        type: item.type,
                      })
                    }
                  >
                    <video
                      width="164"
                      height="AUTO"
                      onClick={() =>
                        setIsFullscreen({
                          src: item.src,
                          name: item.name,
                          type: item.type,
                        })
                      }
                    >
                      <source src={item.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </Box>
                )}
              </ImageListItem>
            ))}
          </ImageList>
        </>
      ) : (
        <Box>No media</Box>
      )}
      {isFullscreen.src && (
        <Box
          sx={{
            position: "fixed",
            top: "0px",
            left: "0px",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.8)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setIsFullscreen({})}
        >
          <Box
            sx={{
              maxWidth: "90%",
              maxHeight: "90%",
            }}
          >
            {isFullscreen.type === "Image" ? (
              <img
                src={isFullscreen.src}
                srcSet={isFullscreen.src}
                loading="lazy"
                alt={isFullscreen.name}
              />
            ) : (
              <video width="164" height="164" controls>
                <source src={isFullscreen.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </Box>
        </Box>
      )}
      <Button
        variant="contained"
        color="secondary"
        startIcon={<ArrowBackIosOutlinedIcon />}
        sx={{ position: "absolute", bottom: 5, left: 5 }}
        onClick={() =>  setShowVault(false)}
      >
        Back
      </Button>
    </Box>
  );
}

export default MediaVault;
