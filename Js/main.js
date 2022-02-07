'use strict';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');

let activties = JSON.parse(localStorage.getItem("activities")) || []

let map;
let mapEvent;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude, longitude } = position.coords
        map = L.map('map').setView([latitude, longitude], 15);
        mapAdd()
    })
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!(inputType.value && inputDistance.value && inputDuration.value)) return alert("Malumotlarni Kiriting!")

    activityPush()
})


document.addEventListener("keyup", ({ key }) => {
    if (key === "Escape" && form.classList.length == 1) {
        form.classList.add("hidden");
        inputDistance.value = ""
        inputDuration.value = ""
    }
})
