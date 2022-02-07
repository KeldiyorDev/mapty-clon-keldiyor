function mapAdd() {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    renderActivities()

    map.on("click", (event) => {
        form.classList.remove("hidden")
        mapEvent = event;
    })
}

function activityPush() {
    const { lat, lng } = mapEvent.latlng;

    let activity = {
        id: Math.random(),
        type: inputType.value,
        date: `${new Date().getDate()} ${months[new Date().getMonth()]}`,
        duration: inputDuration.value,
        distance: inputDistance.value,
        lat: lat,
        lng: lng
    }

    activties.push(activity)
    localStorage.setItem("activities", JSON.stringify(activties))

    marcerAdd(activity)

    form.classList.add("hidden");
    inputDistance.value = ""
    inputDuration.value = ""

}

function typeGenerator(type) {
    switch (type) {
        case "running":
            return "Yugurish"
            break;
        case "cycling":
            return "Velosoped";
            break
        default:
            return ""
    }
}

function changeView(activityId) {
    const filteredActivity = activties.filter(activity => activity.id == activityId);
    const { lat, lng } = filteredActivity[0]
    map.setView([lat, lng], 15)
}


function renderActivities() {
    for (let activity of activties) {
        marcerAdd(activity)
    }
}

function marcerAdd(activity) {

    L.marker([activity.lat, activity.lng]).addTo(map).bindPopup(
        L.popup({
            maxWidth: 250,
            minWidth: 150,
            autoClose: false,
            closeOnClick: false,
            className: `${activity.type}-popup`
        })
    ).setPopupContent(`${typeGenerator(activity.type)} ${activity.date}`).openPopup();

    const html = `
    <li class="workout workout--${activity.type}" onclick="changeView(${activity.id})">
        <h2 class="workout__title">${typeGenerator(activity.type)} ${activity.date}</h2>
        <div class="workout__details">
            <span class="workout__icon">${activity.type == "running" ? "🏃‍♂️" : "🚴‍♀️"}</span>
            <span class="workout__value">${activity.distance}</span>
            <span class="workout__unit">km</span>
        </div >
        <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${activity.duration}</span>
            <span class="workout__unit">min</span>
        </div>
    </li >
`

    containerWorkouts.insertAdjacentHTML("beforeend", html);
}