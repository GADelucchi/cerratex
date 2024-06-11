// Variables
let products = []
let addToCartButtons
let productsContainer
let clientForm
let prodContainer

// Class
class Product {
  constructor(id, name, photo) {
    this.id = id;
    this.name = name;
    this.photo = photo
  }
}

// Functions
function elementInitializer() {
  addToCartButtons = document.querySelectorAll('#addToCart');
  productsContainer = document.querySelector('#productsContainer')
  clientForm = document.querySelector('.btnEnviarPedido')
  prodContainer = document.createElement('ul')
}

function eventInitializer() {
  addToCartButtons.forEach(button => {
    button.onclick = (event) => {
      event.preventDefault();
      let id = button.children[0].id.split('-')[1]; // Obtener el ID del producto
      console.log(id);
      let name = document.getElementById(`artName-${id}`).innerHTML // Obtener el nombre del producto
      // console.log(name);
      let photoPath = document.getElementById(`img-${id}`).attributes[0].nodeValue // Obtener el dirección donde se guarda la imagen del producto
      console.log(photoPath);
      addProductToCart(id, name, photoPath);
      Toastify({
        text: "Producto agregado",
        duration: 5000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: '#99E600'
        }
      }).showToast()
      console.log('Producto añadido al carrito');
    };
  })

  if (clientForm) {
    clientForm.onclick = (event) => sendMail(event)
  }
}

function sendMail(event) {
  event.preventDefault()
  if (products.length <= 0) {
    Toastify({
      text: "No hay productos en el carrito",
      duration: 5000,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: '#E60000'
      }
    }).showToast()
  } else if (!inputName.value ||
    !inputLastName.value ||
    !inputEmail.value ||
    !inputNumber.value) {
    Toastify({
      text: "Completá tus datos",
      duration: 5000,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: '#E60000'
      }
    }).showToast()
  } else {
    const productsData = products.map(product => ({
      id: product.id,
      name: product.name
    }))

    fetch('https://www.cerratex.com.ar/api/mail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({
        name: inputName.value,
        lastName: inputLastName.value,
        email: inputEmail.value,
        phoneNumber: inputNumber.value,
        products: productsData
      })
    })
      .then((res) => {
        console.log(res.status, res.statusText);
        if (res.status === 200) {
          Toastify({
            text: "Correo enviado",
            duration: 5000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
              background: '#99E600'
            }
          }).showToast()

          // Empty cart and reload page
          products = [];
          localStorage.clear();
          updateProductsStorage();
          window.location.reload();
        } else {
          Toastify({
            text: "Error al enviar el correo",
            duration: 5000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
              background: '#E60000'
            }
          }).showToast()
        }
      })
  }
}

function addProductToCart(id, name, photoPath) {
  let product = new Product(id, name, photoPath)
  products.push(product)
  updateProductsStorage()
}

function createCardInCart() {
  if (productsContainer) {
    productsContainer.innerHTML = "";
    products.forEach((product) => {
      let column = document.createElement("div");
      column.className = "col-lg-4 col-sm-5 portfolio-item filter-app m-3";
      column.id = `column-${product.id}`;
      column.innerHTML = `
              <img src="${product.photo}" class="img-fluid" alt="Imagen del producto" id="img-${product.id}">
              <div class="portfolio-info">
                <h4 id="artId-${product.id}" class="col">Art. ${product.id}</h4>
                <p id="artName-${product.id}" class="col">${product.name}</p>
                <a href="${product.id}.html" data-gallery="portfolioDetailsGallery" data-glightbox="type: external"
                  class="portfolio-details-lightbox details-link" title="Detalles de producto"><i
                    class="bx bx-plus"></i></a>
                </a>
              </div>
              <div class="card-footer">
                <button class="btn btn-danger" id="deleteButton-${product.id}">Eliminar</button>
              </div>`;

      productsContainer.append(column);

      let deleteButton = document.getElementById(`deleteButton-${product.id}`);
      deleteButton.onclick = () => deleteProduct(product.id);
    });
  }
}

function deleteProduct(productId) {
  console.log(products);
  console.log(localStorage);
  let deleteColumn = document.getElementById(`column-${productId}`);
  let deleteIndex = products.findIndex(
    (product) => Number(product.id) === Number(productId)
  )

  products.splice(deleteIndex, 1);

  console.log(products);
  console.log(localStorage);

  deleteColumn.remove();
  localStorage.clear()
  updateProductsStorage();

  Toastify({
    text: "Producto eliminado",
    duration: 5000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: '#99E600'
    }
  }).showToast()
}

function updateProductsStorage() {
  let productsJSON = JSON.stringify(products);
  localStorage.clear()
  localStorage.setItem("products", productsJSON);
}

function getProductsStorage() {
  let productsJSON = localStorage.getItem("products");
  if (productsJSON) {
    products = JSON.parse(productsJSON);
    createCardInCart();
  }
}

function main() {
  elementInitializer();
  eventInitializer();
  getProductsStorage();
}

// Execution
main();







(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 10
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }


  /**
   * Hero carousel indicators
   */
  let heroCarouselIndicators = select("#hero-carousel-indicators")
  let heroCarouselItems = select('#heroCarousel .carousel-item', true)

  heroCarouselItems.forEach((item, index) => {
    (index === 0) ?
      heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>" :
      heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
  });


  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });

      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()