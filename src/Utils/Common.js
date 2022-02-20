  export const getToken = () => {
    return sessionStorage.getItem('accessToken') || null;
  }
   
  export const setUserSession = (token) => {
    sessionStorage.setItem('accessToken', token);
  }

  export const removeUserSession = () => {
    sessionStorage.removeItem('accessToken');
  }

  export const generateStarRating = (n) => {
    n = Math.round(n*10)
    let starRating = ""
    for(let i=1; i<=10; i++){
        starRating += (i <= n ? "★" : "☆")
    }
    return starRating
}

export const addToCart = (id) => {
  console.log("Added", id, "to cart")
}
