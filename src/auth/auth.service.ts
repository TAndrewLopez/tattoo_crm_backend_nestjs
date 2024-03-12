import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { DatabaseService } from 'src/database/database.service';
import { AuthCredentialsDto } from './dto/authCredentials.dto';
import { IJwtPayload } from './interfaces/jwtPayload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  private async validateUserPassword(
    credentials: AuthCredentialsDto,
  ): Promise<string> {
    const { password, username } = credentials;
    const user = await this.prisma.user.findUnique({ where: { username } });

    if (!user) throw new UnauthorizedException('Invalid Credentials.');
    if (await bcrypt.compare(password, user.password)) return username;

    return null;
  }

  async signUp(credentials: AuthCredentialsDto): Promise<void> {
    const { password, username } = credentials;
    const salt = await bcrypt.genSalt();

    try {
      await this.prisma.user.create({
        data: {
          username,
          password: await this.hashPassword(password, salt),
          salt,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Username already exists.');
      }
      throw new InternalServerErrorException();
    }
  }

  async signIn(
    credentials: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const username = await this.validateUserPassword(credentials);
    if (!username) {
      throw new UnauthorizedException('Invalid Credentials.');
    }

    const payload: IJwtPayload = { username };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }
}
