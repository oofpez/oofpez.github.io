var devices = {};

function initializeSignalRForStopEta ()
{

    // initialise signalr
    const connection = new signalR.HubConnection(
        "https://routethink-dev-webapp.azurewebsites.net/location");

    connection.start().catch(err => console.error);
    // subscribe to updates
    connection.on("UpdateTrip", (response) => {
        console.log(response);
        if (!response.tripKey){
            return; //Ignore non trip updates
        }
        devices[response.tripKey] = response;

        var queryStopId =getQueryVariable('stopid');
        if (queryStopId){
            var eta = UpdateStopEtas(queryStopId);

        }
    });
}

function UpdateStopEtas(stopId)
{
    let matchingStopTimes = [];

    for (var key in devices) {
        var value = devices[key];
        value.stopTimes.forEach(stopTime => {
            if (stopTime.stopId == stopId){
                var elem = document.getElementById(key);
                if (elem)
                {
                    if (value.lastRecordedLateness > 0){
                        elem.innerHTML =  + value.lastRecordedLateness + 's late';
                    } else {
                        elem.innerHTML =  value.lastRecordedLateness + 's early';
                    }
                    
                   
                }
            }
        })  
    }


    return matchingStopTimes;
}