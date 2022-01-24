function send() {
	
	let name = document.getElementById("form-name").value;
	let phone = document.getElementById("form-phone").value;
	let city = document.getElementById("form-city").value;
	
	if (name !== "" && phone !== "" && city !== "") {
		var win = window.open(`https://wa.me/77470941770?text=Здравствуйте, меня зовут ${name}, я из города ${city}, прошу связаться со мной по номеру телефона - ${phone}`, '_blank');
		window.location.reload();
	}
}

function send_popup() {
	
	let name = document.getElementById("popup_form-city").value;
	let phone = document.getElementById("popup_form-phone").value;
	let city = document.getElementById("popup_form-city").value;
	
	if (name !== "" && phone !== "" && city !== "") {
		var win = window.open(`https://wa.me/77470941770?text=Здравствуйте, меня зовут ${name}, я из города ${city}, прошу связаться со мной по номеру телефона - ${phone}`, '_blank');
		window.location.reload();
	}
}
