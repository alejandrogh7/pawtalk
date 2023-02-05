import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RtGuard } from './guards/rt-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Tokens } from './types/tokens.type';
import { SigninDto } from './dto/signin.dto';
import { GetCurrentUserID } from './decorators/get-current-user.decorator-id';
import { GetCurrentUser } from './decorators/get-current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() payload: CreateUserDto): Promise<Tokens> {
    return this.authService.signup(payload);
  }

  @Post('/signin')
  signin(@Body() payload: SigninDto): Promise<Tokens> {
    return this.authService.signin(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  logout(@GetCurrentUserID() id: string): Promise<boolean> {
    return this.authService.logout(id);
  }

  @UseGuards(RtGuard)
  @Post('/refresh')
  refresh(
    @GetCurrentUserID() id: string,
    @GetCurrentUser('refreshToken') rt: string,
  ) {
    return this.authService.refresh(id, rt);
  }
}
