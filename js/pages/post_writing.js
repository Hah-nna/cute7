import {
  doc,
  addDoc,
  getDocs,
  collection,
  query,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { authService, dbService, storageService } from "../firebase.js";
import {
  ref,
  getDownloadURL,
  uploadString,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

// 이미지 업로드
export const upload_postImage = (event) => {
  const theFile = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(theFile);
  reader.onloadend = (finishedEvent) => {
    const imgDataUrl = finishedEvent.currentTarget.result;
    localStorage.setItem("imgDataUrl", imgDataUrl);
    document.getElementById("previewImg").src = imgDataUrl;
  };
};

// 포스팅이미지 저장
export const save_postImage = async () => {
  // console.log(1);
  const imgRef = ref(
    storageService,
    `${authService.currentUser.uid}/${uuidv4()}`,
  );
  const imgDataUrl = localStorage.getItem("imgDataUrl");
  // console.log('imgdataurl:',imgDataUrl)
  let downloadUrl;
  if (imgDataUrl) {
    const response = await uploadString(imgRef, imgDataUrl, "data_url");
    // console.log('response :',response)
    downloadUrl = await getDownloadURL(response.ref);
    console.log(downloadUrl);
  }
  return downloadUrl;
};

//이미지, 내용, 제목 저장//
export const save_posting = async (event) => {
  event.preventDefault();
  const imageUrl = await save_postImage();
  console.log(imageUrl);
  const write_posting = document.getElementById("write_posting");
  const write_title = document.getElementById("write_title");
  const { uid } = authService.currentUser;
  // console.log(authService.currentUser)
  try {
    await addDoc(collection(dbService, "post"), {
      createdAt: Date.now(),
      userId: uid,
      image: imageUrl,
      title: write_title.value,
      content: write_posting.value,
    });
    alert("포스팅 저장 완료!");
    window.location.hash = "#";
  } catch (error) {
    alert(error);
    console.log("error in addDoc:", error);
  }
};
