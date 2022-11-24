import { dbService, authService } from "../firebase.js";
import { handleLocation } from "./router.js";



//이미지, 내용, 제목 수정
export const editPosting = async (event) => {
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
