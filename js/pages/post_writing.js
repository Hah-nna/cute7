import { doc, getDoc, getDocs, collection, query, updateDoc, setDoc, orderBy } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { authService, dbService } from "../firebase.js";

//이미지, 내용, 제목 저장//
export const savePosting = async (event) => {
    event.preventDefault();
    const posting = document.getElementById("uid");
    const { uid, imgURL, title, content } = authService.currentUser;
    console.log(currentUser);
    try {
      await addDoc(collection(dbService, "post"), {
        createdAt: Date.now(),
        userId: uid,
        image: imgURL,
        title: title,
        content: content,
      });
    } catch (error) {
      alert(error);
      console.log("error in addDoc:", error);
    }
  };