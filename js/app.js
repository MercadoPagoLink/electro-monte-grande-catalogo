function waLink(texto) {
  const n = (window.EMG && EMG.whatsapp) || "";
  return "https://wa.me/" + n + "?text=" + encodeURIComponent(texto || "Hola, quiero consultar un producto");
}
function plata(n) {
  return "$" + Number(n).toLocaleString("es-AR");
}
function frigPorM2(m2) {
  return Math.round(Number(m2) * 500);
}

let marcaActiva = "Todas";
let catActiva = "Aires";

function cardHTML(p) {
  return `
    <a class="card" href="${waLink("Hola, consulto por " + p.marca + " " + p.nombre)}">
      <img src="${p.img}" alt="${p.marca} ${p.nombre}">
      <span class="badge">${p.off}% OFF</span>
      <h3>${p.marca} ${p.nombre}</h3>
      <p class="old">${plata(p.lista)}</p>
      <p class="price">${plata(p.precio)}</p>
      <p class="cuotas">${p.cuotas} cuotas · Consultar</p>
    </a>`;
}

function listaFiltrada() {
  const q = document.getElementById("q").value.trim().toLowerCase();
  return PRODUCTOS.filter(p => {
    const okCat = !catActiva || p.cat === catActiva;
    const okMarca = marcaActiva === "Todas" || p.marca === marcaActiva;
    const okTexto = !q || (p.marca + " " + p.nombre + " " + p.tag + " " + p.cat).toLowerCase().includes(q);
    return okCat && okMarca && okTexto;
  });
}

function renderCats() {
  document.getElementById("cats").innerHTML = CATEGORIAS.map(c =>
    `<button class="cat ${c.id === catActiva ? "on" : ""}" data-cat="${c.id}"><i>${c.ico}</i>${c.nom}</button>`
  ).join("");
  document.querySelectorAll(".cat").forEach(btn => {
    btn.addEventListener("click", () => {
      catActiva = btn.dataset.cat;
      marcaActiva = "Todas";
      document.getElementById("q").value = "";
      renderCats();
      renderChips();
      filtrar();
      document.getElementById("catalogo").scrollIntoView({ behavior: "smooth" });
    });
  });
}

function marcas() {
  const set = Array.from(new Set(PRODUCTOS.filter(p => p.cat === catActiva).map(p => p.marca)));
  return ["Todas"].concat(set);
}

function renderChips() {
  const el = document.getElementById("chips");
  el.innerHTML = marcas().map(m =>
    `<button type="button" data-marca="${m}" class="${m === marcaActiva ? "on" : ""}">${m}</button>`
  ).join("");
  el.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      marcaActiva = btn.dataset.marca;
      renderChips();
      filtrar();
    });
  });
}

function filtrar() {
  const lista = listaFiltrada();
  const grid = document.getElementById("grid");
  if (!lista.length) {
    grid.innerHTML = '<p class="vacio">No hay productos en esta categoría.</p>';
    return;
  }
  grid.innerHTML = lista.map(p => `
    <article class="prod">
      <img src="${p.img}" alt="${p.marca} ${p.nombre}">
      <span class="badge">${p.off}% OFF</span>
      <h4>${p.marca}</h4>
      <p class="meta">${p.nombre}${p.frig ? "<br>" + p.frig + " frigorías" : ""}${p.inverter ? " · Inverter" : ""}</p>
      <p class="old">${plata(p.lista)}</p>
      <p class="price">${plata(p.precio)}</p>
      <a href="${waLink("Hola, consulto por " + p.marca + " " + p.nombre)}">Consultar</a>
    </article>
  `).join("");
}

document.getElementById("pie-txt").textContent = EMG.pie;
["wa-float", "wa-top"].forEach(id => document.getElementById(id).href = waLink());
document.getElementById("wa-footer").href = waLink("Hola, quiero asesoramiento");
document.getElementById("q").addEventListener("input", filtrar);
document.getElementById("ofertas-rail").innerHTML = PRODUCTOS.slice(0, 8).map(cardHTML).join("");

document.getElementById("menu-btn").onclick = () => document.getElementById("drawer").classList.add("open");
document.getElementById("close-menu").onclick = () => document.getElementById("drawer").classList.remove("open");
document.querySelectorAll("#drawer a").forEach(a => a.onclick = () => document.getElementById("drawer").classList.remove("open"));

document.getElementById("calc-btn").addEventListener("click", () => {
  const m2 = Number(document.getElementById("m2").value);
  const msg = document.getElementById("calc-msg");
  if (!m2 || m2 < 4) {
    msg.textContent = "Ingresá los m² (mínimo 4).";
    return;
  }
  const aires = PRODUCTOS.filter(p => p.cat === "Aires");
  const need = frigPorM2(m2);
  const rec = aires.slice().sort((a, b) => Math.abs(a.frig - need) - Math.abs(b.frig - need))[0];
  msg.textContent = m2 + " m² ≈ " + need + " frigorías. Sugerido: " + rec.marca + " — " + rec.nombre;
  catActiva = "Aires";
  marcaActiva = rec.marca;
  renderCats();
  renderChips();
  filtrar();
  document.getElementById("catalogo").scrollIntoView({ behavior: "smooth" });
});

renderCats();
renderChips();
filtrar();
