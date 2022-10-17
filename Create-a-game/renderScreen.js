export default function renderScreen(screen, game, requestAnimationFrame) {

    //Apaga a toda tela antes de reproduzir o próximo frame do jogo.
    const context = screen.getContext('2d')
    context.fillStyle = 'white'
    context.clearRect(0, 0, 10, 10)
    
    //Criando a posição nas coordenadas X e Y dos jogadores.
    for (const playerId in game.state.players) {
        const player = game.state.players[playerId]
        context.fillStyle = 'black'
        context.fillRect(player.x, player.y, 1, 1)
    }

    //Criando a posição nas coordenadas X e Y dos jogadores e frutas.
    for (const fruitId in game.state.fruits) {
        const fruit = game.state.fruits[fruitId]
        context.fillStyle = 'green'
        context.fillRect(fruit.x, fruit.y, 1, 1)
    }

    //Chama eternamente a função renderScreen para atualizar a posição dos jogadores e das frutas.
    requestAnimationFrame(() => {
        renderScreen(screen, game, requestAnimationFrame)
    }) 
}