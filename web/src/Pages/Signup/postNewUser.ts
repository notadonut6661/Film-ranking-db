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
    
    const fetchedSignupResponse = await signupResponse.json();

    if (!signupResponse.ok) {
      return String(fetchedSignupResponse?.ERROR);
    }

    return fetchedSignupResponse as object;
}
