interface UserData {
  nickname: string;
  email: string;
  password: string;
  confirmedPassword: string;
}

export default async function postNewUser(user: UserData): Promise<string | object> {
  return "";
}
