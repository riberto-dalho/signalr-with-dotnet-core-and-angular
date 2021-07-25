import { Component, OnInit } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private hubConnection: HubConnection;
  private loginToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTZWNyZXRLZXkiOiJtRDFtTlI5ekZlUnNvdlo4MnZlaEZRPT0iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9hdXRoZW50aWNhdGlvbiI6InRydWUiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIxNjM3Y2U0ZC02ZmYwLTRlYjctOGViMy1kYjBhMmZlOThiNmUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyYXRpb24iOiIyMy8wNC8yMDIxIDE0OjQzOjQyIiwibmJmIjoxNjE5MTk2MjIyLCJleHAiOjE2MTkxOTk4MjIsImlhdCI6MTYxOTE5NjIyMiwiaXNzIjoiSHViLURlbGl2ZXJ5IiwiYXVkIjoiNTQ1MTc2MjgwMDAxOTgifQ.af5y6r5xJOMwtpzatGKLJsQXU7APiwGrP_691wdV7f8';

  private cnpj = '54517628000198';

  public ngOnInit() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`http://localhost:60694/pushNotification?CnpjLoja=${this.cnpj}`, 
      // .withUrl(`https://lx-hub-delivery-api-hmg.azurewebsites.net/pushNotification?CnpjLoja=${this.cnpj}`, 
      { 
        accessTokenFactory: () => this.loginToken,        
      })
      .build();

    this.hubConnection.start().then(() => {
      console.log('connection started');
    }).catch(err => console.log(err));

    this.hubConnection.onclose(() => {
      
      setTimeout(() => {
        console.log('try to re start connection');
      
        this.hubConnection.start().then(() => {
      
          console.log('connection re started');
        }).catch(err => console.log(err));
      }, 5000);
    });


    this.hubConnection.on('ConnectionSuccess', (data) => {
      
      console.log('client Id:' + data);
      // this.hubConnection.invoke('autenticar', data, `{cnpj_Parceiro: "54517628000198", token: "${this.loginToken}"}`).catch(err => console.log(err));
    });

    this.hubConnection.on('RaiseError', (data) => {
      console.log('RaiseError:' + data);
    });

    this.hubConnection.on('Notificacao', (data) => {
      console.log('Notificacao:' + data);
    });

  }

  public stopConnection() {
    this.hubConnection.stop().then(() => {
      console.log('stopped');
    }).catch(err => console.log(err));
  }
}
