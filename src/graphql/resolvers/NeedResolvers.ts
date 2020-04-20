import NeedDao from "../../dao/NeedDao";

async function mutateNeed(obj, args, context) {
  const { id: userId } = context;
  const { request } = args;

  if (!request?.id) {
    return NeedDao.create(request, userId);
  }
  return NeedDao.update(request, userId);
}

async function getAllNeeds(root, args) {
  return { needs: NeedDao.getAllNeeds(args.request) };
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
