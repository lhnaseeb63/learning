// ----------------------------------------------------------------   Hide and Reveal Filter Options
const searchWrapper = document.querySelector(".searchBar-wrapper");
const filterBtn = document.querySelector(".filter-button");
const searchInput = document.querySelector(".searchBar-input");

filterBtn.addEventListener("click", () => {
  searchWrapper.classList.toggle("activeFilter");
});

// ----------------------------------------------------------------   Filter toggle with typing
// if the user has the filters showing and is typing in the search box, if they exceed x characters, hide filter options.
const maxNumOfChars = 9;

const countCharacters = () => {
  if (searchWrapper.classList.contains("activeFilter")) {
    // Calculate the number of characters entered into the search bar
    let numOfEnteredChars = searchInput.value.length;

    if (numOfEnteredChars > maxNumOfChars) {
      searchWrapper.classList.remove("activeFilter");
    }
  }
};

searchInput.addEventListener("input", countCharacters);

// ----------------------------------------------------------------   toggle search bar widths with navBar toggle
const navBarBtn = document.querySelector("#btn");
const searchBar = document.querySelector(".searchBar");

navBarBtn.addEventListener("click", () => {
  console.log("still works");
  searchBar.classList.toggle("navOpen");
});

// ----------------------------------------------------------------   toggle kitabs
const kitabToggleBtns = document.querySelectorAll(".kitab-toggle");

// toggle class on the first child of kitab
kitabToggleBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentNode.parentNode.parentNode.classList.toggle("toggled-kitab");
  });
});

// ----------------------------------------------------------------   Set complete or incomplete flag
// this has to be done with info pulled from the server.
// if complete, disable edit button using ng-disable

// ----------------------------------------------------------------   Apply class to selected Kitab, update counter
// will need to be fleshed out with angularJS
// add ng-attribute ids to each checkbox and use ng-click.
// for now just filling out basic functionality for GUI. Will hardcode IDs until I start angular
const kitabCounter = document.querySelector(".kitab-count");
var kitabCount = 0;

function kitabSelected(kitabCheckboxID) {
  const isChecked = kitabCheckboxID.checked;
  // path to div we want to apply class to
  const kitabWrapper = kitabCheckboxID.parentNode.parentNode;
  kitabWrapper.classList.toggle("selected-kitab");

  if (isChecked) {
    kitabCount++;
  } else {
    kitabCount--;
  }
  kitabCounter.innerHTML = `${kitabCount}`;
}

// ------------------------------------------------------------------------------------------------------------   Filter Selections
/*
 * If the user selects a filter, apply filter-selected class to selected-filters div and have it appear
 * With each filter selection, add another filter-selection div with the user's selection
 * If the user clicks the 'x' button, remove the filter-selection div from the DOM
 * If there are no filter-selections left, remove filter-selected class from the selected-filters div
 */

const selectedFiltersDiv = document.querySelector(".selected-filters"); // appending to this

var filtersChecked = {
  input: 0,
  fromTo: 0,
  docType: 0,
  completeNot: 0,
  myHistory: 0,
  sortBy: 0,
};

function createFilter(text) {
  const filter = document.createElement("div");
  const filterText = document.createElement("span");
  const filterIcon = document.createElement("i");
  filter.classList.add("filter");

  filterIcon.addEventListener("click", () => {
    filterIcon.parentElement.remove();
    removeFilterFromIcon(text);
  });

  if (text === "date") {
    filter.id = dateString + "ID";
    filterText.innerHTML = dateString;
    prevDateRange = dateString;
  } else {
    filter.id = `${text}` + "ID";
    filterText.innerHTML = `${text}`;
  }

  filterText.classList.add("filter-text");
  filterIcon.classList.add("bx");
  filterIcon.classList.add("bx-x");
  filterIcon.classList.add("filter-icon");
  filter.appendChild(filterText);
  filter.appendChild(filterIcon);
  selectedFiltersDiv.appendChild(filter);
}

function removeFilter(text) {
  console.log(`removing ${text} filter`);
  const element = document.getElementById(`${text}ID`);
  element.remove();
}

function removeFilterFromIcon(text) {
  if (docTypeIDs.includes(text)) {
    filtersChecked.docType = 0;
    docTypeFilter.value = "none";
  } else if (text === "منجز" || text === "قيد الإنجاز") {
    filtersChecked.completeNot = 0;
    completeStatus.checked = false;
    notCompleteStatus.checked = false;
  } else if (text === "date") {
    filtersChecked.fromTo = 0;
    fromFilter.value = 0;
    toFilter.value = 0;
  } else if (text === "ادخالاتي") {
    filtersChecked.myHistory = 0;
    myHistoryFilter.checked = false;
  } else if (text === "أقدم") {
    filtersChecked.sortBy = 0;
    sortByFilter.value = "أحدث";
  } else {
    filtersChecked.input = 0;
    searchBarInputField.value = "";
  }

  console.log(filtersChecked);
  toggleSelectedFiltersDiv();
}

function toggleSelectedFiltersDiv() {
  var filters = Object.values(filtersChecked);
  console.log(filters);
  if (
    filters.includes(1) &&
    selectedFiltersDiv.classList.contains("filterSelected") === false
  ) {
    selectedFiltersDiv.classList.add("filterSelected");
    console.log("adding filterSelected");
  } else if (
    filters.includes(1) &&
    selectedFiltersDiv.classList.contains("filterSelected") === true
  ) {
    console.log("do nothing");
  } else {
    selectedFiltersDiv.classList.remove("filterSelected");
    console.log("removing filterSelected");
  }
}

// ------------------------------------------------------------------------  search input
const submitSearchBtn = document.querySelector(".search-button");
const searchBarInputField = document.querySelector(".searchBar-input");

