import * as bcrypt from "bcrypt";

export async function hash(password: string) {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  return passwordHash;
}
