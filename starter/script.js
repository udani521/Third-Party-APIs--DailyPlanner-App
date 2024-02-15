$(document).ready(function () {
// Handle displaying the time
var currentDate = dayjs().format("dddd D, MMMM YYYY");
$("#currentDay").text(currentDate);
var currentTime = dayjs().format("H : mm : s ");
$("#time-display").text(currentTime);

// Generate timeblocks for standard business hours
var container = document.getElementById('time-blocks');
var businessHours = ['9.00AM', '10.00AM', '11.00AM', '12.00PM', '13.00PM', '14.00PM', '15.00PM', '16.00PM', '17.00PM'];

businessHours.forEach(hour => {
  var timeblock = document.createElement('div');
  timeblock.classList.add('time-block');

  var hourLabel = document.createElement('div');
  hourLabel.textContent = hour;
  hourLabel.classList.add('hour');
 //console.log(hourLabel);
  var textArea = document.createElement('textarea');
  textArea.classList.add('description');

  var saveButton = document.createElement('button');
  saveButton.classList.add('saveBtn');
  saveButton.innerHTML = '<i class="far fa-save"></i>';

  timeblock.append(hourLabel, textArea, saveButton);
  container.appendChild(timeblock);
});

// Function to track tasks and make them change colors if they are in the past, present or future
function auditTask() {
  var currentHour = new Date().getHours();
  console.log(`Current Hour: ${currentHour}`);


  // Loop over each time block
  $('.time-block').each(function () {
    var timeId = parseInt($(this).text().split(" ")[0]);
    console.log(`Time Block Hour: ${timeId}`);
    if (timeId < currentHour) {
      $(this).addClass('past').removeClass('present future');
    } else if (timeId === currentHour) {
      $(this).addClass('present').removeClass('past future');
    } else {
      $(this).addClass('future').removeClass('past present');
    }
  });
}

// Call the audit task function
auditTask();


/*// Save items in local storage
$('.time-block').each(function() {
  var timeId = $(this).text().split(" ")[0];
  var textValue = $(this).find('.description').val();
  localStorage.setItem(timeId, textValue);
  console.log(`Saved: ${timeId} - ${textValue}`);
});*/    //  comment out this part because this part causing the local storage to be overwritten with empty values

// Retrieve and populate events from local storage on page load
$(document).ready(function() {
  $('.time-block').each(function() {
    var timeId = $(this).find('.hour').text();
    var storedValue = localStorage.getItem(timeId);
    if (storedValue !== null) {
      $(this).find('.description').val(storedValue);
    }
  });
});

 // Save items in local storage on button click
 $('.saveBtn').on('click', function() {
  var userInput = $(this).siblings('.description').val();
  var timeId = $(this).siblings('.hour').text();
  localStorage.setItem(timeId, userInput);
});



// Retrieve and populate events from local storage
$('.time-block').each(function() {
  var timeId = $(this).text().split(" ")[0];
  $(this).find('.description').val(localStorage.getItem(timeId));
});

});
