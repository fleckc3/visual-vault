import { ImageList, ImageListItem } from "@mui/material";
import { db } from "../firebase-config";
import {
  getDatabase,
  ref,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
} from "firebase/database";

function MediaVault() {
  const vaultsRef = ref(db, "vaults");
  let mediaList = []
  onChildAdded(vaultsRef, (data) => {
    // console.log(data.key, data.val().name, data.val().url);
    mediaList.push(data.val().url)
  });
  console.log(mediaList)
  return (
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {mediaList.map((item) => (
        <ImageListItem key={item}>
          <img
            src={`${item}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default MediaVault;
