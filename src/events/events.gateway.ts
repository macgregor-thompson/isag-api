import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Observable, of } from 'rxjs';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @SubscribeMessage('scores')
  scoreCardUpdated(): Observable<WsResponse<true>> {
    return of({ event: 'scorecardUpdated', data: true });
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
