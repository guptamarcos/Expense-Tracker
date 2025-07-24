const earningBtn = document.querySelector("#earning");
const expenseBtn = document.querySelector("#expense");
const inpText = document.querySelector("#inp-text");
const inpAmount = document.querySelector("#inp-amount");
const balAmount = document.querySelector("#bal-amount");
const allList = document.querySelector(".earn-expense-cards");

let currCard = null;
let flag = true;

function inputFieldValidation() {
  // FOR REAL TIME GETTING THE AMOUNT VALUE
  let amount = Number(inpAmount.value);
  if (inpText.value === "") {
    alert("Fill The Text");
    return false;
  } else if (amount < 0) {
    alert("Enter Valid Amount");
    return false;
  } else if (inpAmount.value === "") {
    alert("Enter The Amount");
    return false;
  }
  return true;
}

function addCart(symbol, symbol_class) {
  if (!inputFieldValidation()) {
    return;
  }
  
  let currBal = balAmount.textContent;
  currBal = (symbol === "C") ? Number(currBal) + Number(inpAmount.value) : Number(currBal) - Number(inpAmount.value);
  balAmount.textContent = currBal;

  const list = document.createElement("li");
  list.setAttribute("class", "list");
  list.innerHTML = `
    <p class="list-text">${inpText.value}</p>
    <span class="enter-bal">₹${inpAmount.value}</span>
    <span class="icon-${symbol_class}">${symbol}</span>
    <div class="icons hide">
      <i class='fa-solid fa-trash'></i> 
      <i class='fa-solid fa-pen'></i>
    </div>`;
  allList.appendChild(list);

  inpText.value = "";
  inpAmount.value = "";

  const childCount = allList.childElementCount;
  if (childCount > 6) {
    allList.style.width = "100%";
    allList.style.overflowY = "scroll";
  }
}

function editCart(symbol){
  const priceNode = currCard.children[2];
  priceNode.className = ""; // TO REMOVE ALL THE CLASSES WITHOUT GIVING THE NAME SO THAT I CAN ASSIGN MY CUSTOMIZE CLASS
  
  let currBal = balAmount.textContent;
  if(symbol === "C"){
    currBal = Number(currBal) + Number(inpAmount.value);
    priceNode.textContent = 'C';
    priceNode.classList.add("icon-c");
  }
  else{
    currBal = Number(currBal) - Number(inpAmount.value);
    priceNode.textContent = 'D';
    priceNode.classList.add("icon-d");
  }
  balAmount.textContent = currBal;
  
  currCard.children[0].textContent = inpText.value;
  currCard.children[1].textContent = `₹${inpAmount.value}`;
  
  inpText.value = "";
  inpAmount.value = "";

  flag = true;
}

earningBtn.addEventListener("click", () => {
  if(flag){
    addCart("C", "c");
  }
  else{
    editCart("C");
  }
});

expenseBtn.addEventListener("click", () => {
  if(flag){
    addCart("D", "d");
  }
  else{
    editCart("D");
  }
});

allList.addEventListener("click", (evt) => {
  const currElement = evt.target;
  console.log(currElement);
  if (currElement.className === "list-text") {
    // HERE currElement WILL BE PARAGRAPH
    const parentElement = currElement.parentElement;
    const icons = parentElement.lastElementChild;
    icons.classList.toggle("hide");
  } 

  else if (currElement.className === "fa-solid fa-trash") {
    currCard = evt.target.parentElement.parentElement;
    allList.removeChild(currCard);
  } 

  else if (currElement.className === "fa-solid fa-pen") {
    currCard = evt.target.parentElement.parentElement;               // currCard WILL BE CURRENT CARD WHOLE ITEM WHICH IS LI
    inpText.value = currCard.firstElementChild.textContent;          // firstElementChild IS THE PARAGRAPH NODE 
    inpAmount.value = currCard.children[1].replace("₹", "").trim();  // children[1] IS THE PRICE NODE 
    flag = false;
  }
});
