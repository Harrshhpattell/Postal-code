async function load(event) {
  event.preventDefault();
  // Display the spinner
  const spinner = document.getElementById("loadingSpinner");
  spinner.classList.remove("d-none");

  // Clear previous results
  const table = document.getElementById("results");
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
  //fetch user pincode
  const pincode = document.getElementById("postalCode").value;
  let url = "https://api.postalpincode.in/pincode/" + pincode;
  let myobject = await (await fetch(url)).json();
  const check = myobject[0]["Status"];
  const postOffice = myobject[0]["PostOffice"];
  const dataRows = document.getElementById("dataRows");
  const dataHeader = document.getElementById("dataHeader");

  if (check === "Success") {
    dataHeader.innerHTML = `<tr>
    <th scope="col">Name</th>
    <th scope="col">BranchType</th>
    <th scope="col">Circle</th>
    <th scope="col">District</th>
    <th scope="col">Division</th>
    <th scope="col">Region</th>
    <th scope="col">Block</th>
    <th scope="col">DeliveryStatus</th>
  </tr>`;
    for (const i in postOffice) {
      let Name = postOffice[i]["Name"];
      let BranchType = postOffice[i]["BranchType"];
      let Circle = postOffice[i]["Circle"];
      let District = postOffice[i]["District"];
      let Division = postOffice[i]["Division"];
      let Region = postOffice[i]["Region"];
      let Block = postOffice[i]["Block"];
      let DeliveryStatus = postOffice[i]["DeliveryStatus"];

      let row = `
      <tr>
      <th scope='row'>${Name}</th>
        
        <td>${BranchType}</td>
        <td>${Circle}</td>
        <td>${District}</td>
        <td>${Division}</td>
        <td>${Region}</td>
        <td>${Block}</td>
        <td>${DeliveryStatus}</td>
        
      </tr>
    `;

      dataRows.innerHTML += row;
    }
  } else {
    table.style.color = "red";
    table.innerHTML =
      "Sorry, the provided postal code is incorrect or invalid. Please make sure to enter a valid 6-digit postal code and try again.";
  }
  // Hide the loading spinner after the fetch is complete
  spinner.classList.add("d-none");
}
