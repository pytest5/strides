export const fakeAuthProvider = {
  isAuthenticated: false,
  username: null,
  async signin(name) {
    await new Promise((resolve) => {
      setTimeout(() => resolve("hi"), 1500);
      fakeAuthProvider.isAuthenticated = true;
      fakeAuthProvider.username = name;
    });
    return fakeAuthProvider;
  },
  async signout() {
    await new Promise((res) => {
      setTimeout(res("signout"), 1500);
      fakeAuthProvider.isAuthenticated = false;
      fakeAuthProvider.username = null;
    });
  },
};
