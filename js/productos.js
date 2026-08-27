window.CATEGORIAS = [
  { id: "Aires", nom: "Aires", ico: "❄" },
  { id: "TVs", nom: "Smart TV", ico: "📺" },
  { id: "Celulares", nom: "Celulares", ico: "📱" },
  { id: "Heladeras", nom: "Heladeras", ico: "🧊" },
  { id: "Lavado", nom: "Lavado", ico: "🦺" }
];

function foto(i) {
  var imgs = window.EMG_IMGS || [];
  return imgs[i % imgs.length] || "";
}

if (window.EMG_ROWS_1) {
  window.EMG_ROWS = [].concat(window.EMG_ROWS_1||[], window.EMG_ROWS_2||[], window.EMG_ROWS_3||[], window.EMG_ROWS_4||[]);
  window.PRODUCTOS = (window.EMG_ROWS||[]).map(function(r){
    var cat = r[1], precio = r[5], lista = r[6];
    return {
      id:r[0], cat:cat, marca:r[2], nombre:r[3],
      precio:precio, lista:lista, cuotas:r[7], tag:r[8],
      img:(window.EMG_IMGS||[])[r[10]],
      frig:r[11], inverter:!!r[12],
      off: Math.max(0, Math.round((1-precio/lista)*100))
    };
  });
} else {
  window.PRODUCTOS = [
    { id:"tcl-3100", cat:"Aires", marca:"TCL", nombre:"Inverter TACA-3100FCSA", frig:3100, inverter:true, lista:899999, precio:764999, off:15, cuotas:12, img:foto(20) },
    { id:"midea-18", cat:"Aires", marca:"Midea", nombre:"Inverter MSAGII-18H", frig:4500, inverter:true, lista:1199999, precio:989999, off:17, cuotas:12, img:foto(21) },
    { id:"bgh-bsi", cat:"Aires", marca:"BGH", nombre:"Split Inverter BSI37WCNX", frig:3500, inverter:true, lista:1049999, precio:879999, off:16, cuotas:9, img:foto(22) },
    { id:"surrey-553", cat:"Aires", marca:"Surrey", nombre:"Inverter 553NIQ12000", frig:3000, inverter:true, lista:979999, precio:829999, off:15, cuotas:12, img:foto(23) },
    { id:"hitachi-32", cat:"Aires", marca:"Hitachi", nombre:"Inverter 3200W", frig:3200, inverter:true, lista:1099999, precio:949999, off:14, cuotas:9, img:foto(24) },
    { id:"carrier-36", cat:"Aires", marca:"Carrier", nombre:"Split 3600W", frig:3600, inverter:false, lista:999999, precio:849999, off:15, cuotas:6, img:foto(25) },
    { id:"philco-32", cat:"Aires", marca:"Philco", nombre:"Inverter 3200F", frig:3200, inverter:true, lista:869999, precio:739999, off:15, cuotas:12, img:foto(26) },
    { id:"sansei-23", cat:"Aires", marca:"Sansei", nombre:"Split 2365 Frigorías", frig:2365, inverter:false, lista:649999, precio:549999, off:15, cuotas:6, img:foto(27) },
    { id:"tv-tcl-55", cat:"TVs", marca:"TCL", nombre:"Smart TV 55 4K", frig:0, lista:899999, precio:749999, off:17, cuotas:12, img:foto(12) },
    { id:"tv-sam-65", cat:"TVs", marca:"Samsung", nombre:"Crystal UHD 65", frig:0, lista:1449999, precio:1299999, off:10, cuotas:12, img:foto(13) },
    { id:"tv-aoc-32", cat:"TVs", marca:"AOC", nombre:"Smart TV HD 32", frig:0, lista:299999, precio:229999, off:23, cuotas:6, img:foto(14) },
    { id:"cel-a16", cat:"Celulares", marca:"Samsung", nombre:"Galaxy A16 256GB", frig:0, lista:469999, precio:369999, off:21, cuotas:12, img:foto(0) },
    { id:"cel-moto", cat:"Celulares", marca:"Motorola", nombre:"Moto G17 256GB", frig:0, lista:399999, precio:369999, off:8, cuotas:9, img:foto(1) },
    { id:"lava-6", cat:"Lavado", marca:"LG", nombre:"Lavarropas 6.5 kg", frig:0, lista:899999, precio:699999, off:22, cuotas:12, img:foto(18) },
    { id:"hel-gafa", cat:"Heladeras", marca:"Gafa", nombre:"Heladera 374 L", frig:0, lista:973666, precio:755599, off:22, cuotas:12, img:foto(19) }
  ];
}
