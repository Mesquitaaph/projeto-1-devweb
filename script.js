const primaryColor = '#458DCA';
const secondaryColor = '#8B4513';
const mainBg = '#190D04';

let mainTag = document.getElementsByTagName("main").item(0);
let mainChildren = mainTag.children;
let filtroAtivo = null;

const resetNavbarColor = () => {
  for(let i = 0; i < mainChildren.length; i++) {
    document.querySelector(`header .${mainChildren[i].id}`).style['color'] = `${primaryColor}`;
  }
}

const resetDisplay = (addlistener) => {
  for(let i = 0; i < mainChildren.length; i++) {
    if(mainChildren[i].id !== 'elementName')
    mainChildren[i].style['display'] = 'none'

    if(addlistener !== undefined) addlistener(mainChildren[i].id, mainChildren[i])
  }
}

const addNavbarListener = (elementName, pageElem) => {
  let element = document.querySelector(`header .${elementName}`);

  element.addEventListener('click', () => {
    resetNavbarColor()

    element.style['color'] = `${secondaryColor}`

    resetDisplay()
    pageElem.style['display'] = 'flex'
  });
}

for(let i = 0; i < mainChildren.length; i++) {
  if(mainChildren[i].id !== 'Home') {
    mainChildren[i].style['display'] = 'none'
  }

  addNavbarListener(mainChildren[i].id, mainChildren[i])
}


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
