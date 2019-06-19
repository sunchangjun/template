function init_chart(x_labels, y_labels) {
			var default_datasets = [{
				label: "My First dataset",
				fillColor: "rgba(220,220,220,0.2)",
				strokeColor: "rgba(220,220,220,1)",
				pointColor: "rgba(220,220,220,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(220,220,220,1)",
				data: y_labels
			}];
			var lineChartData = {
				labels: x_labels,
				datasets: default_datasets
			};
			var lineChartOptions = {
				//Boolean - If we should show the scale at all
				showScale: true,
				//Boolean - whether to make the chart responsive to window resizing
				responsive: true
			};
			// 折线图id
			var chart_canvas_id = 'line-chart';
			var chart = $('#' + chart_canvas_id);
			var lineChartCanvas = chart.get(0).getContext("2d");
			var lineChart = new Chart(lineChartCanvas);
			var line_chart_handle = lineChart.Line(lineChartData, lineChartOptions);
		}


		// 生成随机数
		function randomScalingFactor() {
			return Math.round(Math.random() * 100);
		}
