const mq = window.matchMedia("(max-width: 800px)");
function hamburger() {
	const hamburger = document.querySelector(".hamburger");
	const menu = document.querySelector(".menu");
	const close = document.querySelector(".close");
	const overlay = document.querySelector(".overlay");
	if (!hamburger || !menu || !close) return;

	
	menu.addEventListener("click", () => {
		hamburger.classList.add("show");
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
