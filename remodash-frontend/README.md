# Remodash Frontend

Application de gestion immobilière intelligente développée avec Next.js 15, TypeScript et Tailwind CSS.

## 🏗️ Architecture

### Stack technique
- **Framework** : Next.js 15 (App Router)
- **Language** : TypeScript
- **Styling** : Tailwind CSS
- **Icons** : Lucide React
- **State Management** : React Hooks
- **Forms** : React Hook Form + Zod
- **Charts** : Recharts (à implémenter)
- **Animations** : Framer Motion

### Structure du projet
```
src/
├── app/                    # Pages (App Router)
│   ├── auth/
│   │   ├── login/         # Page de connexion
│   │   └── unauthorized/  # Page non autorisé
│   ├── dashboard/         # Dashboard principal
│   └── page.tsx           # Page d'accueil (redirection)
├── components/
│   ├── layout/            # Composants de layout
│   │   ├── Header.tsx     # En-tête avec navigation
│   │   ├── Sidebar.tsx    # Barre latérale
│   │   └── MainLayout.tsx # Layout principal
│   ├── ui/                # Composants UI réutilisables
│   │   ├── Button.tsx     # Bouton avec variantes
│   │   ├── Badge.tsx      # Badge de statut
│   │   ├── Card.tsx       # Carte avec sous-composants
│   │   ├── Input.tsx      # Input avec validation
│   │   ├── KPICard.tsx    # Carte KPI pour dashboard
│   │   └── index.ts       # Export des composants
│   └── features/          # Composants métier (à développer)
├── lib/                   # Utilitaires
│   └── utils.ts           # Fonctions utilitaires
├── types/                 # Types TypeScript
│   └── index.ts           # Types de l'application
└── hooks/                 # Hooks personnalisés (à développer)
```

## 🎨 Design System

### Couleurs
- **Primary** : Bleu marine (#1e3a8a) - Confiance, professionnalisme
- **Secondary** : Orange (#f97316) - Énergie, urgence
- **Success** : Vert (#16a34a) - Validation, complétion
- **Warning** : Jaune (#eab308) - Alertes, en attente
- **Danger** : Rouge (#dc2626) - Erreurs, retards
- **Neutral** : Gris (#64748b) - Texte, bordures

### Typographie
- **Police** : Inter (Google Fonts)
- **Tailles** : title-lg, title-md, title-sm, subtitle-md, subtitle-sm, body-md, body-sm, label-md, label-sm

### Composants
- **Cards** : Fond blanc, ombre légère, radius 8px
- **Boutons** : 5 variantes (primary, secondary, success, danger, outline, ghost)
- **Badges** : Status colorés avec texte blanc
- **Inputs** : Validation visuelle (rouge/vert), icônes optionnelles

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone <repository-url>
cd remodash-frontend

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application sera disponible sur [http://localhost:3000](http://localhost:3000).

### Scripts disponibles
```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run start        # Serveur de production
npm run lint         # Vérification ESLint
```

## 📱 Pages implémentées

### ✅ Authentification
- **`/auth/login`** : Page de connexion avec formulaire stylé
- **`/auth/unauthorized`** : Page d'accès non autorisé

### ✅ Dashboard
- **`/dashboard`** : Vue d'ensemble avec KPIs, alertes et activité récente
- Layout en grid responsive
- KPIs cliquables avec évolution mensuelle
- Listes rapides (alertes, validations, activité)

### 🚧 À développer
- **Gestion des locataires** (`/locataires`)
- **Gestion des logements** (`/logements`)
- **Pré-État des Lieux** (`/pre-edl`)
- **Diagnostics** (`/diagnostics`)
- **Travaux** (`/travaux`)
- **Prestataires** (`/prestataires`)
- **Rapports** (`/rapports`)
- **Notifications** (`/notifications`)
- **Paramètres** (`/parametres`)

## 🎯 Fonctionnalités principales

### Layout et Navigation
- Header sticky avec logo, breadcrumb et menu utilisateur
- Sidebar collapsible avec navigation hiérarchique
- Badges de notification sur les items de menu
- Responsive design (mobile-first)

### Composants UI
- Système de design cohérent
- Composants réutilisables et accessibles
- States de loading et validation
- Animations fluides

### Authentification
- Simulation de connexion
- Gestion des rôles utilisateur
- Pages protégées selon les permissions

## 📊 Données de démonstration

L'application utilise actuellement des données mockées pour la démonstration :
- KPIs du dashboard avec évolutions
- Alertes urgentes et validations en attente
- Activité récente des utilisateurs
- Informations utilisateur simulées

## 🔧 Configuration

### Variables d'environnement
Créer un fichier `.env.local` :
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=Remodash
```

### Tailwind CSS
La configuration Tailwind personnalisée se trouve dans `tailwind.config.ts` avec :
- Couleurs du design system
- Typographie Inter
- Animations personnalisées
- Composants utilitaires

## 🚦 État du projet

### ✅ Terminé
- Configuration du projet (Next.js + TypeScript + Tailwind)
- Design system et composants UI de base
- Layout principal (Header + Sidebar)
- Pages d'authentification
- Dashboard avec KPIs et listes
- Navigation et routing
- Responsive design

### 🚧 En cours
- Intégration des graphiques (Recharts)
- Pages de gestion métier
- Formulaires avancés
- Gestion d'état globale

### 📋 À faire
- Intégration API backend
- Tests unitaires et E2E
- PWA (Progressive Web App)
- Internationalisation (i18n)
- Optimisations performance
- Documentation Storybook

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Pour toute question ou problème :
- Créer une issue sur GitHub
- Contacter l'équipe de développement
- Consulter la documentation technique

---

**Remodash** - Gestion Immobilière Intelligente 🏠✨
