class TokenStorage {
  set(token: string) {
    localStorage.setItem("@easycom/token", token);
  }

  get() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("@easycom/token");
  }

  clear() {
    localStorage.removeItem("@easycom/token");
  }
}

export const tokenStorage = new TokenStorage();
