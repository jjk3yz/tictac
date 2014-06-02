describe("TicTac Index Test Suite", function() {
    console.log("hello");
    var index = tictac.index();

    it("adds individual entries", function() {
        expect(index.size()).toBe(0);
        index.put("Banana","Philippines");
        expect(index.size()).toBe(1);
        index.put("Orange","Israel");
        expect(index.size()).toBe(2);
        index.put("Mango","Australia");
        expect(index.size()).toBe(3);
        index.put("Coconut","Philippines");
        expect(index.size()).toBe(4);
    });

    it("retrieves entries based on indexed value", function() {
        keys = index.keys("Philippines");
        expect(keys.length).toBe(2);
        expect(_.indexOf(keys,"Banana")).toBeGreaterThan(-1);
        expect(_.indexOf(keys,"Coconut")).toBeGreaterThan(-1);
        keys = index.keys("Australia");
        expect(keys.length).toBe(1);
        expect(_.indexOf(keys,"Mango")).toBeGreaterThan(-1);
        keys = index.keys("Israel");
        expect(keys.length).toBe(1);
        expect(_.indexOf(keys,"Orange")).toBeGreaterThan(-1);
    });

    it("handles overwriting entries", function() {
        index.put("Banana","Australia");
        expect(index.size()).toBe(4);
        expect(index.keys("Philippines").length).toBe(1);
        keys = index.keys("Australia");
        expect(keys.length).toBe(2);
        expect(_.indexOf(keys,"Banana")).toBeGreaterThan(-1);
    })

    it("deleted entries", function() {
        index.remove("Orange");
        expect(index.size()).toBe(3);
        expect(index.keys("Israel").length).toBe(0);
        index.remove("Banana");
        expect(index.size()).toBe(2);
        expect(index.keys("Australia").length).toBe(1);
    })
});