const departures = [
  494, 499, 500, 517, 520, 523, 530, 556, 563, 576, 586, 613, 625,
];

const body = document.querySelector("body");
const container = document.createElement("ul");
body.appendChild(container);

departures.forEach((element) => {
  const hours = Math.floor(element / 60);
  const minutes = element % 60;
  container.innerHTML += `<li>${hours}:${minutes}</li>`;
  console.log(`${hours}:${minutes}`);
});
