// ********************* урок 9 *********************
/*Обработчик клика на "+" для появления/скрытия панели элементов */

const showAddMenuHandler = function (evt) {
  const parentElement = evt.target.parentNode;
  const addMenuElement = parentElement.querySelector('.choose-elem');
  addMenuElement.classList.toggle('hidden');
};  
const addButtonElements = document.querySelectorAll('.add-btn');
addButtonElements.forEach(function (item) {
    return item.addEventListener('click', showAddMenuHandler);
  });




// ********************* урок 10 *********************
/* переключения сетки сайта при изменении переключателя */

const changeLayoutHandler = function (evt) {
  const newLayout = evt.target.value;
  const layoutElement = document.querySelector('.layout');
  layoutElement.classList.remove('layout--landing');
  layoutElement.classList.remove('layout--blog');
  layoutElement.classList.remove('layout--shop');
  layoutElement.classList.add('layout--' + newLayout);
};
document.querySelector('.grid-select').addEventListener('change', changeLayoutHandler);





// ********************* 13 *********************
/* Обработчик удаления элемента: .remove(), .classList.contains, .classList.add */
 const buttonDeleteHandler = function (evt) {
  // найти родителя кнопки
  const element = evt.target.parentNode;
  //найти *__elements-wrapper
  const wrapper = element.parentNode;
  //найти часть сайта - шапка, контент или подвал
  const block = wrapper.parentNode;

  // удалить элемент
  element.remove();

  const wrapperItems = wrapper.querySelectorAll('.element');
  // когда в *__elements-wrapper нет элементов, 
  // добавить класс *--empty его родителю
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


// ********************* 14 *********************
/* Обработчик изменения контента: .tagName, .src, .textContent */
const editContentHandler = function (evt) {
  // найти на что кликнули
  const editedElement = evt.target;
  //console.log(editedElement.tagName);
  // сохраняем текущее содержимое текста или адрес до картинки
  let currentValue;

  // если это картинка, то берем данные из атрибута src
  if (editedElement.tagName === 'IMG') {
    currentValue = editedElement.src;
  } else {
  // если текст, то из textContent
    currentValue = editedElement.textContent;
  }

  // показывает окно промпт, значение по-умолчанию - текущий текст
  // сохраняем новые данные в переменную
  const newValue = window.prompt('Вы хотите поменять значение?', currentValue);

  //заменяем данные на новые, если они не пустые
  if (newValue) {
    // если клик на картинке, то будем менять атрибут src
    if (editedElement.tagName === 'IMG') {
      editedElement.src = newValue;
    } else {
    // если текст, то запишем в textContent
      editedElement.textContent = newValue;
    }
  }
};


// ********************* урок 12  *********************
/* добавления элемента на страницу при клике на кнопку из панели элементов */
const addElementHandler = function (evt) {   
  // найти нажатую кнопку
  const clickedBtn = evt.target; 

  // найти ее родителя - всю панель элементов
  const addMenuElement = clickedBtn.parentNode;  
  // скрыть панель элементов
  addMenuElement.classList.add('hidden'); 

  // найти тип блока для подстановки в класс шаблона
  const blockType = clickedBtn.dataset.type;
  //console.log(blockType);

  // найти инфо о контейнере и класс куда добавлять скопированный тепмлейт
  const blockContainer = clickedBtn.dataset.container;
  //console.log(blockContainer);
  //console.log('.' + blockContainer + '__elements-wrapper');

  // найти и скопировать шаблон
  const templateElement = document.querySelector('#' + blockType + '-template').content.cloneNode(true);
  const blockElement = templateElement.querySelector('.element');
  //console.log(blockElement);

  // вставить элемент в свой контейнер
  const containerWrapperElement = document.querySelector('.' + blockContainer + '__elements-wrapper');
  containerWrapperElement.append(blockElement);

  //удаление *--empty
  if (blockContainer.includes('content')) {
    containerWrapperElement.parentElement.classList.remove('content--empty');
  } else {
    containerWrapperElement.parentElement.classList.remove(blockContainer + '--empty');
  }


  // ********************* урок 13  *********************
  blockElement.querySelector('.delete-btn').addEventListener('click', buttonDeleteHandler);

  // ********************* урок 14  *********************
  blockElement.querySelector('.template-content').addEventListener('dblclick', editContentHandler); // ,true ????

};

// ********************* урок 12  *********************
const chooseButtonElements = document.querySelectorAll('.choose-elem__btn');
chooseButtonElements.forEach(function (item) {
  return item.addEventListener('click', addElementHandler);
});


