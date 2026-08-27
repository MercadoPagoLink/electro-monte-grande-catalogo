function waLink(texto) {
  const n = (window.EMG && EMG.whatsapp) || "";
  return "https://wa.me/" + n + "?text=" + encodeURIComponent(texto || "Hola, quiero consultar un producto de Electro Monte Grande");
}
function plata(n) {
  return "$" + Number(n).toLocaleString("es-AR");
}
function imgDe(p) {
  return p.img || p.imagen || "";
}
function frigPorM2(m2) {
  return Math.round(Number(m2) * 500);
}
function esOferta(p) {
  return (p.off || 0) >= 15 || p.tag === "OFERTA";
}
function porId(id) {
  return PRODUCTOS.find(p => p.id === id);
}
function fotosDe(p) {
  const banco = p.pool && p.pool.length ? p.pool : (window.EMG_IMGS || []);
  if (!banco.length) return [imgDe(p)].filter(Boolean);
  const base = Math.max(0, p.idx || 0);
  const out = [];
  const seen = {};
  [0, 1, 2, 3].forEach(function (step) {
    const url = banco[(base + step) % banco.length];
    if (url && !seen[url]) {
      seen[url] = 1;
      out.push(url);
    }
  });
  return out.length ? out : [imgDe(p)];
}
function extraDe(p) {
  if (p.cat === "Aires" && p.frig) {
    return p.frig.toLocaleString("es-AR") + " fg" + (p.inverter ? " · Inverter" : "");
  }
  return p.specs || "";
}

let marcaActiva = "Todas";
let catActiva = "Todas";

function listaBase() {
  if (catActiva === "Todas") return PRODUCTOS.slice();
  if (catActiva === "Ofertas") return PRODUCTOS.filter(esOferta);
  return PRODUCTOS.filter(p => p.cat === catActiva);
}

function cardHTML(p, cls) {
  return `
    <article class="${cls}" data-id="${p.id}">
      <div class="g-foto"><img src="${imgDe(p)}" alt="${p.marca} ${p.nombre}" loading="lazy" onerror="this.style.opacity='0'"></div>
      <span class="g-off">${p.off}% OFF</span>
      <p class="g-marca">${p.marca}</p>
      <h3>${p.nombre}</h3>
      <p class="g-old">${plata(p.lista)}</p>
      <p class="g-price">${plata(p.precio)}</p>
      <p class="g-cuotas">${p.cuotas} cuotas · ${plata(Math.round(p.precio / p.cuotas))}</p>
      <button type="button" class="g-buy" data-id="${p.id}">Ver producto</button>
    </article>`;
}

function bindCards(root) {
  if (!root) return;
  root.querySelectorAll("[data-id]").forEach(el => {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      abrirFicha(el.getAttribute("data-id"));
    });
  });
}

function setCat(id) {
  catActiva = id;
  marcaActiva = "Todas";
  document.getElementById("q").value = "";
  renderCats();
  renderChips();
  filtrar();
  document.getElementById("catalogo").scrollIntoView({ behavior: "smooth" });
}

function renderCats() {
  document.getElementById("cats").innerHTML = CATEGORIAS.map(c =>
    `<button class="${c.id === catActiva ? "on" : ""}" data-cat="${c.id}">${c.ico} ${c.nom}</button>`
  ).join("");
  document.querySelectorAll("#cats button").forEach(btn => {
    btn.onclick = () => setCat(btn.dataset.cat);
  });
}

function renderAtajos() {
  const el = document.getElementById("atajos");
  if (!el) return;
  const items = [
    { id: "Celulares", t: "Celulares", s: PRODUCTOS.filter(p => p.cat === "Celulares").length + " equipos" },
    { id: "TVs", t: "Smart TV", s: PRODUCTOS.filter(p => p.cat === "TVs").length + " pantallas" },
    { id: "Aires", t: "Aires", s: PRODUCTOS.filter(p => p.cat === "Aires").length + " equipos" }
  ];
  el.innerHTML = items.map(i =>
    `<button type="button" data-cat="${i.id}"><b>${i.t}</b><span>${i.s}</span></button>`
  ).join("");
  el.querySelectorAll("button").forEach(btn => {
    btn.onclick = () => setCat(btn.dataset.cat);
  });
}

function marcas() {
  return ["Todas"].concat(Array.from(new Set(listaBase().map(p => p.marca))).sort());
}

function renderChips() {
  const el = document.getElementById("chips");
  el.innerHTML = marcas().map(m =>
    `<button data-marca="${m}" class="${m === marcaActiva ? "on" : ""}">${m}</button>`
  ).join("");
  el.querySelectorAll("button").forEach(btn => {
    btn.onclick = () => {
      marcaActiva = btn.dataset.marca;
      renderChips();
      filtrar();
    };
  });
}

function filtrar() {
  const q = document.getElementById("q").value.trim().toLowerCase();
  const lista = listaBase().filter(p => {
    const okMarca = marcaActiva === "Todas" || p.marca === marcaActiva;
    const blob = (p.marca + " " + p.nombre + " " + p.cat + " " + (p.tag || "") + " " + (p.specs || "") + " " + (p.descripcion || "")).toLowerCase();
    return okMarca && (!q || blob.includes(q));
  });
  const grid = document.getElementById("grid");
  const count = document.getElementById("cat-count");
  if (count) count.textContent = lista.length + " productos";
  if (!lista.length) {
    grid.innerHTML = '<p class="vacio">No hay productos con ese filtro.</p>';
    return;
  }
  grid.innerHTML = lista.map(p => cardHTML(p, "g-prod")).join("");
  bindCards(grid);
}