submitSearchBtn.addEventListener("click", () => {
  var searchString = document.querySelector('input[type="search"]').value;
  // I dont have a check for previous search terms because in my mind the user should be able to search as many as they want.
  // All they would have to do is click 'x' on the filter to remove the term from search
  if (searchString !== "") {
    console.log("doesnt exist, go ahead");
    createFilter(searchString);
    filtersChecked.input = 1;
    toggleSelectedFiltersDiv();
  }
});

// ------------------------------------------------------------------------  from and to dates in one div
const fromFilter = document.getElementById("date-from");
const toFilter = document.getElementById("date-to");
var dateRange = [];
var dateString;
var prevDateRange;

function createDatesFilter() {
  if (dateRange[0] && dateRange[1]) {
    dateString = dateRange.join(" - ");
    createFilter("date");
    filtersChecked.fromTo = 1;
    console.log(filtersChecked);
    toggleSelectedFiltersDiv();
  }
}

function checkDateID() {
  if (document.getElementById(prevDateRange + "ID")) {
    removeFilter(prevDateRange);
  }
}

fromFilter.addEventListener("change", () => {
  checkDateID();
  dateRange[0] = fromFilter.value;
  createDatesFilter();
});

toFilter.addEventListener("change", () => {
  checkDateID();
  dateRange[1] = toFilter.value;
  createDatesFilter();
});

// ------------------------------------------------------------------------  drop down selection
const docTypeFilter = document.getElementById("docTypeDropdown");
const docTypeIDs = ["الأسئلة البرلمانية", "الشكاوي", "الإقتراحات", "اللجان"];

function checkForExistingDocType() {
  docTypeIDs.forEach((type) => {
    if (document.getElementById(`${type}ID`)) {
      console.log(`${type} exists on DOM`);
      removeFilter(type);
    }
  });
}

docTypeFilter.addEventListener("change", () => {
  if (docTypeFilter.value !== "none") {
    checkForExistingDocType();
    createFilter(docTypeFilter.value);
    filtersChecked.docType = 1;
    console.log(filtersChecked);
    toggleSelectedFiltersDiv();
  } else {
    filtersChecked.docType = 0;
    checkForExistingDocType();

    toggleSelectedFiltersDiv();
  }
});

// ------------------------------------------------------------------------  Sort By drop down selection
const sortByFilter = document.getElementById("sort-by");
const sortByOptions = ["أحدث", "أقدم"];
const sortByToggleBtn = document.querySelector(".bx-sort");

// I only want if the user selects by the oldest to show as a filter
// by default the results will be by most recent
function checkForExistingSortBy() {
  sortByOptions.forEach((option) => {
    console.log(option);
    if (document.getElementById(`${option}ID`)) {
      console.log(`${option} exists on DOM`);
      removeFilter(option);
    }
  });
}

function createSortByFilter() {
  checkForExistingSortBy();
  createFilter(sortByFilter.value);
  filtersChecked.sortBy = 1;
  console.log(filtersChecked);
  toggleSelectedFiltersDiv();
}

sortByFilter.addEventListener("change", () => {
  if (sortByFilter.value !== "أحدث") {
    checkForExistingSortBy();
    createSortByFilter();
  } else {
    filtersChecked.sortBy = 0;
    checkForExistingSortBy();
    toggleSelectedFiltersDiv();
  }
});

sortByToggleBtn.addEventListener("click", () => {
  console.log("click");
  console.log(sortByFilter.value);
  if (sortByFilter.value === "أحدث") {
    sortByFilter.value = "أقدم";
    createSortByFilter();
  } else if (sortByFilter.value === "أقدم") {
    removeFilter(sortByFilter.value);
    sortByFilter.value = "أحدث";

    filtersChecked.sortBy = 0;
    toggleSelectedFiltersDiv();
  }
});

// ------------------------------------------------------------------------  radio selection
const statusFilter = document.querySelectorAll(
  'input[name="complete-notComplete"]'
);
var notCompleteStatus = statusFilter[0];
var completeStatus = statusFilter[1];

notCompleteStatus.addEventListener("change", () => {
  if (notCompleteStatus.checked) {
    if (document.getElementById(`${completeStatus.value}ID`)) {
      removeFilter(completeStatus.value);
      createFilter(notCompleteStatus.value);
      filtersChecked.completeNot = 1;
      console.log(filtersChecked);
      toggleSelectedFiltersDiv();
    } else {
      createFilter(notCompleteStatus.value);
      filtersChecked.completeNot = 1;
      console.log(filtersChecked);
      toggleSelectedFiltersDiv();
    }
  }
});

completeStatus.addEventListener("change", () => {
  if (completeStatus.checked) {
    if (document.getElementById(`${notCompleteStatus.value}ID`)) {
      removeFilter(notCompleteStatus.value);
      createFilter(completeStatus.value);
      filtersChecked.completeNot = 1;
      console.log(filtersChecked);
      toggleSelectedFiltersDiv();
    } else {
      createFilter(completeStatus.value);
      filtersChecked.completeNot = 1;
      console.log(filtersChecked);
      toggleSelectedFiltersDiv();
    }
  }
});

// ------------------------------------------------------------------------  checkbox selection
const myHistoryFilter = document.querySelector("input[name=my-recent]");

myHistoryFilter.addEventListener("change", () => {
  if (myHistoryFilter.checked) {
    console.log("My history checked");
    createFilter("ادخالاتي");
    filtersChecked.myHistory = 1;
    console.log(filtersChecked);
    toggleSelectedFiltersDiv();
  } else {
    console.log("My history not checked");
    removeFilter("ادخالاتي");
    filtersChecked.myHistory = 0;
    console.log(filtersChecked);
    toggleSelectedFiltersDiv();
  }
});
