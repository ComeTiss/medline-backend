import OrganizationDao from "../../dao/OrganizationDao";
import UserDao from "../../dao/UserDao";
import User from "../../db/models/User";

async function createOrganization(root, args) {
  const { authorId, organization } = args.request;
  const user: User = await UserDao.findOneById(authorId);
  if (!user || !user.verifiedAt) {
    throw new Error("Invalid authorId - Check that it matches a verified user.");
  }
  const org = await OrganizationDao.create(organization);
  UserDao.update({ id: authorId, organizationId: org.id });
  return org;
}

async function getOrganizationsWithOptions(root, args) {
  return OrganizationDao.getWithOptions(args.request);
}

const resolvers = {
  Mutation: {
    createOrganization,
  },
  Query: {
    getOrganizationsWithOptions,
  },
};

export default resolvers;
