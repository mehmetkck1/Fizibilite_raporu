import { ITEMS } from "./data.js";
import { requireAuth, logout, getUser, setUser } from "./auth.js";

const u = requireAuth();
const userEl = document.querySelector("#userName");
if(userEl) userEl.textContent = u?.name || "Kullanıcı";

const els = {
  grid: document.querySelector("#grid"),
  tabs: document.querySelectorAll("[data-tab]"),
  search: document.querySelector("#searchInput"),
  toast: document.querySelector("#toast"),
  modal: document.querySelector("#modal"),
  mClose: document.querySelector("#mClose"),
  mTitle: document.querySelector("#mTitle"),
  mDesc: document.querySelector("#mDesc"),
  mTags: document.querySelector("#mTags"),
  mWhere: document.querySelector("#mWhere"),
  player: document.querySelector("#player"),
  statsTotal: document.querySelector("#statTotal"),
  statsFav: document.querySelector("#statFav"),
  statsLast: document.querySelector("#statLast"),
  logoutBtn: document.querySelector("#logoutBtn"),
  clearFavBtn: document.querySelector("#clearFavBtn"),
  heroPlay: document.querySelector("#heroPlay"),
  heroRandom: document.querySelector("#heroRandom"),
  heroTitle: document.querySelector("#heroTitle"),
  heroSub: document.querySelector("#heroSub"),
};

let state = {
  tab: "trend",
  q: "",
  favorites: new Set(u?.favorites || []),
  lastPlayed: u?.lastPlayed || null,
};

function saveUserPatch(patch){
  const cur = getUser() || {};
  const next = { ...cur, ...patch };
  setUser(next);
}

function toast(msg){
  els.toast.textContent = msg;
  els.toast.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(()=> els.toast.classList.remove("show"), 1700);
}

function posterGradient(title){
  // Overlay gradient for posters
  let h = 0;
  for(const ch of title) h = (h*31 + ch.charCodeAt(0)) >>> 0;
  const hue = h % 360;
  return `linear-gradient(180deg, 
    rgba(0,0,0,0) 0%, 
    rgba(0,0,0,0.3) 40%,
    rgba(0,0,0,0.85) 100%),
    linear-gradient(135deg, 
      hsla(${hue}, 70%, 50%, 0.15), 
      hsla(${(hue + 60) % 360}, 60%, 45%, 0.1))`;
}

function pickHero(){
  const pick = ITEMS.filter(x=>x.top).sort((a,b)=>b.popularity-a.popularity)[0] || ITEMS[0];
  els.heroTitle.textContent = `${pick.title} (${pick.year})`;
  els.heroSub.textContent = pick.blurb;
  els.heroPlay.onclick = () => openModal(pick.id);
  els.heroRandom.onclick = () => openModal(randomItem().id);
}

function randomItem(){
  return ITEMS[Math.floor(Math.random()*ITEMS.length)];
}

function applyFilter(items){
  let out = [...items];

  if(state.tab === "trend"){
    out.sort((a,b)=>b.popularity - a.popularity);
  } else if(state.tab === "top"){
    out = out.filter(x=>x.top).sort((a,b)=>b.rating - a.rating);
  } else if(state.tab === "new"){
    out = out.filter(x=>x.fresh).sort((a,b)=>b.popularity - a.popularity);
  } else if(state.tab === "fav"){
    out = out.filter(x=>state.favorites.has(x.id)).sort((a,b)=>b.popularity - a.popularity);
  }

  if(state.q.trim()){
    const q = state.q.trim().toLowerCase();
    out = out.filter(x =>
      x.title.toLowerCase().includes(q) ||
      x.kind.toLowerCase().includes(q) ||
      x.tags.some(t=>t.toLowerCase().includes(q))
    );
  }

  return out;
}

function cardTemplate(item){
  const isFav = state.favorites.has(item.id);
  const tagStr = item.tags.slice(0,2).join(" • ");
  const posterStyle = item.poster 
    ? `background: ${posterGradient(item.title)}, url('${item.poster}') center/cover;`
    : `background: ${posterGradient(item.title)};`;
  return `
  <article class="card reveal" data-id="${item.id}">
    <div class="poster" style="${posterStyle}">
      <div class="poster-overlay"></div>
      <div class="p-title">${escapeHtml(item.title)}</div>
    </div>
    <div class="meta">
      <div class="row">
        <span class="type">${item.kind} • ${item.year}</span>
        <span class="rating"><span class="star">★</span>${item.rating.toFixed(1)}</span>
      </div>
      <div class="desc">${escapeHtml(item.blurb)}</div>
      <div class="row" style="gap:8px;">
        <span style="color:rgba(234,240,255,.72); font-size:12px;">${escapeHtml(tagStr)}</span>
      </div>
      <div class="card-actions">
        <button class="icon-btn primary" data-play="${item.id}" title="Trailer oynat">İzle (Trailer)</button>
        <button class="icon-btn ${isFav ? "danger" : ""}" data-fav="${item.id}" title="Favori">
          ${isFav ? "Favoriden Çıkar" : "Favori"}
        </button>
      </div>
    </div>
  </article>`;
}

