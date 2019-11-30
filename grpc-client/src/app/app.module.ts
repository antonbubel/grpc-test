import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GRPC_GREETER_CLIENT_SETTINGS } from 'src/proto/greet.pb';
import { environment } from 'src/environments/environment';
import { GrpcWebDevtoolsInterceptor } from './grpc-devtools.interceptor';
import { GRPC_INTERCEPTORS } from '@ngx-grpc/core';
import { GrpcClientSettings } from '@ngx-grpc/core';

const grpcSettings: GrpcClientSettings = {
  host: environment.grpcHost 
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    { provide: GRPC_GREETER_CLIENT_SETTINGS, useValue: grpcSettings },
    { provide: GRPC_INTERCEPTORS, useClass: GrpcWebDevtoolsInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
