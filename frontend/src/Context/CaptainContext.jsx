import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
export const CaptainDataContext = createContext(null);
export function CaptainContext ({ children }) {
    const [captain, setCaptain] = useState(() => {
        try { return JSON.parse(localStorage.getItem("captain")) || null; } catch { return null; }
    });
    const [token, setToken] = useState(() => localStorage.getItem("captain_token") || null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
 
useEffect(() => {
        if (captain) localStorage.setItem("captain", JSON.stringify(captain));
        else localStorage.removeItem("captain");
    }, [captain]);


    useEffect(() => {
        if (token) localStorage.setItem("captain_token", token);
        else localStorage.removeItem("captain_token");
    }, [token]);   
                                            

    const login = useCallback(async (credentials) => {
        setLoading(true); setError(null);
        try {
            const res = await fetch("/api/captain/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            });
            if (!res.ok) throw new Error("Login failed");
            const data = await res.json();
            setCaptain(data.captain ?? null);
            setToken(data.token ?? null);
            return data;
        } catch (err) { 
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);
    const logout = useCallback(() => {
        setCaptain(null);
        setToken(null);
        setError(null);
    }, []);
    const refresh = useCallback(async () => {
        if (!token) return null;
        setLoading(true); setError(null);
        try {
            const res = await fetch("/api/captain/me", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to refresh captain");
            const data = await res.json();
            setCaptain(data.captain ?? null);
            return data;
        } catch (err) {
            setError(err.message);
            throw err; 
        } finally {
            setLoading(false);
        }
    }, [token]);
    const updateProfile = useCallback(async (updates) => {
        if (!token) throw new Error("Not authenticated");
        setLoading(true); setError(null);
        try {
            const res = await fetch("/api/captain/profile", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updates),
            });
            if (!res.ok) throw new Error("Update failed");
            const data = await res.json();
            setCaptain(data.captain ?? captain);
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [token, captain]);
    const value = {
        captain,
        token,
        loading,
        error,
        login,
        logout,
        refresh,
        updateProfile,
        setCaptain, // exposed for rare direct updates
    };
    return <CaptainDataContext.Provider value={value}>
        {children}
         </CaptainDataContext.Provider>;
} 
export function useCaptain() {
    const ctx = useContext(CaptainDataContext);
    if (!ctx) throw new Error("useCaptain must be used within CaptainDataProvider");
    return ctx;
}

export default CaptainContext;