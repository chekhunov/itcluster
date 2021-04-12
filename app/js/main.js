$(function () {
  $('.menu-nav__popup').on('click', function (e) {
    e.preventDefault();
    $('.menu').toggleClass('menu--active');
    $('main').toggleClass('main--active');
  });

  $('.menu-nav__btn--find').on('click', function (e) {
    e.preventDefault();
    $('.header__popup').toggleClass('header__popup--active');
  });

  $('.menu__link').on('click', function () {
    $('.menu__link').removeClass('.menu__link--active');
    $(this).toggleClass('.menu__link--active');
  });

  $('.store-features__items').slick({
    centerMode: true,
    centerPadding: '0px',
    arrows: false,
    slidesToShow: 4,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1201,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '10px',
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 769,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '10px',
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 561,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '50px',
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 426,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '10px',
          slidesToShow: 1,
        },
      },
    ],
  });

  const $contentItem = $('.product-card');
  const $page = $('.content__wrapper');
  const $pagination = $('.pagination');
  const $paginationList = $('.pagination__list');
  const $contentSearch = $('.content__search');
  const itemTotal = 8;

  // hide all
  function hideAll() {
    $contentItem.hide();
  }

  hideAll();

  // display first 8
  function displayRange(a, b) {
    hideAll();
    // display 0 - 1
    $contentItem.slice(a, b).fadeIn();
  }

  displayRange(0, itemTotal);

  //create pagination links
  let pagination = '';
  let count = 0;

  for (var i = 0; i <= $contentItem.length / 8; i++) {
    ++count;
    pagination +=
      '<li class="pagination__item"><span class="pagination__num">' + count + '</span></li>';
  }
  $paginationList.append(pagination);

  // click on pagination num
  // pass into display range
  // calc and show range
  $('body').on('click', '.pagination__item', function () {
    hideAll();

    // get text number 1 - 5
    // get ranges for start and end
    let paginationText = Number($(this).text() - 1);
    let startFrom = paginationText * itemTotal + paginationText;
    let end = paginationText * itemTotal + paginationText + itemTotal;

    // display ranges
    displayRange(startFrom, end);
  });

  $contentSearch.on('input', function () {
    hideAll();

    $contentItem.each(function () {
      $(this).removeClass('result');
    });

    // value of searched
    var text = $(this).val().toLowerCase();

    var results = $(".content__list .product-card:contains('" + text.toLowerCase() + "')");

    results.addClass('result');

    if ($contentItem.hasClass('result')) {
      $('.result').show();
      $contentItem.removeClass('result');
    }
  });

  $contentSearch.keyup(function () {
    if (!this.value) {
      hideAll();
      displayRange(0, itemTotal);
    }
  });

  function removeElem(delElem, attribute, attributeName) {
    if (!(delElem && attribute && attributeName)) return;
    return function (e) {
      let target = e.target;

      if (
        !(target.hasAttribute(attribute)
          ? target.getAttribute(attribute) === attributeName
            ? true
            : false
          : false)
      )
        return;
      let elem = target;

      while (target != this) {
        if (target.classList.contains(delElem)) {
          target.remove();
          return;
        }
        target = target.parentNode;
      }
      return;
    };
  }

  document.addEventListener('click', removeElem('product-card', 'data-del', 'delete'));

  $('input[type="text"]').keyup(function () {
    if ($(this).val() != '') {
      $(':button[type="reset"]').prop('disabled', false);
    } else {
      $(':button[type="reset"]').prop('disabled', true);
    }
  });
});
