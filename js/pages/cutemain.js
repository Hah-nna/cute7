import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  updateDoc,
  setDoc,
  orderBy,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { authService, dbService } from "../firebase.js";
import { getYYYYMMDD } from "../util.js";

export const getPosterInfo = async (docId = "test") => {
  try {
    const docRef = doc(dbService, "profile", docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { title, image, userId, createdAt } = docSnap.data();
      const { nickName, profileImage } = await getUserProfile(userId);

      const uid =
        authService.currentUser?.uid || "dYJBEhst3GYk8edYSjy4DhKQp2s2"; //test
      const userProfileImage = getUserProfile(uid).profileImage;

      if (userProfileImage)
        document.getElementById("comment-user-img").src = userProfileImage;
      if (image)
        document.getElementById("img").style.backgroundImage = `url(${image})`;
      if (nickName) document.getElementById("name").textContent = nickName;
      if (createdAt)
        document.getElementById("post-date").textContent =
          getYYYYMMDD(createdAt);
      if (profileImage)
        document.getElementById("profileImage").src = profileImage;
      if (title) document.getElementById("title").innerHTML = title;

      if (userId === uid) {
        const btnElement = document.getElementsByClassName("main_columns")[0];
        if (btnElement.children.length < 2) {
          const div = document.createElement("div");
          div.id = "main_columns";
          const temp_html = `<figure>
          <img
            id="image"
            src="${image}"
          />
          <figcaption>
            <a id="title">${title}</a>
            <div id="user">
              <img
                ${profileImage}
              />
              <a class="name">${nickName}</a>
            </div>
          </figcaption>
        </figure>`;
          div.innerHTML = temp_html;
          btnElement.appendChild(div);
          console.log();
        }
      }
    } else {
      console.log("No such document!");
    }
  } catch (err) {
    console.error(err);
    return alert("다시 시도해주세요.");
  }
};
