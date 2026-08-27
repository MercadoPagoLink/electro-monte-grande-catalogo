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

let marcaActiva = "Todas";
let catActiva = "Todas";

function listaBase() {
  if (catActiva === "Todas") return PRODUCTOS.slice();
  if (catActiva === "Ofertas") return PRODUCTOS.filter(esOferta);
  return PRODUCTOS.filter(p => p.cat === catActiva);
}

function cardHTML(p) {
  const transf = Math.round(p.precio * 0.85);
  const extra = p.cat === "Aires" && p.frig
    ? p.frig.toLocaleString("es-AR") + " fg" + (p.inverter ? " · Inverter" : "")
    : (p.specs || "");
  return `
    <article class="g-card">
      <img src="${imgDe(p)}" alt="${p.marca} ${p.nombre}" loading="lazy" onerror="this.style.background='#eee';this.removeAttribute('src')">
      <span class="g-off">${p.off}% OFF</span>
      <h3>${p.marca} ${p.nombre}</h3>
      <p class="g-old">${plata(p.lista)}</p>
      <p class="g-price">${plata(p.precio)}</p>
      <p class="g-cuotas">${p.cuotas} cuotas · ${extra}</p>
      <p class="g-tr">+15% OFF con transferencia ${plata(transf)}</p>
      <a class="g-buy" href="${waLink("Hola, consulto por " + p.marca + " " + p.nombre + " (" + plata(p.precio) + ")")}">Comprar</a>
    </article>`;
}

function renderCats() {
  document.getElementById("cats").innerHTML = CATEGORIAS.map(c =>
    `<button class="${c.id === catActiva ? "on" : ""}" data-cat="${c.id}">${c.ico} ${c.nom}</button>`
  ).join("");
  document.querySelectorAll("#cats button").forEach(btn => {
    btn.onclick = () => {
      catActiva = btn.dataset.cat;
      marcaActiva = "Todas";
      document.getElementById("q").value = "";
      renderCats();
      renderChips();
      filtrar();
      document.getElementById("catalogo").scrollIntoView({ behavior: "smooth" });
    };
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
  grid.innerHTML = lista.length
    ? lista.map(p => {
        const extra = p.cat === "Aires" && p.frig
          ? p.frig.toLocaleString("es-AR") + " fg" + (p.inverter ? " · Inverter" : "")
          : (p.specs || "");
        return `
    <article class="g-prod">
      <img src="${imgDe(p)}" alt="${p.marca} ${p.nombre}" loading="lazy" onerror="this.style.background='#eee';this.removeAttribute('src')">
      <span class="g-off">${p.off}% OFF</span>
      <h3>${p.marca} ${p.nombre}</h3>
      <p class="g-old">${plata(p.lista)}</p>
      <p class="g-price">${plata(p.precio)}</p>
      <p class="g-cuotas">${p.cuotas} cuotas · ${extra}</p>
      <a class="g-buy" href="${waLink("Hola, consulto por " + p.marca + " " + p.nombre + " (" + plata(p.precio) + ")")}">Comprar</a>
    </article>`;
      }).join("")
    : '<p class="vacio">No hay productos en esta categoría.</p>';
}

document.getElementById("pie-txt").textContent = (window.EMG && EMG.pie) || "";
["wa-float", "wa-top"].forEach(id => {
  const n = document.getElementById(id);
  if (n) n.href = waLink();
});
document.getElementById("wa-footer").href = waLink("Hola, quiero asesoramiento");
document.getElementById("q").addEventListener("input", filtrar);
document.getElementById("ofertas-rail").innerHTML = PRODUCTOS.filter(esOferta).slice(0, 10).map(cardHTML).join("");
document.getElementById("menu-btn").onclick = () => document.getElementById("drawer").classList.add("open");
document.getElementById("close-menu").onclick = () => document.getElementById("drawer").classList.remove("open");
document.querySelectorAll("#drawer a").forEach(a => a.onclick = () => document.getElementById("drawer").classList.remove("open"));

document.getElementById("calc-btn").onclick = () => {
  const m2 = Number(document.getElementById("m2").value);
  const msg = document.getElementById("calc-msg");
  if (!m2 || m2 < 4) { msg.textContent = "Ingresá los m² (mínimo 4)."; return; }
  const aires = PRODUCTOS.filter(p => p.cat === "Aires" && p.frig);
  const need = frigPorM2(m2);
  const rec = aires.slice().sort((a, b) => Math.abs(a.frig - need) - Math.abs(b.frig - need))[0];
  if (!rec) { msg.textContent = m2 + " m² ≈ " + need + " frigorías."; return; }
  msg.textContent = m2 + " m² ≈ " + need + " frigorías. Sugerido: " + rec.marca + " — " + rec.nombre + " (" + plata(rec.precio) + ")";
  catActiva = "Aires";
  marcaActiva = rec.marca;
  renderCats(); renderChips(); filtrar();
  document.getElementById("catalogo").scrollIntoView({ behavior: "smooth" });
};

renderCats();
renderChips();
filtrar();
