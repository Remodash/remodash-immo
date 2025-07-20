const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const connectDB = require('./config/db');

// Import des routes
const authRoutes = require('./routes/authRoutes');
const locataireRoutes = require('./routes/locataireRoutes');
const congeRoutes = require('./routes/congeRoutes');
const preEtatDesLieuxRoutes = require('./routes/preEtatDesLieuxRoutes');
const bonDiagnosticRoutes = require('./routes/bonDiagnosticRoutes');
const bonTravauxRoutes = require('./routes/bonTravauxRoutes');
const diagnosticRoutes = require('./routes/diagnosticRoutes');
const travauxRoutes = require('./routes/travauxRoutes');
const prestataireRoutes = require('./routes/prestataireRoutes');
const rapportJournalierRoutes = require('./routes/rapportJournalierRoutes');
const utilisateurRoutes = require('./routes/utilisateurRoutes');
const logementRoutes = require('./routes/logementRoutes'); // Ajouté

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Connexion à la base de données
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/locataires', locataireRoutes);
app.use('/api/conges', congeRoutes);
app.use('/api/pre-edl', preEtatDesLieuxRoutes);
app.use('/api/bon-diagnostics', bonDiagnosticRoutes);
app.use('/api/bon-travaux', bonTravauxRoutes);
app.use('/api/diagnostics', diagnosticRoutes);
app.use('/api/travaux', travauxRoutes);
app.use('/api/prestataires', prestataireRoutes);
app.use('/api/rapports', rapportJournalierRoutes);
app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/logements', logementRoutes); // Ajouté

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erreur serveur' });
});

module.exports = app;