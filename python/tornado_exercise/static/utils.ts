/// <reference path="./typings/jquery/jquery.d.ts" />

namespace Utils {
    export interface WebSocketEvent extends EventListener {
        data: any;
    }

    export abstract class Client {
        ws: WebSocket;

        constructor(host: string) {
            try {
                this.ws = new WebSocket(host);
            } catch (e) {
                console.log('connect error: ', e);
            }
        }

        loop(): void {
            this.ws.onopen = function(evt: EventListener) {
                this.onConnected(evt);
            }.bind(this);

            this.ws.onmessage = function(evt: WebSocketEvent) {
                this.onMessage(evt);
            }.bind(this);

            this.ws.onclose = function(evt: WebSocketEvent) {
                this.onClosed(evt);
            }.bind(this);
        }

        abstract onConnected(evt: WebSocketEvent): void;
        abstract onMessage(evt: WebSocketEvent): void;
        abstract onClosed(evt: WebSocketEvent): void;
    }
}