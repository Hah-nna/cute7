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
import { goToPostId } from "../router.js";
import { getYYYYMMDD } from "../util.js";
import { getUserProfile } from "./poster.js";

export const getPostList = async () => {
  const postList = document.getElementById("main_columns");
  console.log(postList);
  postList.innerHTML = "";
  const docId = ""; //test
  // const docId = sessionStorage.getItem("docId");

  // try {
  const querySnapShot = await getDocs(collection(dbService, "post"));
  querySnapShot.forEach(async (doc) => {
    // console.log(2, doc.data());
    const docId = doc.id;
    const { userId, image, title } = doc.data();
    const { profileImage, nickName } = await getUserProfile(userId);
    const temp_html = `<figure onclick="clickPost('${docId}')">
                              <img
                                id="image"
                                src="${image}"
                              />
                              <figcaption>
                                <a id="title">${title}</a>
                                <div id="users">
                                  <img id="profileImage"
                                  src="${profileImage}"
                                  />
                                  <a class="name">${nickName}</a>
                                </div>
                              </figcaption>
                            </figure>`;

    const div = document.createElement("div");
    div.innerHTML = temp_html;
    postList.appendChild(div);
  });
  // } catch (err) {
  //   console.error(err);
  //   return alert("다시 시도해주세요.");
  // }
};

export const clickPost = async (docId) => {
  console.log(docId);
  // const docId = doc(dbService, "post", docId);
  sessionStorage.setItem("docId", docId);
  goToPostId();
  // const docId = sessionStorage.getItem("docId");
  // console.log(docId);
  // try {
  //   await doc(dbService, "post", docId);
  //   return window.location(docId); // <-이게 맞는가....?
  // } catch (err) {
  //   console.error(err);
  //   return alert("해당 페이지가 없습니다");
  // }
};
