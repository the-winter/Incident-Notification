$(function() {
  if ($('.hazard').length > 1) {
    $('#remove-table').show();
  } else {
    $('#remove-table').hide();
  }
  $('#new-table').on('click', function() {
    //  $('.table').last().clone().appendTo('.table-wrapper')

      var i=$('.hazard').length
      var hazardNew=$('.hazard').first().clone()
      hazardNew.find('select, input, textarea').map((j,elem)=>{
          // change the name of the select and input fields by increasing the number
          var oldName = $(elem).attr('name')
          var newName = oldName.replace('[0]','['+i+']')
          $(elem).attr('name', newName)
      })
      hazardNew.appendTo('.hazard-wrapper')

      if (i > 0) {
        $('#remove-table').show()
      }
  })

  $('#remove-table').on('click', function(){
    var counter = $('.hazard').length

    if (counter-1 == 1){
      $('.hazard').last().remove()
      $('#remove-table').hide();
    } else {
      $('.hazard').last().remove();
    }
  })
})
