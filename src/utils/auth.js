import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  const user =JSON.parse(window.sessionStorage.getItem("user"));
  if(user){
    return user.token
  }else{
  return
  }
 
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return window.sessionStorage.removeItem("user");
}
