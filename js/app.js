function waLink(texto) {
  const n = (window.EMG && EMG.whatsapp) || "";
  return "https://wa.me/" + n + "?text=" + encodeURIComponent(texto || "Hola, quiero consultar un aire");
}

function frigPorM2(m2) {
  return Math.round(Number(m2) * 500);
}

let marcaActiva = "Todas";

function marcas() {
  return ["Todas"].concat(Array.from(new Set(PRODUCTOS.map(p => p.marca))));
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

function render(lista) {
  const grid = document.getElementById("grid");
  if (!lista.length) {
    grid.innerHTML = '<p class="vacio">No hay productos con esa búsqueda.</p>';
    return;
  }
  grid.innerHTML = lista.map(p => `
    <article class="prod">
      <div class="tag">${p.tag} ❄</div>
      <h4>${p.marca}</h4>
      <p class="meta">${p.nombre}<br>${p.frig} frigorías${p.inverter ? " · Inverter" : ""}</p>
      <a href="${waLink("Hola, consulto por " + p.marca + " " + p.nombre)}">Consultar</a>
    </article>
  `).join("");
}

function filtrar() {
  const q = document.getElementById("q").value.trim().toLowerCase();
  const lista = PRODUCTOS.filter(p => {
    const okMarca = marcaActiva === "Todas" || p.marca === marcaActiva;
    const okTexto = !q || (p.marca + " " + p.nombre + " " + p.tag).toLowerCase().includes(q);
    return okMarca && okTexto;
  });
  render(lista);
}

document.getElementById("promo").textContent = EMG.banner;
document.getElementById("pie-txt").textContent = EMG.pie;
document.getElementById("wa-float").href = waLink();
document.getElementById("wa-footer").href = waLink("Hola, quiero asesoramiento");
document.getElementById("q").addEventListener("input", filtrar);

document.getElementById("calc-btn").addEventListener("click", () => {
  const m2 = Number(document.getElementById("m2").value);
  const msg = document.getElementById("calc-msg");
  if (!m2 || m2 < 4) {
    msg.textContent = "Ingresá los m² (mínimo 4) para calcular.";
    return;
  }
  const need = frigPorM2(m2);
  const rec = PRODUCTOS.slice().sort((a, b) => Math.abs(a.frig - need) - Math.abs(b.frig - need))[0];
  msg.textContent = m2 + " m² ≈ " + need + " frigorías. Sugerido: " + rec.marca + " — " + rec.nombre;
  marcaActiva = rec.marca;
  document.getElementById("q").value = "";
  renderChips();
  filtrar();
  document.getElementById("catalogo").scrollIntoView({ behavior: "smooth" });
});

renderChips();
filtrar();
