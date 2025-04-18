// Aos - the right initialisation
jQuery(document).ready(function () {
  (function () {
    // your page initialization code here
    // the DOM will be available here
    AOS.init({
      duration: 750,
      offset: 0, // offset (in px) from the original trigger point
      anchorPlacement: "top-bottom", // define where the AOS animations will be triggered
    });
  })();
});
// //

if (document.querySelector(".nestedfilter-list__item")) {
  $(document).on("click", function (event) {
    const $target = $(event.target);

    if ($target.closest(".nestedfilter-select").length) {
      $(".nestedfilter").toggleClass("nestedfilter--active");
    } else if (!$target.closest(".nestedfilter").length) {
      $(".nestedfilter").removeClass("nestedfilter--active");
    }
  });
  $(document).on("click", ".nestedfilter-list__item", function (event) {
    event.stopPropagation();

    const text = $(this).text().trim();
    $(this).closest(".nestedfilter").find(".nestedfilter__selected").text(text);

    $(this).closest(".nestedfilter").removeClass("nestedfilter--active");
  });
}

$(function () {
  $(".burger").on("click", function (event) {
    $("body").toggleClass("body--menu");
  });
  $(".open-filter").on("click", function (event) {
    $(".filter").addClass("filter--active");
    $("body").addClass("body--lock");
  });
  $(".close-filter").on("click", function (event) {
    $(".filter").removeClass("filter--active");
    $("body").removeClass("body--lock");
  });

  $(".filter-head").on("click", function (event) {
    $(this).closest(".filter__wrap").toggleClass("filter__wrap--active");
  });

  $(".subfilter-head").on("click", function (event) {
    $(this).closest(".subfilter").toggleClass("subfilter--active");
  });

  $(".nav-head").on("click", function () {
    const $wrapper = $(this).closest(".nav__wrapper");

    // Проверяем, если элемент уже активен, то закрываем его
    if ($wrapper.hasClass("nav__wrapper--active")) {
      $wrapper.removeClass("nav__wrapper--active");
    } else {
      // Убираем класс у всех элементов
      $(".nav__wrapper").removeClass("nav__wrapper--active");
      // Добавляем класс текущему элементу
      $wrapper.addClass("nav__wrapper--active");
    }
  });

  $(".info-item").on("click", function (event) {
    for (let item of $(".info-item")) {
      item.classList.remove("info-item--active");
    }
    $(this).addClass("info-item--active");
  });

  $(".subfilter-list__item").on("click", function (event) {
    const $wrapper = $(this).closest(".filter__wrapper"); // находим родительский wrapper

    $wrapper
      .find(".subfilter-list__item")
      .removeClass("subfilter-list__item--active"); // удаляем активный класс только внутри него

    $(this).addClass("subfilter-list__item--active"); // добавляем активный класс текущему элементу
  });

  $(".product-body__link").on("click", function (event) {
    event.stopPropagation(); // предотвратить всплытие
    $(".popup--specifics").addClass("popup--active");
  });

  $(".popup__close").on("click", function (event) {
    event.stopPropagation(); // предотвратить всплытие
    $(".popup").removeClass("popup--active");
  });

  // Остановка всплытия кликов внутри контента попапа
  $(".popup__inner").on("click", function (event) {
    event.stopPropagation();
  });

  // Закрытие по клику вне попапа
  $(document).on("click", function () {
    $(".popup").removeClass("popup--active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var x, i, j, l, ll, selElmnt, a, b, c;
  /* Look for any elements with the class "custom-select": */
  x = document.getElementsByClassName("custom-select");
  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
      /* For each option in the original select element,
        create a new DIV that will act as an option item: */
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function (e) {
        /* When an item is clicked, update the original select box,
            and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
      /* When the select box is clicked, close any other select boxes,
        and open/close the current select box: */
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }

  function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x,
      y,
      i,
      xl,
      yl,
      arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i);
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < xl; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }

  /* If the user clicks anywhere outside the select box,
then close all select boxes: */
  document.addEventListener("click", closeAllSelect);
});

$(function () {
  // Флаг, запрещающий повторное открытие после закрытия
  let closedSelected = false;

  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  // Область меню + navigation
  const menuAreaSelector = ".header";

  if (isMobileDevice()) {
    // На мобильных — открытие/закрытие по клику
    $(document).on("click", function (event) {
      // Если уже закрыто крестиком — игнорируем все клики, кроме на самом крестике
      if (closedSelected && !$(event.target).closest(".navigation__close").length) {
        return;
      }

      if (!$(event.target).closest(menuAreaSelector).length) {
        // Клик вне меню — сбрасываем всё
        $(".menu-list__item").removeClass("menu-list__item--active");
        $(".header").removeClass("header--active");
        $(".navigation").removeClass("navigation--active");
      } else {
        // Клик по элементу меню
        const $item = $(event.target).closest(".menu-list__item");
        $(".menu-list__item").not($item).removeClass("menu-list__item--active");
        $item.toggleClass("menu-list__item--active");
        $(".header").toggleClass("header--active");
        // При открытии меню сбрасываем флаг закрытия
        if ($item.hasClass("menu-list__item--active")) {
          closedSelected = false;
          $(".navigation").addClass("navigation--active");
        }
      }
    });
  } else {
    // На десктопе — открытие по hover, закрытие при уходе мыши
    $(document).on("mousemove", function (event) {
      if (closedSelected) return;
      if (!$(event.target).closest(menuAreaSelector).length) {
        $(".menu-list__item").removeClass("menu-list__item--active");
        $(".header").removeClass("header--active");
        $(".navigation").removeClass("navigation--active");
      }
    });

    // Hover на пунктах меню
    $(document).on("mouseover", ".menu-list__item", function () {
      if (closedSelected) return;
      $(".menu-list__item").removeClass("menu-list__item--active");
      $(this).addClass("menu-list__item--active");
      $(".header").addClass("header--active");
      $(".navigation").addClass("navigation--active");
    });
  }

  // Обработчик кнопки "закрыть" — ставим флаг и снимаем классы
  $(document).on("click", ".navigation__close", function (e) {
    closedSelected = true;
    $(".navigation").removeClass("navigation--active");
    $(".menu-list__item").removeClass("menu-list__item--active");
    $(".header").removeClass("header--active");
    e.stopPropagation();

    setTimeout(function () {
      closedSelected = false;
    }, 100);
  });
});

$(function () {
  $(".navigation").each(function () {
    const $navigation = $(this);
    // === Уровень 1: .navigation-heading__direction ===
    $navigation
      .find(".navigation-heading__direction")
      .on("mouseenter", function () {
        const $this = $(this);
        const $heading = $this.closest(".navigation-heading");

        // Сброс активных в заголовке
        $heading
          .find(".navigation-heading__direction")
          .removeClass("navigation-heading__direction--active");
        $this.addClass("navigation-heading__direction--active");

        // Индекс активного direction
        const index = $heading
          .find(".navigation-heading__direction")
          .index($this);

        // Сброс и активация соответствующего блока directions
        const $wrapper = $navigation.find(".navigation__wrapper");
        $wrapper
          .find(".navigation-directions")
          .removeClass("navigation-directions--active");
        $wrapper
          .find(".navigation-directions")
          .eq(index)
          .addClass("navigation-directions--active");
      });

    // === Уровень 2: .navigation-directions__direction ===
    $navigation.on(
      "mouseenter",
      ".navigation-directions__direction",
      function () {
        const $this = $(this);
        const $inner = $this.closest(".navigation-directions__inner");

        // Сброс активных направлений
        $inner
          .find(".navigation-directions__direction")
          .removeClass("navigation-directions__direction--active");
        $this.addClass("navigation-directions__direction--active");

        // Индекс активного направления
        const index = $inner
          .find(".navigation-directions__direction")
          .index($this);

        // Сброс и активация соответствующего блока ссылок (только внутри текущего directions)
        const $directionsBlock = $this.closest(".navigation-directions");
        const $linksWrapper = $directionsBlock.find(".navigation-links");

        $linksWrapper
          .find(".navigation-links__wrapper")
          .removeClass("navigation-links__wrapper--active");
        $linksWrapper
          .find(".navigation-links__wrapper")
          .eq(index)
          .addClass("navigation-links__wrapper--active");
      }
    );
  });
});

if (document.querySelector(".solutions-swiper")) {
  const solutionsSwiper = new Swiper(".solutions-swiper", {
    slidesPerView: 3,
    loop: true,
    disabled: true,
    speed: 750,
    spaceBetween: 0,
    navigation: {
      prevEl: ".solutions-swiper__arrow--prev",
      nextEl: ".solutions-swiper__arrow--next",
    },
    breakpoints: {
      301: {
        slidesPerView: 1,
        loop: true,
        disabled: true,
        speed: 750,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 3,
        loop: true,
        disabled: true,
        speed: 750,
        spaceBetween: 0,
      },
    },
  });

  const slides = document.querySelectorAll(".swiper-slide");

  slides.forEach((slide, index) => {
    slide.addEventListener("mouseenter", () => {
      for (let slide of slides) {
        slide.classList.remove("active");
      }

      slide.classList.add("active");
      activeIndex = index;
    });
  });
}

new Swiper(".references-swiper", {
  slidesPerView: 1.3,
  loop: true,
  spaceBetween: 50,
  speed: 750,
  scrollbar: {
    el: ".slider-scrollbar",
    draggable: true,
  },
  navigation: {
    prevEl: ".references-arrows__arrow--prev",
    nextEl: ".references-arrows__arrow--next",
  },
  breakpoints: {
    301: {
      slidesPerView: 1,
      loop: true,
      spaceBetween: 30,
      speed: 750,
    },
    768: {
      slidesPerView: 1.3,
      loop: true,
      spaceBetween: 30,
      speed: 750,
    },
    1200: {
      slidesPerView: 1.3,
      loop: true,
      spaceBetween: 50,
      speed: 750,
    },
  },
});

new Swiper(".offers-swiper", {
  slidesPerView: 3,
  loop: true,
  spaceBetween: 50,
  speed: 750,
  navigation: {
    prevEl: ".offers-arrows__arrow--prev",
    nextEl: ".offers-arrows__arrow--next",
  },
  breakpoints: {
    300: {
      slidesPerView: 1,
      loop: true,
      spaceBetween: 30,
      speed: 750,
    },
    768: {
      slidesPerView: 2,
      loop: true,
      spaceBetween: 30,
      speed: 750,
    },
    1200: {
      slidesPerView: 3,
      loop: true,
      spaceBetween: 50,
      speed: 750,
    },
  },
});

new Swiper(".future-swiper--first", {
  direction: "vertical",
  slidesPerView: 2,
  centeredSlides: true,
  loop: true,
  spaceBetween: 32,
  speed: 750,
  allowTouchMove: false,
  autoplay: {
    delay: 1500, // задержка между слайдами в миллисекундах
    disableOnInteraction: false, // если true, автопрокрутка остановится при взаимодействии пользователя с swiper
  },
  breakpoints: {
    301: {
      direction: "vertical",
      slidesPerView: 1.5,
      centeredSlides: true,
      loop: true,
      spaceBetween: 2,
      speed: 750,
      allowTouchMove: true,
    },
    768: {
      direction: "vertical",
      slidesPerView: 2,
      centeredSlides: true,
      loop: true,
      spaceBetween: 32,
      speed: 750,
      allowTouchMove: false,
    },
  },
});

new Swiper(".future-swiper--second", {
  direction: "vertical",
  slidesPerView: 2,
  centeredSlides: true,
  loop: true,
  spaceBetween: 32,
  speed: 750,
  allowTouchMove: false,
  autoplay: {
    delay: 1500, // задержка между слайдами в миллисекундах
    disableOnInteraction: false, // если true, автопрокрутка остановится при взаимодействии пользователя с swiper
    reverseDirection: true,
  },
  breakpoints: {
    301: {
      direction: "vertical",
      slidesPerView: 1.5,
      centeredSlides: true,
      loop: true,
      spaceBetween: 2,
      speed: 750,
      allowTouchMove: true,
    },
    768: {
      direction: "vertical",
      slidesPerView: 2,
      centeredSlides: true,
      loop: true,
      spaceBetween: 32,
      speed: 750,
      allowTouchMove: false,
    },
  },
});

new Swiper(".future-swiper--third", {
  direction: "vertical",
  slidesPerView: 2,
  centeredSlides: true,
  loop: true,
  spaceBetween: 32,
  speed: 750,
  allowTouchMove: false,
  autoplay: {
    delay: 1500, // задержка между слайдами в миллисекундах
    disableOnInteraction: false, // если true, автопрокрутка остановится при взаимодействии пользователя с swiper
  },
  breakpoints: {
    301: {
      direction: "vertical",
      slidesPerView: 1.5,
      centeredSlides: true,
      loop: true,
      spaceBetween: 2,
      speed: 750,
      allowTouchMove: true,
    },
    768: {
      direction: "vertical",
      slidesPerView: 2,
      centeredSlides: true,
      loop: true,
      spaceBetween: 32,
      speed: 750,
      allowTouchMove: false,
    },
  },
});

if (document.querySelector(".history")) {
  const lineItems = document.querySelectorAll(".line-item");
  const historyContentItems = document.querySelectorAll(
    ".history-content__wrapper"
  );

  lineItems.forEach((lineItem, index) => {
    lineItem.addEventListener("click", () => {
      lineItems.forEach((lineItem) =>
        lineItem.classList.remove("line-item--active")
      );

      lineItem.classList.add("line-item--active");

      historyContentItems.forEach((wrapper, wrapperIndex) => {
        if (wrapperIndex === index) {
          wrapper.classList.add("history-content__wrapper--active");
        } else {
          wrapper.classList.remove("history-content__wrapper--active");
        }
      });
    });
  });
}

if (document.querySelector(".cases")) {
  const closeBtn = document.querySelector(".popup--cases .popup__close");
  const casesItems = document.querySelectorAll(".cases-item");
  const casesPopup = document.querySelector(".popup--cases");
  const casesPopupItems = document.querySelectorAll(".case");

  casesItems.forEach((casesItem, index) => {
    casesItem.addEventListener("click", (event) => {
      event.stopPropagation();
      casesItems.forEach((casesItem) =>
        casesItem.classList.remove("cases-item--active")
      );

      casesItem.classList.add("cases-item--active");

      casesPopup.classList.add("popup--active");

      console.log(casesPopupItems);

      casesPopupItems.forEach((wrapper, wrapperIndex) => {
        if (wrapperIndex === index) {
          wrapper.classList.add("case--active");
        } else {
          wrapper.classList.remove("case--active");
        }
      });
    });
  });

  closeBtn.addEventListener("click", () => {
    casesPopup.classList.remove("popup--active");
  });
}

if (document.querySelector(".notes")) {
  const notesItems = document.querySelectorAll(".notes-item");

  notesItems.forEach((notesItem, index) => {
    notesItem.addEventListener("click", () => {
      notesItems.forEach((notesItem) =>
        notesItem.classList.remove("notes-item--active")
      );

      notesItem.classList.add("notes-item--active");
    });
  });
}

if (document.querySelector(".products")) {
  const productsTubs = document.querySelectorAll(".products-tub");
  const productsLists = document.querySelectorAll(".products-list");
  const productsImgs = document.querySelectorAll(".products-view__img");
  productsTubs.forEach((productsTub, index) => {
    productsTub.addEventListener("click", () => {
      productsTubs.forEach((productsTub) =>
        productsTub.classList.remove("products-tub--active")
      );

      productsTub.classList.add("products-tub--active");

      productsLists.forEach((wrapper, wrapperIndex) => {
        if (wrapperIndex === index) {
          wrapper.classList.add("products-list--active");
        } else {
          wrapper.classList.remove("products-list--active");
        }
      });

      productsImgs.forEach((wrapper, wrapperIndex) => {
        if (wrapperIndex === index) {
          wrapper.classList.add("products-view__img--active");
        } else {
          wrapper.classList.remove("products-view__img--active");
        }
      });
    });
  });
}

if (document.querySelector(".downloads")) {
  const downloadsTubs = document.querySelectorAll(".downloads-tub");
  const filterWrappers = document.querySelectorAll(".filter__wrapper");
  const downloadsWrappers = document.querySelectorAll(
    ".downloads-body__wrapper"
  );
  downloadsTubs.forEach((downloadsTub, index) => {
    downloadsTub.addEventListener("click", () => {
      downloadsTubs.forEach((downloadsTub) =>
        downloadsTub.classList.remove("downloads-tub--active")
      );

      downloadsTub.classList.add("downloads-tub--active");

      filterWrappers.forEach((wrapper, wrapperIndex) => {
        if (wrapperIndex === index) {
          wrapper.classList.add("filter__wrapper--active");
        } else {
          wrapper.classList.remove("filter__wrapper--active");
        }
      });

      downloadsWrappers.forEach((wrapper, wrapperIndex) => {
        if (wrapperIndex === index) {
          wrapper.classList.add("downloads-body__wrapper--active");
        } else {
          wrapper.classList.remove("downloads-body__wrapper--active");
        }
      });
    });
  });
}
//
