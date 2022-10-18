export default function createGame() {
            
    //Criando os jogadores e frutas.
    const state = {
    players: {},
    fruits: {},
    screen: {
        width: 10,
        height: 10
    }
    }

    //Função que adiciona um jogador
    function addPlayer(command) {
        const playerId = command.playerId
        const playerX = command.playerX
        const playerY = command.playerY

        state.players[playerId] = {
            x: playerX,
            y: playerY
        }
    }

    //Função que remove um jogador
    function removePlayer(command) {
        const playerId = command.playerId

        delete state.players[playerId]
    }
    
    //Função que adiciona uma fruta
    function addFruit(command) {
        const fruitId = command.fruitId
        const fruitX = command.fruitX
        const fruitY = command.fruitY

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        }
    }

    //Função que remove uma fruta
    function removeFruits(command) {
        const fruitId = command.fruitId

        delete state.fruits[fruitId]
    }

    //------------------------------------SEÇÃO DE INPUTS-------------------------------------
    //Função criada com o objetivo de capturar as entradas dos players e movimentá-los no mapa
    function movePlayer(command) {
        console.log(`game.movePlayer() -> Moving ${command.playerId} with ${command.keyPressed}`)

        const acceptedMoves = {
            ArrowUp(player) { //Pressionar seta para cima - Subir
                //console.log('game.movePlayer().ArrowUp -> Moving player up')
                if (player.y - 1 >= 0) {
                    player.y = player.y - 1
            }
        },

            ArrowDown(player) { //Pressionar seta para baixo - Descer
                //console.log('Moving player down')
                if (player.y + 1 < state.screen.width) { 
                    player.y = player.y + 1
            }
        },
            
            ArrowLeft(player) { //Pressionar seta para esquerda - Esquerda
                //console.log('Moving player left')
                if (player.x - 1 >= 0) { 
                    player.x = player.x - 1
            }
        },
            
            ArrowRight(player) { //Pressionar seta para direita - Direita
                    //console.log('Moving player right')
                    if (player.x + 1 < state.screen.height) { 
                        player.x = player.x + 1
            }
        }
    }

        const keyPressed = command.keyPressed
        const playerId = command.playerId
        const player = state.players[command.playerId]
        const moveFunction = acceptedMoves[keyPressed]

        if (player && moveFunction) {
            moveFunction(player)
            checkCollision(playerId)
        }

        return
    }

    //Função responsável por veriicar e detectar a colisão entre jogadores e frutas
    function checkCollision(playerId) {
            const player = state.players[playerId]

            for (const fruitId in state.fruits) {
                const fruit = state.fruits[fruitId]

                if (player.x === fruit.x && player.y === fruit.y) {
                    console.log(`Colisão entre ${playerId} and ${fruitId}`)
                    removeFruits({ fruitId: fruitId })
                }
            }
    }

    return{ 
        addPlayer,
        removePlayer,
        addFruit,
        removeFruits,
        movePlayer,
        state
    }
}