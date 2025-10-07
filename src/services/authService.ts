import { apiClient } from "./apiClient";

export const authService = {
  login: async (email: string, password: string) =>
    apiClient("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  verifyUser: async (email: string, token: string) =>
    apiClient("/auth/verify_user", {
      method: "POST",
      body: JSON.stringify({ email, token }),
    }),

  resendVerificationCode: async (email: string) =>
    apiClient("/auth/resend_verification_code", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),
};
