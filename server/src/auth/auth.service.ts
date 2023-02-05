import * as bcrypt from 'bcrypt';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Tokens } from './types/tokens.type';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  //h
  async getToken(userId: string, email: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: process.env.JWT_EXPIRATION_ACCESS_TOKEN,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: process.env.JWT_EXPIRATION_REFRESH_TOKEN,
        },
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  //h
  async updatedRtHash(userId: string, rt: string): Promise<boolean> {
    const hashed = await bcrypt.hash(rt, 10);
    await this.userService.update(userId, { hashedRt: hashed });
    return true;
  }

  async signup(payload: CreateUserDto) {
    const user = await this.userService.create(payload);
    if (!user) {
      throw new ForbiddenException(
        'ERROR_WHILE_CREATING_USER',
        'Can not create user',
      );
    }
    const tokens = await this.getToken(user._id, user.email);
    await this.updatedRtHash(user._id, tokens.refresh_token);
    return tokens;
  }

  async signin(payload: SigninDto): Promise<Tokens> {
    const getByEmail = await this.userService.getByEmail(payload.email);
    if (!getByEmail) {
      throw new ForbiddenException('EMAIL_NOT_FOUND', 'Access Denied');
    }

    const pwdMatched = await bcrypt.compare(
      payload.password,
      getByEmail.password,
    );
    if (!pwdMatched) {
      throw new ForbiddenException('PASSWORD_DOES_NOT_MATCH', 'Access Denied');
    }

    const tokens = await this.getToken(getByEmail._id, getByEmail.email);
    await this.updatedRtHash(getByEmail._id, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: string): Promise<boolean> {
    return await this.userService.removeRtToken(userId);
  }

  async refresh(userId: string, rt: string): Promise<Tokens> {
    const user = await this.userService.getByID(userId);
    if (!user || !user.hashedRt) {
      throw new ForbiddenException('USER_OR_TOKENS_NOT_FOUND', 'Access Denied');
    }

    const rtMatches = await bcrypt.compare(rt, user.hashedRt);
    if (!rtMatches) {
      throw new ForbiddenException('TOKENS_DO_NOT_MATCH', 'Access Denied');
    }

    const tokens = await this.getToken(user._id, user.email);
    await this.updatedRtHash(user._id, tokens.refresh_token);

    return tokens;
  }
}
