import request from "supertest";
import { PrismaClient } from "@prisma/client";

import app from "../../src/server";

const prisma = new PrismaClient();

describe("User Profile Endpoints", () => {
  let authToken: string;
  let userId: string;

  beforeAll(async () => {
    // Clean database
    await prisma.message.deleteMany();
    await prisma.match.deleteMany();
    await prisma.matchRequest.deleteMany();
    await prisma.userSkill.deleteMany();
    await prisma.skill.deleteMany();
    await prisma.user.deleteMany();

    // Create test user
    const signupResponse = await request(app).post("/auth/signup").send({
      email: "testuser@example.com",
      password: "password123",
      name: "Test User",
    });

    authToken = signupResponse.body.token;
    userId = signupResponse.body.user.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("GET /users/me", () => {
    it("should return current user profile", async () => {
      const response = await request(app)
        .get("/users/me")
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty("id", userId);
      expect(response.body).toHaveProperty("email", "testuser@example.com");
      expect(response.body).toHaveProperty("name", "Test User");
    });

    it("should return 401 without authentication", async () => {
      await request(app).get("/users/me").expect(401);
    });
  });

  describe("PUT /users/me", () => {
    it("should update user profile", async () => {
      const updateData = {
        name: "Updated Name",
        avatar: "https://example.com/avatar.jpg",
      };

      const response = await request(app)
        .put("/users/me")
        .set("Authorization", `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.user).toHaveProperty("name", "Updated Name");
      expect(response.body.user).toHaveProperty(
        "avatar",
        "https://example.com/avatar.jpg",
      );
    });

    it("should return 401 without authentication", async () => {
      await request(app)
        .put("/users/me")
        .send({ name: "New Name" })
        .expect(401);
    });
  });
});
