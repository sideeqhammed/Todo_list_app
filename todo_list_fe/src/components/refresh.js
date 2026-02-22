
const refreshAccessToken = async() => {
  const refresh = localStorage.getItem("refresh")
  // console.log(refresh)
  if (!refresh) {
    console.log("No refresh token found")
    return null
  }
  try{
    const response = await fetch('http://localhost:8000/todo/token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refresh })
    })
    if (response.ok) {
      const data = await response.json()
      localStorage.setItem("access", data.access)
      return data.access
    } else {
      console.log("Failed to refresh token")
      return null
    }
  } catch (error) {
    console.error("Error refreshing access token:", error)
    return null
  }
}
  
export const fetchWithAuth = async(url, options = {}) => {
  try {
    const token = localStorage.getItem("access")

    let response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers || {},
        Authorization : `Bearer ${token}`,
      }
    })

    if (response.status === 401){
      const newToken = await refreshAccessToken()
      if(!newToken) {
        window.location.href = "/login"
        throw new Error("Not Authorized")
      }

      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers || {},
          Authorization: `Bearer ${newToken}`,
        }
      })
    }
    return response
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}