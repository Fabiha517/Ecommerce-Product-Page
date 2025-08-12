const mq = window.matchMedia("(max-width: 700px)");
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

  // Highlight the active Thumbnail
  const thumbnails = document.querySelectorAll(".thumb-container");
  thumbnails.forEach((thumb, index) => {
    thumb.classList.toggle("active", index === currentIndex - 1);
  });
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
  const addToCartBtn = document.querySelector(".addToCart");
  number.style.display = "none";

  let count = 0;

  amount.textContent = count;
  addToCartBtn.disabled = true;
  plus.addEventListener("click", () => {
    count++;
    amount.textContent = count;

    number.style.display = "block";
    number.textContent = count;
    addToCartBtn.disabled = count === 0;
  });
  minus.addEventListener("click", () => {
    if (count > 0) {
      count--;
      addToCartBtn.disabled = count === 0;

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

function basketDisplay() {
  let cartIcon = document.querySelector(".cart");
  const basket = document.querySelector(".basket");
  basket.style.display = "none";
  cartIcon.addEventListener("click", () => {
    basket.style.display = "block";
  });
  basket.innerHTML = `<h2>Cart</h2> <p class="basketContent">Your cart is empty</p></div>`;
  window.addEventListener("scroll", () => {
    basket.style.display = "none";
  });
  document.addEventListener("click", (e) => {
    if (!basket.contains(e.target) && !cartIcon.contains(e.target)) {
      basket.style.display = "none";
    }
  });
}
basketDisplay();

function addToCart() {
  const basket = document.querySelector(".basket");
  const number = document.querySelector(".number");
  const addToCartBtn = document.querySelector(".addToCart");

  addToCartBtn.addEventListener("click", (e) => {
    if (parseInt(document.querySelector(".amount").textContent) === 0) {
      e.preventDefault(); // Block the action
      return;
    }

    basket.innerHTML = `<h2>Cart</h2><div class="basketContent" style="display:block;">
	
	 <div class="info">
	 <img class="thumbnail" />
    <div class="desc-cost">
      <div class="desc">Fall Limited Edition Sneakers</div>
      <div class="cost">$125.00 × 3 <strong>$375.00</strong></div>
    </div>
<img src="images/icon-delete.svg" alt="">
<div class="delete"></div> 
</div>
<button class="checkout">Checkout</button>
</div>
	
  `;
    let thumbnail = document.querySelector(".thumbnail");

    if (currentIndex == 1) {
      thumbnail.src = "images/image-product-1-thumbnail.jpg";
    } else if (currentIndex === 2) {
      thumbnail.src = "images/image-product-2-thumbnail.jpg";
    } else if (currentIndex === 3) {
      thumbnail.src = "images/image-product-3-thumbnail.jpg";
    } else if (currentIndex === 4) {
      thumbnail.src = "images/image-product-4-thumbnail.jpg";
    }
  });
}
addToCart();
const meq = window.matchMedia("(min-width: 600px)");
function displayThumbnail() {
  if (meq.matches) {
    const thumbnailImages = `
	

<div class="thumb-container">
    <img class="thumb thumb1" src="images/image-product-1-thumbnail.jpg" alt="">
    <div class="thumb-overlay"></div>
  </div>
  <div class="thumb-container">
    <img class="thumb thumb2" src="images/image-product-2-thumbnail.jpg" alt="">
    <div class="thumb-overlay"></div>
  </div>
  <div class="thumb-container">
    <img class="thumb thumb3" src="images/image-product-3-thumbnail.jpg" alt="">
    <div class="thumb-overlay"></div>
  </div>
  <div class="thumb-container">
    <img class="thumb thumb4" src="images/image-product-4-thumbnail.jpg" alt="">
    <div class="thumb-overlay"></div>
  </div>
			`;
    document.querySelector(".thumbnailImages").innerHTML += thumbnailImages;
  }
}
meq.addEventListener("change", displayThumbnail());

const meqs = window.matchMedia("(min-width:768px)");
let allowFunction = true;
function clickThumbnail() {
  allowFunction = true;
  if (!allowFunction) {
    return;
  }
  // Get all thumbnail elements
  const thumbs = document.querySelectorAll(".thumb-container"); // Changed to container

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      // Update current index (add 1 if you have clone images)
      currentIndex = index + 1;

      // Move the slider to show the correct image
      updateSlider();

      // Highlight the active thumbnail
      thumbs.forEach((t) => t.classList.remove("active"));
      thumb.classList.add("active");
    });
  });
}

clickThumbnail();
const next = document.querySelector(".next-arrow");
const previous = document.querySelector(".previous-arrow");
function handleArrows() {
  if (meqs.matches) {
    next.style.display = "none";
    previous.style.display = "none";
  } else {
    next.style.display = "block";
    previous.style.display = "block";
  }
}
handleArrows();
meqs.addEventListener("change", handleArrows);

