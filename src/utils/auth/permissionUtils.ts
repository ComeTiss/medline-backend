export default {
  isAuthorIdValid(authorId: number, context) {
    if (context == null || authorId == null) {
      return false;
    }
    const { id: userId, isAdmin } = context;
    return isAdmin || userId === authorId;
  },
};

export const INVALID_AUTHOR_MESSAGE = "Forbidden request - user not allowed to request on other users records";
