//Definindo um array linear
const firePixel = []

//Definindo largura
const fireWidth = 40

//Definindo altura
const fireHeight = 40

//Paleta de cores do fogo
const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]


//Função de Inicialização
function start(){
    createFireDataStruture()
    createFireSource()
    renderFire()

    //Colocando a função de propagar o fogo rodando em loop
    setInterval(calculateFirePropagation, 50)
}
//Criando a estrutura da matriz
function createFireDataStruture(){
    const numPixels = fireWidth * fireHeight
    for(let i = 0; i < numPixels; i++){
        firePixel[i] = 0
    }
}
//Criando a propagação do fogo pela table
function calculateFirePropagation(){
    for(let column = 0; column < fireWidth; column++){
        for(let row = 0; row < fireHeight; row++){
            //Calcular qual a posição dentro da matriz
            const pixelIndice = column + (fireWidth * row)

            updateFireIntensity(pixelIndice)
        }
    }
    renderFire()
}
//Criando a função q olha o pixel abaixo e atualiza o valor de acordo
function updateFireIntensity(currentPixelIndice){
    //Pega o valor atual do pixel por referencia e soma com a largura para descer 1 pixel
    const belowFireIndice = currentPixelIndice + fireWidth

    //Identificando os ultimos pixel da coluna e tirando eles da atualização dos valores
    if(belowFireIndice >= fireWidth * fireHeight){
        return 
    }

    //Implementando o enfraquecimento da intensidade
    const decay = Math.floor(Math.random() * 3) //Aleatorizando o fogo
    const belowFireIntensity = firePixel[belowFireIndice]
    //Verifica se a intensidade do fogo - decay é = 0, caso não seja o valor 0 é atribuido
    const newFireIntensity = belowFireIntensity - decay >= 0 ? belowFireIntensity - decay : 0

    //currentPixelIndice - decay foi utilizado para atualizar o pixel do lado, gerando assim um efeito de vento
    firePixel[currentPixelIndice - decay] = newFireIntensity
}
//Criando uma table com formato de matriz
function renderFire(){
    let html = '<table cellpadding=0 cellspacing=0>'

    //Criando as linhas da table
    for(let row = 0; row < fireHeight; row++){
        html += '<tr>'

        //Criando as colunas da table
        for(let column = 0; column < fireWidth; column++){
            const debug = false
            //Colocando o indice do array na table
            const pixelIndice = column + (fireWidth * row)
            //Adicionar na celula da table o valor de intensidade do fogo
            const fireIntensity = firePixel[pixelIndice]

            //Criando um debug
            if(debug === true){
                html += '<td>'
                //Printar o valor do indice na celula
                html += `<div class="pixel-index">${pixelIndice}</div>`
                //Printa o valor da intensidade na table
                html += fireIntensity
                html += '</td>'
            }else{
                //Pega os valores em rgb do pixel e salva em color
                const color = fireColorsPalette[fireIntensity]
                //Coloca como cor de fundo do pixel
                const colorString = `${color.r},${color.g},${color.b}`
                html += `<td class="pixel" style="background-color: rgb(${colorString})">`
                html += '</td>'
            }

            
        }

        html += '</tr>'
    }

    html += '</table>'

    //Identificar o fireCanvas do HTML e substituir o innerHTML pela table
    document.querySelector('#fireCanvas').innerHTML = html
}
//Criando a fonte do fogo
function createFireSource(){
    for(let column = 0; column <= fireWidth; column++){
        //Para achar o valor do ultimo pixel basta multiplicar a largura(linha) e altura(coluna), isso irá dar 1 valor a mais q o array
        const overflowPixelIndice = fireWidth * fireHeight
        //Agora basta subtrair por 1 valor de largura para ter como resultado o ultimo valor da primeira coluna
        //Como aqui esta somando com a coluna a cada volta no for, a cada volta ele encontra o ultimo valor de cada coluna
        const pixelIndice = (overflowPixelIndice - fireWidth) + column 
        
        firePixel[pixelIndice] = 36
    }
}
start()