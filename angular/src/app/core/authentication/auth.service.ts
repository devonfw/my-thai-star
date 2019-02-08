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

  /* Creates an instance of AuthService.
   * @param {ConfigService} configService
   * @memberof AuthService
   */
  constructor(private configService: ConfigService) {}

  /* @returns {boolean}
   * @memberof AuthService
   */
  public isLogged(): boolean {
    return this.logged;
  }

  /* @param {boolean} login
   * @memberof AuthService
   */
  public setLogged(login: boolean): void {
    this.logged = login;
  }

  /* @returns {string}
   * @memberof AuthService
   */
  public getUser(): string {
    return this.user;
  }

  /* @param {string} username
   * @memberof AuthService
   */
  public setUser(username: string): void {
    this.user = username;
  }

  /* @returns {string}
   * @memberof AuthService
   */
  public getToken(): string {
    return this.token;
  }

  /* @param {string} token
   * @memberof AuthService
   */
  public setToken(token: string): void {
    this.token = token;
  }

  /* @param {string} role
   * @memberof AuthService
   */
  public setRole(role: string): void {
    this.currentRole = role;
  }

  /* @param {string} roleName
   * @returns {number}
   * @memberof AuthService
   */
  public getPermission(roleName: string): number {
    const role: Role = <Role>(
      find(this.configService.getValues().roles, { name: roleName })
    );
    return role.permission;
  }

  /* @param {string} userRole
   * @returns {boolean}
   * @memberof AuthService
   */
  public isPermited(userRole: string): boolean {
    return (
      this.getPermission(this.currentRole) === this.getPermission(userRole)
    );
  }
}
