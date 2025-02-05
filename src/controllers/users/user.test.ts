import { validateUser } from "./user";
import User from "../../models/user";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

jest.mock("../../models/user", () => ({
  findOne: jest.fn(),
}));

jest.mock("bcrypt", () => ({
  compare: jest.fn(),
}));

describe("validateUser", () => {
  let requestMock: Partial<Request>;
  let responseMock: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });

    requestMock = {
      body: {
        email: "rekha@gmail.com",
        password: "rekha@01",
      },
    };

    responseMock = {
      status: statusMock,
      json: jsonMock,
    };

    jest.clearAllMocks();
  });

  it("should validate credentials when email and password are correct", async () => {
    (User.findOne as jest.Mock).mockResolvedValue({
      email: "rekha@gmail.com",
      password: "hashed_password",
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    await validateUser(requestMock as Request, responseMock as Response);

    expect(User.findOne).toHaveBeenCalledWith({
      where: { email: "rekha@gmail.com" },
    });

    expect(bcrypt.compare).toHaveBeenCalledWith(
      "rekha@01",
      "hashed_password"
    );

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Valid credentials",
      user: expect.any(Object),
    });
  });

  it("should return 'email not found' when the user is not found", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);

    await validateUser(requestMock as Request, responseMock as Response);

    expect(User.findOne).toHaveBeenCalledWith({
      where: { email: "rekha@gmail.com" },
    });

    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({ message: "email not found" });
  });

  it("should return 'Invalid password' when the password is incorrect", async () => {
    (User.findOne as jest.Mock).mockResolvedValue({
      email: "rekha@gmail.com",
      password: "hashed_password",
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await validateUser(requestMock as Request, responseMock as Response);

    expect(User.findOne).toHaveBeenCalledWith({
      where: { email: "rekha@gmail.com" },
    });

    expect(bcrypt.compare).toHaveBeenCalledWith(
      "rekha@01",
      "hashed_password"
    );

    expect(statusMock).toHaveBeenCalledWith(401);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Invalid password" });
  });

  it("should handle errors gracefully", async () => {
    (User.findOne as jest.Mock).mockRejectedValue(new Error("Database error"));

    await validateUser(requestMock as Request, responseMock as Response);

    expect(statusMock).not.toHaveBeenCalled(); 
    expect(jsonMock).not.toHaveBeenCalled();
  });
});
