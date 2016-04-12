var myLatitude;
                var myLongitude;
                var icon ={
                    "clear-day" : "B",
                    "clear-night" : "C",
                    "rain" : "R",
                    "snow" : "G",
                    "sleet" : "X",
                    "wind" : "S",
                    "fog" : "N",
                    "cloudy" : "Y",
                    "partly-cloudy-day" : "H",
                    "partly-cloudy-night" : "I",
                };
                
                function getCityLongLat(){
                    var address = $("#cityName").val();
                        
                    $.ajax({
                        url: "http://maps.googleapis.com/maps/api/geocode/json?address="+address+"&sensor=false",
                        type: "POST",
                        success: function(json){
                            $("#myLatitude").html(json.results[0].geometry.location.lat);
                            $("#myLongitude").html(json.results[0].geometry.location.lng);
                            myLatitude = JSON.stringify(json.results[0].geometry.location.lat);
                            myLongitude = JSON.stringify(json.results[0].geometry.location.lng);
                            loadNewWeather(); 
                        },
                        error: function(res){
                            console.log(res.message);
                        }
                    });
                }
                
                function loadNewWeather(){
                    var newForcastURL = "https://api.forecast.io/forecast/bf79ca41b5692975a41d2c601cd3eb53/" +myLatitude+ "," +myLongitude;
                    $.ajax({
                        url: newForcastURL,
                        jsonCallback: 'jsonCallback',
                        contantType: "application/json",
                        dataType: 'jsonp',
                        success: function(json){
                            console.log(json);
                        $("#current_temp").html(Math.round(json.currently.temperature)+"&#176;F");
                        $("#current_summary").html(json.currently.summary);
                        $("#current_temp").attr("data-icon",icon[json.currently.icon]+" ");
                        $("#Day_1").html("1: "+json.daily.data[0].summary);
                        $("#Day_2").html("2: "+json.daily.data[1].summary);
                        $("#Day_3").html("3: "+json.daily.data[2].summary);
                        $("#Day_4").html("4: "+json.daily.data[3].summary);
                        $("#Day_5").html("5: "+json.daily.data[4].summary); 
                        },
                        error: function(e){
                            console.log(e.message);
                        }
                    });
                }
                
                function loadWeatherDefault(){
                    var forecastURL = "https://api.forecast.io/forecast/bf79ca41b5692975a41d2c601cd3eb53/37.8267,-122.423";
                    $.ajax({
                        url: forecastURL,
                        jsonCallback: 'jsonCallback',
                        contantType: "application/json",
                        dataType: 'jsonp',
                        success: function(json){
                            console.log(json);
                        $("#current_temp").html(Math.round(json.currently.temperature)+"&#176;F");
                        $("#current_summary").html(json.currently.summary);
                        $("#current_temp").attr("data-icon",icon[json.currently.icon]+" ");
                        $("#location").html("Los Angeles");
                        $("#myLatitude").html(json.latitude);
                        $("#myLongitude").html(json.longitude);
                        $("#Day_1").html("1: "+json.daily.data[0].summary);
                        $("#Day_2").html("2: "+json.daily.data[1].summary);
                        $("#Day_3").html("3: "+json.daily.data[2].summary);
                        $("#Day_4").html("4: "+json.daily.data[3].summary);
                        $("#Day_5").html("5: "+json.daily.data[4].summary); 
                        },
                        error: function(e){
                            console.log(e.message);
                        }
                    });
                }
                
            function validate() {
                if (document.getElementById("cityName").value == "" || document.getElementById("cityName").value == null) {
                    alert("Please Enter a City Name");
                    return false;
                } 
                    getCityLongLat();
                    var mylocation = $("#cityName").val();
                    $("#location").text(mylocation);
                    document.getElementById("cityName").value=""
            }    
            $(document).ready(function(){
                $(window).keydown(function(event){
                    if(event.keyCode == 13) {
                    event.preventDefault();
                    return false;
                    }
                });
                loadWeatherDefault(); 
            });