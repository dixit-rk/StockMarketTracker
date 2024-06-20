
    var data = {
        datasets: [{
            label: 'INFOSYS Price',
            data: [],
            borderWidth: 1,
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)'
        }]
    };

    var config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false
            },
            scales: {
                x: {
                    type: 'realtime',
                    realtime: {
                        duration: 60000,
                        ttl: 70000,
                        refresh: 999,
                        frameRate: 20
                    }
                },
                y: {
                    beginAtZero: false
                }
            }
        }
    };

    var myChart = new Chart(
        document.getElementById('myChart').getContext('2d'),
        config
    );

    var data2 = {
        datasets: [{
            label: 'BT Group PLC Price',
            data: [],
            borderWidth: 1,
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)'
        }]
    };


    var config2 = {
        type: 'line',
        data: data2,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false
            },
            scales: {
                x: {
                    type: 'realtime',
                    realtime: {
                        duration: 60000,
                        ttl: 70000,
                        refresh: 999,
                        frameRate: 20
                    }
                },
                y: {
                    beginAtZero: false
                }
            }
        }
    };

    var myChart2 = new Chart(
        document.getElementById('myChart2').getContext('2d'),
        config2
    );
  

