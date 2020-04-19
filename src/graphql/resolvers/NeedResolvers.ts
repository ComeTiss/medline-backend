import NeedDao from "../../dao/NeedDao";
import permissionUtils, { INVALID_AUTHOR_MESSAGE } from "../../utils/auth/permissionUtils";

async function mutateNeed(obj, args, context) {
  const { request } = args;
  const needAuthorId = +request?.authorId;
  if (!permissionUtils.isAuthorIdValid(needAuthorId, context)) {
    throw new Error(INVALID_AUTHOR_MESSAGE);
  }
  if (!request?.id) {
    return NeedDao.create(request);
  }
  return NeedDao.update(request);
}

async function getAllNeeds(root, args) {
  return NeedDao.getAllNeeds(args.request);
}

async function deleteNeedsByIds(root, args, context) {
  const authorId = context?.id;
  const needsIds = args.request.ids;
  return NeedDao.deleteByIds(needsIds, authorId);
}


const resolvers = {
  Mutation: {
    mutateNeed,
    deleteNeedsByIds,
  },
  Query: {
    getAllNeeds,
  },
};

export default resolvers;
