'use client';

import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    // Vérifier si l'utilisateur est connecté (simulation)
    const isAuthenticated = localStorage.getItem('token');
    
    if (isAuthenticated) {
      // Redirection vers le dashboard si connecté
      window.location.href = '/dashboard';
    } else {
      // Redirection vers la page de connexion si non connecté
      window.location.href = '/auth/login';
    }
  }, []);

  // Page de chargement pendant la redirection
  return (
    <div className="min-h-screen bg-primary-900 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
          <span className="text-primary-900 font-bold text-2xl">R</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Remodash</h1>
        <p className="text-primary-100">Chargement...</p>
        
        {/* Spinner de chargement */}
        <div className="mt-6">
          <svg className="animate-spin h-8 w-8 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
