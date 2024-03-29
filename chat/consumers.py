import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        self.user = self.scope["user"]

        
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self,close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        
    #Receive message from Websocket
    async def receive(self,text_data):
        username = self.scope['user'].username
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        message = (username + ": " + message) 
        
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type':'chat_message',
                'message':message,
                'username': self.user
            }
        )

    async def chat_message(self,event):
        username = self.scope['user'].username
        message = event['message']

        await self.send(text_data=json.dumps({
            'username': username,
            'message':message
        }))

