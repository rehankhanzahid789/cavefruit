import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ──────────────────────────────────────────────────────────────
//  CHANGE THIS to your GitHub repository name (exact spelling).
//  Site will live at https://<username>.github.io/<REPO_NAME>/
//  (Use '' for a user/organisation site served from the root.)
// ──────────────────────────────────────────────────────────────
const REPO_NAME = 'cravefruit';

export default defineConfig({
  base: process.env.VITE_BASE ?? (REPO_NAME ? `/${REPO_NAME}/` : '/'),
  plugins: [react()],
  build: { chunkSizeWarningLimit: 700 },
});
