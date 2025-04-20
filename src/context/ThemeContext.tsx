import  { createContext, useState, ReactNode } from "react";

interface ThemeContextProps {
    theme: "light" | "dark";
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
    theme:"light",
    toggleTheme() {},
});

interface Props {
    children: ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
    const [theme,setTheme] = useState<"light"|"dark">("light");
    
    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    return (
        <ThemeContext.Provider value={{theme,toggleTheme}}>
            <div className={theme}>{children}</div>
        </ThemeContext.Provider>
    );
};
