
// aqui eu estou chamando/declarando a API do tempo, está api traz diversas informações sobre o clima 
const apiKey = '7c514ea65149d9f0d55497d1bd34d512'
const apiUrl  = 'https://api.openweathermap.org/data/2.5/weather?&units=metric&q='

// aqui estão minhas variaveis para fazer a manipulação do DOM
const search = document.querySelector('.search input')
const searchBtn = document.querySelector('.search button')
const weatherIcon = document.querySelector('.weather-icon')

// aqui é a função que executa todas as funcionalidades da pag, ela usa a API para pegar as informações que vem em json e as convertem aplicando no DOM e alterando todos os elementos que foram
// declarados anteriormente como por exepmplo aqui: document.querySelector('.city').innerHTML = data.name ele vai pegar o nome da cidade que o usuario digitou e foi aplicado no json da API
// e vai mostrar esse nome no meu h2 que tem a class city, está logica se aplica a todos os outros elementos da interface
async function checkWeather(city){
    // aqui temos a variavel resposta ela que faz a solicitão do http da nossa API corretamnete ultilizando o metodo do js fetch, e aqui (apiUrl + city +  `&appid=${apiKey}`) ele está apenas consumindo a API
    const resposta = await fetch(apiUrl + city +  `&appid=${apiKey}`)

    // este if é apenas uma verificação de erro padrão 
    if(resposta.status == 404){
        document.querySelector('.erro').style.display = 'block'
        document.querySelector('.weather').style.display = 'none'
    } else{

        
    //Esta variavel data é responsavel por aguardando a conclusão da solicitação HTTP feita anteriormente que foi armazenada na variável resposta e, em seguida, está convertendo esta resposta em um objeto JavaScript utilizando o método .json().
    // para que assim seja possivel ultilizar as informções da API que anteriormente estavam em json
        let data = await resposta.json()

        // este console é apenas para ver o objeto para que assim eu consigo colocar os dados corretamente nos document.querySelector
        console.log(data)
        
        // aqui temos apenas as manipulações do dom alterar as informções para aquelas que foram obtidas atraves do objeto feita do json da API 
        document.querySelector('.city').innerHTML = data.name
        document.querySelector('.temperatura').innerHTML = Math.round(data.main.temp) + '°C'
        document.querySelector('.humidity').innerHTML = data.main.humidity + "%"
        document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h'
    
        //esees if são uma manipulação do DOM ele olha o objeto que foi criado apartir da API e dependendo de algumas circustancias ele altera o icon do tempo que temos no HTML
        if(data.weather[0].main == 'Clouds'){
            weatherIcon.src = 'images/clouds.png'
        } 
        else if(data.weather[0].main == 'Clear'){
            weatherIcon.src = 'images/clear.png'
        }  
        else if(data.weather[0].main == 'Rain'){
            weatherIcon.src = 'images/rain.png'
        }  
        else if(data.weather[0].main == 'Drizzle'){
            weatherIcon.src = 'images/drizzle.png'
        }  
        else if(data.weather[0].main == 'Mist'){
            weatherIcon.src = 'images/Mist.png'
        }
        

        // esses if são responsalves pela alteração do bg dependendo do clima que estiver no local 
        if(data.main.temp >= 19){
            document.body.style.backgroundImage = "url('images/sunny.jpg')";
        } else if(data.main.temp <=18){
            document.body.style.backgroundImage = "url('images/cold.png')";
        }

        if(data.main.humidity >= 90){
            document.body.style.backgroundImage = "url('images/rain-bg.jpg')"
        }
        document.querySelector('.weather').style.display = 'block'
        document.querySelector('.erro').style.display = 'none'
    }

}

// e por fim porém não menos importante temos o evento de Click/keyup que chamma a minha função

search.addEventListener('keyup', function(e){
    let key = e.which || e.keyCode
    if(key === 13){
        checkWeather(search.value)
    }
})

searchBtn.addEventListener('click', ()=>{
    checkWeather(search.value)
})
