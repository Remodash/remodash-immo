// Types de base pour l'application Remodash

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'admin' | 'ra' | 'gt' | 'gardien' | 'comptable';

export interface Locataire {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  dateOfBirth?: Date;
  profession?: string;
  revenus?: number;
  status: LocataireStatus;
  logementId: string;
  dateEntree: Date;
  dateSortie?: Date;
  motifSortie?: string;
  avatar?: string;
  documents: Document[];
  coOccupants: CoOccupant[];
  impayesAmount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export type LocataireStatus = 'actif' | 'depart_annonce' | 'parti' | 'impayes';

export interface CoOccupant {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
  relation: string;
}

export interface Logement {
  id: string;
  address: string;
  city: string;
  postalCode: string;
  type: string; // T1, T2, T3, etc.
  surface: number;
  loyer: number;
  charges: number;
  status: LogementStatus;
  locataireActuel?: Locataire;
  dateVacance?: Date;
  motifVacance?: string;
  photos: string[];
  equipements: string[];
  dpe?: string;
  anneeConstruction?: number;
  chauffage?: string;
  gl: string; // Gestionnaire logement
  immeuble?: string;
  residence?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type LogementStatus = 'occupe' | 'vacant' | 'travaux' | 'bloque';

export interface PreEDL {
  id: string;
  logementId: string;
  locataireId: string;
  gardienId: string;
  dateVisite: Date;
  presenceLocataire: boolean;
  status: PreEDLStatus;
  observations: string;
  photos: string[];
  rapportPieces: RapportPiece[];
  releveCompteurs: ReleveCompteur[];
  signatureGardien?: string;
  dateCreation: Date;
  dateValidation?: Date;
}

export type PreEDLStatus = 'a_planifier' | 'en_cours' | 'termine' | 'valide';

export interface RapportPiece {
  id: string;
  nom: string;
  etatGeneral: 'bon' | 'moyen' | 'mauvais';
  equipements: EquipementEtat[];
  photos: string[];
  observations: string;
}

export interface EquipementEtat {
  nom: string;
  etat: 'bon' | 'moyen' | 'mauvais' | 'absent';
  observations?: string;
}

export interface ReleveCompteur {
  type: 'eau' | 'gaz' | 'electricite';
  valeur: number;
  photo?: string;
}

export interface Diagnostic {
  id: string;
  logementId: string;
  preEDLId: string;
  type: DiagnosticType;
  prestataire?: Prestataire;
  status: DiagnosticStatus;
  cout?: number;
  datePrevu?: Date;
  dateRealise?: Date;
  rapportUrl?: string;
  valideParGT?: boolean;
  approuveParRA?: boolean;
  dateValidationGT?: Date;
  dateApprobationRA?: Date;
  commentairesGT?: string;
  commentairesRA?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type DiagnosticType = 
  | 'plomberie' 
  | 'electricite' 
  | 'chauffage' 
  | 'peinture' 
  | 'sols' 
  | 'menuiserie' 
  | 'sanitaire' 
  | 'cuisine'
  | 'general';

export type DiagnosticStatus = 'en_attente' | 'planifie' | 'en_cours' | 'termine' | 'valide_gt' | 'approuve_ra';

export interface Travaux {
  id: string;
  logementId: string;
  diagnostics: string[]; // IDs des diagnostics
  status: TravauxStatus;
  lots: LotTravaux[];
  coutTotal: number;
  coutEstime: number;
  repartitionLocataire: number;
  repartitionBailleur: number;
  datePrevu?: Date;
  dateDebut?: Date;
  dateFin?: Date;
  pourcentageAvancement: number;
  valideParGT?: boolean;
  approuveParRA?: boolean;
  dateValidationGT?: Date;
  dateApprobationRA?: Date;
  rapportsQuotidiens: RapportQuotidien[];
  photosSuivi: string[];
  reception1?: ReceptionTravaux; // Gardien
  reception2?: ReceptionTravaux; // GT
  createdAt: Date;
  updatedAt: Date;
}

export type TravauxStatus = 'en_attente' | 'valide_gt' | 'approuve' | 'en_cours' | 'termine' | 'receptionne';

export interface LotTravaux {
  id: string;
  nom: string;
  description: string;
  corpsMetier: string;
  prestataire?: Prestataire;
  lignesTravaux: LigneTravaux[];
  coutTotal: number;
  status: TravauxStatus;
  datePrevu?: Date;
  dateDebut?: Date;
  dateFin?: Date;
}

export interface LigneTravaux {
  id: string;
  poste: string;
  description: string;
  quantite: number;
  unite: string;
  prixUnitaire: number;
  total: number;
  vetuste?: number;
  partLocataire: number;
  partBailleur: number;
}

export interface RapportQuotidien {
  id: string;
  date: Date;
  auteur: string; // gardien ou prestataire
  typeAuteur: 'gardien' | 'prestataire';
  contenu: string;
  photos: string[];
  problemes?: string[];
  avancement?: number;
}

export interface ReceptionTravaux {
  id: string;
  date: Date;
  auteur: string;
  typeReception: 'premiere' | 'definitive';
  travauxConformes: boolean;
  reserves: string[];
  photos: string[];
  signature?: string;
  valide: boolean;
}

export interface Prestataire {
  id: string;
  nom: string;
  email: string;
  phone: string;
  adresse: string;
  siret: string;
  specialites: string[];
  zoneIntervention: string[];
  notePerformance: number;
  logo?: string;
  interventionsEnCours: number;
  statistiques: StatistiquesPrestataire;
  createdAt: Date;
  updatedAt: Date;
}

export interface StatistiquesPrestataire {
  respectDelais: number; // %
  respectBudget: number; // %
  qualiteTravaux: number; // note sur 5
  nombreInterventions: number;
  penalites: number; // montant total
}

export interface Notification {
  id: string;
  userId: string;
  titre: string;
  message: string;
  type: NotificationType;
  priorite: NotificationPriorite;
  lu: boolean;
  url?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export type NotificationType = 'validation' | 'alerte' | 'information' | 'systeme';
export type NotificationPriorite = 'faible' | 'normale' | 'urgente';

export interface Document {
  id: string;
  nom: string;
  type: string;
  url: string;
  taille: number;
  uploadedBy: string;
  createdAt: Date;
}

export interface BPUPoste {
  id: string;
  code: string;
  nom: string;
  description: string;
  unite: string;
  prixUnitaire: number;
  categorie: string;
  sousCategorie?: string;
  conditions?: string;
  version: number;
  dateApplication: Date;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface FilterParams {
  search?: string;
  status?: string;
  dateDebut?: Date;
  dateFin?: Date;
  [key: string]: any;
}