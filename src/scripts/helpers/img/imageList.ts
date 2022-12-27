/* Temporary way to list and map image assets to loop load */
/* This template makes it difficult for webpack to use native 'fs' */

/* ss_[frameWidth]_[frameHeight]_[name] designates a spritesheet, all others are loaded as an image. This prefix is ommitted in the key name */
export default [
    /* Global */
    'ss_48_48_bloodSpray',
    'items',
    'tiles',
    'bullet',

    /* Player */
    'player/crosshairs',
    'player/ss_48_48_player',
]