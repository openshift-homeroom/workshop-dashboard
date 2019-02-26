$(document).ready(function() {
    function handle_execute(event, terminal) {
        var value = event.target.innerText.trim();
        parent.send_to_terminal(value, terminal);
    }

    function copy_to_clipboard(value) {
	const el = document.createElement('textarea');
	el.value = value;
	el.setAttribute('readonly', '');
	el.style.position = 'absolute';
	el.style.left = '-9999px';
	document.body.appendChild(el);
	const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
	if (selected) {
	    document.getSelection().removeAllRanges();
	    document.getSelection().addRange(selected);
	}
    }

    function handle_copy(event) {
	copy_to_clipboard(event.target.innerText.trim());
    }

    function selectElementText(el, win) {
	win = win || window;
	var doc = win.document, sel, range;
	if (win.getSelection && doc.createRange) {
	    sel = win.getSelection();
	    range = doc.createRange();
	    range.selectNodeContents(el);
	    sel.removeAllRanges();
	    sel.addRange(range);
	} else if (doc.body.createTextRange) {
	    range = doc.body.createTextRange();
	    range.moveToElementText(el);
	    range.select();
	}
    }

    $.each([$('.execute .content'), $('.execute-1 .content')], function() {
        if (window.location !== window.parent.location) {
            $(this).find('.highlight').append('<span class="execute-glyph fa fa-play-circle"></span>');
            this.click(function(event) {
                $(this).find('.execute-glyph').addClass('text-danger');
                handle_execute(event, 1);
                $(this).find('code').each(function () {
                    selectElementText(this);
                });
            });
        } else {
            $(this).find('.highlight').append('<span class="copy-glyph fa fa-cut"></span>');
            this.click(function(event) {
                $(this).find('.copy-glyph').addClass('text-danger');
                handle_copy(event);
                $(this).find('code').each(function () {
                    selectElementText(this);
                });
            });
        }
    });

    $.each([$('.execute-2 .content')], function() {
        if (window.location !== window.parent.location) {
            $(this).find('.highlight').append('<span class="execute-glyph fa fa-play-circle"></span>');
            this.click(function(event) {
                $(this).find('.execute-glyph').addClass('text-danger');
                handle_execute(event, 2);
                $(this).find('code').each(function () {
                    selectElementText(this);
                });
            });
        } else {
            $(this).find('.highlight').append('<span class="copy-glyph fa fa-cut"></span>');
            this.click(function(event) {
                $(this).find('.copy-glyph').addClass('text-danger');
                handle_copy(event);
                $(this).find('code').each(function () {
                    selectElementText(this);
                });
            });
        }
    });

    $.each([$('.copypaste .content'), $('.copy .content')], function() {
        $(this).find('.highlight').append('<span class="copy-glyph fa fa-cut"></span>');
        this.click(function(event) {
            $(this).find('.copy-glyph').addClass('text-danger');
            handle_copy(event);
            $(this).find('code').each(function () {
                selectElementText(this);
            });
        });
    });

    $('div#lab-content a').each(function() {
        if (!(location.hostname === this.hostname || !this.hostname.length)) {
            $(this).attr('target','_blank');
        }
    });
});
