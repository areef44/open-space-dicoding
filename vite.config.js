import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom'
	},
	e2e: {
		setupNodeEvent(on,config) {

		},
		video: false
	}
})
