import express from "express";
import mongoose from "mongoose";
import movieRoutes from "./routes/movie.routes.js";
import cinemaRoutes from "./routes/cinema.routes.js";

const app = express();
const PORT = 3000;
const MONGO_URI = "mongodb://127.0.0.1:27017/movies";

app.use(express.json());

app.use("/movies", movieRoutes);
app.use("/cinemas", cinemaRoutes);

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Control de errores global
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }
  if (err.name === "CastError") {
    return res.status(400).json({ error: "ID no válido" });
  }
  console.error(err);
  res.status(500).json({ error: "Error interno del servidor" });
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Conectado a MongoDB");
    app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
  })
  .catch((err) => console.error("Error conectando a MongoDB:", err));