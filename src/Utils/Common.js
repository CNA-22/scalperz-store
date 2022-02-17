  export const getToken = () => {
    return sessionStorage.getItem('accessToken') || null;
  }
   
  export const setUserSession = (token) => {
    sessionStorage.setItem('accessToken', token);
  }

  export const removeUserSession = () => {
    sessionStorage.removeItem('accessToken');
  }