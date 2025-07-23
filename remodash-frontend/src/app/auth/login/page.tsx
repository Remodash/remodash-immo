'use client';

import { useState } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulation de l'appel API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirection vers le dashboard
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Identifiants incorrects. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
            <span className="text-primary-900 font-bold text-2xl">R</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Remodash</h1>
          <p className="text-primary-100 text-lg">Gestion Immobilière Intelligente</p>
        </div>

        {/* Card de connexion */}
        <Card className="shadow-2xl border-0">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-title-md font-bold text-neutral-900 mb-2">
                Connexion à Remodash
              </h2>
              <p className="text-body-md text-neutral-600">
                Connectez-vous pour accéder à votre espace
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-danger-50 border border-danger-200 rounded-lg">
                <p className="text-danger-600 text-body-sm flex items-center gap-2">
                  <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <Input
                label="Adresse email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                icon={User}
                placeholder="votre.email@example.com"
                required
                disabled={loading}
              />

              {/* Mot de passe */}
              <div className="space-y-1">
                <label className="block text-label-md font-medium text-neutral-700">
                  Mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-4 w-4 text-neutral-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-neutral-300 bg-white pl-10 pr-10 py-2 text-body-md placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:border-primary-500 focus:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                    placeholder="Votre mot de passe"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-neutral-600"
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Se souvenir de moi */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-body-md text-neutral-700">
                  Se souvenir de moi
                </label>
              </div>

              {/* Bouton de connexion */}
              <Button
                type="submit"
                loading={loading}
                fullWidth
                size="lg"
                className="mt-8"
              >
                Se connecter
              </Button>

              {/* Lien mot de passe oublié */}
              <div className="text-center">
                <a
                  href="/auth/forgot-password"
                  className="text-body-md text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Mot de passe oublié ?
                </a>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-primary-100 text-body-sm space-y-2">
          <p>&copy; 2024 Remodash. Tous droits réservés.</p>
          <div className="flex justify-center space-x-4">
            <a href="/mentions-legales" className="hover:text-white transition-colors">
              Mentions légales
            </a>
            <a href="/confidentialite" className="hover:text-white transition-colors">
              Confidentialité
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}