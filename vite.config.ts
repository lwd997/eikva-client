import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        open: true,
        proxy: {
            '/auth': 'http://localhost:3000',
            '/groups': 'http://localhost:3000',
            '/test-cases': 'http://localhost:3000',
            '/steps': 'http://localhost:3000',
        },
    },
});
