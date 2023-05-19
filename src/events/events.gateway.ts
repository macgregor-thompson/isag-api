import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway, WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';


@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('scoreCardUpdated')
  scoreCardUpdated(@ConnectedSocket() client?: Socket): void {
    this.server.emit('scoreCardUpdated', { data: true });
  }

  @SubscribeMessage('events')
  handleEvent(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): void {
    // save score
    client.broadcast.emit('events', data);
  }
}
