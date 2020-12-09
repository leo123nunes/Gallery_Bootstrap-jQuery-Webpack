import $ from 'jquery'

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
                includeAll(e)
            }
        })
    })
}

includeAll()