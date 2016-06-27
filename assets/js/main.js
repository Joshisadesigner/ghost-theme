$( document ).ready( function() {

    // HAMBURGER ICON ANIMATION
    $('.sb__hamb').click(function() {
        $(this).toggleClass('open');
        $('.sb__mobile').toggle();
    });

    window.addEventListener('resize', function(event){
        if( $( window ).width() > 739 ) {
            $( '.sb__mobile').css( "display", "block" );
            $('.sb__hamb').removeClass('open');
        }
        else {
            $( '.sb__mobile').css( "display", "none" );
        }
    });

    // FRONT PAGE TAGS TOOLTIPS
    $( '.crd__tags-toggler' ).click( function() {
        var e = $( this ).find( '.crd__tags' ),
            all = $( '.crd__tags-toggler' ).find( '.crd__tags' );

        if( e.hasClass( 'show-tags' ) ) {
            all.removeClass( 'show-tags' );
            e.removeClass( 'show-tags' );
            $( this ).removeClass( 'active' );
        }
        else {
            all.removeClass( 'show-tags' );
            e.addClass( 'show-tags' );
            $( this ).addClass( 'active' );
        }
    });
})
