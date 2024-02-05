import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: WebSocket = new WebSocket('ws://localhost:8080');
  private url = 'ws://localhost:8080'; // WebSocket server URL
  private reconnectInterval = 5000; // Interval in milliseconds to attempt reconnection
  private reconnectAttempts = 0; // Number of reconnect attempts

  constructor() {
    this.connect();
  }

  // Method to establish WebSocket connection
  private connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log('WebSocket connection opened.');
      this.reconnectAttempts = 0; // Reset reconnect attempts on successful connection
    };

    this.socket.onclose = (event) => {
      console.error(`WebSocket closed: ${event.reason}`);
      this.reconnect();
    };
  }

  // Method to reconnect WebSocket
  private reconnect() {
    if (this.reconnectAttempts < 5) { // Limit the number of reconnect attempts
      console.log(`Attempting to reconnect in ${this.reconnectInterval / 1000} seconds.`);
      setTimeout(() => {
        this.reconnectAttempts++;
        this.connect();
      }, this.reconnectInterval);
    } else {
      console.error('Exceeded maximum reconnect attempts. Closing WebSocket.');
      this.close();
    }
  }

  // Method to send data to the WebSocket server
  sendData(data: any) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else {
      console.error('WebSocket connection is not open. Attempting to reconnect...');
      this.reconnect();
    }
  }

  // Method to handle messages from the WebSocket server
  handleMessage(callback: (data: any) => void) {
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      callback(data);
    };
  }

  // Close WebSocket connection
  close() {
    this.socket.close();
  }
}
