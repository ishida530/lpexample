var swiper = new Swiper(".swiper-container", {
  slidesPerView: "auto",
  spaceBetween: 100,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next-my",
    prevEl: ".swiper-button-prev-my",
  },

  on: {
    init: function () {
      let slide = document.querySelectorAll(".swiper-slide-active");
      slide.forEach((e) => {
        e.classList.add("d-none");
      });
    },
  },
});

let scrollBtn = document
  .querySelector(".scrollBtn")
  .addEventListener("click", () => {
    let Ysection = document.getElementById("firstSec").offsetTop;
    window.scrollTo({
      top: document.getElementById("firstSec").offsetTop,
      left: 00,
      behavior: "smooth",
    });
  });

class Follower {
  constructor(settings) {
    this.settings = settings;
    this.container = !!this.settings.container ? this.settings.container : null;
    this.xshift = !!this.settings.xshift ? this.settings.xshift : 0;
    this.yshift = !!this.settings.yshift ? this.settings.yshift : 0;
    this.collection = {};
  }
  run() {
    if (this.checkCnd()) {
      this.init();
    }
  }
  buildItem(el, index) {
    let obj = {};
    let key = "follower-" + index;
    el.attr("id", key);
    obj.id = key;
    obj.container = el;
    this.collection[key] = obj;
    this.followerAction(obj);
  }
  buildMarkup(obj) {
    let id = "markup-" + obj.id;
    let markupHtml = '<div id="' + id + '" class="gallery-markup" ></div>';
    obj.container.append(markupHtml);
    obj.markup = $("#" + id);
  }
  checkCnd() {
    if (this.container && this.container.length > 0) {
      return true;
    }
    return false;
  }
  setLimitsobj(obj) {
    obj.limits = {
      mouseX: 0,
      mouseY: 0,
      limitX: obj.container.outerWidth(),
      limitY: obj.container.outerHeight(),
    };
  }
  followerAction(obj) {
    this.setLimitsobj(obj);
    this.buildMarkup(obj);
    this.initFollower(obj);
  }
  initFollower(obj) {
    let self = this;
    obj.container.mouseenter(function (e) {
      obj.markup.addClass("active");
    });
    obj.container.mousemove(function (e) {
      let offset = obj.container.offset();
      obj.limits.mouseX = Math.min(e.pageX - offset.left, obj.limits.limitX);
      obj.limits.mouseY = Math.min(e.pageY - offset.top, obj.limits.limitY);
      obj.markup.css({
        left: obj.limits.mouseX - self.xshift,
        top: obj.limits.mouseY - self.yshift,
      });
    });
    obj.container.mouseleave(function (e) {
      obj.markup.removeClass("active");
    });
  }
  init() {
    var self = this;
    this.container.each(function (index) {
      self.buildItem($(this), index);
    });
  }
}

if (window.innerWidth >= 992) {
  const follower = new Follower({
    container: $(".swiper-container"),
    xshift: 50,
    yshift: 50,
  });
  follower.run();
}
