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

function handle_console_link(event) {
    event.preventDefault();
    parent.open_link_in_console(event.target.href);
}

function handle_slides_link(event) {
    event.preventDefault();
    parent.open_link_in_slides(event.target.href);
}

function handle_terminal_link(event) {
    event.preventDefault();
    parent.bring_terminal_to_front();
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

$(document).ready(function() {
    $.each([$('code.execute'), $('code.execute-1')], function() {
        if (window.location !== window.parent.location) {
            this.parent().prepend('<span class="execute-glyph glyphicon glyphicon-play-circle" aria-hidden="true"></span>');
            this.parent().click(function(event) {
                $(this).find('.execute-glyph').addClass('text-danger');
                handle_execute(event, 1);
                selectElementText(this);
            });
        } else {
            this.parent().prepend('<span class="copy-glyph glyphicon glyphicon-scissors" aria-hidden="true"></span>');
            this.parent().click(function(event) {
                $(this).find('.copy-glyph').addClass('text-danger');
                handle_copy(event);
                selectElementText(this);
            });
        }
    });

    $.each([$('code.execute-2')], function() {
        if (window.location !== window.parent.location) {
            this.parent().prepend('<span class="execute-glyph glyphicon glyphicon-play-circle" aria-hidden="true"></span>');
            this.parent().click(function(event) {
                $(this).find('.execute-glyph').addClass('text-danger');
                handle_execute(event, 2);
                selectElementText(this);
            });
        } else {
            this.parent().prepend('<span class="copy-glyph glyphicon glyphicon-scissors" aria-hidden="true"></span>');
            this.parent().click(function(event) {
                $(this).find('.copy-glyph').addClass('text-danger');
                handle_copy(event);
                selectElementText(this);
            });
        }
    });

    $.each([$('code.copy'), $('code.copypaste')], function() {
        this.parent().prepend('<span class="copy-glyph glyphicon glyphicon-scissors" aria-hidden="true"></span>');
        this.parent().click(function(event) {
            $(this).find('.copy-glyph').addClass('text-danger');
            handle_copy(event);
            selectElementText(this);
        });
    });

    $('section.content a').each(function() {
        function normalize(path){
            path = Array.prototype.join.apply(arguments,['/'])
            var sPath;
            while (sPath!==path) {
                sPath = n(path);
                path = n(sPath);
            }
            function n(s){return s.replace(/\/+/g,'/').replace(/\w+\/+\.\./g,'')}
            return path.replace(/^\//,'').replace(/\/$/,'');
        }

        var base_url = (typeof rn_base_url === "undefined") ? "" : rn_base_url;

        var console_url = '/' + normalize(base_url + '/../console');
        var slides_url = '/' + normalize(base_url + '/../slides');
        var terminal_url = '/' + normalize(base_url + '/../terminal');

        if (location.hostname === this.hostname || !this.hostname.length) {
            if (this.pathname.startsWith(console_url)) {
                $(this).click(function(event) {
                    handle_console_link(event);
                });
            }
            else if (this.pathname.startsWith(slides_url)) {
                $(this).click(function(event) {
                    handle_slides_link(event);
                });
            }
            else if (this.pathname.startsWith(terminal_url)) {
                if (this.pathname == terminal_url) {
                    $(this).click(function(event) {
                        handle_terminal_link(event);
                    });
                }
                else {
                    $(this).attr('target','_blank');
                }
            }
        }
        else {
            $(this).attr('target','_blank');
        }
    });
});
