import { authService } from "./firebase.js";
import { handleLocation, route } from "./router.js";
import {
  save_posting,
  save_postImage,
  upload_postImage,
} from "./pages/post_writing.js";
import { edit_posting } from "./pages/post_edit.js";

// hash url 변경 시 처리
window.addEventListener("hashchange", handleLocation);

// 첫 랜딩 또는 새로고침 시 처리
document.addEventListener("DOMContentLoaded", handleLocation);

// 로그인 상태 모니터링
authService.onAuthStateChanged((user) => {
  // Firebase 연결되면 화면 표시
  // user === authService.currentUser 와 같은 값
  handleLocation();
  if (user) {
    // 로그인 상태인 경우
  } else {
    // 로그아웃 상태인 경우
  }
});

// 전역 함수 리스트
window.route = route;
// window.deletePoster = deletePoster;
// window.createComment = createComment;
// window.editComment = editComment;
// window.cancelEditComment = cancelEditComment;
// window.updateComment = updateComment;
// window.deleteComment = deleteComment;
// window.onEnterKey = onEnterKey;
// window.fil = fil;
// window.goToProfile = goToProfile;
// window.goToPost = goToPost;
// window.onFileChange = onFileChange;
// window.changeProfile = changeProfile;
// window.goToProfile_Edit = goToProfile_Edit;
// window.goToMain = goToMain;
// window.savePosting = savePosting;
// window.handleAuth = handleAuth;
window.save_posting = save_posting;
window.save_postImage = save_postImage;
window.upload_postImage = upload_postImage;
window.edit_posting = edit_posting;
