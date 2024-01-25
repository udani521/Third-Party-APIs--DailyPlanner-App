// Handle displaying the time
var currentDate = dayjs().format("dddd D, MMMM YYYY");
$("#currentDay").text(currentDate);
var currentTime = dayjs().format("HH:mm:ss");
$("#time-display").text(currentTime);

// Generate timeblocks for standard business hours
var container = document.getElementById('time-blocks');
var businessHours = ['9.00', '10.00', '11.00', '12.00', '13.00', '14.00', '15.00', '16.00', '17.00'];

businessHours.forEach(hour => {
  var timeblock = document.createElement('div');
  timeblock.classList.add('time-block');

  var hourLabel = document.createElement('div');
  hourLabel.textContent = hour;
  hourLabel.classList.add('hour');

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

  // Loop over each time block
  $('.time-block').each(function () {
    var timeId = parseInt($(this).text().split(" ")[0]);

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

// Save items in local storage
$('.time-block').each(function() {
  var timeId = $(this).text().split(" ")[0];
  var textValue = $(this).find('.description').val();
  localStorage.setItem(timeId, textValue);
});

// Retrieve items from local storage
$('.time-block').each(function() {
  var timeId = $(this).text().split(" ")[0];
  $(this).find('.description').val(localStorage.getItem(timeId));
});

// Add event listeners to timeblocks to allow users to enter events and save to local storage
$('.time-block').on('click', function() {
  var userInput = prompt('Enter your event:');
  if (userInput !== null) {
    $(this).find('.description').val(userInput);
    var timeId = $(this).text().split(" ")[0];
    localStorage.setItem(timeId, userInput);
  }
});

// Retrieve and populate events from local storage
$('.time-block').each(function() {
  var timeId = $(this).text().split(" ")[0];
  $(this).find('.description').val(localStorage.getItem(timeId));
});

//Clear button function for clearing content and local storage
$("#clearFieldsBtn").click(function(event) {
  event.preventDefault();
  $("textArea").val("");
  localStorage.clear();
});
