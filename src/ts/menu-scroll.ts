export {};

const getCoords = (elem: HTMLDivElement) => {
  const box = elem.getBoundingClientRect();

  return box.top;
};

const headerEl = document.querySelector('.header') as HTMLHeadingElement;
const navEl = document.querySelector('.nav') as HTMLDivElement;

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 160) {
    headerEl.style.opacity = '0';
    navEl.style.display = 'block';
    return;
  }

  headerEl.style.opacity = '1';
  navEl.style.display = 'none';
});

const topHeaderHamEl = document.querySelector(
  '.js-ham-top',
) as HTMLButtonElement;
const topMenuEl = document.querySelector('.js-menu-top');
const anchorHamEl = document.querySelector(
  '.js-ham-anchor',
) as HTMLButtonElement;
const anchorDropMenuEl = document.querySelector('.js-menu-anchor-drop');
const anchorMenuEl = document.querySelector('.js-menu-anchor');
const menuList = [topMenuEl, anchorDropMenuEl, anchorMenuEl];

topHeaderHamEl.addEventListener('click', () => {
  topMenuEl?.classList.toggle('menu-show');
});

anchorHamEl.addEventListener('click', () => {
  anchorDropMenuEl?.classList.toggle('menu-show');
});

const gainsEl = document.querySelector('.study') as HTMLDivElement;
const ownerEl = document.querySelector('.calc') as HTMLDivElement;
const calcEl = document.querySelector('.key') as HTMLDivElement;
const bussinessEl = document.querySelector('.slider') as HTMLDivElement;
const blockList = [gainsEl, ownerEl, calcEl, bussinessEl];

const blockScroll = (e: Event) => {
  e.preventDefault();
};

const scrollToElement = (elemToScroll: HTMLDivElement) => {
  let elementCoords = getCoords(elemToScroll);

  let interval: NodeJS.Timeout;

  // Высота шапки, изменить
  const offset = 70;

  if (elementCoords > 0) {
    interval = setInterval(() => {
      elementCoords = getCoords(elemToScroll);
      if (elementCoords <= offset) {
        clearInterval(interval);
        menuList.forEach(menu => {
          menu?.addEventListener('click', menuClickHandler);
        });
        document.body.removeEventListener('touchmove', blockScroll);
        document.body.classList.toggle('stop-scrolling');
        return;
      }
      if (elementCoords < offset + 20 && elementCoords > offset) {
        window.scrollTo(0, window.pageYOffset + elementCoords - offset);
        clearInterval(interval);
        menuList.forEach(menu => {
          menu?.addEventListener('click', menuClickHandler);
        });
        document.body.removeEventListener('touchmove', blockScroll);
        document.body.classList.toggle('stop-scrolling');
        return;
      }
      window.scrollTo(0, window.pageYOffset + 20);
    }, 0.1);
    return;
  }
  interval = setInterval(() => {
    elementCoords = getCoords(elemToScroll);
    if (elementCoords >= offset) {
      clearInterval(interval);
      menuList.forEach(menu => {
        menu?.addEventListener('click', menuClickHandler);
      });
      document.body.removeEventListener('touchmove', blockScroll);
      document.body.classList.toggle('stop-scrolling');
      return;
    }
    if (elementCoords > offset - 20 && elementCoords < offset) {
      window.scrollTo(0, window.pageYOffset - (offset - elementCoords));
      clearInterval(interval);
      menuList.forEach(menu => {
        menu?.addEventListener('click', menuClickHandler);
      });
      document.body.removeEventListener('touchmove', blockScroll);
      document.body.classList.toggle('stop-scrolling');
      return;
    }
    window.scrollTo(0, window.pageYOffset - 20);
  }, 0.1);
};

const menuClickHandler = (e: Event) => {
  menuList.forEach(menu => {
    menu?.removeEventListener('click', menuClickHandler);
  });
  document.body.addEventListener('touchmove', blockScroll);
  document.body.classList.toggle('stop-scrolling');

  const clickedEl = e.target as HTMLDataListElement;

  if (!clickedEl.dataset.listNumber) {
    menuList.forEach(menu => {
      menu?.addEventListener('click', menuClickHandler);
    });
    document.body.removeEventListener('touchmove', blockScroll);
    document.body.classList.toggle('stop-scrolling');
    return;
  }

  const elemToScroll = blockList[Number(clickedEl.dataset.listNumber)];

  scrollToElement(elemToScroll);

  const menuEl = e.currentTarget as HTMLDivElement;

  if (menuEl === anchorDropMenuEl) {
    menuEl.classList.toggle('menu-show');
  }
};

menuList.forEach(menu => {
  menu?.addEventListener('click', menuClickHandler);
});
