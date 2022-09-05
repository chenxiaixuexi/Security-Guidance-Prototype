var JSONgeneral = {			
	title: {
		text: "QA Assessment Effectiveness",
		x: 0, 
		y: 0, 
		width: 700,
		labels: [
			{label: "prepared for ASM", size: 14, position: "centered", font: "Arial"}, 
			{label: "as of June 5, 2017", size: 10, position: "centered", font: "Arial"}
		]
	},
	canvas: {canvas: "myCanvas4", canvas2: "myCanvas5", width: 400, height: 400},
	data :  {
		x: 0, 
		y: 50, 
		width: 500,
		dataPoints: [
			{label: "Requirements Quality", exploded: true,
				x: {value: .20, label: "10%",  fill: "#CFE3F4", text: "#69A1C7", labelPosition: "outside"}, 
				y: {date: "Time", value: .75, label: "64.0%",  fill: "#69A1C7", text: "#000000", labelPosition: "outside"},
				a: {date: "Money", value: .353, label: "35.3%",  fill: "#69A1C7", text: "#000000", labelPosition: "outside"},
				b: {date: "Attempts", value: .45, label: "45.0%",  fill: "#69A1C7", text: "#000000", labelPosition: "outside"}
			},
			{label: "Design Quality", exploded: true,
				x: {value: .15, label: "10%",  fill: "#F6CB9D", text: "#F6CB9D", labelPosition: "outside"}, 
				y: {date: "Time", value: .50, label: "50.1%",  fill: "#F6CB9D", text: "#000000", labelPosition: "outside"},
				a: {date: "Money", value: .353, label: "35.3%",  fill: "#F6CB9D", text: "#000000", labelPosition: "outside"},
				b: {date: "Attempts", value: .25, label: "25.0%",  fill: "#F6CB9D", text: "#000000", labelPosition: "outside"}
			},
			{label: "Code Quality", exploded: true,
				x: {value: .15, label: "10%",  fill: "#AAB3D9", text: "#32508D", labelPosition: "outside"}, 
				y: {date: "Time", value: .663, label: "66.3%",  fill: "#32508D", text: "#000000", labelPosition: "outside"},
				a: {date: "Money", value: .353, label: "35.3%",  fill: "#32508D", text: "#000000", labelPosition: "outside"},
				b: {date: "Attempts", value: .25, label: "25.0%",  fill: "#32508D", text: "#000000", labelPosition: "outside"}
			},
			{label: "Quality Control", exploded: true,
				x: {value: .10, label: "10%",  fill: "#A291B1", text: "#381755", labelPosition: "outside"}, 
				y: {date: "Time", value: .844, label: "84.4%",  fill: "#381755", text: "#000000", labelPosition: "middle"},
				a: {date: "Money", value: .353, label: "35.3%",  fill: "#381755", text: "#000000", labelPosition: "outside"},
				b: {date: "Attempts", value: .25, label: "25.0%",  fill: "#381755", text: "#000000", labelPosition: "outside"}
			},
			{label: "Process Improvement", exploded: true,
				x: {value: .15, label: "10%",  fill: "#D9E4AB", text: "#86A724", labelPosition: "outside"}, 
				y: {date: "Time", value: .715, label: "71.5%",  fill: "#86A724", text: "#000000", labelPosition: "outside"},
				a: {date: "Money", value: .353, label: "35.3%",  fill: "#86A724", text: "#000000", labelPosition: "outside"},
				b: {date: "Attempts", value: .25, label: "25.0%",  fill: "#86A724", text: "#000000", labelPosition: "outside"}
			},
			{label: "Infrastructure", exploded: true,
				x: {value: .05, label: "5%", fill: "#E0A08C", text: "#A2091A", labelPosition: "outside"}, 
				y: {date: "Time", value: .852, label: "85.2%", fill: "#A2091A", text: "#000000", labelPosition: "middle"},
				a: {date: "Money", value: .353, label: "35.3%",  fill: "#A2091A", text: "#000000", labelPosition: "outside"},
				b: {date: "Attempts", value: .25, label: "25.0%",  fill: "#A2091A", text: "#000000", labelPosition: "outside"}
			},
			{label: "Domain Knowledge", exploded: true,
				x: {value: .1, label: "10%",  fill: "#969CBF", text: "#0A3369", labelPosition: "outside"}, 
				y: {date: "Time", value: .728, label: "72.8%",  fill: "#0A3369", text: "#000000", labelPosition: "outside"},
				a: {date: "Money", value: .353, label: "35.3%",  fill: "#0A3369", text: "#000000", labelPosition: "outside"},
				b: {date: "Attempts", value: .25, label: "25.0%",  fill: "#0A3369", text: "#000000", labelPosition: "outside"}
			},
			// {label: "Resource Management", exploded: true,
			// 	x: {value: .1, label: "10%",  fill: "#FBE7AA", text: "#D2AA16", labelPosition: "outside"}, 
			// 	y: {date: "Time", value: .585, label: "58.5%",  fill: "#D2AA16", text: "#000000", labelPosition: "outside"},
			// 	a: {date: "Money", value: .353, label: "35.3%",  fill: "#D2AA16", text: "#000000", labelPosition: "outside"},
			// 	b: {date: "Attempts", value: .25, label: "25.0%",  fill: "#D2AA16", text: "#000000", labelPosition: "outside"}
			// },
		], 
	}, 
	legend : {visible : true, framed : true, test: "#000000", x: 550, y: 50, width: 350}
}



