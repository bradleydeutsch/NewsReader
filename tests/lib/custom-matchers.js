(function (jasmine) {
    var customMatchers = jasmine.customMatchers = jasmine.customMatchers || {};

    customMatchers.toEqualHTML = function () {
        return {
            compare: function (str1, str2, ignorables) {
                var result = {
                        pass: true
                    },
                    ret1 = [],
                    ret2 = [],
                    ignorableAttributes = {};

                if (Object.prototype.toString.call(ignorables) === '[object Array]') {
                    ignorables.map(function (ignorable) {
                        ignorableAttributes[ignorable] = true;
                    });
                }

                function inspectNode($el, list) {
                    $el.each(function () {
                        var attrs = {},
                            sortedAttrs = {},
                            me;

                        $.each(this.attributes, function () {
                            if (this.name in ignorableAttributes) {
                                return;
                            }

                            attrs[this.name] = this.value;
                        });
                        Object.keys(attrs).sort().forEach(function (key) {
                            sortedAttrs[key] = attrs[key];
                        });

                        me = {
                            tag: this.tagName,
                            content: $(this).text(),
                            attrs: sortedAttrs,
                            children: []
                        };

                        $(this).children().each(function () {
                            inspectNode($(this), me.children);
                        });

                        list.push(me);
                    });
                }

                inspectNode($(str1), ret1);
                inspectNode($(str2), ret2);

                if (JSON.stringify(ret1) != JSON.stringify(ret2)) {
                    result.pass = false;
                    result.message
                        = 'Expected \'' + str2 + '\' to equal HTML of \'' +  str1 + '\', but it did not';
                }

                return result;
            }
        };
    };

    customMatchers.toEqualReactHTML = function () {
        return {
            compare: function (str1, str2) {
                return customMatchers.toEqualHTML().compare(str1, str2, ['data-reactid']);
            }
        }
    };

    customMatchers.toHaveSize = function () {
        return {
            compare: function (obj, size) {
                var result = {
                        pass: true
                    },
                    objSize = 0;

                for (key in obj) {
                    objSize++;
                }

                if (objSize !== size) {
                    result.pass = false;
                    result.message
                        = 'Expected \'' + obj + '\' to have a size of ' + size + ', but it had size ' + objSize;
                }

                return result;
            }
        }
    };
}(jasmine));