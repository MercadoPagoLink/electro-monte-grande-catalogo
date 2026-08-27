function foto(id) {
  return "https://images.unsplash.com/photo-" + id + "?auto=format&fit=crop&w=700&q=80";
}

window.CATEGORIAS = [
  { id: "Aires", nom: "Aires", ico: "❄" },
  { id: "Heladeras", nom: "Heladeras", ico: "🧊" },
  { id: "Lavado", nom: "Lavado", ico: "🦺" },
  { id: "TVs", nom: "TVs", ico: "📺" },
  { id: "Cocinas", nom: "Cocinas", ico: "🍳" },
  { id: "Celulares", nom: "Celulares", ico: "📱" },
  { id: "Notebooks", nom: "Notebooks", ico: "💻" },
  { id: "Pequeños", nom: "Pequeños", ico: "🥤" },
  { id: "Colchones", nom: "Colchones", ico: "🛏" },
  { id: "Bazar", nom: "Bazar", ico: "🍲" }
];

window.PRODUCTOS = [
  { id: "tcl-3100", marca: "TCL", nombre: "Inverter TACA-3100FCSA", frig: 3100, tag: "15% OFF", inverter: true, cat: "Aires", lista: 899999, precio: 764999, off: 15, cuotas: 12, img: foto("1600566753190-17f0baa2a6c3") },
  { id: "midea-18", marca: "Midea", nombre: "Inverter MSAGII-18H", frig: 4500, tag: "INVERTER", inverter: true, cat: "Aires", lista: 1199999, precio: 989999, off: 17, cuotas: 12, img: foto("1560448204-e02f11c3d0e2") },
  { id: "bgh-bsi", marca: "BGH", nombre: "Split Inverter BSI37WCNX", frig: 3500, tag: "OFERTA", inverter: true, cat: "Aires", lista: 1049999, precio: 879999, off: 16, cuotas: 9, img: foto("1505693416388-ac5ce068fe85") },
  { id: "surrey-553", marca: "Surrey", nombre: "Inverter 553NIQ12000", frig: 3000, tag: "HOT", inverter: true, cat: "Aires", lista: 979999, precio: 829999, off: 15, cuotas: 12, img: foto("1504148455328-c376907d081c") },
  { id: "hitachi-32", marca: "Hitachi", nombre: "Inverter 3200W", frig: 3200, tag: "HITACHI", inverter: true, cat: "Aires", lista: 1099999, precio: 949999, off: 14, cuotas: 9, img: foto("1556911220-e15b29be8c8f") },
  { id: "carrier-36", marca: "Carrier", nombre: "Split 3600W", frig: 3600, tag: "CARRIER", inverter: false, cat: "Aires", lista: 999999, precio: 849999, off: 15, cuotas: 6, img: foto("1626806787461-102c1bfaaea1") },
  { id: "philco-32", marca: "Philco", nombre: "Inverter 3200F", frig: 3200, tag: "PHILCO", inverter: true, cat: "Aires", lista: 869999, precio: 739999, off: 15, cuotas: 12, img: foto("1604335399105-a0c585fd81a1") },
  { id: "sansei-23", marca: "Sansei", nombre: "Split 2365 Frigorías", frig: 2365, tag: "OFERTA", inverter: false, cat: "Aires", lista: 649999, precio: 549999, off: 15, cuotas: 6, img: foto("1584568694244-14fbdf83bd30") },
  { id: "tv-tcl-55", marca: "TCL", nombre: "Smart TV 55 4K", frig: 0, tag: "TV", inverter: false, cat: "TVs", lista: 899999, precio: 749999, off: 17, cuotas: 12, img: foto("1593784991095-a205069470b6") },
  { id: "tv-samsung-65", marca: "Samsung", nombre: "Crystal UHD 65", frig: 0, tag: "TV", inverter: false, cat: "TVs", lista: 1449999, precio: 1299999, off: 10, cuotas: 12, img: foto("1574269909862-7e1d70bb8078") },
  { id: "tv-aoc-32", marca: "AOC", nombre: "Smart TV HD 32", frig: 0, tag: "TV", inverter: false, cat: "TVs", lista: 299999, precio: 229999, off: 23, cuotas: 6, img: foto("1461151304267-38535e780c79") },
  { id: "cel-a16", marca: "Samsung", nombre: "Galaxy A16 256GB", frig: 0, tag: "CEL", inverter: false, cat: "Celulares", lista: 469999, precio: 369999, off: 21, cuotas: 12, img: foto("1610945265064-0e34e5519bbf") },
  { id: "cel-moto", marca: "Motorola", nombre: "Moto G17 256GB", frig: 0, tag: "CEL", inverter: false, cat: "Celulares", lista: 399999, precio: 369999, off: 8, cuotas: 9, img: foto("1511707171634-5f897ff02aa9") },
  { id: "nb-15", marca: "Lenovo", nombre: "Notebook 15 i5", frig: 0, tag: "NOTE", inverter: false, cat: "Notebooks", lista: 899999, precio: 779999, off: 13, cuotas: 12, img: foto("1517336714731-489689fd1ca8") },
  { id: "lava-6", marca: "LG", nombre: "Lavarropas 6.5 kg", frig: 0, tag: "LAVADO", inverter: true, cat: "Lavado", lista: 899999, precio: 699999, off: 22, cuotas: 12, img: foto("1626806787461-102c1bfaaea1") },
  { id: "hel-gafa", marca: "Gafa", nombre: "Heladera 374 L", frig: 0, tag: "HELADERA", inverter: false, cat: "Heladeras", lista: 973666, precio: 755599, off: 22, cuotas: 12, img: foto("1574269909862-7e1d70bb8078") }
];
