import { authService } from "./firebase.js";
import { getPostList } from "./pages/cutemain.js";
import { getCommentList, getPosterInfo } from "./pages/poster.js";
import { getProfileInfo, getProfilePostList } from "./pages/profile_edit.js";

export const route = (event) => {
  event.preventDefault();
  window.location.hash = event.target.hash;
};

const routes = {
  "/": "/pages/main.html",
  auth: "/pages/auth.html",
  poster: "/pages/poster.html",
  404: "/pages/404.html",
  profile: "/pages/profile.html",
  profile_edit: "/pages/profile_edit.html",
};

export const handleLocation = async () => {
  let path = window.location.hash.replace("#", ""); // ""

  // "http://example.com/"가 아니라 도메인 뒤에 / 없이 "http://example.com" 으로 나오는 경우
  if (path.length == 0) {
    path = "/";
  }

  const route = routes[path] || routes[404]; // truthy 하면 route[path], falsy 하면 routes[404]
  const html = await fetch(route).then((data) => data.text());
  document.getElementById("main-page").innerHTML = html;

  if (path === "poster") {
    // document.getElementById("post-user-img").src = authService.currentUser?.profileImage ?? "../assets/sampleImg.png";
    // document.getElementById("comment-user-img").src = authService.currentUser?.profileImage ?? "../assets/sampleImg.png";
    // document.getElementById("post-nickname").textContent = authService.currentUser?.displayName ?? "닉네임 없음";
    getPosterInfo();
    getCommentList();
  }

  if (path === "profile" || path === "profile_edit") {
    getProfileInfo();
    getProfilePostList();
  }
  // 프로필, 프로필수정 화면 일 때 현재 프로필 사진과 닉네임, 반려동물, 설명 할당
  if (path === "/") {
    getPostList();
  }
};

export const goToMain = () => {
  window.location.hash = "#";
};

export const goToProfile = () => {
  window.location.hash = "#profile";
};

export const goToProfile_Edit = () => {
  window.location.hash = "#profile_edit";
};

export const goToPost = () => {
  window.location.hash = "#poster";
};
