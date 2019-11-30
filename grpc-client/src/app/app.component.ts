import { Component, OnInit } from '@angular/core';
import { GreeterClient, HelloRequest } from '../proto/greet.pb';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'grpc-client';
  helloResponseMessage$: Observable<string>;

  constructor(private readonly greeterClient: GreeterClient) {
  }

  ngOnInit() {
    this.helloResponseMessage$ = this.greeterClient
      .sayHello(new HelloRequest({ name: 'Grpc Client' }))
      .pipe(map(helloResponse => helloResponse.message));
  }
}
