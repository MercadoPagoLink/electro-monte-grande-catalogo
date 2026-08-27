function waLink(texto) {
  const n = (window.EMG && EMG.whatsapp) || "";
  return "https://wa.me/" + n + "?text=" + encodeURIComponent(texto || "Hola, quiero consultar un producto");
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

let marcaActiva = "Todas";
let catActiva = "Aires";

function cardHTML(p) {
  const transf = Math.round(p.precio * 0.85);
  return `
    <article class="g-card">
      <img src="${imgDe(p)}" alt="${p.marca} ${p.nombre}">
      <span class="g-off">${p.off}% OFF</span>
      <h3>${p.marca} ${p.nombre}</h3>
      <p class="g-old">${plata(p.lista)}</p>
      <p class="g-price">${plata(p.precio)}</p>
      <p class="g-cuotas">${p.cuotas} cuotas</p>
      <p class="g-tr">+15% OFF con transferencia ${plata(transf)}</p>
      <a class="g-buy" href="${waLink("Hola, consulto por " + p.marca + " " + p.nombre)}">Comprar</a>
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
  return ["Todas"].concat(Array.from(new Set(PRODUCTOS.filter(p => p.cat === catActiva).map(p => p.marca))));
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
  const lista = PRODUCTOS.filter(p => {
    const okCat = p.cat === catActiva;
    const okMarca = marcaActiva === "Todas" || p.marca === marcaActiva;
    const okTexto = !q || (p.marca + " " + p.nombre + " " + p.cat).toLowerCase().includes(q);
    return okCat && okMarca && okTexto;
  });
  const grid = document.getElementById("grid");
  grid.innerHTML = lista.length ? lista.map(p => `
    <article class="g-prod">
      <img src="${imgDe(p)}" alt="${p.marca} ${p.nombre}">
      <span class="g-off">${p.off}% OFF</span>
      <h3>${p.marca} ${p.nombre}</h3>
      <p class="g-old">${plata(p.lista)}</p>
      <p class="g-price">${plata(p.precio)}</p>
      <p class="g-cuotas">${p.cuotas} cuotas</p>
      <a class="g-buy" href="${waLink("Hola, consulto por " + p.marca + " " + p.nombre)}">Comprar</a>
    </article>`).join("") : '<p class="vacio">No hay productos en esta categoría.</p>';
}

document.getElementById("pie-txt").textContent = EMG.pie;
["wa-float", "wa-top"].forEach(id => document.getElementById(id).href = waLink());
document.getElementById("wa-footer").href = waLink("Hola, quiero asesoramiento");
document.getElementById("q").addEventListener("input", filtrar);
document.getElementById("ofertas-rail").innerHTML = PRODUCTOS.slice(0, 8).map(cardHTML).join("");
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
  msg.textContent = m2 + " m² ≈ " + need + " frigorías. Sugerido: " + rec.marca + " — " + rec.nombre;
  catActiva = "Aires";
  marcaActiva = rec.marca;
  renderCats(); renderChips(); filtrar();
  document.getElementById("catalogo").scrollIntoView({ behavior: "smooth" });
};

renderCats();
renderChips();
filtrar();
