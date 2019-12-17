# SolomoTracker

### Requirements:
1. NodeJs;
2. Visual Studio 2017 (with NUnit 3 Test Adapter extension for running tests);
3. .NET Framework 4.8;

### Installation:
1. Download solution;
2. Open SofomoTracker.sln file in Visual Studio 2017;
3. Build the solution and run it locally to use the WebApp and WebApi;

### Web Api Endpoints:
1. Get All Objects (GET)
  - Api/Geolocation/GetGeolocationData/


2. Search Geolocation via IpStack and insert returned object to db (POST; parameter: string IpOrUrl)
  - Api/Geolocation/InsertGeolocation/


3. Delete geolocation from db (POST; parameter: int GeolocationId)
  - Api/Geolocation/DeleteGeolocation/
  
### Note:
This a version for pure demonstration. Some improvements would have to be made for this to be production ready. I.e.:
1. Create seperate environments for dev, beta and prod releases (with seperate settings, databases etc);
2. Use a SQLServer database instead of SQLite (which could be used in development env);
2. Configure Ninject for dependency injection;
3. Configure Redux;
4. Configure Docker;
5. Add limits for calling the api;
6. Tweak the Web App table: sorting, filtering, pagination.
7. Tweak the Web Api: for large amount of data allow server side sorting, filtering, pagination etc.
8. If Web Api would be used by other services consider using a WCF instead to share the references to objects etc.
and probably a few more.

### Note #2:
Some of the stuff here I've used for the first time (mainly for learning and fun): Entity Framework, Material UI.
