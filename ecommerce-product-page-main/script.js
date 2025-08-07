const mq = window.matchMedia("(max-width: 800px)");
function hamburger() {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu");
  const close = document.querySelector(".close");
  const overlay = document.querySelector(".overlay");
  if (!hamburger || !menu || !close) return;

  menu.addEventListener("click", () => {
    let show = hamburger.classList.add("show");

    hamburger.classList.remove("hide");

    overlay.classList.add("overlayShow");
    overlay.classList.remove("overlayHide");

    close.style.display = "block";
    close.style.margin = "14px";
    close.style.marginLeft = "40px";
  });

  close.addEventListener("click", () => {
    hamburger.classList.add("hide");
    hamburger.classList.remove("show");

    overlay.classList.add("overlayHide");
    overlay.classList.remove("overlayShow");

    close.style.display = "none";
  });
}
function handleScreenWidth(e) {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu");
  const overlay = document.querySelector(".overlay");

  const close = document.querySelector(".close");
  if (e.matches) {
    // screen <= 500px
    menu.style.display = "block";
    if (hamburger) {
      hamburger.classList.add("hide");
      hamburger.classList.remove("show");
      overlay.classList.add("overlayShow");
      overlay.classList.remove("overlayHide");
    }
    if (close) {
      close.style.display = "none";
      overlay.classList.add("overlayHide");
      overlay.classList.remove("overlayShow");
    }
  } else {
    // screen > 500px
    menu.style.display = "none";

    if (hamburger) {
      hamburger.classList.add("show");
      hamburger.classList.remove("hide");
      overlay.classList.add("overlayHide");
    }
    if (close) close.style.display = "none";
  }
}
hamburger();
handleScreenWidth(mq);
mq.addEventListener("change", handleScreenWidth);

const imageSlider = document.querySelector(".imageSlider");
const productImages = document.querySelector(".productImages");
const images = productImages.querySelectorAll("img");

const TotalImages = productImages.querySelectorAll("img").length;
let currentIndex = 1;
document.querySelector(".next-arrow").addEventListener("click", () => {
  if (currentIndex < TotalImages - 1) {
    currentIndex++;
    updateSlider();
  }
});
document.querySelector(".previous-arrow").addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});

function updateSlider() {
  const slideWidth = productImages.clientWidth;
  productImages.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}
productImages.addEventListener("transitionend", () => {
  const width = productImages.clientWidth;

  if (images[currentIndex].classList.contains("clone")) {
    // Disable the transition if Current index reaches clone so the jump to the real image is not noticed
    productImages.style.transition = "none";

    if (currentIndex === 0) {
      currentIndex = images.length - 2; // real last image
    } else if (currentIndex === images.length - 1) {
      currentIndex = 1; // real first image
    }

    productImages.style.transform = `translateX(-${currentIndex * width}px)`;

    setTimeout(() => {
      productImages.style.transition = "transform 0.4s ease-in-out";
    }, 50);
  }
});
window.addEventListener("load", () => {
  productImages.style.transition = "none";
  updateSlider();
  setTimeout(() => {
    productImages.style.transition = "transform 0.4s ease-in-out";
  }, 50);
});
window.addEventListener("resize", updateSlider);

function handleQuantity() {
  let amount = document.querySelector(".amount");
  const plus = document.querySelector(".plus");
  const minus = document.querySelector(".minus");
  const number = document.querySelector(".number");
  number.style.display = "none";

  let count = 0;
  amount.textContent = count;
  plus.addEventListener("click", () => {
    count++;
    amount.textContent = count;

    number.style.display = "block";
    number.textContent = count;
  });
  minus.addEventListener("click", () => {
    if (count > 0) {
      count--;

      if (count === 0) {
        number.style.display = "none";
      }
    } else {
      count = 0;
    }
    amount.textContent = count;
    number.textContent = count;
  });
}
handleQuantity();

function addTocart() {
  let addToCart = document.querySelector(".addToCart");
  let cartIcon = document.querySelector(".cart");
  const basket = document.querySelector(".basket");
  basket.style.display = "none";
  cartIcon.addEventListener("click", () => {
    basket.style.display = "block";    
  });
  basket.innerHTML=`<h2>Cart</h2> <p style="align-content:center">Your cart is empty</p>`
  window.addEventListener("scroll", () => {
    basket.style.display = "none";
  });
}
addTocart();
