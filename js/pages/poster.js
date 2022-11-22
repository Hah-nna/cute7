import { doc, getDoc, collection, query, where, deleteDoc, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { dbService } from "../firebase.js";

export const getPosterInfo = async (docId) => {
  const docRef = doc(dbService, "post", docId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

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
  const docRef = collection(dbService, "comment");
  const q = query(docRef, where("docId", "==", docId));
  const querySnapShot = await getDocs(q);

  querySnapShot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });
};

export const createComment = async ({ title, content }) => {
  if (!title | !content) return alert("다시 시도해주세요.");

  try {
    const updated = { title, content, createdAt: Date.now() };
    await setDoc(doc(dbService, "comment"), updated);
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
