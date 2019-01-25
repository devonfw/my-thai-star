import { Injectable } from '@angular/core';
import { find } from 'lodash';
import { Role } from '../../shared/view-models/interfaces';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthService {
  private logged = false;
  private user = '';
  private currentRole = 'CUSTOMER';
  private token: string;

  constructor(private configService: ConfigService) {}

  public isLogged(): boolean {
    return this.logged;
  }

  public setLogged(login: boolean): void {
    this.logged = login;
  }

  public getUser(): string {
    return this.user;
  }

  public setUser(username: string): void {
    this.user = username;
  }

  public getToken(): string {
    return this.token;
  }

  public setToken(token: string): void {
    this.token = token;
  }

  public setRole(role: string): void {
    this.currentRole = role;
  }

  public getPermission(roleName: string): number {
    const role: Role = <Role>(
      find(this.configService.getValues().roles, { name: roleName })
    );
    return role.permission;
  }

  public isPermited(userRole: string): boolean {
    return (
      this.getPermission(this.currentRole) === this.getPermission(userRole)
    );
  }
}
