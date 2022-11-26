import { authService, dbService, storageService } from "../firebase.js";
import { ref } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

export const getWritingObj = async () => {
  // const docId = sessionStorage.getItem("v2");
  const docId = "HzSlnZnFu0MaBQdF1v4k";
  const docRef = doc(dbService, "post", docId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const { userId, image, title, content } = docSnap.data();
    if (title) document.getElementById("write_title").value = title;
    if (content) document.getElementById("write_posting").value = content;
    if (image) document.getElementById("previewImg").src = image;
  } else {
    console.log("No such document!");
  }
};

//
export const edit_posting = async (event) => {
  event.preventDefault();
  document.getElementById("btn_yes").disabled = true;
  const imgRef = ref(
    storageService,
    `${authService.currentUser.uid}/${uuidv4()}`,
  );
  const title = document.getElementById("write_title").value;
  const content = document.getElementById("write_posting").value;
  const imgDataUrl = document.getElementById("previewImg").src;
  let image = null;

  if (!imgDataUrl.includes("https://firebasestorage.googleapis.com/")) {
    image = await save_postImage();
  }
  try {
    // const docId = sessionStorage.getItem("v2")
    const docId = "HzSlnZnFu0MaBQdF1v4k";
    const docRef = doc(dbService, "post", docId);
    const updated = image ? { title, content, image } : { title, content };
    await updateDoc(docRef, updated);
    window.alert("수정이 완료되었습니다");
    location.hash = "main-page";
  } catch (err) {
    console.error(err.message);
    window.alert("다시 시도해주세요");
  }
};
