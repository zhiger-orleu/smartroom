"use strict"

// Определение ОС, где открыта страница
const isMobile = {
	Android: function() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function() {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function() {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows());
	},
};

function isIE() {
	ua = navigator.userAgent;
	let is_ie = ua.indexOf('MSIE') > -1 || ua.indexOf('Trident/') > -1;
	return is_ie;
}

if (isMobile.any()) {
	document.body.classList.add("_touch");
} else {
	document.body.classList.add("_pc");
}

function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
};

testWebP(function (support) {

    if (support == true) {
        document.querySelector('body').classList.add('webp');
    } else {
        document.querySelector('body').classList.add('no-webp');
    }
});
const iconMenu = document.querySelector('.icon-menu');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle("lock");
		iconMenu.classList.toggle("active");
		menuBody.classList.toggle("active");
	});
}

// submenu

if (document.body.classList.contains('_touch')) {
	let arrow = document.querySelectorAll('.arrow');
	for (let i = 0; i < arrow.length; i++) {
		let thisLink = arrow[i].previousElementSibling;
		let subMenu = arrow[i].nextElementSibling;
		let thisArrow = arrow[i];

		thisLink.classList.add('parent');
		arrow[i].addEventListener('click', function () {
			subMenu.classList.toggle('open');
			thisArrow.classList.toggle('active');
		});
	}
}


const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding"); 

let unlock = true; 
const timeout = 800; 

for (let i = 0; i < popupLinks.length; i++) {
	const popupLink = popupLinks[i];
	popupLink.addEventListener("click", function (e) {
		const popupName = popupLink.getAttribute('href').replace("#", '');
		const curentPopup = document.getElementById(popupName);
		popupOpen(curentPopup);
		e.preventDefault();
	});
}

const popupCloseIcon = document.querySelectorAll('.popup__close');

popupCloseIcon.forEach(closeButton => {
	closeButton.addEventListener('click', function(e) {
		e.preventDefault();
		popupClose(closeButton.closest('.popup'));
	})
})


function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener('click', function (e) {
			if (!e.target.closest('.popup__body')) {
				popupClose(e.target.closest('.popup'));
			}
		})
	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	for (let i = 0; i < lockPadding.length; i++) {
		const el = lockPadding[i];
		el.style.paddingRight = lockPaddingValue;
	}

	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function () {

		for (let i = 0; i < lockPadding.length; i++) {
			const el = lockPadding[i];
			el.style.paddingRight = "0px";
		}

		body.style.paddingRight = "0px";
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.key === "Escape") {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

(function () {
	if (!Element.prototype.closest) {
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();

(function () {
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msmatchesSelector;
	}
})();

let menuLinks = document.querySelectorAll('[data-goto]');

if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;

		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY;

			if (menuBody.classList.contains("active")) {
				document.body.classList.remove("lock");
				iconMenu.classList.remove("active");
				menuBody.classList.remove("active");
			}

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}
document.addEventListener('DOMContentLoaded', function () {
	const forms = document.querySelectorAll('form');
	forms.forEach(form => {
		form.addEventListener('submit', formSend);
	})

})

async function formSend(e) {
	const form = e.target;
	e.preventDefault();

	let error = formValidate(form);
	let formData = new FormData(form);

	if (error === 0) {
		/* send form */
		form.classList.add('_sending');
		let response = await fetch('sendmail.php', {
			method: 'POST',
			body: formData
		});
		if (response.ok) {
			let result = await response.json();
			alert(result.message);
			formPreview.innerHTML = '';
			form.reset();
			form.classList.remove('_sending');
			
		} /* send form */
		else {
			alert("Ошибка");
			form.classList.remove('_sending');
		}
	} else {
		alert("Заполните обязательные поля");
	}
}

function formValidate(form) {
	let error = 0;
	let formReq = form.querySelectorAll('._req');
	for (let index = 0; index < formReq.length; index++) {
		const input = formReq[index];
		formRemoveError(input);
		if (input.classList.contains('phone')) {
			if (phoneTest(input)) {
				formAddError(input);
				error++;
			}
		} else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
			formAddError(input);
			error++;
		} else {
			if (input.value === '') {
				formAddError(input);
				error++;
			}
		}
	}
	return error;
}

function formAddError(input) {
	input.parentElement.classList.add('_error');
	input.classList.add('_error');
}

function formRemoveError(input) {
	input.parentElement.classList.remove('_error');
	input.classList.remove('_error');
}




// dark theme
const toggler = document.querySelector('.toggler');

toggler.addEventListener('click', function() {
  document.body.classList.toggle('dark-theme'); 
})
// dark theme

