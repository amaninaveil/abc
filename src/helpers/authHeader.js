export function authHeader() {
  // let token = cookiesService.getCookies("user");
  let token = localStorage.getItem("user");

  if (token) {
    return `Bearer ${token}`;
  } else {
    return {};
  }
}
