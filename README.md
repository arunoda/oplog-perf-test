## Oplog Performance Testcase

Simple load test for check the oplog usage.

#### Starting the load test

* Run the app
* Open the app from a browser
* Type `Start()` on the console
* To generate more load, start the same page on multiple tabs and call `Start()`

#### Take a CPU Profile

* Open the app from a browser
* Type `Kadira.profileCPU(10)`
* Visit `http://debug.kadiraio.com/debug?tab=cpu-profiler` and load the profile
* Then analyze it: See: https://kadira.io/academy/analyze-meteor-cpu-profile/
