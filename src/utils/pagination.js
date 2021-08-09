export const parseLinkHeader = linkHeader  => {
    if(linkHeader){
        const linkHeadersArray = linkHeader.split( ", " ).map( header => header.split( "; " ) );
        const linkHeadersMap = linkHeadersArray.map( header => {
           const thisHeaderRel = header[1].replace( /"/g, "" ).replace( "rel=", "" );
           const thisHeaderUrl = header[0].slice( 1, -1 ).split('5000')[1];
           return [ thisHeaderRel, thisHeaderUrl ]
        } );

        const paginationLinks = Object.fromEntries( linkHeadersMap );
        const pagesNumber = Number(paginationLinks.last.split('_page=')[1].split('&')[0])

        return {paginationLinks, pagesNumber};
        // return Object.fromEntries( linkHeadersMap );

    }
}