const axios = require('axios');
const Locataire = require('../models/Locataire');
const Logement = require('../models/Logement');
const Conge = require('../models/Conge');
const { sendNotification } = require('./notificationService');

const synchroniserDonneesImmoWare = async () => {
  try {
    const response = await axios.get(`${process.env.IMMOWARE_API_ENDPOINT}/sync`, {
      headers: {
        'Authorization': `Bearer ${process.env.IMMOWARE_API_TOKEN}`
      }
    });

    const { locataires, logements } = response.data;

    // Synchroniser les locataires
    for (const locataireData of locataires) {
      await Locataire.findOneAndUpdate(
        { email: locataireData.email },
        locataireData,
        { upsert: true, new: true }
      );
    }

    // Synchroniser les logements
    for (const logementData of logements) {
      await Logement.findOneAndUpdate(
        { numeroUnique: logementData.numeroUnique },
        logementData,
        { upsert: true, new: true }
      );
    }

    return { success: true, count: { locataires: locataires.length, logements: logements.length } };
  } catch (err) {
    console.error('Erreur de synchronisation avec ImmoWare:', err.message);
    throw err;
  }
};

const traiterNotificationImmoWare = async (data) => {
  try {
    // Exemple: Traitement d'une notification de départ de locataire
    if (data.type === 'depart_locataire') {
      const { locataireId, dateSortie } = data;

      const locataire = await Locataire.findById(locataireId);
      if (!locataire) {
        throw new Error('Locataire non trouvé');
      }

      // Créer un nouveau congé
      const conge = new Conge({
        locataire: locataireId,
        logement: locataire.logement,
        dateCongéLocative: new Date(dateSortie),
        gestionnaireLocative: 'system' // ou l'ID d'un utilisateur système
      });

      await conge.save();

      // Notifier les services concernés
      await sendNotification({
        type: 'nouveau_conge_immoWare',
        destinataires: ['gestionnaire_locative', 'gestionnaire_technique'],
        contenu: `Nouveau congé synchronisé depuis ImmoWare pour ${locataire.nom} ${locataire.prenom}`,
        referenceId: conge._id
      });

      return conge;
    }

    throw new Error('Type de notification non reconnu');
  } catch (err) {
    console.error('Erreur de traitement de la notification ImmoWare:', err.message);
    throw err;
  }
};

module.exports = {
  synchroniserDonneesImmoWare,
  traiterNotificationImmoWare
};