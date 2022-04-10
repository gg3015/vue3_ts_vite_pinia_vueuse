import { MockHandler } from 'vite-plugin-mock-server'

export default (): MockHandler[] => [
  {
    pattern: '/api/test',
    handle: (req, res) => {
      res.end('hello useFetch: ' + req.url)
    },
  },
]
