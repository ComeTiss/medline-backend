import OrganizationDao from "../../dao/OrganizationDao";

async function getOrganizationsWithOptions(root, args) {
  return OrganizationDao.getWithOptions(args.request);
}

async function mutateOrganization(obj, args, context) {
  const { organizationId } = context;
  const { request } = args;

  if (organizationId !== Number(request.id)) throw new Error("Organization does not match user profile");

  return OrganizationDao.update(request);
}

const resolvers = {
  Query: {
    getOrganizationsWithOptions,
  },
  Mutation: {
    mutateOrganization,
  },
};

export default resolvers;
