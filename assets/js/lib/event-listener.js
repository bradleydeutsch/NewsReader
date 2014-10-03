(function (nh) {
    var subscribers = {},
        ROOT = 'root',
        eventHandler;

    eventHandler = nh.eventHandler || {};

    eventHandler.events = {
        ARTICLE_SELECTED: 'articleSelected'
    };

    eventHandler.subscribe = function (el, events, fns, context) {
        var event, uniqueFn, i, j, k;

        el = el ? el.cid : ROOT;
        events = (nh.utils.typeCompare(events, nh.utils.types.ARRAY)) ? events : [events];
        fns = (nh.utils.typeCompare(fns, nh.utils.types.ARRAY)) ? fns: [fns];
        context = context || this;

        for (i = 0; i < events.length; i++) {
            event = events[i];

            if (!subscribers.hasOwnProperty(el)) {
                subscribers[el] = {};
            }
            if (!subscribers.hasOwnProperty(event)) {
                subscribers[el][event] = [];
            }
            for (j = 0; j < fns.length; j++) {
                uniqueFn = true;

                for (k = 0; k < subscribers[el][event].length; k++) {
                    if (subscribers[el][event][k].fn.toString() === fns[j].toString()) {
                        uniqueFn = false;
                    }
                }
                if (uniqueFn) {
                    subscribers[el][event].push({
                        fn: fns[j],
                        context: context
                    });
                }
            }
        }
    };

    eventHandler.unsubscribe = function (el, events) {
        var event, i;

        el = el ? el.cid : ROOT;
        events = (nh.utils.typeCompare(events, nh.utils.types.ARRAY)) ? events : [events];

        for (i = 0; i < events.length; i++) {
            event = events[i];

            if ((subscribers.hasOwnProperty(el)) && (subscribers[el].hasOwnProperty(event))) {
                delete subscribers[el][event];
            }
        }
    };

    eventHandler.publish = function (el, events, data) {
        var event, fns, i, j;

        el = el ? el.cid : ROOT;
        events = (nh.utils.typeCompare(events, nh.utils.types.ARRAY)) ? events : [events];

        for (i = 0; i < events.length; i++) {
            event = events[i];

            if ((subscribers.hasOwnProperty(el)) && (subscribers[el].hasOwnProperty(event))) {
                fns = subscribers[el][events];

                for (j = 0; j < fns.length; j++) {
                    fns[j].fn.call(fns[j].context, event, data);
                }
            }
        }
    };

    eventHandler.getSubscribers = function () {
        return subscribers;
    };
}(nh));