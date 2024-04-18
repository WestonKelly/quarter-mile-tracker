# Quarter-mile-tracker
The purpose of this app is to provide participants of quarter-mile drag racing events the ability to receive 
and organize their time slips electronically. Most race tracks currently still only provide printed time slips
to drivers on their way back to the pits on the return road. With some small changes to the track timing equipment, drivers can receive and mannage their time slips more efficiently. For demonstration purposes in this app, users will receive AI-generated time slips based on user-provided horsepower and weight values. 

# Project requirements
* Use of two 3rd party APIs: OpenAI and Tomorrow.IO(weather)
* Use of two CRUDing resources: cars and time slips
* Token based user authentication
* Django back-end models
* PostgreSQL database
* REACT.js front-end design and navigation

# Features
* Users enter an eamil and password to create an account
* Can create multiple instances of a car by entering info:
    -Year, make, model, horsepower, weight
* Can then chose to do one of the following with the selected car:
    -Delete, edit, race, view time slips
* Race page allows users to:
    -View current temperature and surface pressure for the city where the track is located
    -Create an AI-generated time slip to simulate use in a live track environment
* Can click "times" button on a particular car to:
    -view an accordion list of all time slips for that car
    -add and submit notes about each time slip ("Tire pressure, launch RPM, shock settings"...etc)