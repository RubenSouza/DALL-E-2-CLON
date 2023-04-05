// @ts-nocheck

"use client";

import firebaseApp from "@/lib/firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export async function fetchImagesFromFirebase() {
  let data = [];

  const querySnapshot = await getDocs(collection(db, "images"));
  querySnapshot.forEach(doc => {
    data.push(doc.data());
  });

  let listaDeObjetos = data;
  listaDeObjetos.sort((a, b) => {
    if (a.name > b.name) {
      return -1;
    } else if (a.name < b.name) {
      return 1;
    } else {
      return 0;
    }
  });
  return listaDeObjetos;
}