function imageOverlay() {
  const imageContainer = document.querySelector(".imageContainer");
  const thumbnailImages = document.querySelector(".thumbnailImages");
  if (!meqs.matches) return;

  imageContainer.addEventListener("click", () => {
    const existingOverlay = document.querySelector(".image-wrapper");
    if (existingOverlay) existingOverlay.remove();

    const overlay = document.createElement("div");
    overlay.className = "image-wrapper";
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.9);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    `;

    // Close button
    const closeBtn = document.createElement("button");
    
    closeBtn.innerHTML =`<svg class="overlay-close" width="14" height="15" xmlns="http://www.w3.org/2000/svg"><path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill="currentColor" fill-rule="evenodd"/></svg>`;
    closeBtn.style.cssText = `
      position: absolute;
      top: 20px;
      right: 20px;
      background: none;
      border: none;
      color: white;
      font-size: 30px;
      cursor: pointer;
      z-index:1100
    `;
    closeBtn.addEventListener("click", () => overlay.remove());

    // Main content container
    const content = document.createElement("div");
    content.style.cssText = `
      width: 80%;
      max-width: 550px;
      position: relative;
    `;

    // Create new slider container for overlay
    const sliderContainer = document.createElement("div");
    sliderContainer.className = "imageSlider-overlay";
    sliderContainer.style.width = "100%";
    sliderContainer.style.position = "relative";
    sliderContainer.style.overflow = "hidden";

    // Create new product images container
    const productImagesOverlay = document.createElement("div");
    productImagesOverlay.className = "productImages-overlay";
    productImagesOverlay.style.display = "flex";
    productImagesOverlay.style.justifyContent = "center";
    productImagesOverlay.style.width = "100%";
    productImagesOverlay.style.transition = "transform 0.4s ease-in-out";

    const realImages = Array.from(
      document.querySelectorAll(".productImages img")
    ).filter((img) => !img.classList.contains("clone"));
    const currentImage = realImages[currentIndex - 1]; // Adjust for 0-based index

    // Add only the current image to the overlay
    if (currentImage) {
      const imgClone = currentImage.cloneNode(true);
      // imgClone.style.width = "100%";
      imgClone.style.height = "auto";
      imgClone.style.maxHeight = "60vh";
      imgClone.style.objectFit = "contain";
      imgClone.style.borderRadius = "5%";
      productImagesOverlay.appendChild(imgClone);
    }

    const thumbnailsContainer = document.createElement("div");
    thumbnailsContainer.className = "thumbnailImages-overlay";
    thumbnailsContainer.style.display = "flex";
    thumbnailsContainer.style.justifyContent = "space-between";
    thumbnailsContainer.style.justifySelf = "center";
    thumbnailsContainer.style.marginTop = "20px";
    thumbnailsContainer.style.width = "60%";
    thumbnailsContainer.style.gap = "5%";

    const originalThumbnails = document.querySelectorAll(".thumb-container");
    originalThumbnails.forEach((thumb, index) => {
      const thumbClone = thumb.cloneNode(true);
      thumbClone.addEventListener("click", () => {
        currentIndex = index + 1;
        updateOverlayImage();
        updateThumbnailActiveState();
      });

      thumbnailsContainer.appendChild(thumbClone);
    });
    // Navigation arrows
    const prevBtn = document.createElement("button");
    
    prevBtn.className = "previous-arrow-overlay";
    prevBtn.innerHTML = `<svg class="overlay-previous" width="12" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M11 1 3 9l8 8" stroke="currentColor" stroke-width="3" fill="none" fill-rule="evenodd"/></svg>`;
    prevBtn.style.position = "absolute";
    prevBtn.style.left = "65px";
    prevBtn.style.top = "50%";
    prevBtn.style.transform = "translateY(-50%)";
    prevBtn.style.backgroundColor = "white";
    prevBtn.style.borderRadius = "50%";
    prevBtn.style.border = "none";
    prevBtn.style.width = "40px";
    prevBtn.style.height = "40px";
    prevBtn.style.display = "flex";
    prevBtn.style.alignItems = "center";
    prevBtn.style.justifyContent = "center";

    const nextBtn = document.createElement("button");
    nextBtn.className = "next-arrow-overlay";
    nextBtn.innerHTML = `<svg class="overlay-next" width="13" height="18" xmlns="http://www.w3.org/2000/svg"><path d="m2 1 8 8-8 8" stroke="currentColor" stroke-width="3" fill="none" fill-rule="evenodd"/></svg>`;
    nextBtn.style.position = "absolute";
    nextBtn.style.right = "65px";
    nextBtn.style.top = "50%";
    nextBtn.style.transform = "translateY(-50%)";
    nextBtn.style.backgroundColor = "white";
    nextBtn.style.borderRadius = "50%";
    nextBtn.style.border = "none";
    nextBtn.style.width = "40px";
    nextBtn.style.height = "40px";
    nextBtn.style.display = "flex";
    nextBtn.style.alignItems = "center";
    nextBtn.style.justifyContent = "center";

    // Build the structure
    sliderContainer.appendChild(productImagesOverlay);
    content.appendChild(sliderContainer);
    content.appendChild(thumbnailsContainer);
    overlay.appendChild(content);
    sliderContainer.appendChild(prevBtn);
    sliderContainer.appendChild(nextBtn);
  overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);

    // Navigation functionality
    prevBtn.addEventListener("click", () => {
      if (currentIndex > 1) {
        currentIndex--;
        updateOverlayImage();
        updateThumbnailActiveState()
      }
    });

    nextBtn.addEventListener("click", () => {
      if (currentIndex < TotalImages) {
        currentIndex++;
        updateOverlayImage();
        updateThumbnailActiveState()

      }
    });

    function updateOverlayImage() {
      const images = document.querySelectorAll(".productImages img");
      const newImage = images[currentIndex];
      if (newImage) {
        productImagesOverlay.innerHTML = "";
        const imgClone = newImage.cloneNode(true);
        // imgClone.style.width = "100%";
        imgClone.style.height = "60vh";
        imgClone.style.objectFit = "contain";
        imgClone.style.borderRadius = "10%";
        productImagesOverlay.appendChild(imgClone);
      }
    }

    function updateThumbnailActiveState() {
      const overlayThumbs =
        thumbnailsContainer.querySelectorAll(".thumb-container");
      overlayThumbs.forEach((thumb, index) => {
        thumb.classList.toggle("active", index === currentIndex - 1);
      });
    }

    // Close when clicking outside
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.remove();
    });
  });
}
if (meqs.matches) {
  imageOverlay();
}
meqs.addEventListener("change", imageOverlay);