function abrirFicha(id) {
  const p = porId(id);
  if (!p) return;
  const fotos = fotosDe(p);
  const transf = Math.round(p.precio * 0.85);
  const extraAire = p.cat === "Aires" && p.frig
    ? p.frig.toLocaleString("es-AR") + " frigorías" + (p.inverter ? " · Inverter" : "")
    : "";
  const catNom = p.cat === "TVs" ? "Smart TV" : p.cat;
  const cuota = Math.round(p.precio / p.cuotas);
  const thumbs = fotos.map((url, i) =>
    `<button type="button" class="ficha-thumb${i === 0 ? " on" : ""}" data-src="${url}"><img src="${url}" alt=""></button>`
  ).join("");
  document.getElementById("ficha-body").innerHTML = `
    <div class="ficha-fotos">
      <img id="ficha-foto" src="${fotos[0]}" alt="${p.marca} ${p.nombre}" onerror="this.style.opacity='0'">
      <div class="ficha-thumbs">${thumbs}</div>
    </div>
    <p class="ficha-cat">${catNom}${p.tag ? " · " + p.tag : ""}</p>
    <h2 id="ficha-titulo">${p.marca} ${p.nombre}</h2>
    <p class="ficha-specs">${p.specs || extraAire}</p>
    <p class="g-old">${plata(p.lista)}</p>
    <p class="g-price">${plata(p.precio)}</p>
    <p class="g-cuotas">${p.cuotas} cuotas de ${plata(cuota)}</p>
    <p class="g-tr">Transferencia ${plata(transf)} · 15% OFF</p>
    <h3 class="ficha-h">Descripción</h3>
    <p class="ficha-desc">${p.descripcion || "Consultá ficha técnica y stock por WhatsApp."}</p>
    ${extraAire ? `<p class="ficha-desc"><b>Capacidad:</b> ${extraAire}</p>` : ""}
    <ul class="ficha-lista">
      <li>Marca: ${p.marca}</li>
      <li>Categoría: ${catNom}</li>
      ${p.specs ? `<li>${p.specs}</li>` : ""}
      <li>Precio de lista: ${plata(p.lista)}</li>
      <li>Precio EMG: ${plata(p.precio)}</li>
      <li>Stock y cuotas a confirmar</li>
    </ul>
    <div class="ficha-bar">
      <a class="g-buy ficha-wa" target="_blank" rel="noopener" href="${waLink("Hola, consulto por " + p.marca + " " + p.nombre + " (" + plata(p.precio) + ")")}">Consultar por WhatsApp</a>
    </div>
  `;
  document.getElementById("ficha").hidden = false;
  document.body.classList.add("ficha-on");
  document.querySelectorAll(".ficha-thumb").forEach(btn => {
    btn.onclick = function (e) {
      e.stopPropagation();
      document.getElementById("ficha-foto").src = btn.dataset.src;
      document.querySelectorAll(".ficha-thumb").forEach(b => b.classList.remove("on"));
      btn.classList.add("on");
    };
  });
  if (location.hash !== "#p/" + p.id) {
    history.pushState({ ficha: p.id }, "", "#p/" + p.id);
  }
}

function cerrarFicha() {
  document.getElementById("ficha").hidden = true;
  document.body.classList.remove("ficha-on");
  if (location.hash.indexOf("#p/") === 0) {
    history.pushState({}, "", location.pathname + location.search);
  }
}

function leerHash() {
  const h = location.hash || "";
  if (h.indexOf("#p/") === 0) {
    abrirFicha(decodeURIComponent(h.slice(3)));
  } else {
    document.getElementById("ficha").hidden = true;
    document.body.classList.remove("ficha-on");
  }
}

document.getElementById("pie-txt").textContent = (window.EMG && EMG.pie) || "";
if (document.getElementById("pie-dir") && window.EMG) {
  document.getElementById("pie-dir").textContent = [EMG.direccion, EMG.horario].filter(Boolean).join(" · ");
}
["wa-float", "wa-top"].forEach(id => {
  const n = document.getElementById(id);
  if (n) n.href = waLink();
});
document.getElementById("wa-footer").href = waLink("Hola, quiero asesoramiento");
document.getElementById("q").addEventListener("input", filtrar);
document.getElementById("ofertas-rail").innerHTML = PRODUCTOS.filter(esOferta).slice(0, 12).map(p => cardHTML(p, "g-card")).join("");
bindCards(document.getElementById("ofertas-rail"));
document.getElementById("menu-btn").onclick = () => document.getElementById("drawer").classList.add("open");
document.getElementById("close-menu").onclick = () => document.getElementById("drawer").classList.remove("open");
document.querySelectorAll("#drawer a").forEach(a => a.onclick = () => document.getElementById("drawer").classList.remove("open"));
document.getElementById("ficha").addEventListener("click", function (e) {
  if (e.target.hasAttribute("data-cerrar")) cerrarFicha();
});
window.addEventListener("popstate", leerHash);

document.getElementById("calc-btn").onclick = () => {
  const m2 = Number(document.getElementById("m2").value);
  const msg = document.getElementById("calc-msg");
  if (!m2 || m2 < 4) { msg.textContent = "Ingresá los m² (mínimo 4)."; return; }
  const aires = PRODUCTOS.filter(p => p.cat === "Aires" && p.frig);
  const need = frigPorM2(m2);
  const rec = aires.slice().sort((a, b) => Math.abs(a.frig - need) - Math.abs(b.frig - need))[0];
  if (!rec) { msg.textContent = m2 + " m² ≈ " + need + " frigorías."; return; }
  msg.textContent = m2 + " m² ≈ " + need + " frigorías. Sugerido: " + rec.marca + " — " + rec.nombre + " (" + plata(rec.precio) + ")";
  abrirFicha(rec.id);
};

renderCats();
renderAtajos();
renderChips();
filtrar();
leerHash();
