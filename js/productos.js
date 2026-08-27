window.CATEGORIAS = [
  { id: "Todas", nom: "Todos", ico: "⚡" },
  { id: "Celulares", nom: "Celulares", ico: "📱" },
  { id: "TVs", nom: "Smart TV", ico: "📺" },
  { id: "Aires", nom: "Aires", ico: "❄️" },
  { id: "Ofertas", nom: "Ofertas", ico: "🔥" }
];

window.EMG_ROWS = [].concat(
  window.EMG_ROWS_1 || [],
  window.EMG_ROWS_2 || [],
  window.EMG_ROWS_3 || [],
  window.EMG_ROWS_4 || []
);

function poolDe(cat) {
  if (cat === "TVs") return window.EMG_IMGS_TV || [];
  if (cat === "Aires") return window.EMG_IMGS_AIR || [];
  return window.EMG_IMGS_CEL || window.EMG_IMGS || [];
}

window.PRODUCTOS = (window.EMG_ROWS || []).map(function (r) {
  var cat = r[1];
  var precio = r[5];
  var lista = r[6];
  var pool = poolDe(cat);
  var idx = r[10] || 0;
  var img = pool.length ? pool[idx % pool.length] : "";
  return {
    id: r[0],
    cat: cat,
    marca: r[2],
    nombre: r[3],
    descripcion: r[4],
    precio: precio,
    lista: lista,
    cuotas: r[7],
    tag: r[8],
    specs: r[9],
    img: img,
    imagen: img,
    pool: pool,
    idx: idx,
    frig: r[11] || 0,
    inverter: !!r[12],
    off: lista ? Math.max(0, Math.round((1 - precio / lista) * 100)) : 0
  };
});
