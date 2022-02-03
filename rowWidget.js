export class RowWidget {
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
    document.querySelector("tbody").appendChild(this.element);
  }
}
