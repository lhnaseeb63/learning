// Going to fetch dad jokes from an API and display them on our webpage
// Need to specify that we only want json files--> Accect header, application/json
// fetch is built into the browser. No need for installation

// when you use fetch it returns a promise (asynchronous)
// fetch('link').then(response => response.json()).then(data => console.log(data))
// can use asynch/await instead of .then()

const jokeElement = document.getElementById('joke');
const jokeBtn = document.getElementById('jokeBtn');

jokeBtn.addEventListener('click', generateJoke);

generateJoke();

//---------------------------------------USING asyc/await

// whenever you use 'await' you have to label function async
async function generateJoke() {
  const config = {
    headers: {
      Accept: 'application/json',
    },
  };
  const res = await fetch('https://icanhazdadjoke.com', config);

  const data = await res.json();

  jokeElement.innerHTML = data.joke;
}

//---------------------------------------USING .then()
// function generateJoke() {
//   const config = {
//     headers: {
//       Accept: 'application/json',
//     },
//   };
//   fetch('https://icanhazdadjoke.com', config)
//     .then((res) => res.json())
//     .then((data) => {
//       jokeElement.innerHTML = data.joke;
//     });
// }
