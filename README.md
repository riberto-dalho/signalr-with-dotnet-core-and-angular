# signalr.with.dotnet.core.and.angular


# Angular App

- Install signalR package

```
npm i @aspnet/signalr --save
```

```
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

  public ngOnInit() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:50930/pushNotification").build();

    this.hubConnection.start().then(() => {
      console.log("connection started");
    }).catch(err => console.log(err));

    this.hubConnection.onclose(() => {
      debugger;
      setTimeout(() => {
        debugger;
        this.hubConnection.start().then(() => {
          debugger;
          console.log("connection started");
        }).catch(err => console.log(err));
      }, 5000);
    });

    this.hubConnection.on("clientMethodName", (data) => {
      debugger;
      console.log(data);
    });

    this.hubConnection.on("WelcomeMethodName", (data) => {
      debugger;
      console.log(data);
      this.hubConnection.invoke("GetDataFromClient", "user id", data).catch(err => console.log(err));
    });
  }

  public stopConnection() {
    this.hubConnection.start().then(() => {
      console.log("stopped");
    }).catch(err => console.log(err));
  }
}

```
