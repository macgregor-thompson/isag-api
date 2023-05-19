import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { LoginError } from './models/login-error';
import { CreateUserDto } from '../user/models/create-user.dto';
import { User } from '../user/models/user.schema';
import { LoginResponse } from './models/login-response';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    if (!username || !password)
      throw new UnauthorizedException(LoginError.BAD_REQUEST);

    const user: User = await this.usersService.findOne(username);

    const match = compareSync(password, user.password);

    if (!user || !match)
      throw new UnauthorizedException(LoginError.UNAUTHORIZED);

    return user;
  }

  async login(user: User): Promise<LoginResponse> {
    delete user.username;
    delete user.password;
    return {
      user,
      access_token: this.jwtService.sign(user),
    };
  }

  async signUp(creteUserDto: CreateUserDto): Promise<LoginResponse> {
    creteUserDto.password = hashSync(creteUserDto.password, genSaltSync());
    await this.usersService.create(creteUserDto);
    const user: User = await this.usersService.findOne(creteUserDto.username);
    return this.login(user);
  }
}
