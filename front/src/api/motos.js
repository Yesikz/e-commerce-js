import yamahaR1 from "../assets/img/yamaha-r1.png";
import hondaCB500F from "../assets/img/honda-cb500f.png";
import ducatiPanigale from "../assets/img/ducati-panigale.png";
import ktmDuke from "../assets/img/ktm-duke-390.png";
import suzukiGSXR from "../assets/img/suzuki-gsx-r1000.png";
import kawasakiZ650 from "../assets/img/kawasaki-z650.png";
import bmwS1000RR from "../assets/img/bmw-s1000rr.png";
import yamahaMT07 from "../assets/img/yamaha-mt-07.png";
import apriliaRSV4 from "../assets/img/aprilia-rsv4.png";
import hondaCB650R from "../assets/img/honda-cb650r.png";

export const fetchMotos = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, nombre: "Yamaha R1", precio: 25000, descripcion: "Moto deportiva japonesa", categoria: "Deportivas", imagen: yamahaR1 },
        { id: 2, nombre: "Honda CB500F", precio: 7000, descripcion: "Moto naked versátil", categoria: "Naked", imagen: hondaCB500F },
        { id: 3, nombre: "Ducati Panigale V4", precio: 30000, descripcion: "Superbike italiana", categoria: "Deportivas", imagen: ducatiPanigale },
        { id: 4, nombre: "KTM Duke 390", precio: 6000, descripcion: "Moto naked ligera", categoria: "Naked", imagen: ktmDuke },
        { id: 5, nombre: "Suzuki GSX-R1000", precio: 22000, descripcion: "Moto deportiva japonesa legendaria", categoria: "Deportivas", imagen: suzukiGSXR },
        { id: 6, nombre: "Kawasaki Z650", precio: 7500, descripcion: "Naked media para ciudad", categoria: "Naked", imagen: kawasakiZ650 },
        { id: 7, nombre: "BMW S1000RR", precio: 28000, descripcion: "Moto deportiva alemana", categoria: "Deportivas", imagen: bmwS1000RR },
        { id: 8, nombre: "Yamaha MT-07", precio: 7500, descripcion: "Naked divertida de conducir", categoria: "Naked", imagen: yamahaMT07 },
        { id: 9, nombre: "Aprilia RSV4", precio: 27000, descripcion: "Moto deportiva italiana", categoria: "Deportivas", imagen: apriliaRSV4 },
        { id: 10, nombre: "Honda CB650R", precio: 9000, descripcion: "Naked deportiva media", categoria: "Naked", imagen: hondaCB650R }
      ]);
    }, 500);
  });
};
