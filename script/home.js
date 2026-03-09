const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");
const issueNum = document.getElementById("issue-count").innerText;
let issueArr = [];
let searchedIssue = [];

const loadIssueCard = () => {
  loadingSpinner(true);
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((object) => {
      issueArr = object.data;
      showAllIssueCard(issueArr);
      issuesCount("all");
    });
};

const loadIssueDetails = (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((object) => showDetails(object.data));
};

const loadingSpinner = (status) => {
  if (status === true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("main-container").classList.add("hidden");
  } else if (status === false) {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("main-container").classList.remove("hidden");
  }
};

const showDetails = (issue) => {
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
  <h3 class="text-lg font-bold">${issue.title}</h3>
        <div class="flex gap-7 items-center">
          <p
            class="${issue.status === "open" ? "bg-green-600" : "bg-purple-600"} rounded-full px-3 py-1 text-white font-medium text-[12px]"
          >
            ${issue.status === "open" ? "Opened" : "Closed"}
          </p>

          <ul class="flex gap-7 list-disc text-sm text-gray-400">
            <li>${issue.status === "open" ? "Opened" : "Closed"} by ${issue.author}</li>
            <li>${issue.createdAt}</li>
          </ul>
        </div>

        <div class="flex gap-2">
         <span class="${issue.labels[0] === "enhancement" ? "bg-green-200" : "bg-red-200"} ${issue.labels[0] === "enhancement" ? "text-green-500" : "text-red-500"} rounded">${issue.labels[0]}</span>
                <span class="${issue.labels[1] === "enhancement" ? "bg-green-200" : "bg-yellow-200"} ${issue.labels[1] === "enhancement" ? "text-green-500" : "text-yellow-600"} rounded"
                  >${issue.labels[1] ? issue.labels[1] : " "}</span
                >
        </div>

        <p class="text-gray-400">
          ${issue.description}
        </p>

        <div
          class="bg-gray-100 flex justify-between items-center p-4 rounded-md"
        >
          <div>
            <p class="text-gray-400">Assignee:</p>
            <p class="font-semibold">${issue.assignee}</p>
          </div>
          <div class="flex flex-col justify-center items-center">
            <p class="text-gray-400">Priority:</p>
            <p class="${issue.priority === "high" ? "bg-red-200" : issue.priority === "medium" ? "bg-yellow-200" : "bg-purple-200"} py-1 px-5 rounded-2xl ${issue.priority === "high" ? "text-red-500" : issue.priority === "medium" ? "text-yellow-600" : "text-purple-500"}">${issue.priority.toUpperCase()}</p>
          </div>
        </div>
  `;
  document.getElementById("issue-modal").showModal();
};

const btnActive = (id) => {
  loadingSpinner(true);

  setTimeout(() => {
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
  }, 0);
};

const issuesCount = (type) => {
  const issueCountElement = document.getElementById("issue-count");

  if (type == "open") {
    issueCountElement.innerText = filterIssues("open").length;
  } else if (type == "closed") {
    issueCountElement.innerText = filterIssues("closed").length;
  } else if (type == "searched") {
    issueCountElement.innerText = searchedIssue.length;
  } else {
    issueCountElement.innerText = searchedIssue.length
      ? searchedIssue.length
      : issueArr.length;
  }
};

const showAllIssueCard = (issues) => {
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = "";

  issues.forEach((issue) => {
    const card = document.createElement("div");

    card.innerHTML = `
          <div class="bg-base-100 h-full rounded-lg shadow ${issue.status === "open" ? "border-t-5 border-green-600" : "border-t-5 border-purple-600"} cursor-pointer">
            <!-- Card up -->
            <div class="p-4 space-y-2">
              <!-- card header -->
              <div class="flex justify-between items-center">
                <img class="w-[30px]" src="${issue.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status.png"}" alt="" />
                <span class="${issue.priority === "high" ? "bg-red-200" : issue.priority === "medium" ? "bg-yellow-200" : "bg-purple-200"} py-1 px-5 rounded-2xl ${issue.priority === "high" ? "text-red-500" : issue.priority === "medium" ? "text-yellow-600" : "text-purple-500"}">${issue.priority.toUpperCase()}</span>
              </div>
              <!-- card details no div -->
              <h2 class="font-semibold text-xl">${issue.title}</h2>
              <p class="text-gray-400">${issue.description}</p>
              <!-- card labels -->
              <div class="flex gap-2">    
                <span class="${issue.labels[0] === "enhancement" ? "bg-green-200" : "bg-red-200"} ${issue.labels[0] === "enhancement" ? "text-green-500" : "text-red-500"} rounded">${issue.labels[0]}</span>
                <span class="${issue.labels[1] === "enhancement" ? "bg-green-200" : "bg-yellow-200"} ${issue.labels[1] === "enhancement" ? "text-green-500" : "text-yellow-600"} rounded"
                  >${issue.labels[1] ? issue.labels[1] : " "}</span
                >
              </div>
            </div>
            <hr class="text-gray-400" />
            <!-- Card down -->
            <div class="p-4 flex justify-between gap-4">
              <div class="down-left">
                <p class="text-gray-400 text-sm">
                #<span>${issue.id}</span> by ${issue.author}
              </p>
              <p class="text-gray-400 text-sm">Assignee:${issue.assignee}</p>
              </div>
              <div class="down-right flex flex-col items-start">
                <p class="text-gray-400 text-sm">${issue.createdAt}</p>
                <p class="text-gray-400 text-sm">Updated:${issue.updatedAt}</p>
              </div>
            </div>
          </div>
    
    `;

    cardsContainer.appendChild(card);

    card.addEventListener("click", () => {
      const cardId = issue.id;
      loadIssueDetails(cardId);
    });
  });
  loadingSpinner(false);
};

const filterIssues = (status) => {
  const source = searchedIssue.length ? searchedIssue : issueArr;
  return source.filter((issue) => issue.status === status);
};

const showOpenCard = (issues) => {
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = "";

  const openArr = filterIssues("open");

  openArr.forEach((issue) => {
    const card = document.createElement("div");
    card.innerHTML = `
          <div class="bg-base-100 h-full rounded-lg shadow ${issue.status === "open" ? "border-t-5 border-green-600" : "border-t-5 border-purple-600"} cursor-pointer">
            <!-- Card up -->
            <div class="p-4 space-y-2">
              <!-- card header -->
              <div class="flex justify-between items-center">
                <img class="w-[30px]" src="${issue.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status.png"}" alt="" />
                <span class="${issue.priority === "high" ? "bg-red-200" : issue.priority === "medium" ? "bg-yellow-200" : "bg-purple-200"} py-1 px-5 rounded-2xl ${issue.priority === "high" ? "text-red-500" : issue.priority === "medium" ? "text-yellow-600" : "text-purple-500"}">${issue.priority.toUpperCase()}</span>
              </div>
              <!-- card details no div -->
              <h2 class="font-semibold text-xl">${issue.title}</h2>
              <p class="text-gray-400">${issue.description}</p>
              <!-- card labels -->
              <div class="flex gap-2">    
                <span class="${issue.labels[0] === "enhancement" ? "bg-green-200" : "bg-red-200"} ${issue.labels[0] === "enhancement" ? "text-green-500" : "text-red-500"} rounded">${issue.labels[0]}</span>
                <span class="${issue.labels[1] === "enhancement" ? "bg-green-200" : "bg-yellow-200"} ${issue.labels[1] === "enhancement" ? "text-green-500" : "text-yellow-600"} rounded"
                  >${issue.labels[1] ? issue.labels[1] : " "}</span
                >
              </div>
            </div>
            <hr class="text-gray-400" />
            <!-- Card down -->
            <div class="p-4 flex justify-between gap-4">
              <div class="down-left">
                <p class="text-gray-400 text-sm">
                #<span>${issue.id}</span> by ${issue.author}
              </p>
              <p class="text-gray-400 text-sm">Assignee:${issue.assignee}</p>
              </div>
              <div class="down-right flex flex-col items-start">
                <p class="text-gray-400 text-sm">${issue.createdAt}</p>
                <p class="text-gray-400 text-sm">Updated:${issue.updatedAt}</p>
              </div>
            </div>
          </div>
    
    `;
    cardsContainer.appendChild(card);

    card.addEventListener("click", () => {
      const cardId = issue.id;
      loadIssueDetails(cardId);
    });
  });
  loadingSpinner(false);
};
const showClosedCard = (issues) => {
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = "";

  const closedArr = filterIssues("closed");

  closedArr.forEach((issue) => {
    const card = document.createElement("div");
    card.innerHTML = `
          <div class="bg-base-100 h-full rounded-lg shadow ${issue.status === "open" ? "border-t-5 border-green-600" : "border-t-5 border-purple-600"} cursor-pointer">
            <!-- Card up -->
            <div class="p-4 space-y-2">
              <!-- card header -->
              <div class="flex justify-between items-center">
                <img class="w-[30px]" src="${issue.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status.png"}" alt="" />
                <span class="${issue.priority === "high" ? "bg-red-200" : issue.priority === "medium" ? "bg-yellow-200" : "bg-purple-200"} py-1 px-5 rounded-2xl ${issue.priority === "high" ? "text-red-500" : issue.priority === "medium" ? "text-yellow-600" : "text-purple-500"}">${issue.priority.toUpperCase()}</span>
              </div>
              <!-- card details no div -->
              <h2 class="font-semibold text-xl">${issue.title}</h2>
              <p class="text-gray-400">${issue.description}</p>
              <!-- card labels -->
              <div class="flex gap-2">    
                <span class="${issue.labels[0] === "enhancement" ? "bg-green-200" : "bg-red-200"} ${issue.labels[0] === "enhancement" ? "text-green-500" : "text-red-500"} rounded">${issue.labels[0]}</span>
                <span class="${issue.labels[1] === "enhancement" ? "bg-green-200" : "bg-yellow-200"} ${issue.labels[1] === "enhancement" ? "text-green-500" : "text-yellow-600"} rounded"
                  >${issue.labels[1] ? issue.labels[1] : " "}</span
                >
              </div>
            </div>
            <hr class="text-gray-400" />
            <!-- Card down -->
            <div class="p-4 flex justify-between gap-4">
              <div class="down-left">
                <p class="text-gray-400 text-sm">
                #<span>${issue.id}</span> by ${issue.author}
              </p>
              <p class="text-gray-400 text-sm">Assignee:${issue.assignee}</p>
              </div>
              <div class="down-right flex flex-col items-start">
                <p class="text-gray-400 text-sm">${issue.createdAt}</p>
                <p class="text-gray-400 text-sm">Updated:${issue.updatedAt}</p>
              </div>
            </div>
          </div>
    
    `;
    cardsContainer.appendChild(card);

    card.addEventListener("click", () => {
      const cardId = issue.id;
      loadIssueDetails(cardId);
    });
  });
  loadingSpinner(false);
};

loadIssueCard();

const searchFunc = () => {
  document.getElementById("search-btn").addEventListener("click", () => {
    const input = document.getElementById("search-input");
    const inputVal = input.value.trim().toLowerCase();

    fetch(
      `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${inputVal}`,
    )
      .then((res) => res.json())
      .then((matchIssue) => {
        searchedIssue = matchIssue.data;
        showAllIssueCard(searchedIssue);
        issuesCount("searched");
      });
  });
};

searchFunc();
