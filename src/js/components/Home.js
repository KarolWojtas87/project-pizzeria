import { select, templates } from '../settings.js';
import { app } from '../app.js';

class Home {
  constructor(element) {
    const thisHome = this;

    thisHome.render(element);
    thisHome.navPage();
  }

  render(element) {
    const thisHome = this;

    const generateHTML = templates.home();

    thisHome.dom = {};
    thisHome.dom.element = element;
    thisHome.dom.element.innerHTML = generateHTML;
    thisHome.dom.orderPage = thisHome.dom.element.querySelector(select.home.orderPage);
    thisHome.dom.bookingPage = thisHome.dom.element.querySelector(select.home.bookingPage);
  }

  navPage() {
    const thisHome = this;

    thisHome.dom.orderPage.addEventListener('click', function () {
      app.activatePage('order');
      window.location.hash = 'order';
    });
    thisHome.dom.bookingPage.addEventListener('click', function () {
      app.activatePage('booking');
      window.location.hash = 'booking';
    });
  }
}



export default Home;
