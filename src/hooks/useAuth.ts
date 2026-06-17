import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkRole = useCallback(async (supaUser: User) => {
    try {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", supaUser.id)
        .eq("role", "admin")
        .maybeSingle();

      const admin = !!data;
      setUser({
        id: supaUser.id,
        email: supaUser.email || "",
        role: admin ? "admin" : "user",
      });
      setIsAdmin(admin);
    } catch {
      setUser({
        id: supaUser.id,
        email: supaUser.email || "",
        role: "user",
      });
      setIsAdmin(false);
    }
  }, []);

  useEffect(() => {
    // Set up auth listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, sess) => {
        setSession(sess);
        if (sess?.user) {
          // Defer role check to avoid Supabase client deadlock
          setTimeout(() => checkRole(sess.user), 0);
        } else {
          setUser(null);
          setIsAdmin(false);
          setLoading(false);
        }
      }
    );

    // THEN check existing session
    supabase.auth.getSession().then(({ data: { session: sess } }) => {
      setSession(sess);
      if (sess?.user) {
        checkRole(sess.user).then(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [checkRole]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsAdmin(false);
  };

  return { user, session, loading, isAdmin, signOut };
};