function pieChart() {
  // Config settings
	var chartLabel = JSONgeneral.title.text;
	var titleWidth = JSONgeneral.title.width;
	var labels = JSONgeneral.title.labels;
	var canvasId = JSONgeneral.canvas.canvas
	var canvasWidth = JSONgeneral.data.width;
	var legendWidth = JSONgeneral.legend.width;
	var titleX = JSONgeneral.title.x;
	var titleY = JSONgeneral.title.y;
	var canvasX = JSONgeneral.data.x;
	var canvasY = JSONgeneral.data.y;
	var legendX = JSONgeneral.legend.x;
	var legendY = JSONgeneral.legend.y;
	var chartSizePercent = 75;						// The chart radius relative to the canvas width/height (in percent)
	var sliceBorderWidth = 3;						 // Width (in pixels) of the border around each slice
	var sliceBorderStyle = "#fff";					// Colour of the border around each slice
	var sliceGradientColour = "#ddd";				 // Colour to use for one end of the chart gradient
	var maxPullOutDistance = 11;					  // How far, in pixels, to pull slices out when clicked
	var pullOutLabelPadding = 20;					 // Padding between pulled-out slice and its label  
	var animationInterval = 60;					// How long (in ms) between each animation frame
	var pullOutLabelFont = "bold 10px Arial";  // Pull-out slice label font
	var pullOutShadowColour = "rgba( 0, 0, 0, .5 )";  // Colour to use for the pull-out slice shadow
	var pullOutShadowOffsetX = 5;					 // X-offset (in pixels) of the pull-out slice shadow
	var pullOutShadowOffsetY = 5;					 // Y-offset (in pixels) of the pull-out slice shadow
	var pullOutShadowBlur = 5;						// How much to blur the pull-out slice shadow
	var pullOutBorderStyle = "#444";				  // Colour of the pull-out slice border
	var chartStartAngle = -.5 * Math.PI;			  // Start the chart at 12 o'clock instead of 3 o'clock

	// Declare some variables for the chart
	var canvas;					   // The canvas element in the page
	var currentPullOutDistance = 7;   // How many pixels the pulled-out slice is currently pulled out in the animation
	var chartData = [];			   // Chart data (labels, values, and angles)
	var chartColours = [];			// Chart colours (pulled from the HTML table)
	var inlineChartColours = [];
	var canvasWidth;				  // Width of the canvas, in pixels
	var canvasHeight;				 // Height of the canvas, in pixels
	var centreX;					  // X-coordinate of centre of the canvas/chart
	var centreY;					  // Y-coordinate of centre of the canvas/chart
	var chartRadius;				  // Radius of the pie chart, in pixels
	var dataPoints;
	var dateValues;
	var date_str = [];

	// Set things up and draw the chart
	init();
	initcheckbox();


	/**
		* Set up the chart data and colours, as well as the chart and table click handlers,
		* and draw the initial pie chart
	*/

	function init() {
		
		// Draw Main Container
		var html_str = '<div id="container">';
		html_str += '<div style="position: absolute; left: ' + titleX + 'px; top: ' + titleY + 'px; width: ' + titleWidth + 'px;">';
		html_str += '<div align="center" style="font-size: 20px; color: blue; font-weight: bold;">' + chartLabel + '</div>';
		html_str += '<div align="center" style="font-size: ' + labels[0].size + 'px; color: blue; font-weight: bold;">' + labels[0].label + '</div>';
		html_str += '<div align="center" style="font-size: ' + labels[1].size + 'px; color: blue; font-weight: bold;">' + labels[1].label + '</div>';
		html_str += '</div>';
		html_str += '<div style="float: left;">'
		html_str += '<canvas id="' + canvasId + '" width="' + canvasWidth +'" height="' + canvasWidth + '" style="position: absolute; left: ' + canvasX + 'px; top: ' + canvasY + 'px;"></canvas>';
		html_str += '</div>';
		html_str += '<div id="legend" style="float: left; margin-top: ' + (canvasWidth / 5) + 'px;width: ' + legendWidth + 'px; height: ';
		html_str += canvasWidth + 'px; position: absolute; left: ' + legendX + 'px; top: ' + legendY + 'px">';
		html_str += '</div></div>';
		$('body').append(html_str);

		// Get the canvas element in the page
		canvas = document.getElementById(canvasId);

		// Exit if the browser isn't canvas-capable
		if ( typeof canvas.getContext === 'undefined' ) {
			return;
		}

		// Initialise some properties of the canvas and chart
		canvasWidth = canvas.width;
		canvasHeight = canvas.height;
		centreX = canvasWidth / 2;
		centreY = canvasHeight / 2;
		chartRadius = Math.min( canvasWidth, canvasHeight ) / 2 * ( chartSizePercent / 100 );

		// Grab the data from the table,
		// and assign click handlers to the table data cells
		
		dataPoints = JSONgeneral.data.dataPoints;
		var currentPos = 0;
		for (i = 0; i < dataPoints.length; i ++) {
			eachData = [];
			eachData['label'] = dataPoints[i].label;
			eachData['value'] = dataPoints[i].x.value;
			eachData['startAngle'] = 2 * Math.PI * currentPos;
			eachData['endAngle'] = 2 * Math.PI * (currentPos + dataPoints[i].x.value);
			eachData['xLabelColor'] = dataPoints[i].x.text;
			eachData['yLabelColor'] = dataPoints[i].y.text;
			eachData['yLabelPosition'] = dataPoints[i].y.labelPosition;
			eachData['xLabelPosition'] = dataPoints[i].x.labelPosition;
			currentPos += dataPoints[i].x.value;
			chartData.push(eachData);
			hex = dataPoints[i].x.fill.match(/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/)
			chartColours.push([parseInt(hex[1], 16), parseInt(hex[2], 16), parseInt(hex[3], 16)]);
			hex = dataPoints[i].y.fill.match(/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/)
			inlineChartColours.push([parseInt(hex[1], 16), parseInt(hex[2], 16), parseInt(hex[3], 16)]);
		}
		
		context = canvas.getContext('2d');
		context.clearRect(0, 0, canvasWidth, canvasHeight);
		drawLegend();
		drawChart();
		
		// initialize out label
		for (var slice in chartData) {
			drawLabel(context, slice);
		}
	}
	
	function drawChart(yKey = false, yDateValue = false, flag = false, previousKey = false) {
		var i = 0;
		animationId = setInterval(function() {
			for (var slice in chartData) {
				var radius = chartRadius * dataPoints[slice].y.value;
				drawSlice(context, slice);
				if (yKey) {
					var previousRadius = chartRadius * dataPoints[slice][previousKey].value;
					var currentRadius = chartRadius * dataPoints[slice][yKey].value;
					if (previousRadius > currentRadius) {
						var diffRadius = previousRadius - currentRadius;
						var decreaseStep = diffRadius / 10;
						var decreasedRadius = previousRadius - (i * decreaseStep);
						drawInlineSlice(context, slice, yKey, yDateValue, flag, decreasedRadius);
						$('.check-all').attr('disabled', 'disabled');
					}
					else if (previousRadius < currentRadius) {
						var diffRadius = currentRadius - previousRadius;
						var increaseStep = diffRadius / 10;
						var increasedRadius = previousRadius + (i * increaseStep);
						drawInlineSlice(context, slice, yKey, yDateValue, flag, increasedRadius);
						$('.check-all').attr('disabled', 'disabled');
					}
					else {
						drawInlineSlice(context, slice, yKey, yDateValue, flag, currentRadius);
						drawInlineLabel(context, slice, yKey, yDateValue, flag);
					}
				}
				else {
					drawInlineSlice(context, slice, false, false, false, radius);
					drawInlineLabel(context, slice, yKey, yDateValue, flag);
					$('.check-all').removeAttr('disabled');
				}
			}
			if (i == 10) {
				for (var slice in chartData) {
					var radius = chartRadius * dataPoints[slice].y.value;
					drawSlice(context, slice);
					if (yKey) {
						var currentRadius = chartRadius * dataPoints[slice][yKey].value;
						drawInlineSlice(context, slice, yKey, yDateValue, flag, currentRadius);
					}
					else {
						drawInlineSlice(context, slice, false, false, false, radius);
					}
					drawInlineLabel(context, slice, yKey, yDateValue, flag);
				}
				$('.check-all').removeAttr('disabled');
				duringAnimation = false;
				clearInterval(animationId);
				return;
			}
			i ++;
		}, animationInterval);
	}

	function drawSlice (context, slice) {
		// Compute the adjusted start and end angles for the slice
		var startAngle = chartData[slice]['startAngle']  + chartStartAngle;
		var endAngle = chartData[slice]['endAngle']  + chartStartAngle;
		var inlineChartRadius = dataPoints[slice].y.value * chartRadius;
		var midAngle = (startAngle + endAngle) / 2;
		// This slice isn't pulled out, so draw it from the pie centre
		startX = centreX;
		startY = centreY;
		
		// Set up the gradient fill for the slice
		var sliceGradient = context.createLinearGradient(0, 0, canvasWidth * .75, canvasHeight * .75);
		sliceGradient.addColorStop(0, sliceGradientColour);
		sliceGradient.addColorStop(1, 'rgb(' + chartColours[slice].join(',') + ')');

		// Draw the slice
		context.beginPath();
		context.moveTo(startX, startY);
		context.arc(startX, startY, chartRadius, startAngle, endAngle, false);
		context.lineTo(startX, startY);
		context.closePath();
		context.fillStyle = sliceGradient;
		context.fill();
		
		context.lineWidth = sliceBorderWidth;
		context.strokeStyle = sliceBorderStyle;
		context.stroke();
		
		
	}
	
	
	function drawInlineSlice(context, slice, yKey = false, yDateValue = false, flag = false, radius) {
		// Compute the adjusted start and end angles for the slice
		var yValuel;
		var lastYValue;
		var previousDateValue;
		var startAngle = chartData[slice]['startAngle']  + chartStartAngle;
		var endAngle = chartData[slice]['endAngle']  + chartStartAngle;
		var exploded = dataPoints[slice].exploded;
		var midAngle = (startAngle + endAngle) / 2;
		// Set up the gradient fill for the slice
		var sliceGradient = context.createLinearGradient(0, 0, canvasWidth * .75, canvasHeight * .75);
		sliceGradient.addColorStop(1, 'rgb(' + inlineChartColours[slice].join(',') + ')');
		
		var lastYKey;
		if (yDateValue) {
			lastYKey = getlastYKey(getlast_date(yDateValue));
		}
		else {
			lastYKey = getlastYKey(date_str[1]);
		}
		lastYValue = parseFloat(dataPoints[slice][lastYKey].value * 100).toFixed(1);
		
		if ( exploded ) {
			
			// We're pulling (or have pulled) this slice out.
			// Offset it from the pie centre, draw the text label,
			// and add a drop shadow.
			var actualPullOutDistance = currentPullOutDistance * easeOut(currentPullOutDistance/maxPullOutDistance, .8);
			
			startX = centreX + Math.cos(midAngle) * actualPullOutDistance;
			startY = centreY + Math.sin(midAngle) * actualPullOutDistance;
			context.shadowOffsetX = pullOutShadowOffsetX;
			context.shadowOffsetY = pullOutShadowOffsetY;
			context.shadowBlur = pullOutShadowBlur;
			context.fillStyle = sliceGradient;
			
			context.shadowColor = pullOutShadowColour;
			context.beginPath();
			context.moveTo(startX, startY);
			
			if (yKey) {
				context.arc( startX, startY, radius, startAngle, endAngle, false );
				yValue = parseFloat(dataPoints[slice][yKey].value * 100).toFixed(1);
				yRadius = chartRadius * dataPoints[slice][yKey].value
			}
			else {
				context.arc(startX, startY, radius, startAngle, endAngle, false);
				yValue = parseFloat(dataPoints[slice].y.value * 100).toFixed(1); 
				yRadius = chartRadius * dataPoints[slice].y.value
			}
			if (yValue > lastYValue) {
				pullOutBorderStyle = "#00ff00";		///////// green
			}
			else if (yValue < lastYValue) {
				pullOutBorderStyle = "#ff0000";  	//////// red
			}
			else {
				pullOutBorderStyle = "#444";		//////// black
			}
			
			context.lineTo(startX, startY);
			context.closePath();
			context.fill();
			context.shadowColor = "rgba( 0, 0, 0, 0 )";
			context.lineWidth = 2;
			context.strokeStyle = pullOutBorderStyle;
			context.stroke();
			
		} else {

			// This slice isn't pulled out, so draw it from the pie centre
			startX = centreX;
			startY = centreY;
			var shadowColour = ColorLuminance(dataPoints[slice].y.fill, -0.3);
			context.shadowOffsetX = 4;
			context.shadowOffsetY = 4;
			context.shadowBlur = 1;
			context.shadowColor = shadowColour;
			context.beginPath();
			context.moveTo(startX, startY);
			
			if (yKey) {
				context.arc(startX, startY, radius, startAngle, endAngle, false);
			}
			else {
				context.arc(startX, startY, radius, startAngle, endAngle, false);
			}
			context.lineTo(startX, startY);
			context.closePath();
			context.fillStyle = sliceGradient;
			context.fill();
			context.shadowColor = "rgba( 0, 0, 0, 0 )";
		}
		
		
	}
	
	function drawLabel(context, slice) {
		var startAngle = chartData[slice]['startAngle']  + chartStartAngle;
		var endAngle = chartData[slice]['endAngle']  + chartStartAngle;
		var midAngle = (startAngle + endAngle) / 2;
		/* ----  Label Position ---- */
		context.textAlign = "center";
		context.fillStyle = chartData[slice].xLabelColor;
		context.font = pullOutLabelFont;
		
		var xValue = parseFloat(dataPoints[slice].x.value * 100).toFixed(1);  /////// decimal  places 
		if (chartData[slice]['xLabelPosition'] == "inside") {
			context.fillText(xValue + "%", centreX + Math.cos(midAngle) * ( chartRadius / 2 + maxPullOutDistance), centreY + Math.sin(midAngle) * ( chartRadius / 2 + maxPullOutDistance));
		}
		if (chartData[slice]['xLabelPosition'] == "edge") {
			context.fillText(xValue + "%", centreX + Math.cos(midAngle) * ( chartRadius), centreY + Math.sin(midAngle) * ( chartRadius));
		}
		if (chartData[slice]['xLabelPosition'] == "outside") {				
			context.fillText(xValue + "%", centreX + Math.cos(midAngle) * ( chartRadius +  pullOutLabelPadding), centreY + Math.sin(midAngle) * ( chartRadius +  pullOutLabelPadding) );
		}
		if (chartData[slice]['xLabelPosition'] == "middle") {
			context.fillText(xValue + "%", (centreX + Math.cos(midAngle) * (chartRadius / 2 + 10 )), (centreY + Math.sin(midAngle) * (chartRadius / 2 + 10 ) + 7));
		}
		/* ------------------------- */
	}
	
	function drawInlineLabel(context, slice, yKey, yDateValue, flag) {
		/* --- Label Position --- */
		var yValue, lastYValue;
		var startAngle = chartData[slice]['startAngle']  + chartStartAngle;
		var endAngle = chartData[slice]['endAngle']  + chartStartAngle;
		var exploded = dataPoints[slice].exploded;
		var midAngle = (startAngle + endAngle) / 2 + 0.1;
		chartRadius = Math.min( canvasWidth, canvasHeight ) / 2 * ( chartSizePercent / 100 );
		context.textAlign = "center";
		context.fillStyle = chartData[slice].yLabelColor;
		context.font = pullOutLabelFont;
		var yLabelPosition, dataPointsYValue;
		if (yKey) {
			yValue = parseFloat(dataPoints[slice][yKey].value * 100).toFixed(1);  /////// decimal  places 
			yLabelPosition = dataPoints[slice][yKey].labelPosition;
			dataPointsYValue= dataPoints[slice][yKey].value;
		}
		else {
			yValue = parseFloat(dataPoints[slice].y.value * 100).toFixed(1);  /////// decimal  places 
			yLabelPosition = chartData[slice]['yLabelPosition'];
			dataPointsYValue = dataPoints[slice].y.value;
		}
		if (yLabelPosition == "inside") {
			context.fillText(yValue + "%", centreX + Math.cos(midAngle) * (dataPointsYValue * chartRadius / 2 + maxPullOutDistance), centreY + Math.sin(midAngle) * ((dataPointsYValue * chartRadius / 2) + maxPullOutDistance));
		}
		if (yLabelPosition == "outside") {				
			context.fillText(yValue + "%", centreX + Math.cos(midAngle) * ((dataPointsYValue * chartRadius + 7) + pullOutLabelPadding ), centreY + Math.sin(midAngle) * ((dataPointsYValue * chartRadius + 7 ) + pullOutLabelPadding));
		}
		if (yLabelPosition == "middle") {
			context.fillText(yValue + "%", (centreX + Math.cos(midAngle) * (dataPointsYValue * chartRadius / 2 + 10)), (centreY + Math.sin(midAngle) * (dataPointsYValue * chartRadius / 2 +10 ) + 7));
		}
		if (yLabelPosition == "edge") {
			context.fillText(yValue + "%", centreX + Math.cos(midAngle) * (( dataPointsYValue * chartRadius) + 10), centreY + Math.sin(midAngle) * (( dataPointsYValue * chartRadius) + 10));
		}
		/* ------------------------ */
	}

	function easeOut(ratio, power) {
		return (Math.pow ( 1 - ratio, power ) + 1);
	}
	
		
	function drawLegend() {
		var html_str = "";
		for (var i = 0; i < dataPoints.length; i ++) {
			html_str += "<div style='margin-bottom: 5px;'><span style='display:inline-block; width:18px; height: 18px; background-color:" + dataPoints[i].x.fill + ";'>&nbsp;</span>";
			html_str += "<span style='margin-left: 5px; font-size: 11px; font-weight: bold;'>" + dataPoints[i].label + "</span></div>";
			
			dateValues = getDateValues(dataPoints[i]);
		}
		html_str += "<div style='margin-bottom: 1em'></div>";
		for (var i = 0; i < dateValues.length; i ++) {
			if (i == 0) {
				html_str += "<div style='margin-top:'><input class='check-all checked' type='radio' checked id=y_" + dateValues[i].y.date + ">";
				html_str += "<label style='font-size: 11px; font-weight: bold' for= y_" + dateValues[i].y.date + ">"+ dateValues[i].y.date +"</label></div>";
				i ++;
				date_str.push(dateValues[0].y.date);
			}
			for (key in dateValues[i]) {
				date_str.push(dateValues[i][key].date);
			}
			datesort(date_str);
			for (key in dateValues[i]) {
				html_str += "<div style='margin-top:'><input class='check-all ' type='radio' id=" + key + "_" + date_str[i] + ">";
				html_str += "<label style='font-size: 11px; font-weight: bold' for=" + key + "_" + date_str[i] + ">"+ date_str[i] +"</label></div>";
			}
			
		}
		$('#legend').append(html_str);
	}
	
	
	function ColorLuminance(hex, lum) {

		// validate hex string
		hex = String(hex).replace(/[^0-9a-f]/gi, '');
		if (hex.length < 6) {
			hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
		}
		lum = lum || 0;

		// convert to decimal and change luminosity
		var rgb = "#", c, i;
		for (i = 0; i < 3; i ++) {
			c = parseInt(hex.substr(i * 2, 2), 16);
			c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
			rgb += ("00" + c).substr(c.length);
		}

		return rgb;
	}
	
	function getDateValues(dataPoint) {
		var dateValues = [];
		$.each(dataPoint, function(key, value) {
			var dateObject = {};
			if (key != 'label' && key != 'exploded' && key != 'x') {
				dateObject[key] = value;
				dateValues.push(dateObject);
			}
		});
		return dateValues;
	}
	
	function initcheckbox(){
		$(".check-all").change(function(){
			lastdateObject = $(".check-all.checked").attr("id");
			if (lastdateObject == $(this).attr('id')) {
				return;
			}
			var previousKey = lastdateObject.split('_')[0];
			if ($(this).prop('checked')) {
				$(".check-all.checked").prop("checked", false).removeClass("checked");
				$(this).addClass("checked");
				dateObject = $(this).attr('id');
				var flag = dateCompare(lastdateObject, dateObject);
				getyValue(dateObject, flag, previousKey);
			}
			else {
				$(this).removeClass("checked");
				date = $(this).attr('id');
			}
		});
	}
	
	function getyValue(dateObject, flag, previousKey) {
		var yKey = dateObject.split('_')[0];
		var yDateValue = dateObject.split('_')[1];
		drawChart(yKey, yDateValue, flag, previousKey);
	}
	
	function dateCompare(lastdateObject, dateObject){
		var mindate = getMinDate(date_str);
		var lastdate = lastdateObject.split("_")[1];
		var currentdate = dateObject.split("_")[1];
		var parts1 = lastdate.split('/');
		var d1 = Number(parts1[2] + parts1[0] + parts1[1]);
		var parts2 = currentdate.split('/');
		var d2 = Number(parts2[2] + parts2[0] + parts2[1]);
		if(d2 == mindate){
			return 2;
		}
		else {
			if (d2 > d1) {
				return 1;
			}
			else {
				return -1;
			}
		}
	}
	function getMinDate(date_str){
		var str = [];
		for (i = 0 ; i < date_str.length; i ++) {
			var dpart = date_str[i].split('/');
			var dnumber = Number(dpart[2] + dpart[0] + dpart[1]);
			str.push(dnumber);
		}
		var mindate = Math.min.apply(null, str); 
		return mindate;
	}
	
	function datesort(date_str){
		for (i = 0 ; i < date_str.length - 1 ; i ++) {
			a = date_str[i];
			b = date_str[i + 1];
			if (getdnumber(a) < getdnumber(b)) {
				c = a;
				a = b;
				b = c;
			}
		}
		return date_str;
	}
	
	function getdnumber(date){
		dpart = date.split('/');
		return Number(dpart[2] + dpart[0] + dpart[1]);
	}
	
	function getlast_date(date){
		for (i = 0 ; i < date_str.length ; i ++) {
			if (date_str[i] == date) {
				if (!date_str[i+1]) {
					return date_str[i];
				}
				else {
					return date_str[i+1];
				}
			}
		}
	}
	
	function getlastYKey(date){
		for (var i = 0; i < dateValues.length; i ++) {			
			for (key in dateValues[i]) {
				if (dateValues[i][key].date == date) {
					return key;
				}
			}
		}
	}
	 
	
}
