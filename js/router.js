import { authService } from "./firebase.js";
import { getCommentList, getPosterInfo } from "./pages/poster.js";

export const route = (event) => {
  event.preventDefault();
  window.location.hash = event.target.hash;
};

const routes = {
  "/": "/pages/home.html",
  auth: "/pages/auth.html",
  poster: "/pages/poster.html",
  404: "/pages/404.html",
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
};
