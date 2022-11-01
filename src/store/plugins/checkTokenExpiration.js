export const hasTokenExpired = (token) => {
  // Decode JWT to json
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))

  // Compare expire date to "now", convert to seconds
  const date = new Date()
  const now = Math.floor(date.getTime() / 1000)
  const tokenExp = JSON.parse(jsonPayload).exp

  if (now > tokenExp) {
    return true
  }
  return false
}