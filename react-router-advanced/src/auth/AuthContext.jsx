import { createContext, useContext, useState, useMemo } from "react";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [authed, setAuthed] = useState(false);
  const value = useMemo(
    () => ({
      authed,
      login: () => setAuthed(true),
      logout: () => setAuthed(false),
    }),
    [authed]
  );
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  return useContext(AuthCtx);
}
