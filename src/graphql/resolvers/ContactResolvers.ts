import ContactDao from "../../dao/ContactDao";

async function mutateContact(root, args, context) {
  const { id: userId } = context;
  const { request } = args;

  if (!request?.id) {
    return ContactDao.create(request, userId);
  }
  return ContactDao.update(request, userId);
}

async function getContactsWithOptions(root, args) {
  return ContactDao.getWithOptions(args.request);
}

async function deleteContactsByIds(root, args, context) {
  const userId = context?.id;
  const contactsIds = args.request.ids;
  return ContactDao.deleteByIds(contactsIds, userId);
}

const resolvers = {
  Mutation: {
    mutateContact,
    deleteContactsByIds,
  },
  Query: {
    getContactsWithOptions,
  },
};

export default resolvers;
