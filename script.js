const departures = [
  494, 499, 500, 517, 520, 523, 530, 556, 563, 576, 586, 613, 625,
];

const departuresNew = [];

const newestDepartures = [
  {
    time: { hrs: 8, mins: 14 },
    train: "Acela Express",
    no: 2153,
    to: "Washington, DC",
    status: "",
    track: 2,
  },
  {
    time: { hrs: 8, mins: 19 },
    train: "New Haven Line",
    no: 1541,
    to: "Grand Central Terminal",
    status: "On Time",
    track: 14,
  },
  {
    time: { hrs: 8, mins: 20 },
    train: "Shore Line East",
    no: 1606,
    to: "Old Saybrook",
    status: "On Time",
    track: 12,
  },
  {
    time: { hrs: 8, mins: 37 },
    train: "N.E. Regional",
    no: 190,
    to: "Boston South Station",
    status: "On Time",
    track: 1,
  },
  {
    time: { hrs: 8, mins: 40 },
    train: "Shuttle",
    no: 490,
    to: "Springfield",
    status: "On Time",
    track: 3,
  },
  {
    time: { hrs: 8, mins: 43 },
    train: "N.E. Regional",
    no: 96,
    to: "Newport News",
    status: "On Time",
    track: 2,
  },
  {
    time: { hrs: 8, mins: 50 },
    train: "New Haven Line",
    no: 1545,
    to: "Grand Central Terminal",
    status: "On Time",
    track: 8,
  },
  {
    time: { hrs: 9, mins: 16 },
    train: "Shore Line East",
    no: 1610,
    to: "Old Saybrook",
    status: "On Time",
    track: 10,
  },
  {
    time: { hrs: 9, mins: 23 },
    train: "New Haven Line",
    no: 1549,
    to: "Grand Central Terminal",
    status: "On Time",
    track: 14,
  },
  {
    time: { hrs: 9, mins: 36 },
    train: "Acela Express",
    no: 2150,
    to: "Boston-South Sta.",
    status: "",
    track: 1,
  },
  {
    time: { hrs: 9, mins: 46 },
    train: "New Haven Line",
    no: 1551,
    to: "Grand Central Terminal",
    status: "On Time",
    track: 8,
  },
  {
    time: { hrs: 10, mins: 13 },
    train: "N.E. Regional",
    no: 170,
    to: "Boston South Station",
    status: "On Time",
    track: 2,
  },
  {
    time: { hrs: 10, mins: 25 },
    train: "New Haven Line",
    no: 1553,
    to: "Grand Central Terminal",
    status: "On Time",
    track: 14,
  },
];

//accessing all the keys and creating a table head based on them
const keys = Object.keys(newestDepartures[0]);

keys.forEach((element) => {
  document.querySelector("tr").innerHTML += `
  <th class="table-heading">${element.toUpperCase()}</th>
  `;
});

//function that creates a DOM based on HTML
const creatingHTML = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.firstChild;
};

//creating the DOM elements for all the array items
newestDepartures.forEach((element) => {
  const tableRow = document.createElement("tr");
  tableRow.classList.add("table-row");

  tableRow.innerHTML = `<td class="table-cell">${element.time.hrs}:${element.time.mins}</td>
   <td class="table-cell">${element.train}</td>
   <td class="table-cell">${element.no}</td>
   <td class="table-cell">${element.to}</td>
   <td class="table-cell" id="status">${element.status}</td>
   <td class="table-cell">${element.track}</td>
   <td class="table-cell"><button>Status</button></td>`;

  document.querySelector("tbody").appendChild(tableRow);

  //adding features to the butotn
  const button = tableRow.querySelector("button");
  button.addEventListener("click", () => {
    //changing the color of the row
    button.parentNode.parentNode.classList.toggle("delayed");
    button.parentNode.parentNode.classList.toggle("table-row");

    //changing the text in the table
    const status =
      button.parentNode.parentNode.querySelector("td[id='status']");

    if (status.textContent !== "On Time" && status.textContent !== "") {
      status.textContent = "On Time";
    } else {
      status.textContent = "";
      const input = creatingHTML(
        "<input type='number' placeholder='Number of minutes'>"
      );
      status.appendChild(input);

      status.addEventListener("keyup", (event) => {
        if (event.code === "Enter") {
          const minutes = Number(input.value);
          status.textContent = `${minutes}min delay`;
        }
      });
    }

    //changing the status in an array element
    if (element.status == "Delayed") {
      element.status = "On Time";
    } else {
      element.status = "Delayed";
    }
  });
});
