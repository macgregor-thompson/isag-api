import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { LoginError } from './models/login-error';
import { CreateUserDto } from '../user/models/create-user.dto';
import { User } from '../user/models/user.schema';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService,
              private jwtService: JwtService) {}

  async validateUser(username: string, password: string) {
    if (!username || !password) throw new UnauthorizedException(LoginError.BAD_REQUEST);

    const user: User = await this.usersService.findOne(username);

    const match = compareSync(password, user.password);

    if (!user || !match) throw new UnauthorizedException(LoginError.UNAUTHORIZED);

    delete user.username;
    delete user.password;
    return user;
  }

  async login(user: User) {
    return {
      user,
      access_token: this.jwtService.sign(user),
    };
  }


  async signUp(creteUserDto: CreateUserDto) {
    return hashSync(creteUserDto.password, genSaltSync())

   // const user = await this.usersService.create(creteUserDto);
   // return user;
  }
}
