describe('Utils', function () {
    it('can determine a variable is of a given type', function () {
        // Expectations
        expect(nh.utils.typeCompare([], '[object Array]')).toBe(true);
        expect(nh.utils.typeCompare([], '[object String]')).toBe(false);
        expect(nh.utils.typeCompare('string', '[object String]')).toBe(true);
        expect(nh.utils.typeCompare('string', '[object Function]')).toBe(false);
        expect(nh.utils.typeCompare({}, '[object Object]')).toBe(true);
        expect(nh.utils.typeCompare({}, '[object String]')).toBe(false);
        expect(nh.utils.typeCompare(function () {}, '[object Function]')).toBe(true);
        expect(nh.utils.typeCompare(function () {}, '[object Object]')).toBe(false);
        expect(nh.utils.typeCompare(false, '[object Boolean]')).toBe(true);
        expect(nh.utils.typeCompare('true', '[object Boolean]')).toBe(false);
    });

    it('can get a unique identifier for an object per request', function () {
        var uniqueId1, uniqueId2, uniqueId3;

        // Before
        uniqueId1 = nh.utils.uniqueId();
        uniqueId2 = nh.utils.uniqueId();
        uniqueId3 = nh.utils.uniqueId();

        // Expectations
        expect(Object.prototype.toString.call(uniqueId1) === '[object Number]');
        expect(Object.prototype.toString.call(uniqueId2) === '[object Number]');
        expect(Object.prototype.toString.call(uniqueId3) === '[object Number]');
        expect(uniqueId2 - uniqueId1).toBe(1);
        expect(uniqueId3 - uniqueId2).toBe(1);
    });

    it('can shallow extend object1 from object2 into a new object', function () {
        var object1, object2, object3;

        // Before
        object1 = {
            key1: 'key1value',
            deepKey: {
                deepKey1: 'deepkey1value'
            }
        };
        object2 = {
            key2: 'key2value',
            deepKey: {
                deepKey2: 'deepkey2value'
            }
        };

        // Actions
        object3 = nh.utils.extend({}, object1, object2);

        // Expectations
        expect(object3.key1).toEqual('key1value');
        expect(object3.key2).toEqual('key2value');
        expect(object3.deepKey.deepKey1).toEqual(undefined);
        expect(object3.deepKey.deepKey2).toEqual('deepkey2value');
        expect(object1.key2).toEqual(undefined);
        expect(object1.deepKey.deepKey1).toEqual('deepkey1value');
        expect(object1.deepKey.deepKey2).toEqual(undefined);
        expect(object2.key1).toEqual(undefined);
        expect(object2.deepKey.deepKey2).toEqual('deepkey2value');
        expect(object2.deepKey.deepKey1).toEqual(undefined);
    });

    it('can shallow extend object1 from object2 into object1', function () {
        var object1, object2, object3;

        // Before
        object1 = {
            key1: 'key1value'
        };
        object2 = {
            key2: 'key2value'
        };

        // Actions
        object3 = nh.utils.extend(object1, object2);

        // Expectations
        expect(object3.key1).toEqual('key1value');
        expect(object3.key2).toEqual('key2value');
        expect(object1.key1).toEqual('key1value');
        expect(object1.key2).toEqual('key2value');
        expect(object2.key1).toEqual(undefined);
        expect(object3).toBe(object1);
    });

    it('can deep extend object1 from object2 into a new object', function () {
        var object1, object2, object3;

        // Before
        object1 = {
            key1: 'key1value',
            deepKey: {
                deepKey1: 'deepkey1value'
            }
        };
        object2 = {
            key2: 'key2value',
            deepKey: {
                deepKey2: 'deepkey2value'
            }
        };

        // Actions
        object3 = nh.utils.extend({}, object1, object2, true);

        // Expectations
        expect(object3.key1).toEqual('key1value');
        expect(object3.key2).toEqual('key2value');
        expect(object3.deepKey.deepKey1).toEqual('deepkey1value');
        expect(object3.deepKey.deepKey2).toEqual('deepkey2value');
        expect(object1.key2).toEqual(undefined);
        expect(object1.deepKey.deepKey1).toEqual('deepkey1value');
        expect(object1.deepKey.deepKey2).toEqual(undefined);
        expect(object2.key1).toEqual(undefined);
        expect(object2.deepKey.deepKey2).toEqual('deepkey2value');
        expect(object2.deepKey.deepKey1).toEqual(undefined);
    });

    it('can create a new class by extending another', function () {
        var class1, class2, instance;

        // Before
        class1 = function () {};
        class1.prototype.whatAmI = function () {
            return this.animal;
        };
        class2 = nh.utils.objExtend.call(class1, {
            animal: 'cat'
        });

        // Actions
        instance = new class2();

        // Expectations
        expect(instance.whatAmI()).toEqual('cat');
    });

    it('can create a new class with a custom constructor by extending another', function () {
        var class1, class2, instance;

        // Before
        class1 = function () {
            this.animal = 'dog';
        };
        class1.prototype.whatAmI = function () {
            return this.animal;
        };
        class2 = nh.utils.objExtend.call(class1, {
            constructor: function () {
                this.animal = 'cat';
            }
        });

        // Actions
        instance = new class2();

        // Expectations
        expect(instance.whatAmI()).toEqual('cat');
    });

    it('can create a new class by extending and overriding another', function () {
        var class1, class2, instance;

        // Before
        class1 = function () {};
        class1.prototype.whatAmI = function () {
            return this.animal;
        };
        class2 = nh.utils.objExtend.call(class1, {
            animal: 'cat',

            whatAmI: function () {
                var retrievedAnimal = class2.__super__.whatAmI.call(this);

                return 'scaredy' + retrievedAnimal;
            }
        });

        // Actions
        instance = new class2();

        // Expectations
        expect(instance.whatAmI()).toEqual('scaredycat');
    });
});