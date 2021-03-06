//creating a Row Widget
class RowWidget {
  constructor(hours, minutes, train, no, to, status, track) {
    this.element = document.createElement("tr");
    this.hours = hours;
    this.minutes = minutes;
    this.train = train;
    this.no = no;
    this.to = to;
    this.status = status;
    this.track = track;
    this.createRow();
  }
  createRow() {
    this.element.classList.add("table-row");
    this.element.innerHTML = `<td class="table-cell">${this.hours}:${this.minutes}</td>
   <td class="table-cell">${this.train}</td>
   <td class="table-cell">${this.no}</td>
   <td class="table-cell">${this.to}</td>
   <td class="table-cell" id="status">${this.status}</td>
   <td class="table-cell">${this.track}</td>
   <td class="table-cell"><button>Status</button></td>`;

    //adding features to the butotn
    const button = this.element.querySelector("button");
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
      if (this.status == "Delayed") {
        this.status = "On Time";
      } else {
        this.status = "Delayed";
      }
    });
    //adding the row to the table
    document.querySelector("tbody").appendChild(this.element);
  }
}

//creating a class for train
class Train {
  constructor(time, train, no, to, status, track) {
    this.no = no;
    this.hours = time.hrs;
    this.minutes = time.mins;
    this.to = to;
    this.track = track;
    this.train = train;
    this.status = status;
  }

  createOnPage() {
    const row = new RowWidget(
      this.hours,
      this.minutes,
      this.train,
      this.no,
      this.to,
      this.status,
      this.train
    );
  }
}

//fetching the data from an external source
const gettingData = async () => {
  const img = document.querySelector(".loader");
  img.classList.toggle("loader--shown");
  try {
    const response = await fetch(
      "https://classes.codingbootcamp.cz/assets/classes/api/departures-slow.php"
    );

    const responseData = await response.json();

    console.log(responseData);

    //accessing all the keys and creating a table head based on them
    const keys = Object.keys(responseData[0]);

    keys.forEach((element) => {
      document.querySelector("tr").innerHTML += `
  <th class="table-heading">${element.toUpperCase()}</th>
  `;
    });

    // creating the DOM elements for all the array items
    responseData.forEach((element) => {
      const train = new Train(
        element.time,
        element.train,
        element.no,
        element.to,
        element.status,

        element.track
      );
      train.createOnPage();
    });
  } catch (e) {
    console.log(e);
  } finally {
    img.classList.toggle("loader--shown");
  }
};

//giving functionality to the button
const button = document.querySelector(".load");
button.addEventListener("click", () => {
  button.style.display = "none";
  gettingData();
});

//function that creates a DOM based on HTML
const creatingHTML = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.firstChild;
};
