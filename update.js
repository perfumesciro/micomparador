const fs = require("fs");

const data = {
  pescado: [
    { super: "Carrefour", precio: Math.floor(Math.random() * 3000) },
    { super: "Jumbo", precio: Math.floor(Math.random() * 3000) },
    { super: "Makro", precio: Math.floor(Math.random() * 3000) },
    { super: "Diarco", precio: Math.floor(Math.random() * 3000) }
  ]
};

fs.writeFileSync("data.json", JSON.stringify(data, null, 2));

console.log("OK actualizado");
