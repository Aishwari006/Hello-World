export const login = (username: string, password: string): boolean => {
  if (username === "admin" && password === "admin123") {
    localStorage.setItem("isAuth", "true");
    return true;
  }
  return false;
};

export const logout = (): void => {
  localStorage.removeItem("isAuth");
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem("isAuth") === "true";
};