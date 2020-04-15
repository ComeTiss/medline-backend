import LeadDao from "../../dao/LeadDao";

async function mutateLead(root, args) {
  const { request } = args;
  if (!request?.id) {
    return LeadDao.create(request);
  }
  return LeadDao.update(request);
}

async function getAllLeads(root, args) {
  return LeadDao.getAllLeads(args.request);
}

async function deleteLeadsByIds(root, args) {
  return LeadDao.deleteByIds(args.request);
}


const resolvers = {
  Mutation: {
    mutateLead,
    deleteLeadsByIds,
  },
  Query: {
    getAllLeads,
  },
};

export default resolvers;
