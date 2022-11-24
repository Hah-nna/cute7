<<<<<<< HEAD
import { doc, getDoc, getDocs, collection, query, where, deleteDoc, updateDoc, setDoc, orderBy } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
=======
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
>>>>>>> 711b671a6533893d7c9e1e6096cb7927a11956d4
import { authService, dbService } from "../firebase.js";
import { getYYYYMMDD } from "../util.js";

const getUserProfile = async (uid) => {
  try {
    const docRef = doc(dbService, "profile", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  } catch (err) {
    console.error(err);
    return alert("다시 시도해주세요");
  }
};

export const getPosterInfo = async (docId = "test") => {
  try {
    const docRef = doc(dbService, "post", docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { title, content, image, userId, createdAt } = docSnap.data();
      const { nickName, babyName, profileImage } = await getUserProfile(userId);

<<<<<<< HEAD
      const uid = authService.currentUser?.uid || "dYJBEhst3GYk8edYSjy4DhKQp2s2"; //test
      const userProfileImage = getUserProfile(uid).profileImage;

      if (userProfileImage) document.getElementById("comment-user-img").src = userProfileImage;
      if (image) document.getElementById("post-img").style.backgroundImage = `url(${image})`;
      if (nickName) document.getElementById("post-nickname").textContent = nickName;
      if (babyName) document.getElementById("post-animal-name").innerHTML = babyName;
      if (createdAt) document.getElementById("post-date").textContent = getYYYYMMDD(createdAt);
      if (profileImage) document.getElementById("post-user-img").src = profileImage;
=======
      const uid =
        authService.currentUser?.uid || "dYJBEhst3GYk8edYSjy4DhKQp2s2"; //test
      const userProfileImage = getUserProfile(uid).profileImage;

      if (userProfileImage)
        document.getElementById("comment-user-img").src = userProfileImage;
      if (image)
        document.getElementById(
          "post-img"
        ).style.backgroundImage = `url(${image})`;
      if (nickName)
        document.getElementById("post-nickname").textContent = nickName;
      if (babyName)
        document.getElementById("post-animal-name").innerHTML = babyName;
      if (createdAt)
        document.getElementById("post-date").textContent =
          getYYYYMMDD(createdAt);
      if (profileImage)
        document.getElementById("post-user-img").src = profileImage;
>>>>>>> 711b671a6533893d7c9e1e6096cb7927a11956d4
      if (title) document.getElementById("post-title").innerHTML = title;
      if (content) document.getElementById("post-desc").innerHTML = content;

      if (userId === uid) {
        const btnElement = document.getElementsByClassName("post-header")[0];
        if (btnElement.children.length < 2) {
          const div = document.createElement("div");
          div.id = "post-btns";
          const temp_html = `<img class="comment-btn" onclick="editComment();" src="../assets/edit.png" width="36" height="36" />
                              <img class="comment-btn" onclick="deleteComment();" src="../assets/delete.png" width="36" height="36" />`;
          div.innerHTML = temp_html;
          btnElement.appendChild(div);
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

export const updatePoster = () => {};

export const deletePoster = async () => {
  const docId = sessionStorage.getItem("docId");
  if (!docId) return alert("다시 시도해주세요.");

  try {
    await deleteDoc(doc(dbService, "post", docId));
    return alert("게시글을 삭제하였습니다.");
  } catch (err) {
    console.error(err);
    return alert("다시 시도해주세요.");
  }
};

export const getCommentList = async () => {
  const commentList = document.getElementById("comment-list");
  commentList.innerHTML = "";
  const docId = "test"; //test
  // const docId = sessionStorage.getItem("docId");

  try {
    const docRef = collection(dbService, "comment");
    const q = query(docRef, where("postId", "==", docId), orderBy("createdAt"));
    const querySnapShot = await getDocs(q);

    document.getElementById("comment-total").textContent = querySnapShot.size;

    querySnapShot.forEach(async (doc) => {
      const commentId = doc.id;
      const { userId, postId, content, createdAt } = doc.data();
      const { profileImage, nickName } = await getUserProfile(userId);
      const temp_html = `<div class="comment-wrapper">
                          <img class="comment-profile" src="${profileImage}" />
                          <div id="${commentId}" class="comment-items">
                            <div class="comment-header">
                              <div class="comment-info">
                                <div class="comment-nickname">${nickName}</div>
<<<<<<< HEAD
                                <div class="comment-date">${getYYYYMMDD(createdAt)}</div>
=======
                                <div class="comment-date">${getYYYYMMDD(
                                  createdAt
                                )}</div>
>>>>>>> 711b671a6533893d7c9e1e6096cb7927a11956d4
                              </div>
                              <div class="comment-btns">
                                <img class="comment-btn" onclick="editComment(this);" src="../assets/edit.png" width="36" height="36" />
                                <img class="comment-btn" onclick="deleteComment(this);" src="../assets/delete.png" width="36" height="36" />
                              </div>
                            </div>
                            <div class="comment-contents">${content}</div>
                          </div>
                        </div>`;

      const div = document.createElement("div");
      div.innerHTML = temp_html;
      commentList.appendChild(div);
    });
  } catch (err) {
    console.error(err);
    return alert("다시 시도해주세요.");
  }
};

export const createComment = async (event) => {
  const inputElement = document.getElementById("comment-input");
  const content = inputElement.value;
  if (!content) return alert("댓글을 입력해주세요.");

  try {
<<<<<<< HEAD
    const userId = authService.currentUser?.uid || "dYJBEhst3GYk8edYSjy4DhKQp2s2";
=======
    const userId =
      authService.currentUser?.uid || "dYJBEhst3GYk8edYSjy4DhKQp2s2";
>>>>>>> 711b671a6533893d7c9e1e6096cb7927a11956d4
    // const postId = sessionStorage.getItem("docId");
    const postId = "test";
    const updated = { userId, postId, content, createdAt: Date.now() };
    await setDoc(doc(collection(dbService, "comment")), updated);

    document.getElementById("comment-input").value = "";
    getCommentList();
    return alert("댓글을 등록하였습니다.");
  } catch (err) {
    console.error(err);
    return alert("다시 시도해주세요.");
  }
};

export const editComment = (event) => {
  const parent = event.parentNode.parentNode;
  event.parentNode.remove();
  const btnsElement = document.createElement("div");
  btnsElement.classList.add("comment-btns");
  const btns_html = `<div class="comment-edit-complete" onclick="updateComment(this);">수정완료</div>
                    <div class="comment-edit-cancel" onclick="cancelEditComment(this);">취소</div>`;
  btnsElement.innerHTML = btns_html;
  parent.appendChild(btnsElement);

  const parent_2 = parent.parentNode;
<<<<<<< HEAD
  const contentsElement = parent_2.getElementsByClassName("comment-contents")[0];
=======
  const contentsElement =
    parent_2.getElementsByClassName("comment-contents")[0];
>>>>>>> 711b671a6533893d7c9e1e6096cb7927a11956d4
  const value = contentsElement.innerHTML.trim();

  contentsElement.remove();
  const inputElement = document.createElement("input");
  inputElement.classList.add("comment-contents-edit");
  inputElement.value = value;
  parent_2.appendChild(inputElement);
};

export const cancelEditComment = (event) => {
  getCommentList();
};

export const updateComment = async (event) => {
  const containerElement = event.parentNode.parentNode.parentNode;
  const commentId = containerElement.id;
<<<<<<< HEAD
  const content = containerElement.getElementsByClassName("comment-contents-edit")[0].value;
=======
  const content = containerElement.getElementsByClassName(
    "comment-contents-edit"
  )[0].value;
>>>>>>> 711b671a6533893d7c9e1e6096cb7927a11956d4

  if (!commentId || !content) return alert("다시 시도해주세요.");

  try {
    const updated = { content };
    const docRef = doc(dbService, "comment", commentId);
    await updateDoc(docRef, updated);
    getCommentList();
    // return alert("댓글을 수정하였습니다.");
  } catch (err) {
    console.error(err);
    return alert("다시 시도해주세요.");
  }
};

export const deleteComment = async (event) => {
  if (!window.confirm("댓글을 삭제하시겠습니까?")) return;

  const commentId = event.parentNode.parentNode.parentNode.id;
  if (!commentId) return alert("다시 시도해주세요.");

  try {
    await deleteDoc(doc(dbService, "comment", commentId));
    getCommentList();
    return alert("댓글을 삭제하였습니다.");
  } catch (err) {
    console.error(err);
    return alert("다시 시도해주세요.");
  }
};

export const onEnterKey = () => {
  if (window.event.keyCode == 13) {
    createComment();
  }
};
