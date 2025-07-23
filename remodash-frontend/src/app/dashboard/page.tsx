'use client';

import { 
  Users, 
  Building, 
  Wrench, 
  AlertCircle,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { KPICard } from '@/components/ui/KPICard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatCurrency, formatDate } from '@/lib/utils';

// Données de démonstration
const mockData = {
  kpis: {
    departsEnCours: { value: 12, change: { value: 15, type: 'increase' as const, period: 'ce mois' } },
    logementsVacants: { value: 8, change: { value: -10, type: 'decrease' as const, period: 'ce mois' } },
    travauxEnCours: { value: 24, change: { value: 5, type: 'increase' as const, period: 'ce mois' } },
    retardsPenalites: { value: 15420, change: { value: -25, type: 'decrease' as const, period: 'ce mois' } },
  },
  alertesUrgentes: [
    {
      id: '1',
      titre: 'Fuite d\'eau - Urgence',
      logement: 'Apt 12B - Résidence Les Jardins',
      date: new Date('2024-01-15'),
      priorite: 'urgent' as const,
    },
    {
      id: '2',
      titre: 'Panne chauffage',
      logement: 'Apt 3A - Les Tilleuls',
      date: new Date('2024-01-14'),
      priorite: 'urgent' as const,
    },
    {
      id: '3',
      titre: 'Retard travaux > 7 jours',
      logement: 'Apt 5C - Villa Marina',
      date: new Date('2024-01-13'),
      priorite: 'normal' as const,
    },
  ],
  validationsEnAttente: [
    {
      id: '1',
      type: 'Diagnostic plomberie',
      logement: 'Apt 8A - Résidence Soleil',
      validateur: 'GT',
      date: new Date('2024-01-12'),
      cout: 850,
    },
    {
      id: '2',
      type: 'Bon de travaux',
      logement: 'Apt 15B - Les Chênes',
      validateur: 'RA',
      date: new Date('2024-01-11'),
      cout: 2450,
    },
    {
      id: '3',
      type: 'Réception travaux',
      logement: 'Apt 2C - Villa Rose',
      validateur: 'GT',
      date: new Date('2024-01-10'),
      cout: 1200,
    },
  ],
  activiteRecente: [
    {
      id: '1',
      action: 'Nouveau départ locataire',
      utilisateur: 'Marie Dubois',
      logement: 'Apt 7A - Les Mimosas',
      timestamp: new Date('2024-01-15T14:30:00'),
    },
    {
      id: '2',
      action: 'Validation diagnostic',
      utilisateur: 'Pierre Martin (GT)',
      logement: 'Apt 12B - Villa Neptune',
      timestamp: new Date('2024-01-15T11:20:00'),
    },
    {
      id: '3',
      action: 'Travaux terminés',
      utilisateur: 'Entreprise Rénov Plus',
      logement: 'Apt 3C - Résidence Azur',
      timestamp: new Date('2024-01-15T09:45:00'),
    },
  ],
};

const mockUser = {
  firstName: 'Jean',
  lastName: 'Dupont',
  role: 'GT',
};

const breadcrumbs = [
  { label: 'Dashboard' },
];

export default function DashboardPage() {
  return (
    <MainLayout user={mockUser} notifications={12} breadcrumbs={breadcrumbs}>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-title-lg font-bold text-neutral-900">Dashboard</h1>
            <p className="text-body-md text-neutral-600 mt-1">
              Vue d'ensemble de vos activités immobilières
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" icon={Calendar}>
              Rapport mensuel
            </Button>
            <Button icon={TrendingUp}>
              Voir les analyses
            </Button>
          </div>
        </div>

        {/* Row 1 - KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <KPICard
            title="Départs en cours"
            value={mockData.kpis.departsEnCours.value}
            change={mockData.kpis.departsEnCours.change}
            icon={Users}
            color="primary"
            onClick={() => console.log('Navigate to departures')}
          />
          
          <KPICard
            title="Logements vacants"
            value={mockData.kpis.logementsVacants.value}
            change={mockData.kpis.logementsVacants.change}
            icon={Building}
            color="warning"
            onClick={() => console.log('Navigate to vacant properties')}
          />
          
          <KPICard
            title="Travaux en cours"
            value={mockData.kpis.travauxEnCours.value}
            change={mockData.kpis.travauxEnCours.change}
            icon={Wrench}
            color="secondary"
            onClick={() => console.log('Navigate to works')}
          />
          
          <KPICard
            title="Retards/Pénalités"
            value={formatCurrency(mockData.kpis.retardsPenalites.value)}
            change={mockData.kpis.retardsPenalites.change}
            icon={AlertCircle}
            color="danger"
            onClick={() => console.log('Navigate to penalties')}
          />
        </div>

        {/* Row 2 - Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Timeline des processus */}
          <Card>
            <CardHeader>
              <CardTitle>Timeline des processus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-8 text-neutral-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-body-md">Diagramme Gantt des processus</p>
                  <p className="text-body-sm">(À implémenter avec une librairie de graphiques)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Répartition des coûts travaux */}
          <Card>
            <CardHeader>
              <CardTitle>Répartition des coûts travaux</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-8 text-neutral-500">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-body-md">Graphique donut des coûts</p>
                  <p className="text-body-sm">(À implémenter avec Recharts)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Row 3 - Listes rapides */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Alertes urgentes */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-danger-600" />
                  Alertes urgentes
                </CardTitle>
                <Badge variant="danger" size="sm">
                  {mockData.alertesUrgentes.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockData.alertesUrgentes.map((alerte) => (
                <div key={alerte.id} className="p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-body-md font-medium text-neutral-900">
                      {alerte.titre}
                    </h4>
                    <StatusBadge status={alerte.priorite} size="sm" />
                  </div>
                  <p className="text-body-sm text-neutral-600 mb-2">
                    {alerte.logement}
                  </p>
                  <p className="text-label-sm text-neutral-500">
                    {formatDate(alerte.date, 'relative')}
                  </p>
                </div>
              ))}
              <Button variant="outline" size="sm" fullWidth className="mt-4">
                Voir toutes les alertes
              </Button>
            </CardContent>
          </Card>

          {/* Validations en attente */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-warning-600" />
                  Validations en attente
                </CardTitle>
                <Badge variant="warning" size="sm">
                  {mockData.validationsEnAttente.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockData.validationsEnAttente.map((validation) => (
                <div key={validation.id} className="p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-body-md font-medium text-neutral-900">
                      {validation.type}
                    </h4>
                    <Badge variant="primary" size="sm">
                      {validation.validateur}
                    </Badge>
                  </div>
                  <p className="text-body-sm text-neutral-600 mb-1">
                    {validation.logement}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-label-sm text-neutral-500">
                      {formatDate(validation.date, 'relative')}
                    </span>
                    <span className="text-body-sm font-medium text-neutral-900">
                      {formatCurrency(validation.cout)}
                    </span>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" fullWidth className="mt-4">
                Voir toutes les validations
              </Button>
            </CardContent>
          </Card>

          {/* Activité récente */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success-600" />
                  Activité récente
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockData.activiteRecente.map((activite) => (
                <div key={activite.id} className="p-3 border border-neutral-200 rounded-lg">
                  <h4 className="text-body-md font-medium text-neutral-900 mb-1">
                    {activite.action}
                  </h4>
                  <p className="text-body-sm text-neutral-600 mb-1">
                    par {activite.utilisateur}
                  </p>
                  <p className="text-body-sm text-neutral-600 mb-1">
                    {activite.logement}
                  </p>
                  <p className="text-label-sm text-neutral-500">
                    {formatDate(activite.timestamp, 'relative')}
                  </p>
                </div>
              ))}
              <Button variant="outline" size="sm" fullWidth className="mt-4">
                Voir toute l'activité
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}