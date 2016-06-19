$( document ).ready( function() {

    // FRONT PAGE TAGS TOOLTIPS
    $( '.crd__tags-toggler' ).click( function() {
        var e = $( this ).find( '.crd__tags' ),
            all = $( '.crd__tags-toggler' ).find( '.crd__tags' );

        if( e.hasClass( 'show-tags' ) ) {
            all.removeClass( 'show-tags' );
            e.removeClass( 'show-tags' );
        }
        else {
            all.removeClass( 'show-tags' );
            e.addClass( 'show-tags' );
        }
    })
})
