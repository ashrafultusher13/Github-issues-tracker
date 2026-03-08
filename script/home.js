const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");
const issueNum = document.getElementById("issue-count").innerText;
let issueArr = [];

const loadIssueCard = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((object) => {
      issueArr = object.data;
      showAllIssueCard(issueArr);
      issuesCount("all");
    });
};

const btnActive = (id) => {
  allBtn.classList.remove("btn-primary");
  openBtn.classList.remove("btn-primary");
  closedBtn.classList.remove("btn-primary");

  if (id === "open-btn") {
    openBtn.classList.add("btn-primary");
    showOpenCard(issueArr);
    issuesCount("open");
  } else if (id === "closed-btn") {
    closedBtn.classList.add("btn-primary");
    showClosedCard(issueArr);
    issuesCount("closed");
  } else {
    allBtn.classList.add("btn-primary");
    showAllIssueCard(issueArr);
    issuesCount("all");
  }
};

const issuesCount = (type) => {
  const issueCountElement = document.getElementById("issue-count");

  if (type == "open") {
    issueCountElement.innerText = filterIssues("open").length;
  } else if (type == "closed") {
    issueCountElement.innerText = filterIssues("closed").length;
  } else {
    issueCountElement.innerText = issueArr.length;
  }
};

const showAllIssueCard = (issues) => {
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = "";

  issues.forEach((issue) => {
    const card = document.createElement("div");
    card.innerHTML = `
          <div class="bg-orange-200 rounded-lg shadow">
            <!-- Card up -->
            <div class="p-4 space-y-2">
              <!-- card header -->
              <div class="flex justify-between items-center">
                <img class="w-[30px]" src="./assets/Open-Status.png" alt="" />
                <p>${issue.status}</p>
                <span>${issue.priority}</span>
              </div>
              <!-- card details no div -->
              <h2 class="font-semibold text-xl">${issue.title}</h2>
              <p class="text-gray-400">${issue.description}</p>
              <!-- card labels -->
              <div class="flex gap-2">
                <span class="bg-yellow-400">${issue.labels[0]}</span>
                <span class="bg-yellow-400"
                  >${issue.labels[1] ? issue.labels[1] : ""}</span
                >
              </div>
            </div>
            <hr class="text-gray-400" />
            <!-- Card down -->
            <div class="p-4 flex justify-between">
              <div class="down-left">
                <p class="text-gray-400">
                #<span>${issue.id}</span> by ${issue.author}
              </p>
              <p class="text-gray-400">Assignee:${issue.assignee}</p>
              </div>
              <div class="down-right flex flex-col items-end">
                <p class="text-gray-400">${issue.createdAt}</p>
                <p class="text-gray-400">Updated:${issue.updatedAt}</p>
              </div>
            </div>
          </div>
    
    `;
    cardsContainer.appendChild(card);
  });
};

const filterIssues = (status) => {
  return issueArr.filter((issue) => issue.status === status);
};

const showOpenCard = (issues) => {
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = "";

  // const openArr = issues.filter((issue) => issue.status === "open");
  const openArr = filterIssues("open");

  openArr.forEach((issue) => {
    const card = document.createElement("div");
    card.innerHTML = `
          <div class="bg-orange-200 rounded-lg shadow">
            <!-- Card up -->
            <div class="p-4 space-y-2">
              <!-- card header -->
              <div class="flex justify-between items-center">
                <img class="w-[30px]" src="./assets/Open-Status.png" alt="" />
                <p>${issue.status}</p>
                <span>${issue.priority}</span>
              </div>
              <!-- card details no div -->
              <h2 class="font-semibold text-xl">${issue.title}</h2>
              <p class="text-gray-400">${issue.description}</p>
              <!-- card labels -->
              <div class="flex gap-2">
                <span class="bg-yellow-400">${issue.labels[0]}</span>
                <span class="bg-yellow-400"
                  >${issue.labels[1] ? issue.labels[1] : ""}</span
                >
              </div>
            </div>
            <hr class="text-gray-400" />
            <!-- Card down -->
            <div class="p-4 flex justify-between">
              <div class="down-left">
                <p class="text-gray-400">
                #<span>${issue.id}</span> by ${issue.author}
              </p>
              <p class="text-gray-400">Assignee:${issue.assignee}</p>
              </div>
              <div class="down-right flex flex-col items-end">
                <p class="text-gray-400">${issue.createdAt}</p>
                <p class="text-gray-400">Updated:${issue.updatedAt}</p>
              </div>
            </div>
          </div>
    
    `;
    cardsContainer.appendChild(card);
  });
};
const showClosedCard = (issues) => {
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = "";

  // const closedArr = issues.filter((issue) => issue.status === "closed");
  const closedArr = filterIssues("closed");

  closedArr.forEach((issue) => {
    const card = document.createElement("div");
    card.innerHTML = `
          <div class="bg-orange-200 rounded-lg shadow">
            <!-- Card up -->
            <div class="p-4 space-y-2">
              <!-- card header -->
              <div class="flex justify-between items-center">
                <img class="w-[30px]" src="./assets/Open-Status.png" alt="" />
                <p>${issue.status}</p>
                <span>${issue.priority}</span>
              </div>
              <!-- card details no div -->
              <h2 class="font-semibold text-xl">${issue.title}</h2>
              <p class="text-gray-400">${issue.description}</p>
              <!-- card labels -->
              <div class="flex gap-2">
                <span class="bg-yellow-400">${issue.labels[0]}</span>
                <span class="bg-yellow-400"
                  >${issue.labels[1] ? issue.labels[1] : ""}</span
                >
              </div>
            </div>
            <hr class="text-gray-400" />
            <!-- Card down -->
            <div class="p-4 flex justify-between">
              <div class="down-left">
                <p class="text-gray-400">
                #<span>${issue.id}</span> by ${issue.author}
              </p>
              <p class="text-gray-400">Assignee:${issue.assignee}</p>
              </div>
              <div class="down-right flex flex-col items-end">
                <p class="text-gray-400">${issue.createdAt}</p>
                <p class="text-gray-400">Updated:${issue.updatedAt}</p>
              </div>
            </div>
          </div>
    
    `;
    cardsContainer.appendChild(card);
  });
};

loadIssueCard();

// {
// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"
// },
