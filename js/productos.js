window.CATEGORIAS = [
  {id:"Celulares", ico:"📱", nom:"Celulares"},
  {id:"TVs", ico:"📺", nom:"Smart TV"},
  {id:"Aires", ico:"❄️", nom:"Aires"},
  {id:"Ofertas", ico:"🔥", nom:"Ofertas"},
  {id:"Cuotas", ico:"💳", nom:"Cuotas"}
];
window.EMG_ROWS = [].concat(window.EMG_ROWS_1||[], window.EMG_ROWS_2||[], window.EMG_ROWS_3||[], window.EMG_ROWS_4||[]);
window.PRODUCTOS = (window.EMG_ROWS||[]).map(function(r){
  var cat = r[1];
  var precio = r[5], lista = r[6];
  return {
    id:r[0], cat:cat,
    categoria: cat==="Celulares"?"celulares":cat==="TVs"?"tvs":"aires",
    marca:r[2], nombre:r[3], descripcion:r[4],
    precio:precio, lista:lista, precioAntes:lista,
    cuotas:r[7], tag:r[8], specs:r[9],
    imagen:(window.EMG_IMGS||[])[r[10]],
    frig:r[11], inverter:!!r[12],
    off: Math.max(0, Math.round((1-precio/lista)*100)),
    stock:true
  };
});
