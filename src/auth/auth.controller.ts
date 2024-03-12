import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/authCredentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body(ValidationPipe) credentials: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(credentials);
  }

  @Post('sign-in')
  signIn(
    @Body(ValidationPipe) credentials: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(credentials);
  }
}
