export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      // 取色器
      color: /(background|color|primary|secondary)$/i,
      date: /Date$/,
    },
  },
}