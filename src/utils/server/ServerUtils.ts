import UserDao from "../../dao/UserDao";
import mockUser from "../../__tests__/mocks/mock_verified_user.json";

export default {
  async createTestUserIfNotExist() {
    if (process.env.NODE_ENV !== "development") {
      return;
    }
    if (await UserDao.findOneByEmail(mockUser.email)) {
      return;
    }
    await UserDao.create(mockUser);
    console.log("\n[DEV ONLY] Created verified user\n");
  },
};
