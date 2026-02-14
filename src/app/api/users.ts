import apiClient from "./client";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  profile_completion: number;
  offeredSkills: UserSkill[];
  wantedSkills: UserSkill[];
}

export interface UserSkill {
  id: string;
  skill_id: string;
  name: string;
  skill_type: "offer" | "want";
  proficiency_level: "beginner" | "intermediate" | "expert";
  category?: string;
}

export interface UpdateProfileData {
  name?: string;
  avatar?: string;
}

export const usersApi = {
  getMe: async (): Promise<UserProfile> => {
    const response = await apiClient.get("/users/me");
    return response.data;
  },

  updateMe: async (data: UpdateProfileData): Promise<UserProfile> => {
    const response = await apiClient.put("/users/me", data);
    return response.data;
  },
};

export default usersApi;
