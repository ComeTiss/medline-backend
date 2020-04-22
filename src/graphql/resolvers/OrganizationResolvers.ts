import OrganizationDao from "../../dao/OrganizationDao";

async function getOrganizationsWithOptions(root, args) {
  return OrganizationDao.getWithOptions(args.request);
}

const resolvers = {
  Query: {
    getOrganizationsWithOptions,
  },
};

export default resolvers;
