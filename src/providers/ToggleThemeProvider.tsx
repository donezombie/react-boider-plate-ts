import { createContext, useCallback, useContext, useMemo, useState } from 'react';

export enum ModeThemeEnum {
  light = 'light',
  dark = 'dark',
}

interface ToggleThemeContextI {
  mode: ModeThemeEnum;
  toggleTheme: () => void;
}

const ToggleThemeContext = createContext<ToggleThemeContextI>({
  mode: ModeThemeEnum.light,
  toggleTheme: () => {},
});

export const useToggleTheme = () => useContext(ToggleThemeContext);

const KEY_THEME = 'theme';
const ToggleThemeProvider = ({ children }: { children: any }) => {
  //! State
  const theme = (localStorage.getItem(KEY_THEME) as ModeThemeEnum) || ModeThemeEnum.light;
  const [mode, setMode] = useState(theme);

  //! Funtion
  const toggleTheme = useCallback(() => {
    setMode((prevMode) => {
      if (prevMode === ModeThemeEnum.light) {
        localStorage.setItem(KEY_THEME, ModeThemeEnum.dark);
        return ModeThemeEnum.dark;
      }

      localStorage.setItem(KEY_THEME, ModeThemeEnum.light);
      return ModeThemeEnum.light;
    });
  }, []);

  //! Render
  const value = useMemo(() => {
    return { mode, toggleTheme };
  }, [mode, toggleTheme]);

  return <ToggleThemeContext.Provider value={value}>{children}</ToggleThemeContext.Provider>;
};

export default ToggleThemeProvider;
