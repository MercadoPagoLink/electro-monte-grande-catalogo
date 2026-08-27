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

window.PRODUCTOS = (window.EMG_ROWS || []).map(function (r) {
  var cat = r[1];
  var precio = r[5];
  var lista = r[6];
  var imgs = window.EMG_IMGS || [];
  var idx = r[10] || 0;
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
    img: imgs[idx % imgs.length] || imgs[0] || "",
    imagen: imgs[idx % imgs.length] || imgs[0] || "",
    frig: r[11] || 0,
    inverter: !!r[12],
    off: lista ? Math.max(0, Math.round((1 - precio / lista) * 100)) : 0
  };
});
