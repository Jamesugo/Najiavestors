"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "USER" | "BUSINESS_OWNER" | "ADMIN";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  city?: string;
}

export const DEMO_USERS: Record<UserRole, AuthUser> = {
  USER: {
    id: "user-1",
    name: "Chidinma Okoro",
    email: "patron@najiavestors.ng",
    role: "USER",
    city: "Lekki, Lagos",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
  },
  BUSINESS_OWNER: {
    id: "user-2",
    name: "Bolanle Austen-Peters",
    email: "owner@terra.ng",
    role: "BUSINESS_OWNER",
    city: "Victoria Island, Lagos",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80",
  },
  ADMIN: {
    id: "user-3",
    name: "Najiavestors Admin",
    email: "admin@najiavestors.ng",
    role: "ADMIN",
    city: "Abuja, FCT",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
  },
};

interface AuthContextType {
  user: AuthUser | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  loginAs: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  isAuthenticated: false,
  loginAs: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const savedRole = localStorage.getItem("najiavestors_role") as UserRole | null;
      if (savedRole && DEMO_USERS[savedRole]) {
        setUser(DEMO_USERS[savedRole]);
      }
    } catch (e) {
      // Ignore storage errors
    }
  }, []);

  const loginAs = (selectedRole: UserRole) => {
    const demoUser = DEMO_USERS[selectedRole];
    setUser(demoUser);
    try {
      localStorage.setItem("najiavestors_role", selectedRole);
      document.cookie = `najiavestors_role=${selectedRole}; path=/; max-age=604800`;
    } catch (e) {}
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("najiavestors_role");
      document.cookie = "najiavestors_role=; path=/; max-age=0";
    } catch (e) {}
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user ? user.role : null,
        isAuthenticated: !!user,
        loginAs,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
