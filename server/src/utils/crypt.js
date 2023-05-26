import bcrypt from "bcrypt";

const saltRounds = 10;

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

//paswords hashed manually
// hashPassword("Kacius123");
// hashPassword("Pelius123");

export const comparePassword = async (password, hash) => {
  try {
    const res = await bcrypt.compare(password, hash);
    return res;
  } catch (e) {
    return false;
  }
};
