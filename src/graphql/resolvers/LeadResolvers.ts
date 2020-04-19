import LeadDao from "../../dao/LeadDao";
import permissionUtils, { INVALID_AUTHOR_MESSAGE }
  from "../../utils/auth/permissionUtils";

async function mutateLead(root, args, context) {
  const { request } = args;
  const needAuthorId = +request?.authorId;
  if (!permissionUtils.isAuthorIdValid(needAuthorId, context)) {
    throw new Error(INVALID_AUTHOR_MESSAGE);
  }
  if (!request?.id) {
    return LeadDao.create(request);
  }
  return LeadDao.update(request);
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
