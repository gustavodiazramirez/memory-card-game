import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);

    // Si no se requieren roles específicos, permitir acceso
    if (!requiredRoles?.length) return true;

    const { user } = context.switchToHttp().getRequest();

    if (!user?.role) {
      throw new ForbiddenException('No autorizado');
    }

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('No tienes permisos suficientes');
    }

    return true;
  }
}
