#TicTac
======

##A simple-to-use, light-weight, in-memory Javascript object repository which supports indexing and fast retrieval of objects based on an object key or an indexed property for retrieving multiple objects.

**var fruits = tictac.repo("fruits").key("name").index("country");** *//key will default to "id" if not specified*

**fruits.add({"name":"Banana","country": "Philippines"});**

**fruits.add({"name": "Coconut", "country": "Philippines"});**

**fruits.addArray([{"name": "Orange","country": "Israel"},{"name": "Mango", "country": "Australia"}]);**

**fruits.size()** *//4*

**fruits.get("Orange");** *//retrieves object with name="Orange";*

**fruits.find("country","Philippines");** *//retrieves array of objects with country="Philippines"*

**fruits.remove("Banana");** *// removes object with name="Banana" from the repository*

*Please view Jasmine test specs in test directory for comprehensive API*


