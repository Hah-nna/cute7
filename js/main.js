import { authService, dbService, storageService, } from "./firebase.js";
import { handleLocation, routes } from "./router.js";
import { savePosting } from "./pages/post_writing.js";


// hash url 변경 시 처리
window.addEventListener("hashchange", handleLocation);

// 첫 랜딩 또는 새로고침 시 처리
document.addEventListener("DOMContentLoaded", handleLocation);

// 로그인 상태 모니터링
authService.onAuthStateChanged((user) => {
    // Firebase 연결되면 화면 표시
		// user === authService.currentUser 와 같은 값
        handleLocation();
        const hash = window.location.hash;
        if (user == "") {
      // 로그인 상태인 경우
      window.location.replace("#main")

    } else {
      // 로그아웃 상태인 경우
      if (hash !== "") {
        window.location.replace("")
      }
    }
  });

// 전역 함수 리스트
window.routes = routes;
window.savePosting = savePosting;
// window.onclick = onclick;
// window.handleAuth = handleAuth;
// window.goToProfile = goToProfile;
// window.socialLogin = socialLogin;
// window.logout = logout;
// window.onFileChange = onFileChange;
// window.changeProfile = changeProfile;
// window.save_comment = save_comment;
// window.update_comment = update_comment;
// window.onEditing = onEditing;
// window.delete_comment = delete_comment;
// window.savePost = save_post;
// window.editPost = edit_post;