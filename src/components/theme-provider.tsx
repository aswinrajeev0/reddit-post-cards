import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

type ThemeContextType = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    resolvedTheme: 'light' | 'dark';
};

const ThemeContext = createContext<ThemeContextType>({
    theme: 'system',
    setTheme: () => null,
    resolvedTheme: 'light',
});

type ThemeProviderProps = {
    children: React.ReactNode
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>('system');
    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
    const [isReady, setIsReady] = useState(false);

    const getSystemTheme = (): 'light' | 'dark' => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const applyTheme = (themeToApply: 'light' | 'dark') => {
        document.documentElement.setAttribute('data-theme', themeToApply);
        document.documentElement.classList.toggle('dark', themeToApply === 'dark');
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme;
        const initial = savedTheme || 'system';
        setTheme(initial);
        setIsReady(true);
    }, []);

    useEffect(() => {
        if (!isReady) return;

        const effectiveTheme = theme === 'system' ? getSystemTheme() : theme;
        setResolvedTheme(effectiveTheme);
        applyTheme(effectiveTheme);
        localStorage.setItem('theme', theme);
    }, [theme, isReady]);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            if (theme === 'system') {
                const systemTheme = getSystemTheme();
                setResolvedTheme(systemTheme);
                applyTheme(systemTheme);
            }
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);

    if (!isReady) return null;

    return (
        <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);