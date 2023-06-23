import { StatusCodes } from 'http-status-codes';
import config from '../../data/Json/config.json';

interface UserData {
  nickname: string;
  email: string;
  password: string;
  confirmedPassword: string;
}

export default async function postNewUser(user: UserData): Promise<string | object> {
  if(user.password !== user.confirmedPassword) {
    return "Passwords do not match";
  }

  const signupResponse = await fetch(`${config.server_url}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nickname: user.nickname,
      email: user.email,
      password: user.password,
    })});
    
    if(signupResponse.status === StatusCodes.NOT_ACCEPTABLE) {
      throw new Error("");
    }

  return "";
}
