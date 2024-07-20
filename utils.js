export function checkToken() {
  const token = localStorage.getItem("token");
  return !!token;
}

export function redirect(url) {
  window.location.href = url;
}
