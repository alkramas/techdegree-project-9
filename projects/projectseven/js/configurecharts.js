// get toggle feedback
let trafficToggle = document.querySelector('#traffic-toggle');
let toggleCollection = trafficToggle.querySelectorAll('input');

// set default week
trafficWeek();
function toggleTrafficChart() {
  for (let i = 0; i < toggleCollection.length; i += 1) {
    // console.log(toggleCollection[i]);
    let thisElement = toggleCollection[i];
    if (thisElement.checked === true) {
      // console.log(thisElement.id + ' is toggled');
      if (thisElement.id === 'hour') {
          // console.log(thisElement.id + ' is toggled');
          trafficHour();
      } else if (thisElement.id === 'day') {
          // console.log(thisElement.id + ' is toggled');
          trafficDay();
      } else if (thisElement.id === 'week') {
          // console.log(thisElement.id + ' is toggled');
          trafficWeek();
      } else if (thisElement.id === 'month') {
          // console.log(thisElement.id + ' is toggled');
          trafficMonth();
      }
    }
  }
};

trafficToggle.addEventListener('change', function(e){
  let id = e.target.id;
  // console.log('the event target object is ' + id);
  toggleTrafficChart();
});


// traffic chart
function trafficHour() {
  var ctx = document.getElementById('traffic-chart').getContext('2d');
  var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
          labels: ['0100', '0200', '0300', '0400', '0500', '0600', '0700', '0800', '0900', '1000', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'],
          datasets: [{
              label: '',
              backgroundColor: ['blue', 'grey', '#5a61a8'],
              borderColor: ['blue', 'grey', '#5a61a8'],
              data: [0, 0, 0, 0, 4, 12, 7, 32, 140, 201, 350, 20, 43, 181, 235, 387, 210, 251, 180, 75, 56, 20, 41, 18]
          }]
      },

      // Configuration options go here
      options: {
        legend: {
          display: false
        }
      }
  });
}



// traffic chart
function trafficDay() {
  var ctx = document.getElementById('traffic-chart').getContext('2d');
  var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
          labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
          datasets: [{
              label: '',
              backgroundColor: ['blue', 'grey', '#5a61a8'],
              borderColor: ['blue', 'grey', '#5a61a8'],
              data: [0, 500, 1250, 750, 1500, 2000, 1500, 1750, 1250, 1750, 2250, 1750, 2250]
          }]
      },

      // Configuration options go here
      options: {
        legend: {
          display: false
        }
      }
  });
}

// traffic chart
function trafficWeek() {
  var ctx = document.getElementById('traffic-chart').getContext('2d');
  var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
          labels: ['week 1', 'week 2', 'week 3', 'week 4'],
          datasets: [{
              label: '',
              backgroundColor: ['blue', 'grey', '#5a61a8'],
              borderColor: ['blue', 'grey', '#5a61a8'],
              data: [30, 74, 210, 153]
          }]
      },

      // Configuration options go here
      options: {
        legend: {
          display: false
        }
      }
  });
}

function trafficMonth() {
  var ctx = document.getElementById('traffic-chart').getContext('2d');
  var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
          labels: ['january', 'feburary', 'march', 'april', 'mai', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
          datasets: [{
              label: '',
              backgroundColor: ['blue', 'grey', '#5a61a8'],
              borderColor: ['blue', 'grey', '#5a61a8'],
              data: [7030, 1960, 3874, 6048, 8312, 8981, 7601, 4320, 5871, 3240, 1258, 2874, 3108]
          }]
      },

      // Configuration options go here
      options: {
        legend: {
          display: false
        }
      }
  });
}

// daily charts
var ctx = document.getElementById('dailyChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        datasets: [{
            label: '',
            backgroundColor: '#5a61a8',
            borderColor: 'rgb(255, 99, 132)',
            data: [50, 80, 150, 121, 219, 201, 77]
        }]
    },

    // Configuration options go here
    options: {
      legend: {
        display: false
      }
    }

});




// mobile users charts
var ctx = document.getElementById('doughnutChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'doughnut',

    // The data for our dataset
    data: {
        labels: ['Phones', 'Tablets', 'Desktop'],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: ['blue', 'grey', '#5a61a8'],
            borderColor: ['blue', 'grey', '#5a61a8'],
            data: [20, 12, 86]
        }]
    },

    // Configuration options go here
    options: {
      legend: {
      position: 'right'
    }}
});


// launch alert plugin
