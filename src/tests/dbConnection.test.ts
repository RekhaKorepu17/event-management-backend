import { sequelize, connectDB } from "../dbConnection";

jest.mock("sequelize", () => {
  return {
    Sequelize: jest.fn().mockImplementation(() => ({
      authenticate: jest.fn(),
    })),
  };
});

describe("connectDB", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return "Connection established" on success', async () => {
    const connect = sequelize.authenticate as jest.Mock;
    connect.mockResolvedValueOnce({});

    const mockConsole = jest.spyOn(console, "log").mockImplementation();

    await connectDB();

    expect(mockConsole).toHaveBeenCalledWith("Connection established");
    mockConsole.mockRestore();
  });

  it("should return connection error on failure", async () => {
    const authenticateMock = sequelize.authenticate as jest.Mock;
    authenticateMock.mockRejectedValueOnce(
      new Error("Failed to connect to db")
    );

    const consoleError = jest.spyOn(console, "error").mockImplementation();

    await connectDB();

    expect(consoleError).toHaveBeenCalledWith(
      "Error connecting to database:",
      expect.any(Error)
    );
    consoleError.mockRestore();
  });
});
