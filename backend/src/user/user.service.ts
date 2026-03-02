import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Registra un nuevo usuario en el sistema
   * @param createUserDto - Datos del nuevo usuario (username y password)
   * @returns Usuario creado (sin contraseña)
   */
  async register(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const existingUser = await this.findByUsername(createUserDto.username);
    if (existingUser) {
      throw new ConflictException('El nombre de usuario ya está registrado');
    }

    const hashedPassword = await this.hashPassword(createUserDto.password);
    const newUser = this.userRepository.create({
      username: createUserDto.username,
      password: hashedPassword,
      role: 'usuario',
    });

    const savedUser = await this.userRepository.save(newUser);
    const { password, ...userWithoutPassword } = savedUser;

    return userWithoutPassword;
  }

  /**
   * Valida las credenciales de un usuario durante el login
   * @param loginUserDto - Credenciales del usuario (username y password)
   * @returns Usuario validado
   */
  async validateUser(loginUserDto: LoginUserDto): Promise<User> {
    const user = await this.findByUsername(loginUserDto.username);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(loginUserDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return user;
  }

  /**
   * Busca un usuario por su username
   * @param username - Username del usuario
   * @returns Usuario encontrado o null
   */
  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { username },
    });
  }

  /**
   * Busca un usuario por su ID
   * @param id - ID del usuario
   * @returns Usuario encontrado o null
   */
  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  /**
   * Genera un hash seguro de la contraseña
   * @param password - Contraseña en texto plano
   * @returns Hash de la contraseña
   */
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}
