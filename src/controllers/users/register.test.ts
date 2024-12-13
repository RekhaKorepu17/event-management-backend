import { registerUser } from "./register";
import User from "../../models/user";
import { User as UserClass } from "../../services/User";
import { Request, Response } from "express";

jest.mock("../../models/user");

describe("registerUser", () => {
  let requestMock: Partial<Request>;
  let responseMock: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({ json: jsonMock })) as any;

    requestMock = {
      body: {
        username: "Rekha",
        password: "rekha@01",
        email: "rekha@gmail.com",
        mobile: "1234567890",
        isAdmin: "User",
      },
    };

    responseMock = {
      status: statusMock,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user when username is unique", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);
    (User.create as jest.Mock).mockResolvedValue({});

    await registerUser(requestMock as Request, responseMock as Response);
    expect(User.findOne).toHaveBeenCalledWith({ where: { username: "Rekha" } });

    expect(User.create).toHaveBeenCalledWith(
      expect.objectContaining({
        username: "Rekha",
        password: "rekha@01",
        email: "rekha@gmail.com",
        mobile: "1234567890",
        isAdmin: "User",
      })
    );

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ message: "User account created" });
  });

  it("should return an error when username already exists", async () => {
    (User.findOne as jest.Mock).mockResolvedValue({ username: "Rekha" });

    await registerUser(requestMock as Request, responseMock as Response);
    expect(User.findOne).toHaveBeenCalledWith({ where: { username: "Rekha" } });
    expect(User.create).not.toHaveBeenCalled();
    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({
      message: "Username already exists",
    });
  });

  it("should throw error in case of any errors", async () => {
    (User.findOne as jest.Mock).mockRejectedValue(
      new Error("Failed to create user")
    );
    const result = await registerUser(
      requestMock as Request,
      responseMock as Response
    );
    expect(result).toEqual({
      message: "Failed to create a user",
      error: "Failed to create user",
    });
    expect(User.create).not.toHaveBeenCalled();
  });
});
