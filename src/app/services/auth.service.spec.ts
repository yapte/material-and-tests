import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('TOKEN getter should return string after login', () => {
    const value = 'Q1w2w3e3r4t5';
    service.login(value);
    expect(service.TOKEN).toBe(value);
  });

  it('TOKEN getter should return null after logout', () => {
    service.login('value');
    service.logout();
    expect(service.TOKEN).toBeNull();
  });
});
