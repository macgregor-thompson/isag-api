import { User } from '../../user/models/user.schema';

export class LoginResponse {
  user: User;
  access_token: string;
}
