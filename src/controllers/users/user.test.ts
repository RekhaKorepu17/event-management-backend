import { validateUser } from "./user";
import User from "../../models/user";
import { Request, Response } from "express";

jest.mock("../../models/user");

describe("validate User", () => {
  let requestMock: Partial<Request>;
  let responseMock: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({ json: jsonMock })) as any;

    requestMock = {
      query: {
        username: "Rekha",
        password: "rekha@01",
      },
    };

    responseMock = {
      status: statusMock,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should validate credentials when username and password are correct", async () => {
    (User.findOne as jest.Mock).mockResolvedValue({
      username: "Rekha",
      password: "rekha@01",
    });

    await validateUser(requestMock as Request, responseMock as Response);

    expect(User.findOne).toHaveBeenCalledWith({ where: { username: "Rekha" } });

    expect(statusMock).toHaveBeenCalledWith(201);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Valid credentials" });
  });

  it("should return username not found when the user is not found", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);

    await validateUser(requestMock as Request, responseMock as Response);

    expect(User.findOne).toHaveBeenCalledWith({ where: { username: "Rekha" } });

    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({ message: "User not found" });
  });

  it("should return an error when the password is incorrect", async () => {
    (User.findOne as jest.Mock).mockResolvedValue({
      username: "testuser",
      password: "WrongPassword@123",
    });

    await validateUser(requestMock as Request, responseMock as Response);

    expect(User.findOne).toHaveBeenCalledWith({ where: { username: "Rekha" } });

    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({ message: "Invalid password" });
  });

  it("should handle errors gracefully", async () => {
    (User.findOne as jest.Mock).mockRejectedValue(new Error("Database error"));

    const result = await validateUser(
      requestMock as Request,
      responseMock as Response
    );

    expect(result).toEqual({
      message: "Failed to fetch credentials",
      error: "Database error",
    });

    expect(statusMock).not.toHaveBeenCalled();
    expect(jsonMock).not.toHaveBeenCalled();
  });
});
