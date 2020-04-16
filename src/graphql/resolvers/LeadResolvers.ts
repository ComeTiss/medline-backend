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

async function deleteLeads(root, args) {
  return LeadDao.deleteByIds(args.request.ids);
}


const resolvers = {
  Mutation: {
    mutateLead,
    deleteLeads,
  },
  Query: {
    getAllLeads,
  },
};

export default resolvers;
