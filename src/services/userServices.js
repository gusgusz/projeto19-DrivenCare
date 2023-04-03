import userRepositories from "../repositories/userRepositories.js";
import bcrypt from "bcrypt";
import errors from "../errors/index.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

async function signUp({name,email,password,isDoctor}){
    const {rowCount } = userRepositories.findByEmail(email);

    if(rowCount) throw new errors.duplicatedEmailError(email);

    const hashPassword = await bcrypt.hash(password, 15);

    await userRepositories.signUp({name,email,password: hashPassword,isDoctor});
    
}

async function signUpDoctor({name, email, password, isDoctor, specialty}){
    const {rowCount } = userRepositories.findByEmail(email);

    if(rowCount) throw new errors.duplicatedEmailError(email);

    const hashPassword = await bcrypt.hash(password, 15);

    await userRepositories.signUp({name,email,password: hashPassword,isDoctor, specialty});
}

async function signIn({email, password}){

 const {
    rowCount,
    rows: [user],
  } = await userRepositories.findByEmail(email);
  if (!rowCount) throw errors.invalidCredentialsError();

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw errors.invalidCredentialsError();

  const token = jwt.sign({ userId: user.id }, process.env.SECRET_JWT)
 

  return token;
}

export default {
  signUp,
  signUpDoctor,
  signIn,
};