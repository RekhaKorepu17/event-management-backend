import request from "supertest";
import express from "express";
import userRoutes from "../routes/user.routes";
import { UserAuthentication } from "../classes/UserAuthication";

jest.mock("../models/user", () => ({
  create: jest.fn(),
  findOne: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use("/users", userRoutes);

describe("User Routes", () => {
  describe("User Routes", () => {
    describe("post route for registering the user", () => {
      it("should register a user successfully and return 200", async () => {
        const user = {
          username: "Rekha",
          password: "rekha@01",
          email: "rekha@gmail.com",
          mobile: 9867543210,
        };

        const mockInstance = new UserAuthentication(user);

        mockInstance.register = jest
          .fn()
          .mockResolvedValue({ message: "User account created" });

        const response = await request(app)
          .post("/users/registerUser")
          .send({ user });

        console.log("Response Body:", response.body);

        expect(response.status).toBe(200);
      });
      
    });
  });

  describe("get route for fetching the credentials", () => {
    it("should return 200 if user credentials are valid", async () => {
      const username = "Rekha";
      const password = "rekha@01";

      const mockGetCredentials = jest.spyOn(
        UserAuthentication,
        "getCredendentials"
      );
      mockGetCredentials.mockResolvedValueOnce({ message: "User found" });

      const response = await request(app)
        .get("/users/getCredentials")
        .query({ username, password });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("User found");
      expect(mockGetCredentials).toHaveBeenCalledTimes(1);
    });

    it("should return 404 if user is not found", async () => {
      const username = "InvalidUser";
      const password = "123";

      const mockGetCredentials = jest.spyOn(
        UserAuthentication,
        "getCredendentials"
      );
      mockGetCredentials.mockResolvedValueOnce({ message: "User not found" });

      const response = await request(app)
        .get("/users/getCredentials")
        .query({ username, password });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("User not found");
    });

    it("should return 404 if password is invalid", async () => {
      const username = "Rekha";
      const password = "wrongPassword";

      const mockGetCredentials = jest.spyOn(
        UserAuthentication,
        "getCredendentials"
      );
      mockGetCredentials.mockResolvedValueOnce({ message: "Invalid password" });

      const response = await request(app)
        .get("/users/getCredentials")
        .query({ username, password });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Invalid password");
    });

    it("should return 500 on server error", async () => {
      const username = "Rekha";
      const password = "rekha@01";

      const mockGetCredentials = jest.spyOn(
        UserAuthentication,
        "getCredendentials"
      );
      mockGetCredentials.mockRejectedValueOnce(
        new Error("Failed to retrieve credentials")
      );

      const response = await request(app)
        .get("/users/getCredentials")
        .query({ username, password });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Failed to create a user");
    });
  });
});
