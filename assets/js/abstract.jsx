/** @jsx nh.React.DOM */

(function (nh) {
    nh.SuperObject = function () {};

    nh.SuperObject.prototype.init = function () {
        this.cid = nh.utils.uniqueId();
    };

    nh.SuperObject.extend = nh.utils.objExtend;
})(nh);