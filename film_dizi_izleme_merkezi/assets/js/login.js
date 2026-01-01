import { getUser, setUser } from "./auth.js";

// Elements
const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");
const authTabs = document.querySelectorAll(".auth-tab");
const authForms = document.querySelectorAll(".auth-form");
const toastEl = document.querySelector("#toast");

// Login form elements
const loginEmailEl = document.querySelector("#loginEmail");
const loginPassEl = document.querySelector("#loginPass");

// Register form elements
const registerNameEl = document.querySelector("#registerName");
const registerEmailEl = document.querySelector("#registerEmail");
const registerPassEl = document.querySelector("#registerPass");
const registerPassConfirmEl = document.querySelector("#registerPassConfirm");

// Local storage key for registered users
const USERS_KEY = "fd_users_v1";

// Helper functions
function toast(msg){
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(()=> toastEl.classList.remove("show"), 1700);
}

function isEmail(v){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function safe(v){ return String(v||"").trim(); }

function go(){
  window.location.href = "app.html";
}

// Get all registered users
function getUsers(){
  try{
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  }catch(_){ return []; }
}

// Save users list
function saveUsers(users){
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Find user by email
function findUser(email){
  return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
}

// Tab switching
authTabs.forEach(tab => {
  tab.addEventListener("click", ()=>{
    const target = tab.dataset.tab;
    
    // Update tabs
    authTabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    
    // Update forms
    authForms.forEach(f => f.classList.remove("active"));
    if(target === "login"){
      loginForm.classList.add("active");
    } else {
      registerForm.classList.add("active");
    }
  });
});

// Check if already logged in
const existing = getUser();
if(existing?.name){
  const quick = document.querySelector("#quickHint");
  quick.style.display = "block";
  quick.querySelector("b").textContent = existing.name;
  quick.querySelector("button").addEventListener("click", go);
}

// Login form submit
loginForm.addEventListener("submit", (e)=>{
  e.preventDefault();
  const email = safe(loginEmailEl.value);
  const pass = safe(loginPassEl.value);

  if(!isEmail(email)) return toast("Geçerli bir e‑posta gir.");
  if(pass.length < 4) return toast("Şifre en az 4 karakter olmalı.");

  // Find user
  const user = findUser(email);
  
  if(!user){
    return toast("Bu e-posta ile kayıtlı kullanıcı bulunamadı.");
  }

  if(user.password !== pass){
    return toast("Şifre hatalı!");
  }

  // Login successful
  setUser({
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    favorites: user.favorites || [],
    lastPlayed: user.lastPlayed || null
  });

  toast("Giriş başarılı! Yönlendiriliyorsun...");
  setTimeout(go, 650);
});

// Register form submit
registerForm.addEventListener("submit", (e)=>{
  e.preventDefault();
  const name = safe(registerNameEl.value);
  const email = safe(registerEmailEl.value);
  const pass = safe(registerPassEl.value);
  const passConfirm = safe(registerPassConfirmEl.value);

  // Validations
  if(name.length < 2) return toast("İsim en az 2 karakter olmalı.");
  if(!isEmail(email)) return toast("Geçerli bir e‑posta gir.");
  if(pass.length < 4) return toast("Şifre en az 4 karakter olmalı.");
  if(pass !== passConfirm) return toast("Şifreler eşleşmiyor!");

  // Check if user already exists
  if(findUser(email)){
    return toast("Bu e-posta zaten kayıtlı!");
  }

  // Create new user
  const users = getUsers();
  const newUser = {
    name,
    email,
    password: pass, // In real app, this should be hashed
    createdAt: new Date().toISOString(),
    favorites: [],
    lastPlayed: null
  };
  users.push(newUser);
  saveUsers(users);

  // Auto login
  setUser({
    name: newUser.name,
    email: newUser.email,
    createdAt: newUser.createdAt,
    favorites: [],
    lastPlayed: null
  });

  toast("Kayıt başarılı! Yönlendiriliyorsun...");
  setTimeout(go, 650);
});
