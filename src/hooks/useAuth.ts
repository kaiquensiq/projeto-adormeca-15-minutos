import { useState, useEffect } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        setAuthState({
          user: session?.user ?? null,
          session,
          loading: false,
          error: null
        });
      } catch (error) {
        setAuthState(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error occurred'
        }));
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        setAuthState({
          user: session?.user ?? null,
          session,
          loading: false,
          error: null
        });
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      
      return { success: true, data };
    } catch (error) {
      const errorMessage = error instanceof AuthError 
        ? error.message 
        : 'Erro ao fazer login. Tente novamente.';
      
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }));
      
      return { success: false, error: errorMessage };
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          }
        }
      });

      if (error) throw error;
      
      return { success: true, data };
    } catch (error) {
      const errorMessage = error instanceof AuthError 
        ? error.message 
        : 'Erro ao criar conta. Tente novamente.';
      
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }));
      
      return { success: false, error: errorMessage };
    }
  };

  const signOut = async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Erro ao fazer logout.';
      
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }));
      
      return { success: false, error: errorMessage };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      
      if (error) throw error;
      
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof AuthError 
        ? error.message 
        : 'Erro ao enviar email de recuperação.';
      
      return { success: false, error: errorMessage };
    }
  };

  return {
    user: authState.user,
    session: authState.session,
    loading: authState.loading,
    error: authState.error,
    signIn,
    signUp,
    signOut,
    resetPassword,
    isAuthenticated: !!authState.user
  };
};