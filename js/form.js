$(document).on('click', '#createregistry', function(e){
	var formData = new FormData(document.forms.registry_form);
	if(!formData.get('mail_description')){
		alert("Заполните обращение");
		return false;
	}
	else if(!formData.get('mail_fio')){
		alert("Укажите Имя");
		return false;
	}
	else if(!formData.get('phone')){
		alert("Телефон должен быть заполнен");
		return false;
	}
	$.ajax({
		type : "POST",
		url : "/registryadd/",
		processData: false,
	    contentType: false,
		dataType: 'json',
		data: formData,
		success: function(msg){
			alert("Информация отправлена!");
			location.reload();
		}
	});
});
