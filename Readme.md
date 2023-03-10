## Big Trip
# OPP-style application written in JavaScript using the MVP pattern.

The app allows the user to easily plan their trip. At each step of the itinerary, the user sees all the information necessary for successful planning: accommodation/transportation costs, description of the waypoint with photos, and the ability to add additional options, such as upgrading the class of transport. All this allows you to focus on planning, and creating a flawless itinerary!

## Description
When the user starts the application, he immediately sees his planned route. He can select the "future" filter, then only future points of route will be displayed in relation to the current moment.
![Main-screenshot](https://github.com/LenaKorsakov/big-trip/blob/master/screenshots/main-screenshot.png)

 If the user has not yet added any points, the app will prompt him to add the first point.
![No-point-screenshot](https://github.com/LenaKorsakov/big-trip/blob/master/screenshots/new-point-screenshot.png)

User can view the list of trip point in chronological order by default. Also user can sort trip points by price.
![Route-screenshot](https://github.com/LenaKorsakov/big-trip/blob/master/screenshots/route-screenshot.png)

To add a new point, the user just needs to click on the big yellow "New Event" button. In the popup that opens, the user has a drop-down menu with the type of event: train, ship, sightseeing, etc. In addition, he must specify the city, as well as the duration and price. 
When you change the city, a description of the destination appears below, and for most cities a photo gallery is available.

A useful feature of the application is the additional options in the form of checkboxes. The user can add breakfast, upgrade the class of transport, etc. The options change for each type of event.
![New-point-screenshot](https://github.com/LenaKorsakov/big-trip/blob/master/screenshots/new-point-screenshot.png)

For each point, it is possible to view details and edit. For the convenience of filling in the date and time of the route, the app uses the pretty calendar from the flatpickr library.
![Edit-screenshot](https://github.com/LenaKorsakov/big-trip/blob/master/screenshots/edit-screenshot.png)


## Stack
- JavaScript(ES8),
- OOP-style,
- MVP,
- Babel,
- Webpack,
- flatpickr,
- dayjs.

Self-written api with the ability to capture errors.
## Demo site
<a href="https://big-trip-opal.vercel.app/">Go to site<a>

## How to run app:

- Clone repository:
```bash
git clone git@github.com:LenaKorsakov/big-trip.git
```

- Install dependencies repository:

```bash
npm install
```

- Run application:

```bash
npm start
```
