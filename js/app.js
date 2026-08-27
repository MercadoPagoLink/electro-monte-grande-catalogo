function waLink(texto) {
  const n = (window.EMG && EMG.whatsapp) || "";
  return "https://wa.me/" + n + "?text=" + encodeURIComponent(texto || "Hola, quiero consultar un aire");
}

function frigPorM2(m2) {
  return Math.round(Number(m2) * 500);
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
      <p class="meta">${p.nombre}<br>${p.frig} frigorías</p>
      <a href="${waLink("Hola, consulto por " + p.marca + " " + p.nombre)}">Ver / consultar</a>
    </article>
  `).join("");
}

function filtrar() {
  const q = document.getElementById("q").value.trim().toLowerCase();
  const lista = PRODUCTOS.filter(p =>
    !q || (p.marca + " " + p.nombre + " " + p.tag).toLowerCase().includes(q)
  );
  render(lista);
}

document.getElementById("promo").textContent = EMG.banner;
document.getElementById("pie-txt").textContent = EMG.pie;
document.getElementById("wa-float").href = waLink();
document.getElementById("q").addEventListener("input", filtrar);

document.getElementById("calc-btn").addEventListener("click", () => {
  const m2 = Number(document.getElementById("m2").value);
  const msg = document.getElementById("calc-msg");
  if (!m2 || m2 < 4) {
    msg.textContent = "Ingresá los m² y calculá qué aire te conviene";
    return;
  }
  const need = frigPorM2(m2);
  const rec = PRODUCTOS.slice().sort((a, b) => Math.abs(a.frig - need) - Math.abs(b.frig - need))[0];
  msg.textContent = m2 + " m² ≈ " + need + " frigorías. Recomendado: " + rec.marca + " — " + rec.nombre;
  document.getElementById("q").value = rec.marca;
  filtrar();
});

render(PRODUCTOS);
