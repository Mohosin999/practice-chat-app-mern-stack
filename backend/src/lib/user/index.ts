import User from "../../model/User";

export const findByUserService = async (userId: string) => {
  return await User.findById(userId);
};

// Get all users except current user
export const getUsersService = async (userId: string) => {
  const users = await User.find({ _id: { $ne: userId } }).select("-password");

  return users;
};

/**
 * --------------------------------------------
 * Find user by email
 * --------------------------------------------
 */
export const findUserByEmail = async (email: string) => {
  const user = await User.findOne({ email });
  return user ? user : null;
};
