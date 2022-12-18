/* Temporary way to list and map image assets to loop load */
/* This template makes it difficult for webpack to use native 'fs' */

/* ss_[frameWidth]_[frameHeight]_[name] designates a spritesheet, all others are loaded as an image. This prefix is ommitted in the key name */
export default [
    /* Global */
    'ss_48_48_bloodSpray',
    'items',
    'tiles',

    /* Player */
    'player/crosshairs',
    'player/idle/unarmed',
    'player/idle/handgun',
    'player/idle/punch',
    'player/idle/rifle',
    'player/death/ss_48_48_death1',
    'player/death/ss_48_48_death2',
    'player/death/ss_48_48_death3',
    'player/run/ss_48_48_handgun',
    'player/run/ss_48_48_punch',
    'player/run/ss_48_48_rifle',
    'player/run/ss_48_48_unarmed',
    'player/walk/ss_48_48_handgun',
    'player/walk/ss_48_48_punch',
    'player/walk/ss_48_48_rifle',
    'player/walk/ss_48_48_unarmed',
]