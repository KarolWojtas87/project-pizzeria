import { settings, select } from './settings.js';
import Product from './components/Product.js';
import Cart from './components/Cart.js';
import Booking from './components/Booking.js';
import Home from './components/Home.js';


export const app = {
  initPages: function () {
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);

    const idFromHash = window.location.hash.replace('#/', '');

    let pageMatchingHash = thisApp.pages[0].id;

    for (let page of thisApp.pages) {
      if (page.id === idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }

    thisApp.activatePage(pageMatchingHash);

    for (let link of thisApp.navLinks) {
      link.addEventListener('click', function (event) {
        const clickedElement = this;
        event.preventDefault();

        const id = clickedElement.getAttribute('href').replace('#', '');

        thisApp.activatePage(id);

        window.location.hash = '#/' + id;
      });
    }
  },

  activatePage: function (pageId) {
    const thisApp = this;

    for (let page of thisApp.pages) {
      page.classList.toggle('active', page.id === pageId);
    }

    for (let link of thisApp.navLinks) {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === '#' + pageId
      );
    }
  },

  initBooking: function () {
    const thisApp = this;

    thisApp.booking = document.querySelector(select.containerOf.booking);

    new Booking(thisApp.booking);
  },

  initHome: function () {
    const thisApp = this;

    thisApp.home = document.querySelector(select.containerOf.home);

    new Home(thisApp.home);
  },

  initMenu: function () {
    const thisApp = this;

    for (let productData in thisApp.data.products) {
      new Product(thisApp.data.products[productData].id, thisApp.data.products[productData]);
    }
  },

  initCart: function () {
    const thisApp = this;

    const cartElem = document.querySelector(select.containerOf.cart);
    thisApp.cart = new Cart(cartElem);

    thisApp.productList = document.querySelector(select.containerOf.menu);

    thisApp.productList.addEventListener('add-to-cart', function (event) {
      app.cart.add(event.detail.product);
    });
  },

  initData: function () {
    const thisApp = this;

    thisApp.data = {};

    const url = settings.db.url + '/' + settings.db.product;

    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        //console.log('parsedResponse', parsedResponse);

        /* save parsedResponse as thissApp.data.products */
        thisApp.data.products = parsedResponse;
        /* execute initMenu method */
        thisApp.initMenu();
      });
    //console.log('thisApp.data', JSON.stringify(thisApp.data));
  },

  init: function () {
    const thisApp = this;

    thisApp.initPages();

    thisApp.initData();

    thisApp.initCart();

    thisApp.initBooking();

    thisApp.initHome();

  },

};

app.init();
