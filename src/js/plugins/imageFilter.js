import $ from 'jquery'

import {loadHtmlCallbacks} from "../core/includes.js"

const fadeTime = 300

function nameSelector(city) {
    $('[cityName]').each((i, e) => {
        var isTarget = $(e).attr('cityName') === city || city === null

        if (isTarget) {
            $(e).parent().removeClass('d-none')
            $(e).fadeIn(fadeTime)
        } else {
            $(e).fadeOut(fadeTime, () => {
                $(e).parent().addClass('d-none')
            })
        }
    })
}

$.fn.cityButtons = function () {
    var citiesNames = new Set()

    $('[cityName]').each((i, e) => {
        citiesNames.add($(e).attr('cityName'))
    })

    var btns = Array.from(citiesNames).map(city => {
        var newButton = $('<button>').addClass(['btn', 'btn-info']).html(city)
        newButton.on('click', () => nameSelector(city))
        return newButton
    })

    var btnAll = $('<button>').addClass(['btn', 'btn-info', 'active']).html('All')
    btnAll.on('click', () => nameSelector(null))

    btns.push(btnAll)

    var btnGroup = $('<div>').addClass('btn-group')

    btnGroup.append(btns)

    $(this).html(btnGroup)
    return this
}

loadHtmlCallbacks(function (){
   $('[cityButtons]').cityButtons() 
})

