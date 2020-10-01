import { Body, Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { User } from './models/user.schema';
import { UpdateUserDto } from './models/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  //@UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id, @Body() update: UpdateUserDto): Promise<User> {
    return this.userService.update(id, update);
  }

}
