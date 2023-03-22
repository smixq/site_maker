const showAddMenuHandler = function (evt) {
  const parentElement = evt.target.parentNode;
  const addMenuElement = parentElement.querySelector('.choose-elem');
  addMenuElement.classList.toggle('hidden');
};  
const addButtonElements = document.querySelectorAll('.add-btn');
addButtonElements.forEach(function (item) {
    return item.addEventListener('click', showAddMenuHandler);
  });


const changeLayoutHandler = function (evt) {
  const newLayout = evt.target.value;
  const layoutElement = document.querySelector('.layout');
  layoutElement.classList.remove('layout--landing');
  layoutElement.classList.remove('layout--blog');
  layoutElement.classList.remove('layout--shop');
  layoutElement.classList.add('layout--' + newLayout);
};
document.querySelector('.grid-select').addEventListener('change', changeLayoutHandler);


 const buttonDeleteHandler = function (evt) {
  const element = evt.target.parentNode;
  const wrapper = element.parentNode;
  const block = wrapper.parentNode;

  element.remove();

  const wrapperItems = wrapper.querySelectorAll('.element');
  if (wrapperItems.length === 0) {
     
    if (block.classList.contains('header')) {
      block.classList.add('header--empty');
    } 

    if (block.classList.contains('content')) {
      block.classList.add('content--empty');
    }

    if (block.classList.contains('footer')) {
      block.classList.add('footer--empty');
    }
  }
};


const editContentHandler = function (evt) {
  const editedElement = evt.target;
  let currentValue;

  if (editedElement.tagName === 'IMG') {
    currentValue = editedElement.src;
  } else {
    currentValue = editedElement.textContent;
  }

  
  const newValue = window.prompt('Вы хотите поменять значение?', currentValue);

  
  if (newValue) {
   
    if (editedElement.tagName === 'IMG') {
      editedElement.src = newValue;
    } else {
   
      editedElement.textContent = newValue;
    }
  }
};



const addElementHandler = function (evt) {   
  // найти нажатую кнопку
  const clickedBtn = evt.target; 

  
  const addMenuElement = clickedBtn.parentNode;  
 
  addMenuElement.classList.add('hidden'); 


  const blockType = clickedBtn.dataset.type;
 

 
  const blockContainer = clickedBtn.dataset.container;

  const templateElement = document.querySelector('#' + blockType + '-template').content.cloneNode(true);
  const blockElement = templateElement.querySelector('.element');


  const containerWrapperElement = document.querySelector('.' + blockContainer + '__elements-wrapper');
  containerWrapperElement.append(blockElement);

  if (blockContainer.includes('content')) {
    containerWrapperElement.parentElement.classList.remove('content--empty');
  } else {
    containerWrapperElement.parentElement.classList.remove(blockContainer + '--empty');
  }

  blockElement.querySelector('.delete-btn').addEventListener('click', buttonDeleteHandler);

  blockElement.querySelector('.template-content').addEventListener('dblclick', editContentHandler); // ,true ????

};
const chooseButtonElements = document.querySelectorAll('.choose-elem__btn');
chooseButtonElements.forEach(function (item) {
  return item.addEventListener('click', addElementHandler);
});


