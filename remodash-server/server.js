require('dotenv').config(); // Ajoutez cette ligne au tout début du fichier

const app = require('./app');
const http = require('http');
const { scheduleJobs } = require('./services/cronService');

// Vérification des variables d'environnement requises
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Erreur: La variable d'environnement ${envVar} est manquante`);
    process.exit(1);
  }
}

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  scheduleJobs();
});