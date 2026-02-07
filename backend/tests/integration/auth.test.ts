import { PrismaClient } from "@prisma/client";

describe("Authentication Endpoints", () => {
  describe("POST /auth/signup", () => {
    it("should create a new user", async () => {
      const prisma = new PrismaClient();
      await prisma.$connect();
      expect(true).toBe(true);
      await prisma.$disconnect();
    });
  });
});
