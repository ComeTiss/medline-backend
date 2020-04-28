import UserDao from "../../dao/UserDao";
import OrganizationDao from "../../dao/OrganizationDao";
import mockUser from "../../__tests__/mocks/mock_verified_user.json";

export default {
  async createTestUserIfNotExist() {
    if (process.env.NODE_ENV !== "development") {
      return;
    }
    if (!(await UserDao.findOneByEmail(mockUser.email))) {
      console.log("\n[DEV ONLY] Created verified user\n");
      const orgInput = { name: mockUser.organizationName, ...mockUser };
      const org = await OrganizationDao.create(orgInput);
      await UserDao.create({ ...mockUser, organizationId: org.id });
    }
    console.log("\n\n === Test user credentials ===");
    console.log({
      email: mockUser.email,
      password: mockUser.password,
    });
    console.log("\n");
  },
};
