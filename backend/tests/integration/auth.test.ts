import request from "supertest";
import { PrismaClient } from "@prisma/client";

import app from "../../src/server";

const prisma = new PrismaClient();

describe("Authentication Endpoints", () => {
  beforeAll(async () => {
    // Clean database
    await prisma.message.deleteMany();
    await prisma.match.deleteMany();
    await prisma.matchRequest.deleteMany();
    await prisma.userSkill.deleteMany();
    await prisma.skill.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("POST /auth/signup", () => {
    it("should create a new user with valid credentials", async () => {
      const response = await request(app)
        .post("/auth/signup")
        .send({
          email: "test@example.com",
          password: "password123",
          name: "Test User",
        })
        .expect(201);

      expect(response.body).toHaveProperty("token");
      expect(response.body).toHaveProperty("user");
      expect(response.body.user).toHaveProperty("id");
      expect(response.body.user).toHaveProperty("email", "test@example.com");
      expect(response.body.user).toHaveProperty("name", "Test User");
      expect(response.body.user).not.toHaveProperty("password_hash");
    });

    it("should return 400 for invalid email", async () => {
      await request(app)
        .post("/auth/signup")
        .send({
          email: "invalid-email",
          password: "password123",
          name: "Test User",
        })
        .expect(400);
    });

    it("should return 400 for short password", async () => {
      await request(app)
        .post("/auth/signup")
        .send({
          email: "test2@example.com",
          password: "123",
          name: "Test User",
        })
        .expect(400);
    });

    it("should return 400 for missing name", async () => {
      await request(app)
        .post("/auth/signup")
        .send({
          email: "test3@example.com",
          password: "password123",
        })
        .expect(400);
    });

    it("should return 400 for duplicate email", async () => {
      // Create first user
      await request(app).post("/auth/signup").send({
        email: "duplicate@example.com",
        password: "password123",
        name: "First User",
      });

      // Try to create second user with same email
      const response = await request(app)
        .post("/auth/signup")
        .send({
          email: "duplicate@example.com",
          password: "password123",
          name: "Second User",
        })
        .expect(400);

      expect(response.body).toHaveProperty("error", "User already exists");
    });
  });

  describe("POST /auth/login", () => {
    beforeEach(async () => {
      // Create a user for login tests
      await request(app).post("/auth/signup").send({
        email: "login@example.com",
        password: "password123",
        name: "Login Test User",
      });
    });

    it("should login with valid credentials", async () => {
      const response = await request(app)
        .post("/auth/login")
        .send({
          email: "login@example.com",
          password: "password123",
        })
        .expect(200);

      expect(response.body).toHaveProperty("token");
      expect(response.body).toHaveProperty("message", "Login successful");
      expect(response.body).toHaveProperty("user");
      expect(response.body.user).toHaveProperty("email", "login@example.com");
    });

    it("should return 401 for invalid email", async () => {
      const response = await request(app)
        .post("/auth/login")
        .send({
          email: "nonexistent@example.com",
          password: "password123",
        })
        .expect(401);

      expect(response.body).toHaveProperty("error", "Invalid credentials");
    });

    it("should return 401 for invalid password", async () => {
      const response = await request(app)
        .post("/auth/login")
        .send({
          email: "login@example.com",
          password: "wrongpassword",
        })
        .expect(401);

      expect(response.body).toHaveProperty("error", "Invalid credentials");
    });

    it("should return 400 for invalid email format", async () => {
      await request(app)
        .post("/auth/login")
        .send({
          email: "invalid-email",
          password: "password123",
        })
        .expect(400);
    });
  });

  describe("JWT Token Validation", () => {
    let authToken: string;

    beforeEach(async () => {
      const response = await request(app).post("/auth/signup").send({
        email: "jwttest@example.com",
        password: "password123",
        name: "JWT Test User",
      });
      authToken = response.body.token;
    });

    it("should access protected route with valid token", async () => {
      const response = await request(app)
        .get("/users/me")
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty("email", "jwttest@example.com");
    });

    it("should return 401 without token", async () => {
      const response = await request(app).get("/users/me").expect(401);

      expect(response.body).toHaveProperty("error", "Access token required");
    });

    it("should return 403 with invalid token", async () => {
      const response = await request(app)
        .get("/users/me")
        .set("Authorization", "Bearer invalid-token")
        .expect(403);

      expect(response.body).toHaveProperty("error", "Invalid or expired token");
    });
  });
});
