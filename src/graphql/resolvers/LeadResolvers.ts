import LeadDao from "../../dao/LeadDao";

async function mutateLead(root, args, context) {
  const { id: userId } = context;
  const { request } = args;

  if (!request?.id) {
    return LeadDao.create(request, userId);
  }
  return LeadDao.update(request, userId);
}

async function getAllLeads(root, args) {
  return LeadDao.getAllLeads(args.request);
}

async function deleteLeadsByIds(root, args, context) {
  const authorId = context?.id;
  const leadsIds = args.request.ids;
  return LeadDao.deleteByIds(leadsIds, authorId);
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
