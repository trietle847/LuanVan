import { createContext, useContext, useEffect, useState } from "react";
import userApi from "../services/user.api";

import AuthModal from "../utils/components/AuthModal";
import type { User } from "../utils/types";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  openAuth: () => void;
  closeAuth: () => void;
  login: (token: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authOpen, setAuthOpen] = useState(false);

  // Load user từ token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const res = await userApi.getMe();
        setUser(res);
        // console.log(res);
      } catch {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (token: string) => {
    localStorage.setItem("token", token);
    const res = await userApi.getMe();
    setUser(res);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        openAuth: () => setAuthOpen(true),
        closeAuth: () => setAuthOpen(false),
        login,
        logout,
      }}
    >
      {children}

      {/* Modal đặt ở đây → dùng toàn app */}
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
