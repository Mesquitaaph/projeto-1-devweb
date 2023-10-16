const primaryColor = '#458DCA';
const secondaryColor = '#8B4513';
const mainBg = '#190D04';

let mainTag = document.getElementsByTagName("main").item(0);
let mainChildren = mainTag.children;
let filtroAtivo = null;

// Reseta as cores dos botoes da navbar para a cor original (primaria)
const resetNavbarColor = () => {
  for(let i = 0; i < mainChildren.length; i++) {
    document.querySelector(`header .${mainChildren[i].id}`).style['color'] = `${primaryColor}`;
  }
}

// Esconde todas as paginas
const resetDisplay = () => {
  for(let i = 0; i < mainChildren.length; i++) {
    mainChildren[i].style['display'] = 'none';      
  }

  window.scrollTo(0, 0);
}

// Implementa o listener em cada botao da navbar
const addNavbarListener = (elementName, pageElem) => {
  let element = document.querySelector(`header .${elementName}`);

  element.addEventListener('click', () => {
    resetNavbarColor();

    element.style['color'] = `${secondaryColor}`;

    resetDisplay();
    pageElem.style['display'] = 'flex';

    // Esconde o menu lateral ao clicar
    let navBar = document.getElementsByTagName('nav').item(0);

    if(navBar.style['transform'] == 'translateX(0px)')
      navBar.style['transform'] = 'translateX(-500px)';

    // Coloca a logo na Header caso a pagina aberta nao seja a Home
    let titleLogoHeader = document.querySelector('.titleLogoHeader');
    if(elementName !== 'Home') {
      titleLogoHeader.style['display'] = 'flex';
    } else {
      titleLogoHeader.style['display'] = 'none';
    }
  });
}

// Esconde todas as paginas que nao sao a Home e adiciona um listener 
// para cada botao na navbar associado
for(let i = 0; i < mainChildren.length; i++) {
  if(mainChildren[i].id !== 'Home') {
    mainChildren[i].style['display'] = 'none';
  }

  addNavbarListener(mainChildren[i].id, mainChildren[i]);
}

// Implementa o abrir e fechar do menu lateral
let openNavbar = document.querySelector('#openNavbar');
openNavbar.addEventListener('click', () => {
  let navBar = document.getElementsByTagName('nav').item(0);

  if(navBar.style['transform'] == 'translateX(0px)')
    navBar.style['transform'] = 'translateX(-500px)';
  else 
    navBar.style['transform'] = 'translateX(0px)';
});


function alternarFiltro(lugar) {
  const sessoes = document.querySelectorAll('#Sessoes .sessaoContainer');
  let sessoesFiltradas = [];
  let ultimaSessao = null;

  if (filtroAtivo === lugar) {
    // Se o mesmo botão for clicado novamente, limpe o filtro
    limparFiltro();
  } else {
    // Caso contrário, aplique o filtro
    filtroAtivo = lugar;

    sessoes.forEach((sessao, index) => {
      sessao.style.display = 'none';
      sessao.style.borderBottom = '1px solid #000';
    });

    sessoes.forEach((sessao) => {
      if (sessao.getAttribute('sessao-lugar') === lugar) {
        sessao.style.display = 'flex';
        sessoesFiltradas.push(sessao);
      }
    });

    // Remover a borda inferior apenas do último elemento filtrado
    if (sessoesFiltradas.length > 0) {
      ultimaSessao = sessoesFiltradas[sessoesFiltradas.length - 1];
      ultimaSessao.style.borderBottom = 'none';
    }
  }
}

function limparFiltro() {
  filtroAtivo = null;
  const sessoes = document.querySelectorAll('#Sessoes .sessaoContainer');

  sessoes.forEach((sessao, index) => {
    sessao.style.display = 'flex';
    sessao.style.borderBottom = '1px solid #000';
  });

  // Remover a borda inferior apenas do último elemento global
  if (sessoes.length > 0) {
    sessoes[sessoes.length - 1].style.borderBottom = 'none';
  }
}

document.getElementById('filtroLocal1').addEventListener('click', () => {
  if (!document.getElementById('filtroLocal1').classList.contains('active')) {
    document.getElementById('filtroLocal1').classList.add('active');
  } else {
    document.getElementById('filtroLocal1').classList.remove('active');
  }
  document.getElementById('filtroLocal2').classList.remove('active');
  document.getElementById('filtroLocal3').classList.remove('active');

  alternarFiltro('Local1');
});

document.getElementById('filtroLocal2').addEventListener('click', () => {
  if (!document.getElementById('filtroLocal2').classList.contains('active')) {
    document.getElementById('filtroLocal2').classList.add('active');
  } else {
    document.getElementById('filtroLocal2').classList.remove('active');
  }
  document.getElementById('filtroLocal1').classList.remove('active');
  document.getElementById('filtroLocal3').classList.remove('active');

  alternarFiltro('Local2');
});

document.getElementById('filtroLocal3').addEventListener('click', () => {
  if (!document.getElementById('filtroLocal3').classList.contains('active')) {
    document.getElementById('filtroLocal3').classList.add('active');
  } else {
    document.getElementById('filtroLocal3').classList.remove('active');
  }
  document.getElementById('filtroLocal1').classList.remove('active');
  document.getElementById('filtroLocal2').classList.remove('active');

  alternarFiltro('Local3');
});
