// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST

/*
  To configure the services you need to provider a configuration for each of them.

  E.g. you can create a module where you configure all of them and then import this module into your AppModule:

  const grpcSettings = { host: environment.grpcHost };

  @NgModule({
    providers: [
      { provide: GRPC_GREETER_CLIENT_SETTINGS, useValue: grpcSettings },
    ],
  })
  export class GrpcConfigModule { }
*/

/* tslint:disable */
/* eslint-disable */
import { Inject, Injectable, InjectionToken } from '@angular/core';
import {
  GrpcCallType,
  GrpcClient,
  GrpcClientSettings,
  GrpcHandler
} from '@ngx-grpc/core';
import { BinaryReader, BinaryWriter, ByteSource } from 'google-protobuf';
import {
  AbstractClientBase,
  Error,
  GrpcWebClientBase,
  Metadata,
  Status
} from 'grpc-web';
import { Observable } from 'rxjs';

export class HelloRequest {
  static fromBinaryReader(instance: HelloRequest, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) {
        break;
      }

      switch (reader.getFieldNumber()) {
        case 1:
          instance.name = reader.readString();
          break;
        default:
          reader.skipField();
      }
    }

    instance.name = instance.name || '';
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new HelloRequest();

    HelloRequest.fromBinaryReader(instance, new BinaryReader(bytes));

    return instance;
  }

  static toBinaryWriter(instance: HelloRequest, writer: BinaryWriter) {
    if (instance.name !== undefined && instance.name !== null) {
      writer.writeString(1, instance.name);
    }
  }

  static toBinary(instance: HelloRequest) {
    const writer = new BinaryWriter();

    HelloRequest.toBinaryWriter(instance, writer);

    return writer.getResultBuffer();
  }

  private _name?: string;

  constructor(value: Partial<HelloRequest> = {}) {
    this.name = value.name;
  }

  get name(): string | undefined {
    return this._name;
  }
  set name(value: string | undefined) {
    this._name = value;
  }
}

export module HelloRequest {}

export class HelloReply {
  static fromBinaryReader(instance: HelloReply, reader: BinaryReader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) {
        break;
      }

      switch (reader.getFieldNumber()) {
        case 1:
          instance.message = reader.readString();
          break;
        default:
          reader.skipField();
      }
    }

    instance.message = instance.message || '';
  }

  static fromBinary(bytes: ByteSource) {
    const instance = new HelloReply();

    HelloReply.fromBinaryReader(instance, new BinaryReader(bytes));

    return instance;
  }

  static toBinaryWriter(instance: HelloReply, writer: BinaryWriter) {
    if (instance.message !== undefined && instance.message !== null) {
      writer.writeString(1, instance.message);
    }
  }

  static toBinary(instance: HelloReply) {
    const writer = new BinaryWriter();

    HelloReply.toBinaryWriter(instance, writer);

    return writer.getResultBuffer();
  }

  private _message?: string;

  constructor(value: Partial<HelloReply> = {}) {
    this.message = value.message;
  }

  get message(): string | undefined {
    return this._message;
  }
  set message(value: string | undefined) {
    this._message = value;
  }
}

export module HelloReply {}

export const GRPC_GREETER_CLIENT_SETTINGS = new InjectionToken(
  'GRPC_GREETER_CLIENT_SETTINGS'
);

@Injectable({
  providedIn: 'root'
})
export class GreeterClient {
  private client: GrpcClient;

  constructor(
    @Inject(GRPC_GREETER_CLIENT_SETTINGS) settings: GrpcClientSettings,
    private handler: GrpcHandler
  ) {
    this.client = new GrpcClient(settings);
  }

  /**
   * Unary RPC
   * @param Greet.HelloRequest request
   * @param Metadata metadata
   * @return Greet.HelloReply
   */
  sayHello(requestData: HelloRequest, requestMetadata: Metadata = {}) {
    return this.handler.handle({
      type: GrpcCallType.unary,
      client: this.client,
      path: '/Greet.Greeter/SayHello',
      requestData,
      requestMetadata,
      requestClass: HelloRequest,
      responseClass: HelloReply
    }) as Observable<HelloReply>;
  }
}
