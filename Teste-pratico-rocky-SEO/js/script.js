//------- Funções Scroll Suave -------//
// Função para ter uma navegação mais suave ao clicar no link do menu, somente nos links internos, iniciados por #
const linksInternos = document.querySelectorAll('[data-menu="suave"] a[href^="#"]');

function scrollToSection(event) {
  event.preventDefault();
  const href = event.currentTarget.getAttribute('href');
  const section = document.querySelector(href);
  section.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

// Passa o parametro de ação junto a função que da scroll "suave" entre as section
linksInternos.forEach((link) => {
  link.addEventListener('click', scrollToSection);
  link.addEventListener('touchstart', scrollToSection);
})


//------- Funções dropdown menu -------//

const dropdownMenu = document.querySelectorAll('[data-dropdown]');

dropdownMenu.forEach(menu => {
  // Touchstart para mobile e click para desktop
  ['touchstart', 'click'].forEach(userEvent => {
    menu.addEventListener(userEvent, handleClick);
  })
})

function handleClick(event) {
  event.preventDefault();
  //Adiciona a classe active quando clicado/hover
  this.classList.add('active');
  outsideClick(this, ['touchstart', 'click'], () => {
    // remover a classe active quando a função outsideClick for ativada
    this.classList.remove('active');
  });
};


//------- Funções cliquefora -------//
// Função para quando o usuário clica para fora do target
// utilizado para "fechar" o dropdown menu e o menu mobile

function outsideClick(element, events, callback) {
  const html = document.documentElement;
  const outside = 'data-outside';
  // Adicionar somente um evento
  // Verifica se possui o atributo outside
  // Caso não tenha, ele adiciona, caso já tenha, não faz nada.
  if (!element.hasAttribute(outside)) {
    // Userevent para passar mais de um evento (click, touchstart)
    events.forEach(userEvent => {
      setTimeout(() => html.addEventListener(userEvent, CliqueFora));
    })
    element.setAttribute(outside, '');
  }
  function CliqueFora(event) {
    if (!element.contains(event.target)) {
      // Remove o atributo outside quando clica fora do menu
      element.removeAttribute(outside);
      events.forEach(userEvent => {
        html.removeEventListener(userEvent, CliqueFora);
      })
      callback();
    }
  }
}

//------- Funções Menu Mobile -------//

const menuButton = document.querySelector('[data-menu="button"]');
const menuList = document.querySelector('[data-menu="list"]');

// Função abrir o menu
function abrirMenu(event) {
  menuList.classList.add('active');
  menuButton.classList.add('active');
  outsideClick(menuList, ['click', 'touchstart'], () => {
    menuList.classList.remove('active');
    menuButton.classList.remove('active');
  })
}

// Passa o parametro de ação junto a função que adiciona as classes active no CSS
menuButton.addEventListener('click', abrirMenu);
menuButton.addEventListener('touchstart', abrirMenu);




