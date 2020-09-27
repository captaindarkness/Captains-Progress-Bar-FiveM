fx_version 'cerulean' --bodacious, adamant
games { 'rdr3', 'gta5' }

author 'Captain Darkness (fluffebunneh twitch)'
description 'Progress bar for actions.'

client_script 'progressbar-c.lua'

export 'createProgressBar'

ui_page('html/main.html')

files {
    'html/main.html',
    'html/progressbar.js',
    'html/style.css',
    'html/reset.css'
}