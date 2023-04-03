//@ts-nocheck
import firebaseApp from "@/lib/firebase";
import axios from "axios";
import { getFirestore, collection, addDoc } from "firebase/firestore";

import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";

const db = getFirestore(firebaseApp);

export async function POST(request: Request) {
  const res = await request.json();
  const imageUrl = res.image;
  const inputText = res.inputText;
  const name = res.name;

  const downloadedImage = await axios.get(imageUrl, {
    responseType: "arraybuffer",
  });

  let image = Buffer.from(downloadedImage.data, "binary").toString("base64");

  const storage = getStorage(firebaseApp);
  const storageRef = ref(storage, "images");
  const imageRef = ref(storageRef, `${name}.png`);

  const uploadTask = await uploadString(imageRef, image, "base64");

  const downloadUrl = await getDownloadURL(imageRef);

  try {
    await addDoc(collection(db, "images"), {
      inputText: inputText,
      image: downloadUrl,
      name: name,
    });
    console.log("Data sent");
  } catch (error) {
    console.log(error);
  }

  return new Response("Document added");
}
