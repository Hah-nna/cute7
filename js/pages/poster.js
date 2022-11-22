import { doc, getDoc, getDocs, collection, query, where, deleteDoc, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { authService, dbService } from "../firebase.js";

const getUserProfile = async (uid) => {
  try {
    const docRef = doc(dbService, "profile", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (err) {
    console.error(err);
    return alert("다시 시도해주세요");
  }
};

export const getPosterInfo = async (docId) => {
  try {
    const docRef = doc(dbService, "post", docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { title, content, image, userId, createdAt } = docSnap.data();
      const { nickName, babyName, profileImage } = getUserProfile(userId);

      document.getElementById("comment-user-img").src = profileImage;
      document.getElementById("post-user-img").src = image;
      document.getElementById("post-nickname").textContent = nickName;
      document.getElementById("post-date").textContent = new Date(createdAt).toISOString().split("T")[0];
      document.getElementById("post-animal-name").innerHTML = babyName;
      document.getElementById("post-title").innerHTML = title;
      document.getElementById("post-desc").innerHTML = content;

      const uid = authService.currentUser.uid;
      if (userId === uid) {
        const btnElement = document.getElementById("post-btns");
        const temp_html = `<img class="comment-btn" onclick="updateComment();" src="../assets/edit.png" width="36" height="36" />
                          <img class="comment-btn" onclick="deleteComment();" src="../assets/delete.png" width="36" height="36" />`;
        btnElement.append(temp_html);
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

export const deletePoster = async (docId) => {
  if (!docId) return alert("다시 시도해주세요.");

  try {
    await deleteDoc(doc(dbService, "post", docId));
    return alert("게시글을 삭제하였습니다.");
  } catch (err) {
    console.error(err);
    return alert("다시 시도해주세요.");
  }
};

export const getCommentList = async (docId) => {
  try {
    const commentList = document.getElementById("comment-list");
    commentList.innerHTML = "";

    const docRef = collection(dbService, "comment");
    const q = query(docRef, where("postId", "==", docId));
    const querySnapShot = await getDocs(q);

    document.getElementById("comment-total").textContent = querySnapShot.size;

    querySnapShot.forEach((doc) => {
      const uid = authService.currentUser.uid;
      const { userId, postId, content, createdAt } = doc.data();
      const { profileImage, nickName } = getPosterInfo(userId);

      const temp_html = `<img class="comment-profile" src="url(${profileImage})" />
                          <div class="comment-items">
                            <div class="comment-header">
                              <div class="comment-info">
                                <div class="comment-nickname">${nickName}</div>
                                <div class="comment-date">${new Date(createdAt).toISOString().split("T")[0]}</div>
                              </div>
                              ${
                                uid === userId ??
                                '<div class="comment-btns"><img class="comment-btn" onclick="onEdit();" src="../assets/edit.png" width="36" height="36" /><img class="comment-btn" onclick="onDelete();" src="../assets/delete.png" width="36" height="36" /></div>'
                              } 
                            </div>
                            <div class="comment-contents">${content}</div>
                          </div>`;
      const div = document.createElement("div");
      div.classList.add("comment-wrapper");
      div.innerHTML = temp_html;
      commentList.appendChild(div);
    });
  } catch (err) {
    console.error(err);
    return alert("다시 시도해주세요.");
  }
};

export const createComment = async () => {
  const inputElement = document.getElementById("comment-input");
  const content = inputElement.value;
  if (!content) return alert("댓글을 입력해주세요.");

  try {
    const userId = authService.currentUser.uid;
    const docId = sessionStorage.getItem("docId");
    const updated = { userId, docId, content, createdAt: Date.now() };
    await setDoc(doc(dbService, "comment"), updated);

    document.getElementById("comment-input") = ''
    getCommentList();
    return alert("댓글을 등록하였습니다.");
  } catch (err) {
    console.error(err);
    return alert("다시 시도해주세요.");
  }
};

export const updateComment = async ({ commentId, title, content }) => {
  if (!commentId || !title || !content) return alert("다시 시도해주세요.");

  try {
    const updated = { title, content };
    const docRef = doc(dbService, "comment", commentId);
    const updateTimestamp = await updateDoc(docRef, updated);
    getCommentList();
    if (updateTimestamp) return alert("댓글을 수정하였습니다.");
  } catch (err) {
    console.error(err);
    return alert("다시 시도해주세요.");
  }
};

export const deleteComment = async (commentId) => {
  if (!commentId) return alert("다시 시도해주세요.");

  try {
    await deleteDoc(doc(dbService, "comment", commentId));
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
