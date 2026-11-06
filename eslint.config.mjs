import nextConfig from 'eslint-config-next'

const eslintConfig = [
  {
    ignores: ['.agents/**', '.next/**', 'node_modules/**'],
  },
  ...nextConfig,
]

export default eslintConfig
