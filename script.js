const primaryColor = '#458DCA';
const secondaryColor = '#8B4513';
const mainBg = '#190D04';

let mainTag = document.getElementsByTagName("main").item(0);
let mainChildren = mainTag.children;

const resetNavbarColor = () => {
  for(let i = 0; i < mainChildren.length; i++) {
    document.querySelector(`header .${mainChildren[i].id}`).style['color'] = `${primaryColor}`;
  }
}

const resetDisplay = (addlistener) => {
  for(let i = 0; i < mainChildren.length; i++) {
    if(mainChildren[i].id !== 'elementName')
      mainChildren[i].style['display'] = 'none';

    if(addlistener !== undefined) addlistener(mainChildren[i].id, mainChildren[i]);
  }
}

const addNavbarListener = (elementName, pageElem) => {
  let element = document.querySelector(`header .${elementName}`);

  element.addEventListener('click', () => {
    resetNavbarColor();

    element.style['color'] = `${secondaryColor}`;

    resetDisplay();
    pageElem.style['display'] = 'flex';

    let navBar = document.getElementsByTagName('nav').item(0);

    if(navBar.style['transform'] == 'translateX(0px)')
      navBar.style['transform'] = 'translateX(-500px)';

    let titleLogoHeader = document.querySelector('.titleLogoHeader');
    if(elementName !== 'Home') {
      titleLogoHeader.style['display'] = 'flex';
    } else {
      titleLogoHeader.style['display'] = 'none';
    }
  });
}

for(let i = 0; i < mainChildren.length; i++) {
  if(mainChildren[i].id !== 'Home') {
    mainChildren[i].style['display'] = 'none';
  }

  addNavbarListener(mainChildren[i].id, mainChildren[i]);
}


let openNavbar = document.querySelector('#openNavbar');
openNavbar.addEventListener('click', () => {
  let navBar = document.getElementsByTagName('nav').item(0);

  if(navBar.style['transform'] == 'translateX(0px)')
    navBar.style['transform'] = 'translateX(-500px)';
  else 
    navBar.style['transform'] = 'translateX(0px)';
});