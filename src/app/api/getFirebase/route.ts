//@ts-nocheck

import firebaseApp from "@/lib/firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export async function GET(request: Request) {
  let data = [];

  const querySnapshot = await getDocs(collection(db, "images"));
  querySnapshot.forEach(doc => {
    // doc.data() is never undefined for query doc snapshots
    data.push(doc.data());
  });

  let response = JSON.stringify(data);

  return new Response(response);
}
