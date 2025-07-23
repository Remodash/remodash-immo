'use client';

import { Lock, ArrowLeft, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

export default function UnauthorizedPage() {
  const handleReturnToDashboard = () => {
    window.location.href = '/dashboard';
  };

  const handleContactAdmin = () => {
    window.location.href = 'mailto:admin@remodash.com?subject=Demande d\'accès&body=Bonjour,%0D%0A%0D%0AJe souhaiterais obtenir l\'accès à une fonctionnalité de Remodash.%0D%0A%0D%0AMerci.';
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header avec logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-900 rounded-2xl shadow-lg mb-4">
            <span className="text-white font-bold text-2xl">R</span>
          </div>
          <h1 className="text-title-md font-bold text-primary-900">Remodash</h1>
        </div>

        {/* Card principale */}
        <Card className="shadow-lg">
          <CardContent className="p-8 text-center">
            {/* Icône cadenas rouge */}
            <div className="inline-flex items-center justify-center w-24 h-24 bg-danger-50 rounded-full mb-6">
              <Lock className="h-12 w-12 text-danger-600" />
            </div>

            {/* Titre et message */}
            <h2 className="text-title-md font-bold text-neutral-900 mb-4">
              Accès non autorisé
            </h2>
            
            <div className="space-y-3 mb-8">
              <p className="text-body-md text-neutral-600">
                Vous n'avez pas les permissions nécessaires pour accéder à cette page.
              </p>
              <p className="text-body-md text-neutral-600">
                Cette fonctionnalité nécessite un rôle <strong>Gestionnaire Technique (GT)</strong> ou supérieur.
              </p>
              <p className="text-body-sm text-neutral-500">
                Si vous pensez qu'il s'agit d'une erreur, veuillez contacter votre administrateur.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                onClick={handleReturnToDashboard}
                icon={ArrowLeft}
                iconPosition="left"
                fullWidth
                size="lg"
              >
                Retour au dashboard
              </Button>
              
              <Button
                onClick={handleContactAdmin}
                variant="outline"
                icon={Mail}
                iconPosition="left"
                fullWidth
                size="lg"
              >
                Contacter l'administrateur
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Informations supplémentaires */}
        <div className="mt-6 p-4 bg-neutral-100 rounded-lg">
          <h3 className="text-subtitle-sm font-semibold text-neutral-900 mb-2">
            Niveaux d'accès Remodash
          </h3>
          <div className="space-y-2 text-body-sm text-neutral-600">
            <div className="flex justify-between">
              <span>Gardien</span>
              <span className="text-neutral-500">Accès limité</span>
            </div>
            <div className="flex justify-between">
              <span>Comptable</span>
              <span className="text-neutral-500">Rapports financiers</span>
            </div>
            <div className="flex justify-between">
              <span>GT (Gestionnaire Technique)</span>
              <span className="text-success-600">Gestion complète</span>
            </div>
            <div className="flex justify-between">
              <span>RA (Responsable d'Agence)</span>
              <span className="text-primary-600">Supervision</span>
            </div>
            <div className="flex justify-between">
              <span>Administrateur</span>
              <span className="text-danger-600">Accès total</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-neutral-500 text-body-sm">
          <p>Besoin d'aide ? Consultez la <a href="/documentation" className="text-primary-600 hover:text-primary-700">documentation</a></p>
        </div>
      </div>
    </div>
  );
}