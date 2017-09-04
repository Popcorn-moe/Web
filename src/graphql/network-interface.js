import { HTTPFetchNetworkInterface, printAST } from 'apollo-client'

export class UploadHTTPFetchNetworkInterface extends HTTPFetchNetworkInterface {
  fetchFromRemoteEndpoint({ request, options }) {

    options.credentials = 'include'
    
    if (request.variables) {
      const files = Object.entries(request.variables).filter(([_, value]) => value instanceof File).map(([name, value]) => {
          delete request.variables[name]
          return [name, value]
      })

      if (files.length) {
          const formData = new FormData()
          formData.append('query', printAST(request.query))
          formData.append('variables', JSON.stringify(request.variables))
          files.forEach(([name, value]) => formData.append(name, value))

          options.headers = options.headers || {};
          options.headers['x-graphql-files'] =  files.map(([name]) => name).join(',')
          
          return fetch(this._uri, {
              method: 'POST',
              body: formData,
              ...options
          })
      }
    }

    return super.fetchFromRemoteEndpoint({ request, options })
  }
}

export function createNetworkInterface({ uri, opts = {} }) {
  return new UploadHTTPFetchNetworkInterface(uri, opts)
}