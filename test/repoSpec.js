describe("TicTac Test Suite", function() {
    var fruits = tictac.repo("fruits").key("name").index("country");

    it("adds individual objects", function() {
        expect(fruits.size()).toBe(0);
        fruits.add({ "name":"Banana","country": "Philippines"});
        expect(fruits.size()).toBe(1);
    });

    it("adds arrays of objects", function() {
        fruits.add({"name": "Coconut", "country": "Philippines"});
        expect(fruits.size()).toBe(2);
        fruits.addArray([{"name": "Orange","country": "Israel"},{"name": "Mango", "country": "Australia"}]);
        expect(fruits.size()).toBe(4);
    });

    it("retrieves individual objects", function() {
        expect(fruits.get("Orange").country).toBe("Israel");
        expect(fruits.get("Mango").country).toBe("Australia");
        expect(fruits.get("Banana").country).toBe("Philippines");
        expect(fruits.get("Coconut").country).toBe("Philippines");
    });

    it("removes objects", function() {
        expect(fruits.size()).toBe(4);
        expect(fruits.remove("Orange").name).toBe("Orange");
        expect(fruits.get("Orange")).toBeNull;
        expect(fruits.size()).toBe(3);
    });

    it("finds objects based on an index", function() {
        var result = fruits.find("country","Australia");
        expect(result.length).toBe(1);
        expect(result[0].name).toBe("Mango");

        result = fruits.find("country", "Philippines");
        expect(result.length).toBe(2);
        expect(result[1].country).toBe("Philippines");

        result = fruits.findFirst("country","Philippines");
        expect(result.country).toBe("Philippines");

        result = fruits.find("country","Westeros");
        expect(result.length).toBe(0);

        result = fruits.findFirst("country","Mordor");
        expect(result).toBeNull;
    });


    var cities = tictac.repo("cities").index("score");

    it("adds objects with numeric keys and properties", function() {
        cities.add({"id":1,"name":"Sydney","score":8});
        cities.add({"id":2,"name":"Wellington","score":9});
        cities.add({"id":3,"name":"Manila","score":8});
        cities.add({"id":4,"name":"New York","score":10});
        expect(cities.size()).toBe(4);
    });

    it("retrieves individual objects based on numeric keys", function() {
        expect(cities.get(4).name).toBe("New York");
        expect(cities.get(2).score).toBe(9);
        expect(cities.get(3).name).toBe("Manila");
        expect(cities.get(1).score).toBe(8);
    });

    it("finds objects based on numerical index value", function(){
        var result = cities.find("score",8);
        expect(result.length).toBe(2);
        expect(result[1].score).toBe(8);
    });

    it("removes objects based on a numerical key", function(){
        expect(cities.remove(3).name).toBe("Manila");
        expect(cities.size()).toBe(3);
        var result = cities.find("score",8);
        expect(result.length).toBe(1);
        expect(result[0].score).toBe(8);

    })

});