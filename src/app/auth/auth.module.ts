import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';

export function tokenGetter(): any {
  return localStorage.getItem('token');
}

@NgModule({
  imports: [
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['localhost:3000', 'co-finding.moph.go.th'],
        disallowedRoutes: ['localhost:3000/login/']
      }
    })
  ]
})
export class AuthModule { }
