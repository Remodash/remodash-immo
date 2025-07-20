const cron = require('node-cron');
const Conge = require('../models/Conge');
const { sendNotification } = require('./notificationService');

const checkDelayedTravaux = async () => {
  const today = new Date();
  const delayedTravaux = await Travaux.find({
    statut: 'en_cours',
    dateFin: { $lt: today }
  }).populate('bonTravaux logement');

  for (const travaux of delayedTravaux) {
    const joursRetard = Math.floor((today - travaux.dateFin) / (1000 * 60 * 60 * 24));
    
    await sendNotification({
      type: 'travaux_en_retard',
      destinataires: ['gestionnaire_technique', 'prestataire_travaux'],
      contenu: `Travaux en retard de ${joursRetard} jours pour le logement ${travaux.logement.adresseComplete}`,
      referenceId: travaux._id
    });
  }
};

const checkPendingDiagnostics = async () => {
  const today = new Date();
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  const pendingDiagnostics = await Diagnostic.find({
    statut: 'à_realiser',
    dateCreation: { $lt: weekAgo }
  }).populate('logement');

  for (const diagnostic of pendingDiagnostics) {
    await sendNotification({
      type: 'diagnostic_en_retard',
      destinataires: ['prestataire_diagnostics', 'gestionnaire_technique'],
      contenu: `Diagnostic ${diagnostic.type} en attente depuis plus d'une semaine pour le logement ${diagnostic.logement.adresseComplete}`,
      referenceId: diagnostic._id
    });
  }
};

const scheduleJobs = () => {
  // Tous les jours à 8h
  cron.schedule('0 8 * * *', checkDelayedTravaux);
  
  // Tous les lundis à 9h
  cron.schedule('0 9 * * 1', checkPendingDiagnostics);
};

module.exports = {
  scheduleJobs
};