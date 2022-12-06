const methodActions = {
  "get": (url, acceptedResources) => {
    return new Proxy({}, {
      get: (_target, resource) => {

        return async ({id = "", queryParams} = {}) => {
          if(!acceptedResources.includes(resource)) 
            return Promise.reject({error: `Resource "${resource}" is not accepted`})
    
          const queryString = 
            queryParams ? `?${new URLSearchParams(queryParams).toString()}` : ""
    
          const response = await globalThis.fetch(`${url}/${resource}/${id}${queryString}`)
          
          if(!response.ok) {
            return Promise.reject({error: `Something went wrong with "${resource}" resource`})
          }
          
          return await response.json()
        }
      }
    })
  },
  "post": () => {
    return new Proxy({}, {
      get: (_target, _resource) => {
        return ({data} = {}) => {
          return `${data} -> from proxy`
        }
      }
    })
  }
}

const ALLOWED_METHODS = Object.keys(methodActions);

export const createAPI = (url = "", acceptedResources = []) => {
  return new Proxy({}, {
    get: (_target, method) => {
      if(!ALLOWED_METHODS.includes(method)) 
        return Promise.reject({error: `The ${method} method is not accepted`})
      
      return methodActions[method](url, acceptedResources)
    }
  })
}