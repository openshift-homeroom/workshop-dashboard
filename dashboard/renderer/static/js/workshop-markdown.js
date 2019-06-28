$(document).ready(function() {
    $.each([$('code.language-execute'), $('code.language-execute-1')], function() {
        if (window.location !== window.parent.location) {
            this.parent().prepend('<span class="execute-glyph fas fa-play-circle" aria-hidden="true"></span>');
            this.parent().click(function(event) {
                if (event.shiftKey) {
                    $(this).find('.execute-glyph').removeClass('text-danger');
                    $(this).find('.execute-glyph').addClass('text-success');
                    handle_copy(event);
                }
                else {
                    $(this).find('.execute-glyph').removeClass('text-success');
                    $(this).find('.execute-glyph').addClass('text-danger');
                    handle_execute(event, 1);
                }
                selectElementText(this);
            });
        } else {
            this.parent().prepend('<span class="copy-glyph fas fa-paste" aria-hidden="true"></span>');
            this.parent().click(function(event) {
                $(this).find('.copy-glyph').addClass('text-success');
                handle_copy(event);
                selectElementText(this);
            });
        }
    });

    $.each([$('code.language-execute-2')], function() {
        if (window.location !== window.parent.location) {
            this.parent().prepend('<span class="execute-glyph fas fa-play-circle" aria-hidden="true"></span>');
            this.parent().click(function(event) {
                if (event.shiftKey) {
                    $(this).find('.execute-glyph').removeClass('text-danger');
                    $(this).find('.execute-glyph').addClass('text-success');
                    handle_copy(event);
                }
                else {
                    $(this).find('.execute-glyph').removeClass('text-success');
                    $(this).find('.execute-glyph').addClass('text-danger');
                    handle_execute(event, 2);
                }
                selectElementText(this);
            });
        } else {
            this.parent().prepend('<span class="copy-glyph fas fa-paste" aria-hidden="true"></span>');
            this.parent().click(function(event) {
                $(this).find('.copy-glyph').addClass('text-success');
                handle_copy(event);
                selectElementText(this);
            });
        }
    });

    $.each([$('code.language-copy'), $('code.language-copypaste')], function() {
        this.parent().prepend('<span class="copy-glyph fas fa-paste" aria-hidden="true"></span>');
        this.parent().click(function(event) {
            $(this).find('.copy-glyph').addClass('text-success');
            handle_copy(event);
            selectElementText(this);
        });
    });
});
