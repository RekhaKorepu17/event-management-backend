import { registerUser } from "./register";
import User from "../../models/user";
import { Request, Response } from "express";

jest.mock("../../models/user", () => ({
  findOne: jest.fn(),
  create: jest.fn(),
}));

describe("registerUser", () => {
  let requestMock: Partial<Request>;
  let responseMock: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });

    requestMock = {
      body: {
        username: "Rekha",
        password: "rekha@01",
        email: "rekha@gmail.com",
        mobile: "1234567890",
        role: "User",
      },
    };

    responseMock = {
      status: statusMock,
      json: jsonMock,
    };

    jest.clearAllMocks();
  });

  it("should create a new user when email is unique", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);
    (User.create as jest.Mock).mockResolvedValue({ id: 1 });

    await registerUser(requestMock as Request, responseMock as Response);

    expect(User.findOne).toHaveBeenCalledTimes(1);
    expect(User.findOne).toHaveBeenCalledWith({ where: { email: "rekha@gmail.com" } });

    expect(User.create).toHaveBeenCalledWith(
      expect.objectContaining({
        username: "Rekha",
        password: expect.any(String),
        email: "rekha@gmail.com",
        mobile: "1234567890",
        role: "User",
      })
    );

    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "User account created",
      user: { id: 1 },
    });
  });

  it("should return an error when email already exists", async () => {
    (User.findOne as jest.Mock).mockResolvedValue({ email: "rekha@gmail.com" });

    await registerUser(requestMock as Request, responseMock as Response);

    expect(User.findOne).toHaveBeenCalledTimes(1);
    expect(User.findOne).toHaveBeenCalledWith({ where: { email: "rekha@gmail.com" } });

    expect(User.create).not.toHaveBeenCalled();
    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Email is already registered" });
  });

  it("should handle errors gracefully", async () => {
    (User.findOne as jest.Mock).mockRejectedValue(new Error("Database error"));

    await registerUser(requestMock as Request, responseMock as Response);

    expect(User.create).not.toHaveBeenCalled();
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Failed to create a user",
      error: "Database error",
    });
  });
});
