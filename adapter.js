$(document).ready(function() {
	function run() {
		var controler = $('.bf-controler'),
			input = $('#input', controler).val(),
			program = $('#program', controler).val(),
			memory = $('#memory', controler).val();
		$('#output', controler).val(bf(program, memory, input));
	}
	$('#run').click(run);
});