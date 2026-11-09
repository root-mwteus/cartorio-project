import nextConfig from 'eslint-config-next'

const eslintConfig = [
  {
    ignores: ['.agents/**', '.claude/**', '.next/**', 'node_modules/**'],
  },
  ...nextConfig,
]

export default eslintConfig
