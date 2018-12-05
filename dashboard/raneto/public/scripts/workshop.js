function handle_execute(event, terminal) {
    var element = event.target.parentElement;
    var value = element.innerText.trim();
    parent.send_to_terminal(value, terminal);
}

function handle_copy(event) {
    var element = event.target.parentElement;
    var value = element.innerText.trim();
    var input = document.createElement('input');
    input.setAttribute('value', value);
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input)
}

$(document).ready(function() {
    $.each([$('code.execute'), $('code.execute-1')], function() {
        this.parent().prepend('<span class="execute-glyph glyphicon glyphicon-play-circle" aria-hidden="true"></span>');
	this.parent().click(function(event) {
            handle_execute(event, 1);
	});
    });

    $.each([$('code.execute-2')], function() {
        this.parent().prepend('<span class="execute-glyph glyphicon glyphicon-play-circle" aria-hidden="true"></span>');
	this.parent().click(function(event) {
            handle_execute(event, 2);
	});
    });

    $.each([$('code.copy')], function() {
        this.parent().prepend('<span class="copy-glyph glyphicon glyphicon-scissors" aria-hidden="true"></span>');
	this.parent().click(handle_copy);
    });

    $('section.content a').each(function() {
      if(!(location.hostname === this.hostname || !this.hostname.length)) {
	$(this).attr('target','_blank');
      }
    });
});
