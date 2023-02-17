import { User } from 'src/users/entities/user.entity';
import { Tokens } from './tokens.type';

export type SignInResponse = {
  user: User;
  tokens: Tokens;
};
