// src/components/mockApi.js
// Simulate a registration endpoint with promise-based interface.
// For testing, email 'error@example.com' will reject to simulate server error.

export function registerUserApi(user) {
  return new Promise((resolve, reject) => {
    // simulate network latency
    setTimeout(() => {
      // simulate server-side validation: if email is error@example.com -> fail
      if (user.email && user.email.toLowerCase() === "error@example.com") {
        reject({ message: "This email is already registered." });
        return;
      }

      // otherwise succeed and return created user id
      resolve({
        id: Date.now(),
        username: user.username,
        email: user.email,
      });
    }, 900); // 900ms delay
  });
}
