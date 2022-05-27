$(document).ready(function () {
  // анимация мобильного меню (крестик)
  const navIcon = document.querySelector(".nav-icon");
  const menu = document.querySelector(".menu");

  navIcon.addEventListener("click", function () {
    this.classList.toggle("nav-icon--active");
    menu.classList.toggle("menu--active");
  });

  // По событию "клик" закрываем вкладку, прокручиваясь к секции
  const navLinks = document.querySelectorAll(".menu__nav a");

  navLinks.forEach(function (item) {
    item.addEventListener("click", function () {
      navIcon.classList.remove("nav-icon--active");
      menu.classList.remove("menu--active");
    });
  });

  // backtop
  const backtopButton = document.querySelector("#backtop");

  backtopButton.style.opacity = 0;

  document.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backtopButton.style.opacity = 1;
    } else {
      backtopButton.style.opacity = 0;
    }
  });

  // plagin pageNav
  $("#navigation").onePageNav({
    currentClass: "active",
    changeHash: false,
    scrollSpeed: 750,
    scrollThreshold: 0.5,
    filter: "",
    easing: "swing",
  });

  // // mixitUp
  // let containerEl = document.querySelector("#mix-cards");

  // let mixer = mixitup(containerEl, {
  //   classNames: {
  //     block: "",
  //   },
  // });

  // Перемещение фейкплейсхолдера, в фокусе или без
  // form placeholder
  const formItems = document.querySelectorAll(".form-field");

  for (let item of formItems) {
    const thisParent = item.closest(".form-item");
    const thisPlaceholder = thisParent.querySelector(".fake-placeholder");

    // focus
    item.addEventListener("focus", function () {
      thisPlaceholder.classList.add("active");
    });

    // ohne focus
    item.addEventListener("blur", function () {
      if (item.value.length > 0) {
        thisPlaceholder.classList.add("active");
      } else {
        thisPlaceholder.classList.remove("active");
      }
    });
  }

  // form validate
  $(".contact-form").validate({
    rules: {
      email: {
        required: true,
        email: true,
      },
      message: {
        required: true,
      },
    },
    message: {
      email: {
        required: "Введите email",
        email: "Отсутствует символ @",
      },
      message: {
        required: "Поле не должно быть пустым",
      },
    },
    submitHandler: function (form) {
      ajaxFormSubmit();
    },
  });

  // Функция AYAX запроса на сервер
  function ajaxFormSubmit() {
    // Сохраняем введённые данные
    let string = $(".contact-form").serialize();

    //  Формируем AYAX запрос
    $.ajax({
      type: "POST",
      url: "php/mail.php",
      data: string,

      // Если всё прошло успешно
      success: function (html) {
        $(".contact-form").slideUp(800);
        $("#answer").html(html);
      },
    });
    // Прерываем цепочку срабатывания функции по Submit
    return false;
  }

  // Параллакс эффект движения за мышкой
  let prxScene = document.querySelector(".section-contacts");
  let prxItem = document.querySelectorAll(".section-contacts__move");

  prxScene.addEventListener("mousemove", function (e) {
    let x = e.clientX / window.innerWidth;
    let y = e.clientY / window.innerHeight;
    for (let item of prxItem) {
      item.style.transform = "translate(-" + x * 50 + "px, -" + y * 50 + "px)";
    }
  });
});
