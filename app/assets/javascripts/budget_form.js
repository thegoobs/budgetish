var category_was_selected = false;
var cat_ctr = 0;

var flex_payments = [];

var flex_payments_order = [];

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

	if (step_id == 'rank_flex_payments') {
		$('#flex_payments').children('fieldset').children('.nested-fields').children(".columns").children(".column").each(function() {
			$(this).children('.input').each(function() {
				flex_payments.push($(this).val());
			});
		});

		flex_payments.forEach(function(item, index) {
			$('#rank_index').append(
				'<li class="column drag-index">' + (index + 1) + '</li>');
			$('#rank_flex').append(
				'<li class="drag-block column has-text-centered">' + item + '</li>');
		});

		Sortable.create(rank_flex, {
			animation: 150,
			ghostClass: 'ghost'
		});
	}

	if (step_id == 'suggested_budget') {
		flex_payments = [];
		$('#rank_flex').children().each(function() {
			flex_payments_order.push($(this).html());
		});

		flex_payments_order.forEach(function(item, index) {
			$('#suggested_budget_list').append(
				'<li>' + item + '</li>');
		});
	}

	return true;
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
		$(this).children(".columns").children("#hidden_fixed").each(function() {
			$(this).attr("value", false);
		});
	});
}

function submit_form() {
	//set the fixed boolean to false for spending categories
	fixed_fix();
}