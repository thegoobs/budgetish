var category_was_selected = false;
var cat_ctr = 0;

function category_clear() {
	category_was_selected = true;
	return;
}

function check_parameters(step_id) {
	//step before is the beginning
	if (step_id == 'fixed_payments') {
		//starting cash check
		if (!isNaN(parseFloat($('#starting_cash_field').val()))) {
			return true;
		}
		else {
			alert("Please enter a dollar amount.");
			return false;
		}
	}//if

	//step before is the fixed payments
	if (step_id == 'flex_payments') {
		if (category_was_selected == true) {
			return true;
		}
		else {
			alert("Please select at least one category");
			return false;
		}
	}
}

function next_step(step_id) {
	//check whether parameters were entered correctly
	if (check_parameters(step_id) != true) {
		return;
	}

	//hide everything
	$('.field').hide();

	//show the step that is called to go to
	$('#' + step_id).show();
	if (step_id == "flex_payments") {
		$('#flex_payments_add').show();
	}
}

function fixed_fix() {
	$("#flex_payments").children("fieldset").children(".nested-fields").each(function() {
		$(this).children("#hidden_fixed").each(function() {
			$(this).attr("value", false);
		});
	});
}