/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const themeDefaults = {
  text: "#382808",
  container: "#f8ebd1",
  background: "#368DC5",
  icon: "#687076",

  forestPrimary: "#1E531B",
  forestSecondary: "#f2fff1ff",
  grassPrimary: "#5de251ff",
  grassSecondary: "#233122ff",
  stonePrimary: "#D3D3D3",
  stoneSecondary: "#525252ff",
  waterPrimary: "#00E5FF",
  waterSecondary: "#3977fdff",
};

const darkThemeDefaults: typeof themeDefaults = {
  text: "#e9bc63",
  container: "#9f7218",
  background: "#16384f",
  // background: '#0058AB',
  icon: "#9BA1A6",

  forestPrimary: "#1E531B",
  forestSecondary: "#f2fff1ff",
  grassPrimary: "#5de251ff",
  grassSecondary: "#233122ff",
  stonePrimary: "#D3D3D3",
  stoneSecondary: "#525252ff",
  waterPrimary: "#00E5FF",
  waterSecondary: "#3977fdff",
};

export const Colors = {
  light: themeDefaults,
  dark: darkThemeDefaults,
};
