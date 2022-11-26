import { authService, dbService, storageService } from "../firebase.js";
import {
  ref,
  getDownloadURL,
  uploadString,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
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

const querySnapshot = await getDocs(collection(dbService, "post"));
/* post라는 컬렉션의 모든 문서를 담는 변수 */
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  /* 이 부분에서 console.log 대신 setState()를 이용해 원하는 변수에 담아주면 된다. */
});

export const getWritingObj = async () => {
  let writingObjList = [];
  const q = query(collection(dbService, "post"), orderBy("createdAt", "desc"));

  const querySnapshot = await getDocs(q);
  console.log("querySnapshot:", querySnapshot);
  querySnapshot.forEach((doc) => {
    console.log(2, doc.data());
    const writingObj = {
      id: doc.id,
      ...doc.data(),
    };
    writingObjList.push(writingObj);
  });

  const postWritingList = document.getElementById("comment-list");
  const currentUid = authService.currentUser.uid;
  writingObjList.innerHTML = "";
  cmtObjList.forEach((writingObj) => {
    const v2 = doc.id;
    const { userId, image, title } = doc.data();
    const isOwner = currentUid === writingObj.creatorId;
    const temp_html = `<div class="write-container">
                        <div class="writeUpload-box">
                          <div id="drop-file" class="drag-file">
                            <img
                              id="previewImg"
                              src='${writingObj.image}'
                              alt="미리보기 이미지"
                              class="preview"
                            />
                          </div>
                          <div class="fileUploadBtn">
                            <label class="file-label" for="chooseFile">Choose File</label>
                            <input
                              class="file"
                              id="chooseFile"
                              type="file"
                              accept="image/png, image/jpeg"
                              onchange="upload_postImage(event)"
                            />
                          </div>
                        </div>
                        </div>  
                        <div class="write-box">
                          <div class="writeBox-group">
                            <label for="write_title">'${writingObj.title}'</label>
                            <input
                              id="write_title"
                              type="text"
                              maxlength="15"
                              placeholder="제목을 작성해주세요"
                            />
                            <label for="write_posting">'${writingObj.content}'</label>
                            <textarea id="write_posting" placeholder="내용을 작성해주세요"></textarea>
                          </div>
                        </div>
                        </div>`;
  });
};

// const title = doc.data().title;
// const image = doc.data().image
// const content = doc.data().content

// const totalPostDB = dbService.getItem("title", "image", "content");

// export const getUserPostingDB = async (v2 = "test") => {
//   try {
//     const docRef = doc(dbService, "post", v2);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       const { title, content, image, userId } = docSnap.data()
//       = await getUserPostInfo(userId);

//       const v2 =
//         authService.currentUser?.uid || "HzSlnZnFu0MaBQdF1v4k"; //test

//       if (title)
//         document.getElementById("write_title").value = title;
//       if (content)
//         document.getElementById("write_posting").value = content;
//       if (image)
//         document.getElementById("chooseFile").src = image;
//     } else {
//       console.log("No such document!");
//     }
//   } catch (err) {
//     console.error(err);
//     return alert("다시 시도해주세요.");
//   }
// };

export const edit_posting = async (event) => {
  event.preventDefault();
  document.getElementById("btn_yes").disabled = true;
  const imgRef = ref(
    storageService,
    `${authService.currentUser.uid}/${uuidv4()}`,
  );
};
// const title = document.getElementById("write_title")
// const content = document.getElementById("write_posting")
// const ImgDataUrl = localStorage.getItem("imgDataUrl");

// let downloadUrl;
//   if (ImgDataUrl) {
//     const response = await uploadString(imgRef, imgDataUrl, "data_url");
//     downloadUrl = await getDownloadURL(response.ref);
//   }
//   await edit_posting(authService.currentUser, {
//     title: title ? title : null,
//     content: content ? content : null,
//     image: downloadUrl ? downloadUrl : null,
//   })
//     .then(() => {
//       alert("글 수정 완료");
//       window.location.hash = "#main";
//     })
//     .catch((error) => {
//       alert("글 수정 실패");
//       console.log("error:", error);
//     });
