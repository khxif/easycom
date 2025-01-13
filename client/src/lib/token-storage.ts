class TokenStorage {
  set(token: string) {
    localStorage.setItem("@easycom/token", token);
  }

  get() {
    return localStorage.getItem("@easycom/token");
  }

  clear() {
    localStorage.removeItem("@easycom/token");
  }
}

export const tokenStorage = new TokenStorage();