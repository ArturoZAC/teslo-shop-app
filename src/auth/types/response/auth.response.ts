import type { User } from "@/types/interfaces/user.interface";

export interface AuthResponse {
  user: User;
  token: string;
}
