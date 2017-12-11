var category_was_selected = false;
var cat_ctr = 0;

var flex_payments = [];

var flex_payments_order = [];

var total_cash = 0;
var fixed_payment_perc = 0;
var suggested_amount = 0;
var m = 0;
var n = 0;
var sum = 0;

function category_clear() {
	category_was_selected = true;
}

function check_parameters(step_id) {
	//step before is the beginning
	if (step_id == 'fixed_payments') {
		//starting cash check
		if (!isNaN(parseFloat($('#starting_cash_field').val()))) {
			total_cash = $('#starting_cash_field').val();
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
			//check for correct inputs
			var function_break = false;
			$("#fixed_payments").find('fieldset').each(function() {
				$(this).find('#input_name').each(function() {
					if ($(this).val() == '') {
						alert("Error: Category with no name found.");
						function_break = true;
					}
				});
			});

			$("#fixed_payments").find('fieldset').each(function() {
				$(this).find('#input_amount').each(function() {
					if (isNaN(parseFloat($(this).val()))) {
						alert("Error: Category with incorrect value found.");
						function_break = true;
					}
					else {
						//get percentage of total cash and store
						fixed_payment_perc += 100 * parseFloat($(this).val()) / total_cash;
					}
				});
			});

			if (function_break == true) {
				return false;
			}

			//make sure all flex categories already rendered hide the amount
			$("#flex_payments").find('fieldset').find("#cat_amount").css("display", "none");
			category_was_selected = false;
			return true;
		}
		else {
			alert("Please select at least one category");
			return false;
		}
	}

	if (step_id == 'rank_flex_payments') {
		if (category_was_selected == true) {
			//check each input for values
			var function_break = false;
			$("#flex_payments").find('fieldset').each(function() {
				$(this).find('#input_name').each(function() {
					if ($(this).val() == '') {
						alert("Error: Category with no name found.");
						function_break = true;
					}
				});
			});

			if (function_break == true) {
				return false;
			}


			flex_payments = [];
			$('#flex_payments').children('fieldset').children('.nested-fields').children(".columns").children(".column").each(function() {
				$(this).children('.input').each(function() {
					flex_payments.push($(this).val());
				});
			});
			
			$('#rank_index').empty();
			$('#rank_flex').empty();

			flex_payments.forEach(function(item, index) {
				$('#rank_index').append(
					'<li class="column drag-index">' + (index + 1) + '</li>');
				$('#rank_flex').append(
					'<li class="drag-block column">' + item + '</li>');
		
			});

			Sortable.create(rank_flex, {
				animation: 150,
				ghostClass: 'ghost'
			});
			return true;
		}
		else {
			alert("Please select at least one category");
			return false;
		}
	}

	if (step_id == 'suggested_budget') {
		flex_payments = [];
		flex_payments_order = [];
		$('#rank_flex').children().each(function() {
			flex_payments_order.push($(this).html());
		});

		$('#suggested_budget_list').empty();
		sum = 0;
		n = flex_payments_order.length;
		m = (200 - 2 * n)/((n*n) + n);
		flex_payments_order.forEach(function(item, index) {
			set_order(index, item);

			//sum of (m * x) from x=0 to n = 100%, where:
			//n = number of categories
			//m = derivation from the sum
			suggested_amount = (m * (n - index)) + 1;

			sum += suggested_amount;
			$('#suggested_budget_list').append(
				'<li class="suggested_budget_js">' + 
					'<span class="slider_name has-text-weight-semibold is-size-6">' + item + '</span>' + 
					'<span class="slider_info is-pulled-right has-text-primary has-text-weight-semibold is-size-6" id="slider_info_' + index.toString() + '"></span>' + 
					'<input class="slider" id="slider_' + index.toString() + '" type="range" min="1" max="100" value="' + suggested_amount + '"></input>' +
					'<span class="slider_info is-size-6 is-pulled-right bottom_value" id="slider_value_' + index.toString() + '"></span><br>' +
				'</li>');

			$('#slider_info_' + index.toString()).html( $('#slider_' + index.toString()).val() + '%');
			$('#slider_value_' + index.toString()).html('$' + total_cash * $('#slider_' + index.toString()).val()/100);

			$('.nested_budget_categories').each(function() {
				if ($(this).find('#input_name').val() == item) {
					$(this).find('#cat_amount').find('input').val(total_cash * $('#slider_' + index.toString()).val()/100);
					$(this).find('#hidden_percent').val($('#slider_' + index.toString()).val());
				}
			});
			$('#slider_' + index.toString()).on('input', function() {
				$('#slider_info_' + index.toString()).html($(this).val() + '%');
				$('#slider_value_' + index.toString()).html('$' + total_cash * $(this).val()/100);
				var temp = $(this).val();
				var t = this;
				$('.nested_budget_categories').each(function() {
					if ($(this).find('#input_name').val() == item) {
						$(this).find('#cat_amount').find('input').val(total_cash * temp/100);
						$(this).find('#hidden_percent').val(temp);
					}
				});
			});
		});
		console.log(sum);
	}

	return true;
}
function animate_step(step_id, next) {
	if (next == true) {
		$('#' + step_id).css("opacity", 0);
		$('#' + step_id).css("display", "block");
		$('#' + step_id).animate({
			opacity: 1,
		});

		if (step_id == 'flex_payments') {
			$('#flex_payments_add').css("opacity", 0);
			$('#flex_payments_add').animate({
				opacity: 1
			});
		}
	}

	else {
		$('#' + step_id).css("opacity", 0);
		$('.field').animate({
			opacity: 0
		}, 250);

		$('#' + step_id).animate({
			opacity: 1
		});

		if (step_id == 'flex_payments') {
			$('#flex_payments_add').animate({
				opacity: 1
			});
		}
	}
} 

