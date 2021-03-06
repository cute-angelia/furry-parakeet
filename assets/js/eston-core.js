!
    function e(t, n, r) {
        function i(a, o) {
            if (!n[a]) {
                if (!t[a]) {
                    var u = "function" == typeof require && require;
                    if (!o && u) return u(a, !0);
                    if (s) return s(a, !0);
                    var l = new Error("Cannot find module '" + a + "'");
                    throw l.code = "MODULE_NOT_FOUND", l
                }
                var h = n[a] = {
                    exports: {}
                };
                t[a][0].call(h.exports, function(e) {
                    var n = t[a][1][e];
                    return i(n ? n : e)
                }, h, h.exports, e, t, n, r)
            }
            return n[a].exports
        }
        for (var s = "function" == typeof require && require, a = 0; a < r.length; a++) i(r[a]);
        return i
    }({
        1: [function(e, t) {
            t.exports = {
                author: "mikedidthis",
                version: "1.5.0",
                dribbble: {
                    data: {
                        access_token: "",
                        page: 1,
                        per_page: 1,
                        response: "data"
                    },
                    cache: !0,
                    dataType: "jsonp",
                    url: ""
                },
                instagram: {
                    data: {
                        access_token: "",
                        count: 33,
                        page: 1,
                        per_page: 1,
                        response: "data"
                    },
                    cache: !0,
                    dataType: "jsonp",
                    url: ""
                },
                share: {
                    data: {
                        apikey: "",
                        url: ""
                    },
                    cache: !0,
                    dataType: "json",
                    url: "//free.sharedcount.com/"
                }
            }
        }, {}],
        2: [function(e) {
            "use strict";
            var t = e("./config.json"),
                n = e("./modules/dribbble"),
                r = e("./modules/instagram"),
                i = e("./modules/ghost"),
                s = (e("./modules/share"), e("./events/events")),
                a = e("./events/hover"),
                o = e("./events/popup"),
                u = e("./helpers/distribute"),
                l = e("./helpers/offset"),
                h = e("./helpers/shuffle"),
                c = function(e) {
                    t = $.extend(!0, t, e), t = l($('[data-js~="pager-current"]').text(), t);
                    var c = [],
                        p = [];
                    $.each($('[data-js~="post"]'), function() {
                        var e = i.create($(this));
                        e && c.push(e)
                    }), $.each($('[data-js~="dribbble"]'), function() {
                        var e = n.create($(this));
                        e && (c.push(e), p.push(e.$deferred))
                    }), $.each($('[data-js~="instagram"]'), function() {
                        var e = r.create($(this));
                        e && (c.push(e), p.push(e.$deferred))
                    });
                    for (var d = c.length - 1; d >= 0; d--) c[d].start();
                    $.when.apply($, p).then(function() {
                        var e = u($('[data-js~="post"]'), h($('[data-js~="widget"]')), 2);
                        $.each($('[data-js~="hover"]'), function() {
                            a($(this))
                        }), $.each($('[data-js~="popup"]'), function() {
                            o($(this))
                        }), s.trigger("start.complete", [e])
                    })
                };
            window.eston = {
                config: t,
                start: c,
                events: s
            }
        }, {
            "./config.json": 1,
            "./events/events": 6,
            "./events/hover": 7,
            "./events/popup": 8,
            "./helpers/distribute": 9,
            "./helpers/offset": 11,
            "./helpers/shuffle": 13,
            "./modules/dribbble": 23,
            "./modules/ghost": 25,
            "./modules/instagram": 26,
            "./modules/share": 28
        }],
        3: [function(e, t) {
            var n = e("../helpers/timeago"),
                r = e("../helpers/truncate"),
                i = {
                    "widget-author-url": {
                        href: function() {
                            return this.html_url
                        }
                    },
                    "widget-author-title": {
                        text: function() {
                            return this.title
                        }
                    },
                    "widget-media": {
                        style: function() {
                            return "background-image: url(" + this.images.hidpi + ")"
                        }
                    },
                    "widget-date": {
                        href: function() {
                            return this.html_url
                        }
                    },
                    "widget-date-stamp": {
                        text: function() {
                            return n(this.created_at.replace(/\//g, "-").replace(" ", "T").replace(" ", ""))
                        }
                    },
                    "widget-comment": {
                        href: function() {
                            return this.html_url + "#comments-section"
                        }
                    },
                    "widget-comment-count": {
                        text: function() {
                            return r(this.comments_count)
                        }
                    },
                    "widget-like": {
                        href: function() {
                            return this.html_url + "/fans"
                        }
                    },
                    "widget-like-count": {
                        text: function() {
                            return r(this.likes_count)
                        }
                    }
                };
            t.exports = i
        }, {
            "../helpers/timeago": 14,
            "../helpers/truncate": 15
        }],
        4: [function(e, t) {
            var n = e("../helpers/timeago"),
                r = e("../helpers/truncate"),
                i = {
                    "widget-author-url": {
                        href: function() {
                            return this.link
                        }
                    },
                    "widget-author-title": {
                        text: function() {
                            return this.user.username
                        }
                    },
                    "widget-media": {
                        style: function() {
                            return "background-image: url(" + this.images.standard_resolution.url + ")"
                        }
                    },
                    "widget-date": {
                        href: function() {
                            return this.link
                        }
                    },
                    "widget-date-stamp": {
                        text: function() {
                            return n(this.created_time)
                        }
                    },
                    "widget-comment": {
                        href: function() {
                            return this.link
                        }
                    },
                    "widget-comment-count": {
                        text: function() {
                            return r(this.comments.count)
                        }
                    },
                    "widget-like": {
                        href: function() {
                            return this.link
                        }
                    },
                    "widget-like-count": {
                        text: function() {
                            return r(this.likes.count)
                        }
                    }
                };
            t.exports = i
        }, {
            "../helpers/timeago": 14,
            "../helpers/truncate": 15
        }],
        5: [function(e, t) {
            var n = e("../helpers/truncate"),
                r = e("../helpers/pluralize"),
                i = {
                    "share-facebook-count": {
                        text: function() {
                            var e = this.Facebook.share_count;
                            return this.Total = this.Total || 0, this.Total = e + this.Total, n(e)
                        }
                    },
                    "share-facebook-plural": {
                        text: function() {
                            return r(this.Facebook.share_count, arguments[0].element.innerHTML)
                        }
                    },
                    "share-googleplus-count": {
                        text: function() {
                            var e = this.GooglePlusOne;
                            return this.Total = this.Total || 0, this.Total = e + this.Total, n(e)
                        }
                    },
                    "share-googleplus-plural": {
                        text: function() {
                            return r(this.GooglePlusOne, arguments[0].element.innerHTML)
                        }
                    },
                    "share-linkedin-count": {
                        text: function() {
                            var e = this.LinkedIn;
                            return this.Total = this.Total || 0, this.Total = e + this.Total, n(e)
                        }
                    },
                    "share-linkedin-plural": {
                        text: function() {
                            return r(this.LinkedIn, arguments[0].element.innerHTML)
                        }
                    },
                    "share-pinterest-count": {
                        text: function() {
                            var e = this.Pinterest;
                            return this.Total = this.Total || 0, this.Total = e + this.Total, n(e)
                        }
                    },
                    "share-pinterst-plural": {
                        text: function() {
                            return r(this.Pinterest, arguments[0].element.innerHTML)
                        }
                    },
                    "share-stumbleupon-count": {
                        text: function() {
                            var e = this.StumbleUpon;
                            return this.Total = this.Total || 0, this.Total = e + this.Total, n(e)
                        }
                    },
                    "share-stumbleupon-plural": {
                        text: function() {
                            return r(this.StumbleUpon, arguments[0].element.innerHTML)
                        }
                    },
                    "share-twitter-count": {
                        text: function() {
                            var e = this.Twitter;
                            return this.Total = this.Total || 0, this.Total = e + this.Total, n(this.Twitter)
                        }
                    },
                    "share-twitter-plural": {
                        text: function() {
                            return r(this.Twitter, arguments[0].element.innerHTML)
                        }
                    },
                    "share-total-count": {
                        text: function() {
                            return n(this.Total)
                        }
                    },
                    "share-total-plural": {
                        text: function() {
                            return r(this.Total, arguments[0].element.innerHTML)
                        }
                    }
                };
            t.exports = i
        }, {
            "../helpers/pluralize": 12,
            "../helpers/truncate": 15
        }],
        6: [function(e, t) {
            var n = $({});
            t.exports = n
        }, {}],
        7: [function(e, t) {
            var n = e("./events"),
                r = function(e) {
                    $.each(e, function() {
                        var e = $(this),
                            t = e.find('[data-js~="hover-inner"]'),
                            r = e.find('[data-js~="hover-cover"]'),
                            i = e.find('[data-js~="hover-header"]'),
                            s = e.find('[data-js~="hover-footer"]');
                        t.on("mouseenter", function(e) {
                            e.preventDefault(), e.stopPropagation(), n.trigger("hover.start", [i, r, s])
                        }), t.on("mouseleave", function(e) {
                            e.preventDefault(), e.stopPropagation(), n.trigger("hover.stop", [i, r, s])
                        })
                    })
                };
            t.exports = r
        }, {
            "./events": 6
        }],
        8: [function(e, t) {
            var n = e("./events"),
                r = function(e) {
                    $.each(e, function() {
                        var e = !1,
                            t = $(this),
                            r = t.find('[data-js~="popup-list"]');
                        t.on("click", function(i) {
                            i.preventDefault(), e ? (n.trigger("popup.close", [t, r]), e = !1) : (n.trigger("popup.open", [t, r]), e = !0)
                        }), r.on("click", function(e) {
                            e.stopPropagation(), t.trigger("click")
                        })
                    })
                };
            t.exports = r
        }, {
            "./events": 6
        }],
        9: [function(e, t) {
            var n = function(e, t, n) {
                var r = e.length - 1,
                    i = Math.floor(r / 2),
                    s = Math.floor(r / 2),
                    a = r - (i + s),
                    o = ~~ (t.length / n);
                (a > 0 && o % 2 === 0 || 0 === a && o % 2 === 1) && o--, o > r && (o = r), t.unwrap();
                var u = t.splice(0, i * n - (r - o)),
                    l = t.splice(0, a * n),
                    h = t.splice(0, s * n - (r - o)),
                    c = e.add(u).add(h).add(l);
                a > 0 && e.eq(i).after(l);
                for (var p = 0, d = i; d > p; p++) e.eq(p).after(u.splice(0, n));
                for (var f = 0, m = s; m > f; f++) e.eq(r - 1 - f).after(h.splice(0, n));
                return t.remove(), c
            };
            t.exports = n
        }, {}],
        10: [function(e, t) {
            var n = function(e) {
                $.each(e, function() {
                    var t = function() {
                        var t = e.children().eq(0),
                            n = parseInt(t.attr("width"), 10),
                            r = parseInt(t.attr("height"), 10);
                        return "100%" === t.attr("width") && (n = r), "100%" === t.attr("height") && (r = n), 100 / n * r
                    };
                    e.css("paddingTop", t() + "%")
                })
            };
            t.exports = n
        }, {}],
        11: [function(e, t) {
            var n = function(e, t) {
                return e = parseInt(e, 10), t.dribbble.data.page && (t.dribbble.data.page = e), t.instagram.data.page && (t.instagram.data.page = e), t
            };
            t.exports = n
        }, {}],
        12: [function(e, t) {
            var n = function(e, t) {
                return (e > 1 || 1 > e) && (t += "s"), t
            };
            t.exports = n
        }, {}],
        13: [function(e, t) {
            var n = function(e) {
                for (var t = e.length - 1; t > 0; t--) {
                    var n = Math.floor(Math.random() * (t + 1)),
                        r = e[t];
                    e[t] = e[n], e[n] = r
                }
                return e
            };
            t.exports = n
        }, {}],
        14: [function(e, t) {
            var n = function(e) {
                var t = {
                        prefix: "",
                        suffix: " ago",
                        seconds: "less than a minute",
                        minute: "a minute",
                        minutes: "%d minutes",
                        hour: "an hour",
                        hours: "%d hours",
                        day: "a day",
                        days: "%d days",
                        month: "a month",
                        months: "%d months",
                        year: "a year",
                        years: "%d years"
                    },
                    n = function(e, n) {
                        return t[e] && t[e].replace(/%d/i, Math.abs(Math.round(n)))
                    },
                    r = function(e) {
                        if (e) {
                            e = e.replace(/\.\d+/, ""), e = e.replace(/-/, "/").replace(/-/, "/"), e = e.replace(/T/, " ").replace(/Z/, " UTC"), e = e.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"), e = new Date(1e3 * e || e);
                            var r = new Date,
                                i = .001 * (r.getTime() - e) >> 0,
                                s = i / 60,
                                a = s / 60,
                                o = a / 24,
                                u = o / 365;
                            return t.prefix + (45 > i && n("seconds", i) || 90 > i && n("minute", 1) || 45 > s && n("minutes", s) || 90 > s && n("hour", 1) || 24 > a && n("hours", a) || 42 > a && n("day", 1) || 30 > o && n("days", o) || 45 > o && n("month", 1) || 365 > o && n("months", o / 30) || 1.5 > u && n("year", 1) || n("years", u)) + t.suffix
                        }
                    };
                return r(e)
            };
            t.exports = n
        }, {}],
        15: [function(e, t) {
            var n = function(e) {
                return e >= 1e9 ? (e / 1e9).toFixed(1) + "G" : e >= 1e6 ? (e / 1e6).toFixed(1) + "M" : e >= 1e3 ? (e / 1e3).toFixed(1) + "K" : e
            };
            t.exports = n
        }, {}],
        16: [function(e, t) {
            var n, r, i, s, a, o, u, l, h = {}.hasOwnProperty,
                c = function(e, t) {
                    function n() {
                        this.constructor = e
                    }
                    for (var r in t) h.call(t, r) && (e[r] = t[r]);
                    return n.prototype = t.prototype, e.prototype = new n, e.__super__ = t.prototype, e
                };
            l = e("../lib/lodash"), u = e("./helpers"), t.exports = r = {
                Attributes: {},
                createAttribute: function(e, t) {
                    var i;
                    return i = r.Attributes[t] || n, new i(e, t)
                }
            }, n = function() {
                function e(e, t) {
                    this.el = e, this.name = t, this.templateValue = this.el.getAttribute(this.name) || ""
                }
                return e.prototype.set = function(e) {
                    return this.el[this.name] = e, this.el.setAttribute(this.name, e.toString())
                }, e
            }(), i = function(e) {
                function t(e, t) {
                    this.el = e, this.name = t, this.templateValue = this.el.getAttribute(this.name) || !1
                }
                var n, i, s, a;
                for (c(t, e), n = ["hidden", "async", "defer", "autofocus", "formnovalidate", "disabled", "autofocus", "formnovalidate", "multiple", "readonly", "required", "checked", "scoped", "reversed", "selected", "loop", "muted", "autoplay", "controls", "seamless", "default", "ismap", "novalidate", "open", "typemustmatch", "truespeed"], s = 0, a = n.length; a > s; s++) i = n[s], r.Attributes[i] = t;
                return t.prototype.set = function(e) {
                    return this.el[this.name] = e, e ? this.el.setAttribute(this.name, this.name) : this.el.removeAttribute(this.name)
                }, t
            }(n), o = function(e) {
                function t(e, t) {
                    var n;
                    this.el = e, this.name = t, this.templateValue = function() {
                        var e, t, r, i;
                        for (r = this.el.childNodes, i = [], e = 0, t = r.length; t > e; e++) n = r[e], n.nodeType === u.TEXT_NODE && i.push(n.nodeValue);
                        return i
                    }.call(this).join(""), this.children = l.toArray(this.el.children), (this.textNode = this.el.firstChild) ? this.textNode.nodeType !== u.TEXT_NODE && (this.textNode = this.el.insertBefore(this.el.ownerDocument.createTextNode(""), this.textNode)) : this.el.appendChild(this.textNode = this.el.ownerDocument.createTextNode(""))
                }
                return c(t, e), r.Attributes.text = t, t.prototype.set = function(e) {
                    for (var t, n, r, i, s; t = this.el.firstChild;) this.el.removeChild(t);
                    for (this.textNode.nodeValue = e, this.el.appendChild(this.textNode), i = this.children, s = [], n = 0, r = i.length; r > n; n++) t = i[n], s.push(this.el.appendChild(t));
                    return s
                }, t
            }(n), a = function(e) {
                function t(e) {
                    this.el = e, this.templateValue = "", this.children = l.toArray(this.el.children)
                }
                return c(t, e), r.Attributes.html = t, t.prototype.set = function(e) {
                    for (var t, n, r, i, s; t = this.el.firstChild;) this.el.removeChild(t);
                    for (this.el.innerHTML = e + this.templateValue, i = this.children, s = [], n = 0, r = i.length; r > n; n++) t = i[n], s.push(this.el.appendChild(t));
                    return s
                }, t
            }(n), s = function(e) {
                function t(e) {
                    t.__super__.constructor.call(this, e, "class")
                }
                return c(t, e), r.Attributes["class"] = t, t
            }(n)
        }, {
            "../lib/lodash": 21,
            "./helpers": 19
        }],
        17: [function(e, t) {
            var n, r, i, s, a, o, u;
            u = e("./helpers"), s = u.before, i = u.after, a = u.chainable, o = u.cloneNode, r = e("./instance"), t.exports = n = function() {
                function e(e, t) {
                    this.el = e, this.Transparency = t, this.template = o(this.el), this.instances = [new r(this.el, this.Transparency)], this.instanceCache = []
                }
                var t, n;
                return n = a(function() {
                    return this.parent = this.el.parentNode, this.parent ? (this.nextSibling = this.el.nextSibling, this.parent.removeChild(this.el)) : void 0
                }), t = a(function() {
                    return this.parent ? this.nextSibling ? this.parent.insertBefore(this.el, this.nextSibling) : this.parent.appendChild(this.el) : void 0
                }), e.prototype.render = s(n)(i(t)(a(function(e, t, n) {
                    for (var i, s, a, u, l, h, c; e.length < this.instances.length;) this.instanceCache.push(this.instances.pop().remove());
                    for (; e.length > this.instances.length;) a = this.instanceCache.pop() || new r(o(this.template), this.Transparency), this.instances.push(a.appendTo(this.el));
                    for (c = [], s = l = 0, h = e.length; h > l; s = ++l) u = e[s], a = this.instances[s], i = [], c.push(a.prepare(u, i).renderValues(u, i).renderDirectives(u, s, t).renderChildren(u, i, t, n));
                    return c
                }))), e
            }()
        }, {
            "./helpers": 19,
            "./instance": 20
        }],
        18: [function(e, t) {
            var n, r, i, s, a, o, u, l, h, c, p, d = {}.hasOwnProperty,
                f = function(e, t) {
                    function n() {
                        this.constructor = e
                    }
                    for (var r in t) d.call(t, r) && (e[r] = t[r]);
                    return n.prototype = t.prototype, e.prototype = new n, e.__super__ = t.prototype, e
                };
            p = e("../lib/lodash.js"), c = e("./helpers"), n = e("./attributeFactory"), t.exports = s = {
                Elements: {
                    input: {}
                },
                createElement: function(e) {
                    var t, n;
                    return t = "input" === (n = e.nodeName.toLowerCase()) ? s.Elements[n][e.type.toLowerCase()] || a : s.Elements[n] || i, new t(e)
                }
            }, i = function() {
                function e(e) {
                    this.el = e, this.attributes = {}, this.childNodes = p.toArray(this.el.childNodes), this.nodeName = this.el.nodeName.toLowerCase(), this.classNames = this.el.className.split(" "), this.originalAttributes = {}
                }
                return e.prototype.empty = function() {
                    for (var e; e = this.el.firstChild;) this.el.removeChild(e);
                    return this
                }, e.prototype.reset = function() {
                    var e, t, n, r;
                    n = this.attributes, r = [];
                    for (t in n) e = n[t], r.push(e.set(e.templateValue));
                    return r
                }, e.prototype.render = function(e) {
                    return this.attr("text", e)
                }, e.prototype.attr = function(e, t) {
                    var r, i;
                    return r = (i = this.attributes)[e] || (i[e] = n.createAttribute(this.el, e, t)), null != t && r.set(t), r
                }, e.prototype.renderDirectives = function(e, t, n) {
                    var r, i, s, a;
                    a = [];
                    for (i in n) d.call(n, i) && (r = n[i], "function" == typeof r && (s = r.call(e, {
                        element: this.el,
                        index: t,
                        value: this.attr(i).templateValue
                    }), null != s ? a.push(this.attr(i, s)) : a.push(void 0)));
                    return a
                }, e
            }(), u = function(e) {
                function t(e) {
                    t.__super__.constructor.call(this, e), this.elements = c.getElements(e)
                }
                return f(t, e), s.Elements.select = t, t.prototype.render = function(e) {
                    var t, n, r, i, s;
                    for (e = e.toString(), i = this.elements, s = [], n = 0, r = i.length; r > n; n++) t = i[n], "option" === t.nodeName && s.push(t.attr("selected", t.el.value === e));
                    return s
                }, t
            }(i), h = function(e) {
                function t() {
                    return t.__super__.constructor.apply(this, arguments)
                }
                var n, r, i, a;
                for (f(t, e), n = ["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"], i = 0, a = n.length; a > i; i++) r = n[i], s.Elements[r] = t;
                return t.prototype.attr = function(e, n) {
                    return "text" !== e && "html" !== e ? t.__super__.attr.call(this, e, n) : void 0
                }, t
            }(i), a = function(e) {
                function t() {
                    return t.__super__.constructor.apply(this, arguments)
                }
                return f(t, e), t.prototype.render = function(e) {
                    return this.attr("value", e)
                }, t
            }(h), l = function(e) {
                function t() {
                    return t.__super__.constructor.apply(this, arguments)
                }
                return f(t, e), s.Elements.textarea = t, t
            }(a), r = function(e) {
                function t() {
                    return t.__super__.constructor.apply(this, arguments)
                }
                return f(t, e), s.Elements.input.checkbox = t, t.prototype.render = function(e) {
                    return this.attr("checked", Boolean(e))
                }, t
            }(a), o = function(e) {
                function t() {
                    return t.__super__.constructor.apply(this, arguments)
                }
                return f(t, e), s.Elements.input.radio = t, t
            }(r)
        }, {
            "../lib/lodash.js": 21,
            "./attributeFactory": 16,
            "./helpers": 19
        }],
        19: [function(e, t, n) {
            var r, i, s, a;
            r = e("./elementFactory"), n.before = function(e) {
                return function(t) {
                    return function() {
                        return e.apply(this, arguments), t.apply(this, arguments)
                    }
                }
            }, n.after = function(e) {
                return function(t) {
                    return function() {
                        return t.apply(this, arguments), e.apply(this, arguments)
                    }
                }
            }, n.chainable = n.after(function() {
                return this
            }), n.onlyWith$ = function(e) {
                return "undefined" != typeof jQuery && null !== jQuery || "undefined" != typeof Zepto && null !== Zepto ?
                    function() {
                        return e(arguments)
                    }(jQuery || Zepto) : void 0
            }, n.getElements = function(e) {
                var t;
                return t = [], a(e, t), t
            }, a = function(e, t) {
                var i, s;
                for (i = e.firstChild, s = []; i;) i.nodeType === n.ELEMENT_NODE && (t.push(new r.createElement(i)), a(i, t)), s.push(i = i.nextSibling);
                return s
            }, n.ELEMENT_NODE = 1, n.TEXT_NODE = 3, s = function() {
                return "<:nav></:nav>" !== document.createElement("nav").cloneNode(!0).outerHTML
            }, n.cloneNode = "undefined" == typeof document || null === document || s() ?
                function(e) {
                    return e.cloneNode(!0)
                } : function(e) {
                var t, r, s, a, o;
                if (t = Transparency.clone(e), t.nodeType === n.ELEMENT_NODE) for (t.removeAttribute(i), o = t.getElementsByTagName("*"), s = 0, a = o.length; a > s; s++) r = o[s], r.removeAttribute(i);
                return t
            }, i = "transparency", n.data = function(e) {
                return e[i] || (e[i] = {})
            }, n.nullLogger = function() {}, n.consoleLogger = function() {
                return console.log(arguments)
            }, n.log = n.nullLogger
        }, {
            "./elementFactory": 18
        }],
        20: [function(e, t) {
            var n, r, i, s, a = {}.hasOwnProperty;
            s = e("../lib/lodash.js"), r = (i = e("./helpers")).chainable, t.exports = n = function() {
                function e(e, t) {
                    this.Transparency = t, this.queryCache = {}, this.childNodes = s.toArray(e.childNodes), this.elements = i.getElements(e)
                }
                return e.prototype.remove = r(function() {
                    var e, t, n, r, i;
                    for (r = this.childNodes, i = [], t = 0, n = r.length; n > t; t++) e = r[t], i.push(e.parentNode.removeChild(e));
                    return i
                }), e.prototype.appendTo = r(function(e) {
                    var t, n, r, i, s;
                    for (i = this.childNodes, s = [], n = 0, r = i.length; r > n; n++) t = i[n], s.push(e.appendChild(t));
                    return s
                }), e.prototype.prepare = r(function(e) {
                    var t, n, r, s, a;
                    for (s = this.elements, a = [], n = 0, r = s.length; r > n; n++) t = s[n], t.reset(), a.push(i.data(t.el).model = e);
                    return a
                }), e.prototype.renderValues = r(function(e, t) {
                    var n, r, i, o;
                    if (s.isElement(e) && (n = this.elements[0])) return n.empty().el.appendChild(e);
                    if ("object" == typeof e) {
                        o = [];
                        for (r in e) a.call(e, r) && (i = e[r], null != i && (s.isString(i) || s.isNumber(i) || s.isBoolean(i) || s.isDate(i) ? o.push(function() {
                            var e, t, s, a;
                            for (s = this.matchingElements(r), a = [], e = 0, t = s.length; t > e; e++) n = s[e], a.push(n.render(i));
                            return a
                        }.call(this)) : "object" == typeof i ? o.push(t.push(r)) : o.push(void 0)));
                        return o
                    }
                }), e.prototype.renderDirectives = r(function(e, t, n) {
                    var r, i, s, o;
                    o = [];
                    for (s in n) a.call(n, s) && (r = n[s], "object" == typeof r && ("object" != typeof e && (e = {
                        value: e
                    }), o.push(function() {
                        var n, a, o, u;
                        for (o = this.matchingElements(s), u = [], n = 0, a = o.length; a > n; n++) i = o[n], u.push(i.renderDirectives(e, t, r));
                        return u
                    }.call(this))));
                    return o
                }), e.prototype.renderChildren = r(function(e, t, n, r) {
                    var i, s, a, o, u;
                    for (u = [], a = 0, o = t.length; o > a; a++) s = t[a], u.push(function() {
                        var t, a, o, u;
                        for (o = this.matchingElements(s), u = [], t = 0, a = o.length; a > t; t++) i = o[t], u.push(this.Transparency.render(i.el, e[s], n[s], r));
                        return u
                    }.call(this));
                    return u
                }), e.prototype.matchingElements = function(e) {
                    var t, n, r;
                    return n = (r = this.queryCache)[e] || (r[e] = function() {
                            var n, r, i, s;
                            for (i = this.elements, s = [], n = 0, r = i.length; r > n; n++) t = i[n], this.Transparency.matcher(t, e) && s.push(t);
                            return s
                        }.call(this)), i.log("Matching elements for '" + e + "':", n), n
                }, e
            }()
        }, {
            "../lib/lodash.js": 21,
            "./helpers": 19
        }],
        21: [function(e, t, n) {
            var r = {};
            r.toString = Object.prototype.toString, r.toArray = function(e) {
                for (var t = new Array(e.length), n = 0; n < e.length; n++) t[n] = e[n];
                return t
            }, r.isString = function(e) {
                return "[object String]" == r.toString.call(e)
            }, r.isNumber = function(e) {
                return "[object Number]" == r.toString.call(e)
            }, r.isArray = Array.isArray ||
                function(e) {
                    return "[object Array]" === r.toString.call(e)
                }, r.isDate = function(e) {
                return "[object Date]" === r.toString.call(e)
            }, r.isElement = function(e) {
                return !(!e || 1 !== e.nodeType)
            }, r.isPlainValue = function(e) {
                var t;
                return t = typeof e, "object" !== t && "function" !== t || n.isDate(e)
            }, r.isBoolean = function(e) {
                return e === !0 || e === !1
            }, t.exports = r
        }, {}],
        22: [function(e, t) {
            var n, r, i, s, a, o = [].indexOf ||
                function(e) {
                    for (var t = 0, n = this.length; n > t; t++) if (t in this && this[t] === e) return t;
                    return -1
                };
            a = e("../lib/lodash.js"), s = e("./helpers"), r = e("./context"), i = {}, i.render = function(e, t, n, o) {
                var u, l;
                return null == t && (t = []), null == n && (n = {}), null == o && (o = {}), u = o.debug && console ? s.consoleLogger : s.nullLogger, u("Transparency.render:", e, t, n, o), e ? (a.isArray(t) || (t = [t]), e = (l = s.data(e)).context || (l.context = new r(e, i)), e.render(t, n, o).el) : void 0
            }, i.matcher = function(e, t) {
                return e.el.id === t || o.call(e.classNames, t) >= 0 || e.el.name === t || e.el.getAttribute("data-bind") === t
            }, i.clone = function(e) {
                return n(e).clone()[0]
            }, i.jQueryPlugin = s.chainable(function(e, t, n) {
                var r, s, a, o;
                for (o = [], s = 0, a = this.length; a > s; s++) r = this[s], o.push(i.render(r, e, t, n));
                return o
            }), ("undefined" != typeof jQuery && null !== jQuery || "undefined" != typeof Zepto && null !== Zepto) && (n = jQuery || Zepto, null != n && (n.fn.render = i.jQueryPlugin)), ("undefined" != typeof t && null !== t ? t.exports : void 0) && (t.exports = i), "undefined" != typeof window && null !== window && (window.Transparency = i), ("undefined" != typeof define && null !== define ? define.amd : void 0) && define(function() {
                return i
            })
        }, {
            "../lib/lodash.js": 21,
            "./context": 17,
            "./helpers": 19
        }],
        23: [function(e, t) {
            var n = e("../config.json"),
                r = e("../directives/dribbble"),
                i = e("./feed"),
                s = Object.create(i, {
                    create: {
                        value: function(e) {
                            return i.create.call(this, e, n.dribbble, r)
                        }
                    }
                });
            t.exports = s
        }, {
            "../config.json": 1,
            "../directives/dribbble": 3,
            "./feed": 24
        }],
        24: [function(e, t) {
            var n = e("../lib/transparency"),
                r = e("../helpers/shuffle");
            $.fn.render = n.jQueryPlugin, window.Transparency.matcher = function(e, t) {
                return e.el.getAttribute("data-js") == t
            };
            var i = {
                create: function(e, t, n) {
                    var r = Object.create(this);
                    return r.$el = e, r.$deferred = new $.Deferred, r.api = $.extend(!0, {}, t), r.api.context = r, r.data = [], r.directive = n, r
                },
                events: function() {},
                fetch: function() {
                    return $.ajax(this.api)
                },
                get: function() {
                    return this.data
                },
                set: function(e) {
                    this.data = e
                },
                trim: function(e) {
                    var t = e[this.api.data.response] || e,
                        n = t.length || 1,
                        i = parseInt(this.api.data.per_page || this.api.data.perpage || 1, 10),
                        s = parseInt(this.api.data.page || 1),
                        a = i * s;
                    return n === i ? t = t : n >= i && n >= a ? t = t.slice(a - i, a) : n > i && a > n && (t = r(t).slice(0, i)), t
                },
                render: function() {
                    this.$el.render(this.get(), this.directive)
                },
                start: function() {
                    return this.fetch().done(function(e) {
                        e.hasOwnProperty(this.api.data.response) && Array.isArray(e[this.api.data.response]) || void 0 === this.api.data.response ? (this.set(this.trim(e)), this.render()) : this.$el.remove(), this.$deferred.resolve(this)
                    }).fail(function() {
                        this.$el.remove(), this.$deferred.resolve(this)
                    }), this.$deferred.promise()
                }
            };
            t.exports = i
        }, {
            "../helpers/shuffle": 13,
            "../lib/transparency": 22
        }],
        25: [function(e, t) {
            var n = e("../modules/post"),
                r = Object.create(n, {
                    create: {
                        value: function(e) {
                            return n.create.call(this, e)
                        }
                    },
                    clean: {
                        value: function() {
                            var e = this.$el.find('[data-js~="excerpt"]'),
                                t = this.$el.find('[data-js~="tags"]'),
                                n = this.$el.find('iframe[src*="player.vimeo"], iframe[src*="youtube"], iframe[src*="kickstarter"][src*="video.html"]');
                            if (e.length && (e.text().trim().length || e.remove()), t.length) {
                                var r = [];
                                $.each(t.children(), function() {
                                    this.children[0].innerHTML.indexOf("_") && r.push(this)
                                }), r.length ? t.html(r) : t.remove()
                            }
                            n.length && $.each(n, function() {
                                var e = $(this);
                                "embed" !== e.parent().attr("data-js") && e.is(":first-of-type") === !1 && $(this).wrap('<div data-js="embed"></div>')
                            })
                        }
                    }
                });
            t.exports = r
        }, {
            "../modules/post": 27
        }],
        26: [function(e, t) {
            var n = e("../config.json"),
                r = e("../directives/instagram"),
                i = e("./feed"),
                s = Object.create(i, {
                    create: {
                        value: function(e) {
                            return "" !== n.instagram.data.access_token || "" !== n.instagram.url ? (n.instagram.data.per_page = n.instagram.data.count, n.instagram.data.count = 33, i.create.call(this, e, n.instagram, r)) : void 0
                        }
                    }
                });
            t.exports = s
        }, {
            "../config.json": 1,
            "../directives/instagram": 4,
            "./feed": 24
        }],
        27: [function(e, t) {
            var n = (e("../config.json"), e("../helpers/embed")),
                r = e("../events/events"),
                i = e("../modules/share"),
                s = {
                    create: function(e) {
                        var t = Object.create(this);
                        return t.$el = e, t.$deferred = new $.Deferred, t.id = e.prop("id"), t.permalink = e.data("permalink"), t.Share = i.create(e.find('[data-js~="share"]')), t.Share && (t.Share.api.data.url = e.data("permalink")), t
                    },
                    clean: function() {},
                    embed: n,
                    start: function() {
                        var e = [];
                        return this.clean(), this.embed(this.$el.find('[data-js~="embed"]')), this.Share && this.Share.start().done(function(e) {
                            e.$el.attr("data-js", e.$el.attr("data-js") + " share-start")
                        }), $.when.apply($, e).then($.proxy(function() {
                            this.$deferred.resolve(this), r.trigger("post.complete", [this.$el])
                        }, this)), this.$deferred.promise()
                    }
                };
            t.exports = s
        }, {
            "../config.json": 1,
            "../events/events": 6,
            "../helpers/embed": 10,
            "../modules/share": 28
        }],
        28: [function(e, t) {
            var n = e("../config.json"),
                r = e("../directives/share"),
                i = e("./feed"),
                s = Object.create(i, {
                    create: {
                        value: function(e) {
                            var t;
                            return "" !== n.share.data.apikey && (t = i.create.call(this, e, n.share, r)), t
                        }
                    }
                });
            t.exports = s
        }, {
            "../config.json": 1,
            "../directives/share": 5,
            "./feed": 24
        }]
    }, {}, [2]);