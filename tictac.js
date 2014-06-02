/**
 * Created by johnny on 28/05/14.
 */

(function() {

    function Index() {
        var that = this;
        var map = {};
        var reverseMap = {};

        // index(key, value)
        // accepts a key and value pair and updates map and reverseMap so that key and value
        // can be looked up when required.
        // can be looked up when required.
        // returns true if key/value is indexed for first time or false if overwriting existing index
        this.put = function(key,value) {

            //first check if this key has already been indexed
            if(_.has(reverseMap,key)) {
                console.log("Already exists "+key+" "+value);
                //key has been mapped but now we need to check if indexed based on current value
                var currentValue = reverseMap[key];
                if(currentValue!==value) {

                    //indexed against an old value, will reindex on current value
                    var keyList = map[currentValue];
                    delete keyList[key];

                    keyList = map[value];
                    if(!keyList) {
                        keyList = {};
                        map[value] = keyList;
                    }

                    keyList[key]=null;
                    console.log(value+" keyList: "+keyList);
                    reverseMap[key] = value;
                    console.log("reverseMap: "+reverseMap);
                }

                return false;
            }
            else {
                console.log("New Entry "+key+" "+value);
                // indexing key for first time
                var keyList = map[value];
                if(!keyList) {
                    keyList = {};
                    map[value] = keyList;
                }

                keyList[key]=null;
                reverseMap[key] = value;

                return true;
            }
        }

        //remove(key)
        //removes a key from the index maps
        // returns true if key was found and removed and false if key does not exist in index
        this.remove = function(key) {
            var currentValue = reverseMap[key];
            if(currentValue!==undefined) {
                var keyList= map[currentValue];
                delete keyList[key];
                delete reverseMap[key];
                return true;
            }

            return false;
        }

        this.keys = function(value) {
            var keyList = map[value];
            if(keyList) {
                return _.keys(keyList);
            }
            else return [];
        }

        this.values = function() {
            return _.keys(map);
        }

        this.size = function() {
            return _.keys(reverseMap).length;
        }
    }

    function Repo() {
        var that = this;
        var objects = {};
        var indexes = {};

        var keyProperty = "id";

        this.key = function(keyPropertyParam) {
            if(_.keys(objects).length>0) {
                throw "Key property can only be defined on an empty repo."
            }
            else {
                keyProperty = keyPropertyParam;
            }

            return this;
        }

        this.index = function(indexProperty) {
            initializeIndex(indexProperty);
            return this;
        }

        function initializeIndex(indexProperty) {
            var initIndex = new Index();
            indexes[indexProperty] = initIndex;
            _.forEach(objects, function(object){initIndex.put(object[keyProperty],object[indexProperty])});
        }

        this.size = function() {
            return _.keys(objects).length;
        }

        this.add = function(object) {
            objects[object[keyProperty]] = object;
            console.log(JSON.stringify(objects));
            _.forEach(_.keys(indexes),
                function(indexKey){
                    indexes[indexKey].put(object[keyProperty],object[indexKey])
                });
        }

        this.addArray = function(objectArray) {
            _.forEach(objectArray, function(object){that.add(object)});
        }

        this.get = function(key) {
            return objects[key];
        }

        this.remove = function(key) {
            removedObject = objects[key];
            delete objects[key];
            _.forEach(indexes,function(index){index.remove(key)});
            return removedObject;
        }

        this.find = function(indexKey, indexValue) {
            results = _.map(indexes[indexKey].keys(indexValue),function(key){return objects[key]});
            if(!results) {
                return [];
            }
            else return results;
        }

        this.findFirst = function(indexKey, indexValue) {
            keys = indexes[indexKey].keys(indexValue);
            if(keys.length>0) {
                return objects[keys[0]];
            }
            else return null;
        }
    }

    var repos = {};

    this.tictac =  {

        repo: function (repoName) {
            if(_.isObject(repos[repoName])) {
                return repos[repoName];
            }
            else {
                repos[repoName] = new Repo();
                return repos[repoName];
            }

        },

        index: function () {
            return new Index();
        }

    }

}).call(this);