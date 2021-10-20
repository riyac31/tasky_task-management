const taskContainer = document.querySelector(".task__container");// new class of task container that is the card (query selector is way of selecting the child )
let globalStore = [];//array of objects
console.log(taskContainer);
// after extracting the data from the task data we are modifying to create new card
// donot use backtick and curly braces

const generateNewCard = (taskData) => `
  <div class="col-sm-12 col-md-6 col-lg-4">
  <div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
   <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
  <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"><i class="fas fa-trash-alt" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"></i></button>
  </div>
  <div class="card-body">
  <img class="card-img-top" src=${taskData.imageUrl} alt="...">
   <h5 class="card-title mt-3 fw-bolder text-primary">${taskData.taskTitle}</h5>
   <p class="card-text">${taskData.taskDescription}</p>
   <a href="#" class="btn btn-primary">${taskData.taskType}</a>
  </div>
  </div>
  </div>
  `;

//issue solved refresh krne se no chnage
const loadInitialCardData = () =>
{
  //localstorage to get tasky card data
const getCardData = localStorage.getItem("tasky");


  //covert to normal object
const {cards} = JSON.parse(getCardData);


  //loop over those array of task obejct to create HTML card , inject it to DOM
cards.map((cardObject) => {
  taskContainer.insertAdjacentHTML( "beforeend", generateNewCard(cardObject));//adding to adjacent.

  //update our globalStore
  globalStore.push(cardObject);
}

)

};

//Delete function

const deleteCard = (event) => {
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;

  globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);
  localStorage.setItem("tasky",JSON.stringify({cards: globalStore}));

  if(tagname === "BUTTON") {
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  } else {
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }
};

// rendering the user input dat to the backend
const saveChanges = () => {
  const taskData = {
    id: `${Date.now()}`,//dynamically saveChanges and unique
    imageUrl: document.getElementById("imageurl").value,//dont need the whole thing we need only the value
    taskTitle: document.getElementById("tasktitle").value,
    taskType: document.getElementById("tasktype").value,
    taskDescription: document.getElementById("taskdescription").value
  };


taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));
//refresh issue fixed
globalStore.push(taskData);
//converting object of object to array of object is done by stringify and string takes a key value pair and they are alwys present inside curly braces
localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));//id of the project is tasky and then we are pusing the global into localstorage

};

//Issues

// Page refreshes causes the data to get deleted
//API -> Application Programming Interface
//local storage -> Accessing application via local storage
//Interface -> Interface means middle man

//Features - Delete , edit , open the card
