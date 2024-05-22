import { authenticate } from "./authenticate";
import { registerUser } from "./registerUser";

export const authService = {
  register: registerUser,
  authenticate,
};
