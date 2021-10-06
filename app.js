// import getWeather from "./weather"; getWeather();

const intro = document.querySelector('.intro');
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth(); 
const day = date.getDate();

intro.textContent = `Welcome! This is a page full of realtime APIs. 
Today is ${year}-${month+1}-${day}!`
