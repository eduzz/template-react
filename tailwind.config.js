import createTheme from '@eduzz/ui-tailwind-theme';

export default createTheme({
  content: ['./src/**/*.{ts,tsx}'],
  corePlugins: {
    preflight: false
  }
});
