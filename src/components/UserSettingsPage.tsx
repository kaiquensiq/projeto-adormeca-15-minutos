import React, { useState, useEffect, useRef } from 'react';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  ArrowLeft,
  Edit3,
  Camera,
  AlertCircle,
  CheckCircle,
  Upload
} from 'lucide-react';
import { CourseData } from '../types/course';
import { supabase } from '../lib/supabase';

interface UserSettingsPageProps {
  data: CourseData;
  onNavigate: (view: string) => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  general?: string;
}

export const UserSettingsPage: React.FC<UserSettingsPageProps> = ({ data, onNavigate }) => {
  const { user } = data;
  const [formData, setFormData] = useState<FormData>({
    firstName: user.name.split(' ')[0] || '',
    lastName: user.name.split(' ').slice(1).join(' ') || '',
    email: user.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateForm = (): boolean => {
    console.log('validateForm chamado para tab:', activeTab);
    const newErrors: FormErrors = {};

    if (activeTab === 'profile') {
      // Validação do nome
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'Nome é obrigatório';
      }

      // Validação do email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.trim()) {
        newErrors.email = 'Email é obrigatório';
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Email inválido';
      }
    } else if (activeTab === 'password') {
      console.log('Validando campos de senha:');
      console.log('currentPassword:', formData.currentPassword);
      console.log('newPassword:', formData.newPassword);
      console.log('confirmPassword:', formData.confirmPassword);
      
      // Validação da senha
      if (!formData.currentPassword.trim()) {
        newErrors.currentPassword = 'Senha atual é obrigatória';
        console.log('Erro: Senha atual vazia');
      }
      
      if (!formData.newPassword.trim()) {
        newErrors.newPassword = 'Nova senha é obrigatória';
        console.log('Erro: Nova senha vazia');
      } else if (formData.newPassword.length < 6) {
        newErrors.newPassword = 'Nova senha deve ter pelo menos 6 caracteres';
        console.log('Erro: Nova senha muito curta');
      }
      
      if (!formData.confirmPassword.trim()) {
        newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
        console.log('Erro: Confirmação de senha vazia');
      } else if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Senhas não coincidem';
        console.log('Erro: Senhas não coincidem');
      }
    }

    console.log('Erros encontrados:', newErrors);
    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    console.log('Formulário válido:', isValid);
    return isValid;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    setSuccessMessage('');
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setMessage({ type: 'error', text: 'Por favor, selecione apenas arquivos de imagem.' });
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'A imagem deve ter no máximo 5MB.' });
        return;
      }
      
      setAvatarFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      setMessage(null);
    }
  };

  const uploadAvatar = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      return null;
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const removeAvatar = async () => {
    try {
      setIsLoading(true);
      
      // Remove from database
      const { error: updateError } = await supabase
        .from('users')
        .update({ avatar: null })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // Clear local state
      setAvatarFile(null);
      setAvatarPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      setSuccessMessage('Avatar removido com sucesso!');
      
      // Refresh data
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error: any) {
      setErrors({ general: 'Erro ao remover avatar' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      let avatarUrl = user.avatar;

      // Upload new avatar if selected
      if (avatarFile) {
        const uploadedUrl = await uploadAvatar(avatarFile);
        if (uploadedUrl) {
          avatarUrl = uploadedUrl;
        } else {
          throw new Error('Erro ao fazer upload da imagem');
        }
      }
      
      // Atualizar perfil no Supabase
      const { error: updateError } = await supabase
        .from('users')
        .update({
          name: fullName,
          email: formData.email,
          avatar: avatarUrl
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // Se o email foi alterado, atualizar também no auth
      if (formData.email !== user.email) {
        const { error: authError } = await supabase.auth.updateUser({
          email: formData.email
        });
        
        if (authError) throw authError;
      }

      setSuccessMessage('Perfil atualizado com sucesso!');
      setAvatarFile(null);
      setAvatarPreview(null);
      
      // Refresh data to show new avatar
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error: any) {
      setErrors({ general: error.message || 'Erro ao atualizar perfil' });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('handlePasswordSubmit chamado');
    console.log('Dados do formulário:', formData);
    
    const isValid = validateForm();
    console.log('Validação passou:', isValid);
    console.log('Erros de validação:', errors);
    
    if (!isValid) {
      console.log('Validação falhou, retornando');
      return;
    }

    console.log('Iniciando processo de alteração de senha');
    setIsLoading(true);
    setErrors({});
    setSuccessMessage('');

    try {
      // Obter o usuário atual
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw new Error('Usuário não encontrado. Faça login novamente.');
      }

      console.log('Usuário encontrado:', user.email);

      // Verificar a senha atual tentando fazer login
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email!,
        password: formData.currentPassword
      });
      
      if (signInError) {
        console.error('Erro na verificação da senha atual:', signInError);
        throw new Error('Senha atual incorreta');
      }

      console.log('Senha atual verificada com sucesso');

      // Agora atualizar a senha
      const { error: updateError } = await supabase.auth.updateUser({
        password: formData.newPassword
      });

      if (updateError) {
        console.error('Erro ao atualizar senha:', updateError);
        throw new Error(updateError.message || 'Erro ao alterar senha');
      }

      console.log('Senha atualizada com sucesso');
      setSuccessMessage('Senha alterada com sucesso!');
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error: any) {
      console.error('Erro na alteração de senha:', error);
      setErrors({ general: error.message || 'Erro ao alterar senha' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-4 md:p-6 space-y-6 md:space-y-8 animate-fade-in">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Voltar ao Dashboard</span>
        </button>
      </div>

      {/* Page Title */}
      <div className="bg-gradient-to-br from-night-600 via-sleep-600 to-night-700 rounded-xl md:rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Configurações da Conta
            </h1>
            <p className="text-night-100">
              Gerencie suas informações pessoais e configurações de segurança
            </p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          <span className="text-green-800 dark:text-green-200">{successMessage}</span>
        </div>
      )}

      {/* Error Message */}
      {errors.general && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          <span className="text-red-800 dark:text-red-200">{errors.general}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex border-b border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'profile'
                ? 'text-night-600 dark:text-night-400 border-b-2 border-night-600 dark:border-night-400'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            Informações Pessoais
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'password'
                ? 'text-night-600 dark:text-night-400 border-b-2 border-night-600 dark:border-night-400'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            Alterar Senha
          </button>
        </div>

        <div className="p-6 md:p-8">
          {/* Message Display */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              message.type === 'success' 
                ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
              )}
              <span className="text-sm font-medium">{message.text}</span>
            </div>
          )}
          
          {activeTab === 'profile' ? (
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  {avatarPreview || user.avatar ? (
                    <img
                      src={avatarPreview || user.avatar}
                      alt={user.name}
                      className="w-20 h-20 rounded-full border-4 border-slate-200 dark:border-slate-600 object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full border-4 border-slate-200 dark:border-slate-600 bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                      <User className="w-8 h-8 text-slate-400" />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={handleAvatarClick}
                    className="absolute bottom-0 right-0 w-8 h-8 bg-night-600 hover:bg-night-700 text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-slate-800 dark:text-white mb-1">
                    Foto do Perfil
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                    Clique no ícone da câmera para alterar sua foto
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleAvatarClick}
                      className="flex items-center gap-2 px-3 py-2 text-sm bg-night-600 hover:bg-night-700 text-white rounded-lg transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      Escolher Foto
                    </button>
                    {(avatarPreview || user.avatar) && (
                      <button
                        type="button"
                        onClick={removeAvatar}
                        className="px-3 py-2 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 border border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700 rounded-lg transition-colors"
                      >
                        Remover
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Name Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Nome *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.firstName
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-slate-300 dark:border-slate-600 focus:ring-night-500'
                    }`}
                    placeholder="Seu nome"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Sobrenome
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.lastName
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-slate-300 dark:border-slate-600 focus:ring-night-500'
                    }`}
                    placeholder="Seu sobrenome"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 border rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.email
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-slate-300 dark:border-slate-600 focus:ring-night-500'
                    }`}
                    placeholder="seu@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center gap-2 bg-night-600 hover:bg-night-700 disabled:bg-slate-400 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Senha Atual *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={formData.currentPassword}
                    onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                    className={`w-full pl-12 pr-12 py-3 border rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.currentPassword
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-slate-300 dark:border-slate-600 focus:ring-night-500'
                    }`}
                    placeholder="Digite sua senha atual"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.currentPassword && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.currentPassword}</p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Nova Senha *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={formData.newPassword}
                    onChange={(e) => handleInputChange('newPassword', e.target.value)}
                    className={`w-full pl-12 pr-12 py-3 border rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.newPassword
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-slate-300 dark:border-slate-600 focus:ring-night-500'
                    }`}
                    placeholder="Digite sua nova senha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.newPassword}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Confirmar Nova Senha *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`w-full pl-12 pr-12 py-3 border rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.confirmPassword
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-slate-300 dark:border-slate-600 focus:ring-night-500'
                    }`}
                    placeholder="Confirme sua nova senha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center gap-2 bg-night-600 hover:bg-night-700 disabled:bg-slate-400 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Lock className="w-5 h-5" />
                  )}
                  {isLoading ? 'Alterando...' : 'Alterar Senha'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};