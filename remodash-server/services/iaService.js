const Logement = require('../models/Logement');
const GrilleVetuste = require('../models/GrilleVetuste');
const BordereauPrix = require('../models/BordereauPrix');

const determineDiagnostics = async (preEDL, logement) => {
  // Logique pour déterminer les diagnostics nécessaires basée sur:
  // - L'état du logement (preEDL)
  // - Les caractéristiques du logement
  // - La réglementation en vigueur

  const diagnostics = [];

  // Exemple: DPE si absent ou >10 ans
  const hasRecentDPE = logement.diagnostics.some(d => 
    d.type === 'DPE' && 
    new Date(d.date) > new Date(Date.now() - 10 * 365 * 24 * 60 * 60 * 1000)
  );

  if (!hasRecentDPE) {
    diagnostics.push({
      type: 'DPE',
      criteresDeclenchement: 'DPE absent ou périmé (>10 ans)'
    });
  }

  // Exemple: Amiante si immeuble construit avant 1997
  if (logement.anneeConstruction < 1997) {
    diagnostics.push({
      type: 'Amiante',
      criteresDeclenchement: `Immeuble construit avant 1997 (${logement.anneeConstruction})`
    });
  }

  // Ajouter d'autres diagnostics selon les critères...
  if (preEDL.observations?.includes('peinture écaillée') && logement.anneeConstruction < 1949) {
    diagnostics.push({
      type: 'Plomb',
      criteresDeclenchement: 'Peinture écaillée + immeuble ancien'
    });
  }

  return diagnostics;
};

const generateBonTravaux = async (logement, congeId) => {
  // Logique pour générer un bon de travaux basé sur:
  // - Les diagnostics existants
  // - L'état du logement
  // - La grille de vétusté
  // - Le bordereau des prix

  const grilleVetuste = await GrilleVetuste.find();
  const bordereauPrix = await BordereauPrix.find();

  // Exemple de postes de travaux (simplifié)
  const postes = [
    {
      nature: 'Peinture',
      description: 'Reprise des peintures des murs et plafonds',
      prixUnitaire: bordereauPrix.find(p => p.codePoste === 'PEINT-MUR').prixUnitaire,
      quantite: logement.surfaceHabitable * 2.5, // Estimation surface à peindre
      refacturable: false,
      tauxVetuste: 0 // À calculer selon la grille de vétusté
    },
    {
      nature: 'Nettoyage',
      description: 'Nettoyage complet du logement',
      prixUnitaire: bordereauPrix.find(p => p.codePoste === 'NETTOYAGE').prixUnitaire,
      quantite: 1,
      refacturable: false
    }
  ];

  // Calcul des montants et partage financier
  const coutEstime = postes.reduce((sum, poste) => sum + (poste.prixUnitaire * poste.quantite), 0);
  const partageFinancier = '100% bailleur'; // À affiner selon la vétusté

  return {
    natureTravaux: 'Remise en état standard',
    postes,
    coutEstime,
    partageFinancier,
    niveauFinition: 'Standard'
  };
};

module.exports = {
  determineDiagnostics,
  generateBonTravaux
};