$(function () {
// Sets up the current date and time with JQUERY
    var currentDate = dayjs();
    var formattedDate = currentDate.format('dddd, MMMM D, YYYY');
    $('#currentDay').text(formattedDate);


    
    // updates the time and tells the computer to add or remove classes.
    function UpdateTime(){
    var currentHour = dayjs().hour();
      $('.time-block').each(function(){
        // A FUNCTION THAT PARSES THE TIME BLOCKS ID'S 
        var blockHour = parseInt($(this).attr('id').split('-')[1])
        // REMOVES ALL CLASSES SO EVERYTHING IS RESET TO BEGIN WITH
        $(this).removeClass('past present future');

        //  ADDS DEPENDING ON TIME.
        if (blockHour < currentHour){
          $(this).addClass('past');
        } else if (blockHour === currentHour){
          $(this).addClass('present');
        } else {
          $(this).addClass('future');
       
        }

      })}
      UpdateTime();
      // CHECKS TO SEE IF CLASSES NEED TO BE UPDATED EVERY MINUTE
      setInterval(UpdateTime, 1000);

    $('.saveBtn').on('click', function () {
      var blockId = $(this).parent().attr('id');
      var eventText = $(this).siblings('.description').val();

      // Save the event text in local storage with the blockId as the key
      localStorage.setItem(blockId, eventText);
      $('#notification').fadeIn().delay(2000).fadeOut(); // Show for 2 seconds
  });

  // Load event data from local storage and populate the text fields
   $('.time-block').each(function () {
      var blockId = $(this).attr('id');
      var eventText = localStorage.getItem(blockId);

      if (eventText) {
        $(this).find('.description').val(eventText);
      }
  });
// Function to clear local storage and reset the app
$('#resetButton').on('click', function () {
  // Clear all data in local storage
  localStorage.clear();


  // Reload the page
  location.reload();
  console.log('Reset function has been called.');
});
});

  