const Utilisateur = require('../models/Utilisateur');
const SystemeNotification = require('../models/SystemeNotification');

const sendNotification = async ({ type, destinataires, contenu, referenceId }) => {
  try {
    // Convertir les rôles en IDs utilisateur si nécessaire
    let userIds = [];
    
    if (destinataires.some(d => d.includes('_'))) {
      // Ce sont des rôles, on cherche les utilisateurs correspondants
      const users = await Utilisateur.find({ role: { $in: destinataires } });
      userIds = users.map(u => u._id);
    } else {
      // Ce sont déjà des IDs utilisateur
      userIds = destinataires;
    }

    const notification = new SystemeNotification({
      typeNotification: type,
      destinataires: userIds,
      contenu,
      referenceId,
      dateEnvoi: Date.now()
    });

    await notification.save();

    // Ici, on pourrait ajouter l'envoi par email/SMS/webhook selon le type
    console.log(`Notification envoyée: ${type} - ${contenu}`);

    return notification;
  } catch (err) {
    console.error('Erreur lors de l\'envoi de la notification:', err);
    throw err;
  }
};

module.exports = {
  sendNotification
};