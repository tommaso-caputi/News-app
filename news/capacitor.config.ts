import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.newsapp',
  appName: 'News',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
