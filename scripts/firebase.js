import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";

import { getFirestore, collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCh7XxePOrvNVlYrqU9lGCPHOk14SGwQPY",
    authDomain: "proyecto-web-cd6e8.firebaseapp.com",
    projectId: "proyecto-web-cd6e8",
    storageBucket: "proyecto-web-cd6e8.appspot.com",
    messagingSenderId: "234416805005",
    appId: "1:234416805005:web:dadaeb592ea0316f22fec4"
  };

// Inicializamos firebase
const app = initializeApp(firebaseConfig);

// Inicializamos firestore
const database = getFirestore(app);

// Traer documentos
export const getProducts = async () => {

  const querySnapshot = await getDocs(collection(database, "products"));
  let array = [];

  querySnapshot.forEach((doc) => {

    array.push(doc.data());

  });

  return array;
}

export const getProduct = async (id) => {

  const docRef = doc(database, "products", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap;
  } else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}
  
}
