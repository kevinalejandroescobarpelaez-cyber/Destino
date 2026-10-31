const express = require("express");
const cors = require("cors")

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Permite recibir datos JSON en las solicitudes
app.use(express.json());

// Datos temporales de nuestra API
let destinos = [
  {
    id: 1,
    nombre: "Jardín",
    departamento: "Antioquia",
    descripcion : "Muy bonito",
    imagen: "https://imgs.search.brave.com/J1Co8cG0Wt4TgiJ3WPRxjTaTNEOyROVvbapJ05NQhO8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9leHBh/dC1jaHJvbmljbGVz/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAxOS8wMS9qYXJk/aW4tYW50aW9xdWlh/LWNvbG9tYmlhLWNh/ZmV0ZXJvLXBsYXph/LTIuanBnP3c9NjAw"
  },
  {
    id: 2,
    nombre: "Cartagena",
    departamento: "Bolívar",
    descripcion : "Playa",
    imagen: "https://imgs.search.brave.com/P0VkhfFhIDHAe0pnriDlK-NAeSaZGYU0d6-cXEjk0ps/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM5/NjM4NDc4My9waG90/by90b3AtZG93bi12/aWV3LW9mLXRoZS1i/YXN0aW9uLW9mLXNh/bnRvLWRvbWluZ28u/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PXd2cmVmVjZzVVN5/XzRjVDRrbjVoNWlH/WTB6RDJMN09GZVBF/UjRoTDZiVms9"
  },
  {
    id: 3,
    nombre: "Salento",
    departamento: "Quindío",
    descripcion : "Muy chevere",
    imagen: "https://imgs.search.brave.com/ydpTur0DJeYDxKheYHXZodcmI9dIdiaYr8KQqxix5AE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jYXJv/bGluZXJvc2V0cmF2/ZWwuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDIxLzEyL1Nh/bGVudG8tNS04MTl4/MTAyNC5qcGc"
  }
];

// GET: consultar todos los destinos
app.get("/api/destinos", (req, res) => {
  res.json(destinos);
});

// GET: consultar un destino por su ID
app.get("/api/destinos/:id", (req, res) => {
  const id = Number(req.params.id);

  const destino = destinos.find(d => d.id === id);

  if (!destino) {
    return res.status(404).json({
      mensaje: "Destino no encontrado"
    });
  }

  res.json(destino);
});

// POST: crear un destino
app.post("/api/destinos", (req, res) => {
  const { nombre, departamento, descripcion } = req.body;

  if (!nombre || !departamento || !descripcion || !imagen){
    return res.status(400).json({
      mensaje: "Debes enviar nombre y departamento"
    });
  }

  const nuevoDestino = {
    id: Date.now(),
    nombre,
    departamento,
    descripcion,
    imagen
  };

  destinos.push(nuevoDestino);

  res.status(201).json(nuevoDestino);
});



// DELETE: eliminar un destino
app.delete("/api/destinos/:id", (req, res) => {
  const id = Number(req.params.id);

  const existe = destinos.some(destino =>destino.id ===id)

  if (!existe) {
    return res.status(404).json({
      mensaje: "Destino no encontrado"
    });
  }

  destinos = destinos.filter(destino=>destino.id !==id)

  res.json({
    mensaje: "Destino eliminado correctamente"
  });
});

// Iniciar servidor
app.listen(PORT,"0.0.0.0", () => {
  console.log(`API activa en http://localhost:${PORT}`);
});