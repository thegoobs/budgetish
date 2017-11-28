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
				'<li class="drag-block column has-text-centered">' + item + '</li>');
		});

		Sortable.create(rank_flex, {
			animation: 150,
			ghostClass: 'ghost'
		});
	}

	if (step_id == 'suggested_budget') {
		flex_payments = [];
		flex_payments_order = [];
		$('#rank_flex').children().each(function() {
			flex_payments_order.push($(this).html());
		});

		$('#suggested_budget_list').empty();
		flex_payments_order.forEach(function(item, index) {
			set_order(index, item);
			$('#suggested_budget_list').append(
				'<li>' + 
					'<span class="slider_name">' + item + '</span>' + 
					'<span class="slider_info" id="slider_info_' + index.toString() + '">0</span><br>' +
					'<input class="slider" id="slider_' + index.toString() + '" type="range" min="1" max="100" value="0">' +
				'</li>');

			$('#slider_' + index.toString()).on('input', function() {
				$('#slider_info_' + index.toString()).html($(this).val());
				var temp = $(this).val();
				var t = this;
				$('.nested_budget_categories').each(function() {
					if ($(this).find('#input_name').val() == item) {
						$(this).find('#cat_amount').find('input').val(temp);
					}
				})
			});
		});
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
	}
});