import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Loader } from 'lucide-react';

interface LoginPageProps {
  onLogin: (email: string, password: string) => Promise<boolean>;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await onLogin(email, password);
      if (!success) {
        setError('Email ou senha incorretos. Tente novamente.');
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8" style={{backgroundColor: '#DFE3E8'}}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-blue-200/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-indigo-200/25 rounded-full blur-2xl"></div>
        <div className="absolute top-3/4 left-1/2 w-24 h-24 sm:w-36 sm:h-36 lg:w-48 lg:h-48 bg-slate-300/20 rounded-full blur-2xl"></div>
      </div>

      <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
        {/* Logo and Title */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center mb-2 sm:mb-3">
            <img 
              src="https://i.imgur.com/Csd6IIQ.png" 
              alt="Logo Sono em 15" 
              className="drop-shadow-lg" 
              style={{width: '180px', height: '180px', objectFit: 'contain'}} 
            />
          </div>
          <h1 className="text-slate-700 text-xl sm:text-2xl font-semibold mb-2">
            Área de Membros Premium
          </h1>
          <p className="text-slate-500 text-sm sm:text-base">
            Acesse seu conteúdo exclusivo
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/50 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm sm:text-base font-medium text-slate-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border border-slate-200 rounded-xl sm:rounded-2xl bg-white/80 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-sm sm:text-base"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm sm:text-base font-medium text-slate-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 sm:pl-12 pr-12 sm:pr-14 py-3 sm:py-4 border border-slate-200 rounded-xl sm:rounded-2xl bg-white/80 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-sm sm:text-base"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                <p className="text-red-600 text-sm sm:text-base text-center font-medium">{error}</p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-400 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {isLoading ? (
                <>
                  <Loader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar na Área de Membros'
              )}
            </button>
          </form>


        </div>

        {/* Footer */}
        <div className="text-center mt-6 sm:mt-8">
          <p className="text-slate-500 text-xs sm:text-sm">
            © 2024 Sono em 15. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};