function render(){
  const items = applyFilter(ITEMS);
  els.grid.innerHTML = items.map(cardTemplate).join("");
  wireCards();
  updateStats(items);
  revealInit();
}

function updateStats(visible){
  els.statsTotal.textContent = String(ITEMS.length);
  els.statsFav.textContent = String(state.favorites.size);
  const last = state.lastPlayed ? (ITEMS.find(x=>x.id===state.lastPlayed)?.title || "—") : "—";
  els.statsLast.textContent = last;
}

function wireCards(){
  els.grid.querySelectorAll("[data-play]").forEach(btn=>{
    btn.addEventListener("click", () => openModal(btn.dataset.play));
  });
  els.grid.querySelectorAll("[data-fav]").forEach(btn=>{
    btn.addEventListener("click", () => toggleFav(btn.dataset.fav));
  });
  els.grid.querySelectorAll(".poster").forEach(p=>{
    p.addEventListener("click", (e)=>{
      const id = e.currentTarget.closest(".card").dataset.id;
      openModal(id);
    });
  });
}

function toggleFav(id){
  if(state.favorites.has(id)){
    state.favorites.delete(id);
    toast("Favoriden çıkarıldı.");
  } else {
    state.favorites.add(id);
    toast("Favorilere eklendi.");
  }
  saveUserPatch({ favorites: [...state.favorites] });
  render();
}

function openModal(id){
  const item = ITEMS.find(x=>x.id===id);
  if(!item) return;

  state.lastPlayed = id;
  saveUserPatch({ lastPlayed: id });

  els.mTitle.textContent = `${item.title} (${item.year})`;
  els.mDesc.textContent = item.blurb;

  els.mTags.innerHTML = "";
  item.tags.forEach(t=>{
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = t;
    a.addEventListener("click", (e)=>{
      e.preventDefault();
      state.q = t;
      els.search.value = t;
      closeModal();
      render();
    });
    els.mTags.appendChild(a);
  });

  els.mWhere.innerHTML = "";
  item.where.forEach(w=>{
    const a = document.createElement("a");
    a.href = w.url;
    a.target = "_blank";
    a.rel = "noreferrer";
    a.textContent = w.name;
    els.mWhere.appendChild(a);
  });

  // Player: Trailer iframe
  els.player.innerHTML = `<iframe
      src="${item.trailer}?autoplay=1&mute=0&rel=0"
      title="Trailer"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen></iframe>`;

  els.modal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeModal(){
  els.modal.classList.remove("show");
  els.player.innerHTML = "";
  document.body.style.overflow = "";
  updateStats();
}

function revealInit(){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        en.target.classList.add("show");
        io.unobserve(en.target);
      }
    });
  }, { threshold: .08 });
  document.querySelectorAll(".reveal").forEach(el=> io.observe(el));
}

function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, s => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[s]));
}

// Tabs
els.tabs.forEach(t=>{
  t.addEventListener("click", ()=>{
    els.tabs.forEach(x=>x.classList.remove("active"));
    t.classList.add("active");
    state.tab = t.dataset.tab;
    render();
  });
});

// Search
els.search.addEventListener("input", (e)=>{
  state.q = e.target.value;
  render();
});

// Keyboard quick focus (Ctrl+K)
window.addEventListener("keydown", (e)=>{
  if((e.ctrlKey || e.metaKey) && e.key.toLowerCase()==="k"){
    e.preventDefault();
    els.search.focus();
  }
  if(e.key === "Escape") closeModal();
});

// Modal close
els.mClose.addEventListener("click", closeModal);
els.modal.addEventListener("click", (e)=>{
  if(e.target === els.modal) closeModal();
});

// Logout
els.logoutBtn.addEventListener("click", logout);

// Clear favorites
els.clearFavBtn.addEventListener("click", ()=>{
  state.favorites = new Set();
  saveUserPatch({ favorites: [] });
  toast("Favoriler temizlendi.");
  render();
});

// Start
pickHero();
render();
