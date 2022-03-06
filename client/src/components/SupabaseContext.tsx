import { SupabaseClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/ui';
import { createContext, useContext } from 'react';

const SupabaseContext = createContext<SupabaseClient | null>(null);

export interface SupabaseProviderProps {
  children?: JSX.Element[] | JSX.Element;
  supabaseClient: SupabaseClient;
}

export function SupabaseProvider(props: SupabaseProviderProps) {
  return (
    <Auth.UserContextProvider supabaseClient={props.supabaseClient}>
      <SupabaseContext.Provider value={props.supabaseClient}>
        {props.children}
      </SupabaseContext.Provider>
    </Auth.UserContextProvider>
  );
}

export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseClientProvider.');
  }
  return context;
}
