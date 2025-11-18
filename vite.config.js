import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Allow Emergent preview host as requested
    allowedHosts: ['eventbridge-25.preview.emergentagent.com']
  }
});