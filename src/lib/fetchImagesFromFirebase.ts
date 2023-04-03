// @ts-nocheck

import axios from "axios";

export async function fetchImagesFromFirebase() {
  const res = await axios.get("/api/getFirebase");
  const data = await res.data;

  let listaDeObjetos = data;
  listaDeObjetos.sort((a, b) => {
    if (a.name > b.name) {
      return -1;
    } else if (a._id < b._id) {
      return 1;
    } else {
      return 0;
    }
  });
  return listaDeObjetos;
}
