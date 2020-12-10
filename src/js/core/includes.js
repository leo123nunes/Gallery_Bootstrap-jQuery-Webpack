import $ from 'jquery'

var htmlSucessCallbacks = []

export function loadHtmlCallbacks(callback){
    if(!htmlSucessCallbacks.includes(callback)){
        htmlSucessCallbacks.push(callback)
    }
}

function includeAll(parent){

    if(!parent){
       parent = 'body' 
    } 

    $(parent).find('[template]').each(function(i, e){
        const url = $(e).attr('template')
        $.ajax({
            url,
            success(data){
                $(e).html(data)
                $(e).removeAttr('template')
                htmlSucessCallbacks.forEach(callback => callback(data))
                includeAll(e)
            }
        })
    })
}

includeAll()