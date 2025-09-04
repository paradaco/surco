import { Colors } from '@/constants/Colors';
import { ThemeContext } from '@react-navigation/native';
import { useContext } from 'react';

export function useTheme() {
  const theme = useContext(ThemeContext);
  const colorScheme = theme?.dark ? Colors.dark : Colors.light;

  return { ...theme, colors: { ...theme?.colors,  ...colorScheme } };
}
