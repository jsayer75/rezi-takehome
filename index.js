function fetchData(dataOffset = 0) {
  fetch("./Data.json")
    .then((response) => response.json())
    .then((data) => {
      const renderData = data.slice(dataOffset, dataOffset + 20);
      addData(renderData);
    })
    .catch((error) => console.log(error));
}

function addData(data) {
  const listContainer = document.getElementById("listContainer");
  data.forEach((pet) => {
    listContainer.appendChild(createListNode(pet));
  });
}

function createListNode(petData) {
  const list = document.createElement("li");

  list.addEventListener("click", () => listClickHandler(petData.id));
  list.classList.add("list-group-item", "ls");
  list.setAttribute("data-bs-toggle", "modal");
  list.setAttribute("data-bs-target", "#petModal");

  const row = document.createElement("div");
  row.classList.add("row");

  row.innerHTML = `
    <div class="col-1">
    <img
      src=${petData.pic}
      class="img-fluid rounded-start img-size"
    />
  </div>
  <div class="col-11">
    <div class="card-body">
      <h5 class="card-title">${petData.name}</h5>
      <p class="card-text">${petData.age} year old</p>
    </div>
  </div>
    `;

  list.append(row);
  return list;
}

window.addEventListener("scroll", () => {
  if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 100) {
    const dataOffset = (document.body.offsetHeight - 99) / 97 + 1;
    // 99 = height of navbar and padding
    // 97 = height of one card
    fetchData(dataOffset);
  }
});


async function listClickHandler(id) {
  const petInfoWrapper = document.getElementById("petInfo");
  petInfoWrapper.innerHTML = `<div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>`;

  const res = await fetch("./Data.json");
  const data = await res.json();
  const targetedData = data.find((d) => d.id === id);
  petInfoWrapper.innerHTML = `
    <div class="mb-1 "><span class="fw-bold">Name: </span> ${targetedData.name}</div>
    <div class="mb-1 "><span class="fw-bold">Type: </span> ${targetedData.type}</div>
    <div class="mb-1 "><span class="fw-bold">Gender: </span> ${targetedData.gender}</div>
    <div class="mb-1 "><span class="fw-bold">Age: </span> ${targetedData.age}</div>
    <div class="mb-1 "><span class="fw-bold">Description: </span> ${targetedData.description}</div>
    <div class="mb-1 "><span class="fw-bold">Adoption fee: </span> $${targetedData.fee}</div>
  `;
}


fetchData();
