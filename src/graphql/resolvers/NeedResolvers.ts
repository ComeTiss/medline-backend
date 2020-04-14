import NeedDao from "../../dao/NeedDao";

async function mutateNeed(root, args) {
  const { request } = args;
  if (!request?.id) {
    return NeedDao.create(request);
  }
  return NeedDao.update(request);
}

async function getAllNeeds() {
  return NeedDao.getAllNeeds();
}

async function deleteNeedsByIds(root, args) {
  return NeedDao.deleteByIds(args.request);
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