// @ts-nocheck

"use client";

// import axios from "axios";

export async function fetchImagesFromFirebase() {
  const response = await fetch("/api/getFirebase", {
    method: "GET",
    headers: {
      cache: "no-cache",
      "Cache-Control": "no-cache",
    },
  });

  let data = await response.json();

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

// export async function fetchImagesFromFirebase() {
//   const res = await axios.get("/api/getFirebase");
//   const data = await res.data;

//   let listaDeObjetos = data;
//   listaDeObjetos.sort((a, b) => {
//     if (a.name > b.name) {
//       return -1;
//     } else if (a.name < b.name) {
//       return 1;
//     } else {
//       return 0;
//     }
//   });
//   return listaDeObjetos;
// }
