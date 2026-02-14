import apiClient from "./client";

export interface Skill {
  id: string;
  name: string;
  category?: string;
}

export interface AddSkillData {
  skill_id: string;
  skill_type: "offer" | "want";
  proficiency_level: "beginner" | "intermediate" | "expert";
}

export const skillsApi = {
  getAll: async (): Promise<Skill[]> => {
    const response = await apiClient.get("/skills");
    return response.data;
  },

  addToProfile: async (data: AddSkillData): Promise<void> => {
    await apiClient.post("/users/me/skills", data);
  },

  removeFromProfile: async (skillId: string): Promise<void> => {
    await apiClient.delete(`/users/me/skills/${skillId}`);
  },
};

export default skillsApi;
