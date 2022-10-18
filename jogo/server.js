import express from "express";
import http from 'http'
import createGame from './public/game.js'
import socketio from 'socket.io'

const app = express();
const server = http.createServer(app)
const sockets = socketio(server)

app.use(express.static('public'))

const game = createGame()
game.addPlayer ({playerId: 'player1', playerX: 1, playerY: 1})
game.addPlayer ({playerId: 'player2', playerX: 5, playerY: 1})
game.addPlayer ({playerId: 'player3', playerX: 7, playerY: 1})
game.addFruit ({fruitId: 'fruit1', fruitX: 8, fruitY: 8})
game.addFruit ({fruitId: 'fruit2', fruitX: 9, fruitY: 8})

console.log(game.state)

sockets.on('connection', (socket) => {
    const playerId = socket.id
    console.log(`> Player connnected on Server with id: ${playerId}`)
})

server.listen(3000, () => {
    console.log(`> Server listening to port 3000`)
})