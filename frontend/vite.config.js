import ReactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default {
  plugins: [ReactRefresh()],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
}