function prev_step(step_id) {
	//hide everything
	// animate_step(step_id, false);
	$('.field').hide();

	//update the progress bar
	var prog = parseInt($('progress').attr('value')) - 26;
	$('progress').animate({
		value: prog
	});

	//show the step that is called to go to
	$('#' + step_id).show();
	if (step_id == "flex_payments") {
		$('#flex_payments_add').show();
	}
}

function next_step(step_id) {
	//check whether parameters were entered correctly
	if (check_parameters(step_id) != true) {
		return;
	}

	//update the progress bar
	var prog = parseInt($('progress').attr('value')) + 26;
	$('progress').animate({
		value: prog
	});

	//hide everything
	$('.field').hide();

	//show the step that is called to go to
	$('#' + step_id).show();
	// animate_step(step_id, true);
	if (step_id == "flex_payments") {
		$('#flex_payments_add').show();
		if ($("#flex_payments").find("fieldset").val() == undefined) {
			category_was_selected = false;
		}
		else {
			console.log("they exist!");
			category_was_selected = true;
		}
	}

	if (step_id == "fixed_payments") {
		if ($("#fixed_payments").find("fieldset").val() == undefined) {
			category_was_selected = false;
		}
		else {
			console.log("they exist!");
			category_was_selected = true;
		}
	}
}

function fixed_fix() {
	$("#flex_payments").children("fieldset").children(".nested-fields").each(function() {
		$(this).children(".columns").children("#hidden_fixed").each(function() {
			$(this).attr("value", false);
		});
	});
}

function set_order(o, name) {
	$("#flex_payments").children("fieldset").children(".nested-fields").each(function() {
		$(this).children(".columns").children(".column").each(function() {
			if ($(this).children("#input_name").val() == name) {
				$(this).parent().children("#hidden_order").attr("value", o);
			}
		});
	});
}

function submit_form() {
	//set the fixed boolean to false for spending categories
	fixed_fix();
}

$(document).on("fields_added.nested_form_fields", function(event, param) {
	if ($(event.target).parent().attr('id') == "flex_payments") {
		$(event.target).find("#cat_amount").css("display", "none");
		$(event.target).find("#input_name").attr("placeholder", "Entertainment, Dining Out, Coffee, etc.");

	}
});

$(document).on("keypress", function (e) {
    if (e.keyCode == 13) {
        return false;
    }
});