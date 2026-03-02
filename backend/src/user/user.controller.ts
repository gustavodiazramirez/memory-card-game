import { Controller, Post, Body, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { SessionService } from '../session/session.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
  ) {}

  /**
   * Registra un nuevo usuario
   * @param createUserDto - Username y password
   * @returns Usuario creado (sin contraseña)
   */
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.register(createUserDto);

    return {
      message: 'Usuario registrado exitosamente',
      user,
    };
  }

  /**
   * Inicia sesión con username y password
   * @param loginUserDto - Credenciales del usuario
   * @returns Tokens de acceso y usuario
   */
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Request() req: any) {
    const user = await this.userService.validateUser(loginUserDto);
    const session = await this.sessionService.createSession(user, req.headers['user-agent'], req.ip);
    const { password, ...userWithoutPassword } = user;

    return {
      message: 'Login exitoso',
      user: userWithoutPassword,
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
    };
  }
}