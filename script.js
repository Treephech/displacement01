let chart;

document.getElementById('inputForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const u = parseFloat(document.getElementById('u').value);
    const a = parseFloat(document.getElementById('a').value);
    let t = parseFloat(document.getElementById('t').value);

    t = t*2;


    const intervals = parseInt(document.getElementById('intervals').value);
    const data = [];

    for (let i = 0; i <= intervals; i++) {
        const time = (t / intervals) * i;
        const s = u * time + 0.5 * a * time * time;
        data.push({ x: time, y: s });
    }

    const ctx = document.getElementById('myChart').getContext('2d');

    if (chart) {
        chart.data.datasets[0].data = data;
        chart.data.datasets[0].pointBackgroundColor = data.map(point => point.x === t / 2 ? 'red' : 'rgba(75, 192, 192, 1)');
        chart.update();
    } else {
        chart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 's = ut + (1/2)at^2',
                    data: data,
                    backgroundColor: 'rgba(75, 192, 192, 1)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    showLine: true,
                    fill: false,
                    pointRadius: 5,
                    pointBackgroundColor: data.map(point => point.x === t / 2 ? 'red' : 'rgba(75, 192, 192, 1)')
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        title: {
                            display: true,
                            text: 'Time (t)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Displacement (s)'
                        }
                    }
                }
            }
        });
    }
});
