const KEY = "fd_auth_v1";

export function getUser(){
  try{
    return JSON.parse(localStorage.getItem(KEY) || "null");
  }catch(_){ return null; }
}

export function setUser(user){
  localStorage.setItem(KEY, JSON.stringify(user));
}

export function logout(){
  localStorage.removeItem(KEY);
  window.location.href = "index.html";
}

export function requireAuth(){
  const u = getUser();
  if(!u){
    window.location.href = "index.html";
    return null;
  }
  return u;
}
