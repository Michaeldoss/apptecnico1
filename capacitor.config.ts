
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.f4bbe0c8b3f0447f916855f9a39cfcf9',
  appName: 'apptecnico1',
  webDir: 'dist',
  server: {
    url: 'https://f4bbe0c8-b3f0-447f-9168-55f9a39cfcf9.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: "#ffffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP"
    }
  }
};

export default config;
