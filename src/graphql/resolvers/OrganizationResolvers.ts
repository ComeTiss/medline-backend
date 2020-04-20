import OrganizationDao from "../../dao/OrganizationDao";
import UserDao from "../../dao/UserDao";

async function createOrganization(root, args, context) {
  const { organization } = args.request;
  const { id: userId } = context;
  const org = await OrganizationDao.create(organization);
  UserDao.update({ organizationId: org.id }, userId);
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
