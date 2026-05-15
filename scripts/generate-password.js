#!/usr/bin/env node
/**
 * Generador de hash de contraseña para el panel admin de Gratitude.
 * El hash se guarda en base64 para evitar problemas con $ en archivos .env
 *
 * Uso: node scripts/generate-password.js <tu-nueva-contraseña>
 */
const bcrypt = require("bcryptjs");

const password = process.argv[2];

if (!password) {
  console.error("❌ Usá: node scripts/generate-password.js <contraseña>");
  process.exit(1);
}

if (password.length < 8) {
  console.error("❌ La contraseña debe tener al menos 8 caracteres");
  process.exit(1);
}

bcrypt.hash(password, 12).then((hash) => {
  const b64 = Buffer.from(hash).toString("base64");
  console.log("\n✅ Hash generado correctamente:\n");
  console.log(`ADMIN_PASSWORD_HASH_B64=${b64}\n`);
  console.log("Copiá esa línea en tu archivo .env.local");
  console.log("(Reemplaza la línea ADMIN_PASSWORD_HASH_B64 existente)");
});
