/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as modbus from 'jsmodbus'
import * as net from 'net';
async function bootstrap() {
  setInterval(function () {
    const MAX_DATA_COUNT = 10;
    const socket = new net.Socket()
    const client1 = new modbus.client.TCP(socket, 1, 5000);

    const options = {
        'host' : '127.0.0.1', 
        'port' : 502,
        'localAddress': '172.19.224.1',
        'family': 4
    };

    socket.on('connect', function () {
      const arrayTemperatureRandom = [];
      for(let i = 0 ; i < MAX_DATA_COUNT ; i++) {
          arrayTemperatureRandom.push(Math.floor(Math.random() * 60))
      }

      
      client1.writeMultipleRegisters(0, arrayTemperatureRandom).then((res) => {
          console.log(res.request.body)
      },console.error)
      client1.readHoldingRegisters(0, 9).then((res) => {
        console.log({unitId: res.response.unitId, data: res.response})
        },console.error)
      
      }
    );

    socket.connect(options, async () => {
        console.log('Modbus Master Connection');
    })
    return { 
        message: 'Data sent successfully'
    }
  },1000);
  // const MAX_DATA_COUNT = 10;
  //   const socket = new net.Socket()
  //   const client1 = new modbus.client.TCP(socket, 1, 5000);

  //   const options = {
  //       'host' : '127.0.0.12', 
  //       'port' : 502
  //   };

  //   socket.on('connect', function () {
  //     const arrayTemperatureRandom = [];
  //     for(let i = 0 ; i < MAX_DATA_COUNT ; i++) {
  //         arrayTemperatureRandom.push(Math.floor(Math.random() * 60))
  //     }

      
  //     client1.writeMultipleRegisters(0, arrayTemperatureRandom).then((res) => {
  //         console.log(res.request.body)
  //     },console.error)
  //     client1.readHoldingRegisters(0, 9).then((res) => {
  //       console.log({unitId: res.response.unitId, data: res.response})
  //       },console.error)
      
  //     }
  //   );

  //   socket.connect(options, async () => {
  //       console.log('Modbus Master Connection');
  //   })
  //   return { 
  //       message: 'Data sent successfully'
  //   }
}
bootstrap();
