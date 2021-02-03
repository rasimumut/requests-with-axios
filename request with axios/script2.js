const getBtn = document.getElementById('getBtn');
const postBtn = document.getElementById('postBtn');
const putBtn = document.getElementById('putBtn');
const ciftBtn = document.getElementById('ciftBtn');
const errBtn = document.getElementById('errBtn');
const headersBtn = document.getElementById('headersBtn');
const deleteBtn = document.getElementById('deleteBtn');

getBtn.addEventListener('click',getData);
postBtn.addEventListener('click',postData);
putBtn.addEventListener('click',putPatchData);
ciftBtn.addEventListener('click',ciftData);
errBtn.addEventListener('click',hataIslemleri);
headersBtn.addEventListener('click',customHeaders);
deleteBtn.addEventListener('click',deleteData);

function getData() {
    axios({
        method:'GET',
        url: 'https://jsonplaceholder.typicode.com/users',
        params: {
            _limit:5
        }
    }).then(response => sonucuEkranaYazdir(response))
        .catch(hata => console.log(hata))
}

function postData() {

    axios.post('https://jsonplaceholder.typicode.com/users',{
        name:"Rasim Umut ÖZKURT",
        username: 'rsmumtozkrt',
        email:'rsmumtozkrt@gmail.com'
    }).then(response => sonucuEkranaYazdir(response))
        .catch(hata => console.log(hata))
}

function putPatchData() {
    // axios.put('https://jsonplaceholder.typicode.com/users/1',{
    //     name:"Rasim Umut ÖZKURT",
    //     username: 'rsmumtozkrt',
    //     email:'rsmumtozkrt@gmail.com'
    // }).then(response => sonucuEkranaYazdir(response))
    //     .catch(hata => console.log(hata))
    axios.patch('https://jsonplaceholder.typicode.com/users/1',{
        name:"Rasim Umut ÖZKURT",
        username: 'rsmumtozkrt',
        email:'rsmumtozkrt@gmail.com'
    }).then(response => sonucuEkranaYazdir(response))
        .catch(hata => console.log(hata))
}

function deleteData() {
    axios.delete('https://jsonplaceholder.typicode.com/users/1')
        .then(response => sonucuEkranaYazdir(response))
        .catch(hata => console.log(hata))
}

function ciftData() {
    axios.all([
        axios.get('https://jsonplaceholder.typicode.com/users?_limit=2'),
        axios.get('https://jsonplaceholder.typicode.com/posts?_limit=2'),
    ])
      .then(axios.spread((kullanicilar,postlar) => {

          sonucuEkranaYazdir(kullanicilar)
      }))
      .catch(hata => console.log(hata))
}

// axios.interceptors.request.use(config=>{
//
//
//     return config;
// })


axios.defaults.headers.common["X-Auth-Token"] = 'apitokendegeri';

function customHeaders() {
    const config={
        headers:{
            'Content-Type':'aplication/json',
            Authorization: 'sizintokendegeriniz'
        }
    }
    axios.post('https://jsonplaceholder.typicode.com/users',{
        name:"Rasim Umut ÖZKURT",
        username: 'rsmumtozkrt',
        email:'rsmumtozkrt@gmail.com'
    },config).then(response => sonucuEkranaYazdir(response))
        .catch(hata => console.log(hata))
}


function hataIslemleri() {
    axios({
        method:'GET',
        url: 'https://jsonplaceholder.typicode.com/userssss',
        params: {
            _limit:5
        }
    }).then(response => sonucuEkranaYazdir(response))
        .catch(hata => console.log(hata.response.status))
}



function sonucuEkranaYazdir(response) {
    document.querySelector('.sonuc').innerHTML = ` 
      <div class="alert alert-primary" role="alert">
        <b>Sonuc:</b> ${response.status}
    </div>
    <div class="row m-4"></div>
    
    <article class="message is-dark">
        <div class="message-header">
            <p>Headers</p>
        </div>
        <div class="message-body">
      <pre>${JSON.stringify( response.headers,null,2)}</pre>
        </div>
    </article>
    <div class="row m-4"></div>
    <article class="message is-dark">
        <div class="message-header">
            <p>Data</p>
        </div>
        <div class="message-body">
      <pre>${JSON.stringify(response.data,null,2) }</pre>  
        </div>
    </article>
    <div class="row m-4"></div>
    <article class="message is-dark">
        <div class="message-header">
            <p>Config</p>
        </div>
        <div class="message-body">
        <pre>${JSON.stringify(response.config,null,2)}</pre>
        </div>
    </article>
    `
}
