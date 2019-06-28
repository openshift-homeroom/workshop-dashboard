$(document).ready(function() {
    $.each([$('.execute .content'), $('.execute-1 .content')], function() {
        if (window.location !== window.parent.location) {
            $(this).find('.highlight').prepend('<span class="execute-glyph fas fa-play-circle" aria-hidden="true"></span>');
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
            $(this).find('.highlight').prepend('<span class="copy-glyph fas fa-paste" aria-hidden="true"></span>');
            this.parent().click(function(event) {
                $(this).find('.copy-glyph').addClass('text-success');
                handle_copy(event);
                selectElementText(this);
            });
        }
    });

    $.each([$('.execute-2 .content')], function() {
        if (window.location !== window.parent.location) {
            $(this).find('.highlight').prepend('<span class="execute-glyph fas fa-play-circle" aria-hidden="true"></span>');
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
            $(this).find('.highlight').prepend('<span class="copy-glyph fas fa-paste" aria-hidden="true"></span>');
            this.parent().click(function(event) {
                $(this).find('.copy-glyph').addClass('text-success');
                handle_copy(event);
                selectElementText(this);
            });
        }
    });

    $.each([$('.copypaste .content'), $('.copy .content')], function() {
        $(this).find('.highlight').prepend('<span class="copy-glyph fas fa-paste" aria-hidden="true"></span>');
        this.parent().click(function(event) {
            $(this).find('.copy-glyph').addClass('text-success');
            handle_copy(event);
            selectElementText(this);
        });
    });
});
