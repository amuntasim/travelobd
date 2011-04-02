/*!
 * jQuery UI 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI
 */
/*
 * jQuery UI 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI
 */
jQuery.ui || (function(a) {
    a.ui = {version:"1.8",plugin:{add:function(c, d, f) {
        var e = a.ui[c].prototype;
        for (var b in f) {
            e.plugins[b] = e.plugins[b] || [];
            e.plugins[b].push([d,f[b]])
        }
    },call:function(b, d, c) {
        var f = b.plugins[d];
        if (!f || !b.element[0].parentNode) {
            return
        }
        for (var e = 0; e < f.length; e++) {
            if (b.options[f[e][0]]) {
                f[e][1].apply(b.element, c)
            }
        }
    }},contains:function(d, c) {
        return document.compareDocumentPosition ? d.compareDocumentPosition(c) & 16 : d !== c && d.contains(c)
    },hasScroll:function(e, c) {
        if (a(e).css("overflow") == "hidden") {
            return false
        }
        var b = (c && c == "left") ? "scrollLeft" : "scrollTop",d = false;
        if (e[b] > 0) {
            return true
        }
        e[b] = 1;
        d = (e[b] > 0);
        e[b] = 0;
        return d
    },isOverAxis:function(c, b, d) {
        return(c > b) && (c < (b + d))
    },isOver:function(g, c, f, e, b, d) {
        return a.ui.isOverAxis(g, f, b) && a.ui.isOverAxis(c, e, d)
    },keyCode:{BACKSPACE:8,CAPS_LOCK:20,COMMA:188,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38}};
    a.fn.extend({_focus:a.fn.focus,focus:function(b, c) {
        return typeof b === "number" ? this.each(function() {
            var d = this;
            setTimeout(function() {
                a(d).focus();
                (c && c.call(d))
            }, b)
        }) : this._focus.apply(this, arguments)
    },enableSelection:function() {
        return this.attr("unselectable", "off").css("MozUserSelect", "").unbind("selectstart.ui")
    },disableSelection:function() {
        return this.attr("unselectable", "on").css("MozUserSelect", "none").bind("selectstart.ui", function() {
            return false
        })
    },scrollParent:function() {
        var b;
        if ((a.browser.msie && (/(static|relative)/).test(this.css("position"))) || (/absolute/).test(this.css("position"))) {
            b = this.parents().filter(
                    function() {
                        return(/(relative|absolute|fixed)/).test(a.curCSS(this, "position", 1)) && (/(auto|scroll)/).test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
                    }).eq(0)
        } else {
            b = this.parents().filter(
                    function() {
                        return(/(auto|scroll)/).test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
                    }).eq(0)
        }
        return(/fixed/).test(this.css("position")) || !b.length ? a(document) : b
    },zIndex:function(e) {
        if (e !== undefined) {
            return this.css("zIndex", e)
        }
        if (this.length) {
            var c = a(this[0]),b,d;
            while (c.length && c[0] !== document) {
                b = c.css("position");
                if (b == "absolute" || b == "relative" || b == "fixed") {
                    d = parseInt(c.css("zIndex"));
                    if (!isNaN(d) && d != 0) {
                        return d
                    }
                }
                c = c.parent()
            }
        }
        return 0
    }});
    a.extend(a.expr[":"], {data:function(d, c, b) {
        return !!a.data(d, b[3])
    },focusable:function(c) {
        var d = c.nodeName.toLowerCase(),b = a.attr(c, "tabindex");
        return(/input|select|textarea|button|object/.test(d) ? !c.disabled : "a" == d || "area" == d ? c.href || !isNaN(b) : !isNaN(b)) && !a(c)["area" == d ? "parents" : "closest"](":hidden").length
    },tabbable:function(c) {
        var b = a.attr(c, "tabindex");
        return(isNaN(b) || b >= 0) && a(c).is(":focusable")
    }})
})(jQuery);
;
/*!
 * jQuery UI Widget 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Widget
 */
/*
 * jQuery UI Widget 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Widget
 */
(function(b) {
    var a = b.fn.remove;
    b.fn.remove = function(c, d) {
        return this.each(function() {
            if (!d) {
                if (!c || b.filter(c, [this]).length) {
                    b("*", this).add(this).each(function() {
                        b(this).triggerHandler("remove")
                    })
                }
            }
            return a.call(b(this), c, d)
        })
    };
    b.widget = function(d, f, c) {
        var e = d.split(".")[0],h;
        d = d.split(".")[1];
        h = e + "-" + d;
        if (!c) {
            c = f;
            f = b.Widget
        }
        b.expr[":"][h] = function(i) {
            return !!b.data(i, d)
        };
        b[e] = b[e] || {};
        b[e][d] = function(i, j) {
            if (arguments.length) {
                this._createWidget(i, j)
            }
        };
        var g = new f();
        g.options = b.extend({}, g.options);
        b[e][d].prototype = b.extend(true, g, {namespace:e,widgetName:d,widgetEventPrefix:b[e][d].prototype.widgetEventPrefix || d,widgetBaseClass:h}, c);
        b.widget.bridge(d, b[e][d])
    };
    b.widget.bridge = function(d, c) {
        b.fn[d] = function(g) {
            var e = typeof g === "string",f = Array.prototype.slice.call(arguments, 1),h = this;
            g = !e && f.length ? b.extend.apply(null, [true,g].concat(f)) : g;
            if (e && g.substring(0, 1) === "_") {
                return h
            }
            if (e) {
                this.each(function() {
                    var i = b.data(this, d),j = i && b.isFunction(i[g]) ? i[g].apply(i, f) : i;
                    if (j !== i && j !== undefined) {
                        h = j;
                        return false
                    }
                })
            } else {
                this.each(function() {
                    var i = b.data(this, d);
                    if (i) {
                        if (g) {
                            i.option(g)
                        }
                        i._init()
                    } else {
                        b.data(this, d, new c(g, this))
                    }
                })
            }
            return h
        }
    };
    b.Widget = function(c, d) {
        if (arguments.length) {
            this._createWidget(c, d)
        }
    };
    b.Widget.prototype = {widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(d, e) {
        this.element = b(e).data(this.widgetName, this);
        this.options = b.extend(true, {}, this.options, b.metadata && b.metadata.get(e)[this.widgetName], d);
        var c = this;
        this.element.bind("remove." + this.widgetName, function() {
            c.destroy()
        });
        this._create();
        this._init()
    },_create:function() {
    },_init:function() {
    },destroy:function() {
        this.element.unbind("." + this.widgetName).removeData(this.widgetName);
        this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled " + this.namespace + "-state-disabled")
    },widget:function() {
        return this.element
    },option:function(e, f) {
        var d = e,c = this;
        if (arguments.length === 0) {
            return b.extend({}, c.options)
        }
        if (typeof e === "string") {
            if (f === undefined) {
                return this.options[e]
            }
            d = {};
            d[e] = f
        }
        b.each(d, function(g, h) {
            c._setOption(g, h)
        });
        return c
    },_setOption:function(c, d) {
        this.options[c] = d;
        if (c === "disabled") {
            this.widget()[d ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled " + this.namespace + "-state-disabled").attr("aria-disabled", d)
        }
        return this
    },enable:function() {
        return this._setOption("disabled", false)
    },disable:function() {
        return this._setOption("disabled", true)
    },_trigger:function(d, e, f) {
        var h = this.options[d];
        e = b.Event(e);
        e.type = (d === this.widgetEventPrefix ? d : this.widgetEventPrefix + d).toLowerCase();
        f = f || {};
        if (e.originalEvent) {
            for (var c = b.event.props.length,g; c;) {
                g = b.event.props[--c];
                e[g] = e.originalEvent[g]
            }
        }
        this.element.trigger(e, f);
        return !(b.isFunction(h) && h.call(this.element[0], e, f) === false || e.isDefaultPrevented())
    }}
})(jQuery);
;
/*!
 * jQuery UI Mouse 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Mouse
 *
 * Depends:
 *	jquery.ui.widget.js
 */
/*
 * jQuery UI Mouse 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Mouse
 *
 * Depends:
 *	jquery.ui.widget.js
 */
(function(a) {
    a.widget("ui.mouse", {options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function() {
        var b = this;
        this.element.bind("mousedown." + this.widgetName,
                function(c) {
                    return b._mouseDown(c)
                }).bind("click." + this.widgetName, function(c) {
            if (b._preventClickEvent) {
                b._preventClickEvent = false;
                c.stopImmediatePropagation();
                return false
            }
        });
        this.started = false
    },_mouseDestroy:function() {
        this.element.unbind("." + this.widgetName)
    },_mouseDown:function(d) {
        d.originalEvent = d.originalEvent || {};
        if (d.originalEvent.mouseHandled) {
            return
        }
        (this._mouseStarted && this._mouseUp(d));
        this._mouseDownEvent = d;
        var c = this,e = (d.which == 1),b = (typeof this.options.cancel == "string" ? a(d.target).parents().add(d.target).filter(this.options.cancel).length : false);
        if (!e || b || !this._mouseCapture(d)) {
            return true
        }
        this.mouseDelayMet = !this.options.delay;
        if (!this.mouseDelayMet) {
            this._mouseDelayTimer = setTimeout(function() {
                c.mouseDelayMet = true
            }, this.options.delay)
        }
        if (this._mouseDistanceMet(d) && this._mouseDelayMet(d)) {
            this._mouseStarted = (this._mouseStart(d) !== false);
            if (!this._mouseStarted) {
                d.preventDefault();
                return true
            }
        }
        this._mouseMoveDelegate = function(f) {
            return c._mouseMove(f)
        };
        this._mouseUpDelegate = function(f) {
            return c._mouseUp(f)
        };
        a(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
        (a.browser.safari || d.preventDefault());
        d.originalEvent.mouseHandled = true;
        return true
    },_mouseMove:function(b) {
        if (a.browser.msie && !b.button) {
            return this._mouseUp(b)
        }
        if (this._mouseStarted) {
            this._mouseDrag(b);
            return b.preventDefault()
        }
        if (this._mouseDistanceMet(b) && this._mouseDelayMet(b)) {
            this._mouseStarted = (this._mouseStart(this._mouseDownEvent, b) !== false);
            (this._mouseStarted ? this._mouseDrag(b) : this._mouseUp(b))
        }
        return !this._mouseStarted
    },_mouseUp:function(b) {
        a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
        if (this._mouseStarted) {
            this._mouseStarted = false;
            this._preventClickEvent = (b.target == this._mouseDownEvent.target);
            this._mouseStop(b)
        }
        return false
    },_mouseDistanceMet:function(b) {
        return(Math.max(Math.abs(this._mouseDownEvent.pageX - b.pageX), Math.abs(this._mouseDownEvent.pageY - b.pageY)) >= this.options.distance)
    },_mouseDelayMet:function(b) {
        return this.mouseDelayMet
    },_mouseStart:function(b) {
    },_mouseDrag:function(b) {
    },_mouseStop:function(b) {
    },_mouseCapture:function(b) {
        return true
    }})
})(jQuery);
;
/*
 * jQuery UI Position 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Position
 */
(function(f) {
    f.ui = f.ui || {};
    var c = /left|center|right/,e = "center",d = /top|center|bottom/,g = "center",a = f.fn.position,b = f.fn.offset;
    f.fn.position = function(i) {
        if (!i || !i.of) {
            return a.apply(this, arguments)
        }
        i = f.extend({}, i);
        var l = f(i.of),n = (i.collision || "flip").split(" "),m = i.offset ? i.offset.split(" ") : [0,0],k,h,j;
        if (i.of.nodeType === 9) {
            k = l.width();
            h = l.height();
            j = {top:0,left:0}
        } else {
            if (i.of.scrollTo && i.of.document) {
                k = l.width();
                h = l.height();
                j = {top:l.scrollTop(),left:l.scrollLeft()}
            } else {
                if (i.of.preventDefault) {
                    i.at = "left top";
                    k = h = 0;
                    j = {top:i.of.pageY,left:i.of.pageX}
                } else {
                    k = l.outerWidth();
                    h = l.outerHeight();
                    j = l.offset()
                }
            }
        }
        f.each(["my","at"], function() {
            var o = (i[this] || "").split(" ");
            if (o.length === 1) {
                o = c.test(o[0]) ? o.concat([g]) : d.test(o[0]) ? [e].concat(o) : [e,g]
            }
            o[0] = c.test(o[0]) ? o[0] : e;
            o[1] = d.test(o[1]) ? o[1] : g;
            i[this] = o
        });
        if (n.length === 1) {
            n[1] = n[0]
        }
        m[0] = parseInt(m[0], 10) || 0;
        if (m.length === 1) {
            m[1] = m[0]
        }
        m[1] = parseInt(m[1], 10) || 0;
        if (i.at[0] === "right") {
            j.left += k
        } else {
            if (i.at[0] === e) {
                j.left += k / 2
            }
        }
        if (i.at[1] === "bottom") {
            j.top += h
        } else {
            if (i.at[1] === g) {
                j.top += h / 2
            }
        }
        j.left += m[0];
        j.top += m[1];
        return this.each(function() {
            var r = f(this),q = r.outerWidth(),p = r.outerHeight(),o = f.extend({}, j);
            if (i.my[0] === "right") {
                o.left -= q
            } else {
                if (i.my[0] === e) {
                    o.left -= q / 2
                }
            }
            if (i.my[1] === "bottom") {
                o.top -= p
            } else {
                if (i.my[1] === g) {
                    o.top -= p / 2
                }
            }
            f.each(["left","top"], function(t, s) {
                if (f.ui.position[n[t]]) {
                    f.ui.position[n[t]][s](o, {targetWidth:k,targetHeight:h,elemWidth:q,elemHeight:p,offset:m,my:i.my,at:i.at})
                }
            });
            if (f.fn.bgiframe) {
                r.bgiframe()
            }
            r.offset(f.extend(o, {using:i.using}))
        })
    };
    f.ui.position = {fit:{left:function(h, i) {
        var k = f(window),j = h.left + i.elemWidth - k.width() - k.scrollLeft();
        h.left = j > 0 ? h.left - j : Math.max(0, h.left)
    },top:function(h, i) {
        var k = f(window),j = h.top + i.elemHeight - k.height() - k.scrollTop();
        h.top = j > 0 ? h.top - j : Math.max(0, h.top)
    }},flip:{left:function(i, j) {
        if (j.at[0] === "center") {
            return
        }
        var l = f(window),k = i.left + j.elemWidth - l.width() - l.scrollLeft(),h = j.my[0] === "left" ? -j.elemWidth : j.my[0] === "right" ? j.elemWidth : 0,m = -2 * j.offset[0];
        i.left += i.left < 0 ? h + j.targetWidth + m : k > 0 ? h - j.targetWidth + m : 0
    },top:function(i, k) {
        if (k.at[1] === "center") {
            return
        }
        var m = f(window),l = i.top + k.elemHeight - m.height() - m.scrollTop(),h = k.my[1] === "top" ? -k.elemHeight : k.my[1] === "bottom" ? k.elemHeight : 0,j = k.at[1] === "top" ? k.targetHeight : -k.targetHeight,n = -2 * k.offset[1];
        i.top += i.top < 0 ? h + k.targetHeight + n : l > 0 ? h + j + n : 0
    }}};
    if (!f.offset.setOffset) {
        f.offset.setOffset = function(l, i) {
            if (/static/.test(f.curCSS(l, "position"))) {
                l.style.position = "relative"
            }
            var k = f(l),n = k.offset(),h = parseInt(f.curCSS(l, "top", true), 10) || 0,m = parseInt(f.curCSS(l, "left", true), 10) || 0,j = {top:(i.top - n.top) + h,left:(i.left - n.left) + m};
            if ("using" in i) {
                i.using.call(l, j)
            } else {
                k.css(j)
            }
        };
        f.fn.offset = function(h) {
            var i = this[0];
            if (!i || !i.ownerDocument) {
                return null
            }
            if (h) {
                return this.each(function() {
                    f.offset.setOffset(this, h)
                })
            }
            return b.call(this)
        }
    }
}(jQuery));
;
/*
 * jQuery UI Draggable 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Draggables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(a) {
    a.widget("ui.draggable", a.ui.mouse, {widgetEventPrefix:"drag",options:{addClasses:true,appendTo:"parent",axis:false,connectToSortable:false,containment:false,cursor:"auto",cursorAt:false,grid:false,handle:false,helper:"original",iframeFix:false,opacity:false,refreshPositions:false,revert:false,revertDuration:500,scope:"default",scroll:true,scrollSensitivity:20,scrollSpeed:20,snap:false,snapMode:"both",snapTolerance:20,stack:false,zIndex:false},_create:function() {
        if (this.options.helper == "original" && !(/^(?:r|a|f)/).test(this.element.css("position"))) {
            this.element[0].style.position = "relative"
        }
        (this.options.addClasses && this.element.addClass("ui-draggable"));
        (this.options.disabled && this.element.addClass("ui-draggable-disabled"));
        this._mouseInit()
    },destroy:function() {
        if (!this.element.data("draggable")) {
            return
        }
        this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
        this._mouseDestroy();
        return this
    },_mouseCapture:function(b) {
        var c = this.options;
        if (this.helper || c.disabled || a(b.target).is(".ui-resizable-handle")) {
            return false
        }
        this.handle = this._getHandle(b);
        if (!this.handle) {
            return false
        }
        return true
    },_mouseStart:function(b) {
        var c = this.options;
        this.helper = this._createHelper(b);
        this._cacheHelperProportions();
        if (a.ui.ddmanager) {
            a.ui.ddmanager.current = this
        }
        this._cacheMargins();
        this.cssPosition = this.helper.css("position");
        this.scrollParent = this.helper.scrollParent();
        this.offset = this.positionAbs = this.element.offset();
        this.offset = {top:this.offset.top - this.margins.top,left:this.offset.left - this.margins.left};
        a.extend(this.offset, {click:{left:b.pageX - this.offset.left,top:b.pageY - this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});
        this.originalPosition = this.position = this._generatePosition(b);
        this.originalPageX = b.pageX;
        this.originalPageY = b.pageY;
        (c.cursorAt && this._adjustOffsetFromHelper(c.cursorAt));
        if (c.containment) {
            this._setContainment()
        }
        if (this._trigger("start", b) === false) {
            this._clear();
            return false
        }
        this._cacheHelperProportions();
        if (a.ui.ddmanager && !c.dropBehaviour) {
            a.ui.ddmanager.prepareOffsets(this, b)
        }
        this.helper.addClass("ui-draggable-dragging");
        this._mouseDrag(b, true);
        return true
    },_mouseDrag:function(b, d) {
        this.position = this._generatePosition(b);
        this.positionAbs = this._convertPositionTo("absolute");
        if (!d) {
            var c = this._uiHash();
            if (this._trigger("drag", b, c) === false) {
                this._mouseUp({});
                return false
            }
            this.position = c.position
        }
        if (!this.options.axis || this.options.axis != "y") {
            this.helper[0].style.left = this.position.left + "px"
        }
        if (!this.options.axis || this.options.axis != "x") {
            this.helper[0].style.top = this.position.top + "px"
        }
        if (a.ui.ddmanager) {
            a.ui.ddmanager.drag(this, b)
        }
        return false
    },_mouseStop:function(c) {
        var d = false;
        if (a.ui.ddmanager && !this.options.dropBehaviour) {
            d = a.ui.ddmanager.drop(this, c)
        }
        if (this.dropped) {
            d = this.dropped;
            this.dropped = false
        }
        if (!this.element[0] || !this.element[0].parentNode) {
            return false
        }
        if ((this.options.revert == "invalid" && !d) || (this.options.revert == "valid" && d) || this.options.revert === true || (a.isFunction(this.options.revert) && this.options.revert.call(this.element, d))) {
            var b = this;
            a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                if (b._trigger("stop", c) !== false) {
                    b._clear()
                }
            })
        } else {
            if (this._trigger("stop", c) !== false) {
                this._clear()
            }
        }
        return false
    },cancel:function() {
        if (this.helper.is(".ui-draggable-dragging")) {
            this._mouseUp({})
        } else {
            this._clear()
        }
        return this
    },_getHandle:function(b) {
        var c = !this.options.handle || !a(this.options.handle, this.element).length ? true : false;
        a(this.options.handle, this.element).find("*").andSelf().each(function() {
            if (this == b.target) {
                c = true
            }
        });
        return c
    },_createHelper:function(c) {
        var d = this.options;
        var b = a.isFunction(d.helper) ? a(d.helper.apply(this.element[0], [c])) : (d.helper == "clone" ? this.element.clone() : this.element);
        if (!b.parents("body").length) {
            b.appendTo((d.appendTo == "parent" ? this.element[0].parentNode : d.appendTo))
        }
        if (b[0] != this.element[0] && !(/(fixed|absolute)/).test(b.css("position"))) {
            b.css("position", "absolute")
        }
        return b
    },_adjustOffsetFromHelper:function(b) {
        if (typeof b == "string") {
            b = b.split(" ")
        }
        if (a.isArray(b)) {
            b = {left:+b[0],top:+b[1] || 0}
        }
        if ("left" in b) {
            this.offset.click.left = b.left + this.margins.left
        }
        if ("right" in b) {
            this.offset.click.left = this.helperProportions.width - b.right + this.margins.left
        }
        if ("top" in b) {
            this.offset.click.top = b.top + this.margins.top
        }
        if ("bottom" in b) {
            this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top
        }
    },_getParentOffset:function() {
        this.offsetParent = this.helper.offsetParent();
        var b = this.offsetParent.offset();
        if (this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
            b.left += this.scrollParent.scrollLeft();
            b.top += this.scrollParent.scrollTop()
        }
        if ((this.offsetParent[0] == document.body) || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie)) {
            b = {top:0,left:0}
        }
        return{top:b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),left:b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)}
    },_getRelativeOffset:function() {
        if (this.cssPosition == "relative") {
            var b = this.element.position();
            return{top:b.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),left:b.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()}
        } else {
            return{top:0,left:0}
        }
    },_cacheMargins:function() {
        this.margins = {left:(parseInt(this.element.css("marginLeft"), 10) || 0),top:(parseInt(this.element.css("marginTop"), 10) || 0)}
    },_cacheHelperProportions:function() {
        this.helperProportions = {width:this.helper.outerWidth(),height:this.helper.outerHeight()}
    },_setContainment:function() {
        var e = this.options;
        if (e.containment == "parent") {
            e.containment = this.helper[0].parentNode
        }
        if (e.containment == "document" || e.containment == "window") {
            this.containment = [0 - this.offset.relative.left - this.offset.parent.left,0 - this.offset.relative.top - this.offset.parent.top,a(e.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left,(a(e.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
        }
        if (!(/^(document|window|parent)$/).test(e.containment) && e.containment.constructor != Array) {
            var c = a(e.containment)[0];
            if (!c) {
                return
            }
            var d = a(e.containment).offset();
            var b = (a(c).css("overflow") != "hidden");
            this.containment = [d.left + (parseInt(a(c).css("borderLeftWidth"), 10) || 0) + (parseInt(a(c).css("paddingLeft"), 10) || 0) - this.margins.left,d.top + (parseInt(a(c).css("borderTopWidth"), 10) || 0) + (parseInt(a(c).css("paddingTop"), 10) || 0) - this.margins.top,d.left + (b ? Math.max(c.scrollWidth, c.offsetWidth) : c.offsetWidth) - (parseInt(a(c).css("borderLeftWidth"), 10) || 0) - (parseInt(a(c).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left,d.top + (b ? Math.max(c.scrollHeight, c.offsetHeight) : c.offsetHeight) - (parseInt(a(c).css("borderTopWidth"), 10) || 0) - (parseInt(a(c).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
        } else {
            if (e.containment.constructor == Array) {
                this.containment = e.containment
            }
        }
    },_convertPositionTo:function(f, h) {
        if (!h) {
            h = this.position
        }
        var c = f == "absolute" ? 1 : -1;
        var e = this.options,b = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,g = (/(html|body)/i).test(b[0].tagName);
        return{top:(h.top + this.offset.relative.top * c + this.offset.parent.top * c - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (g ? 0 : b.scrollTop())) * c)),left:(h.left + this.offset.relative.left * c + this.offset.parent.left * c - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : b.scrollLeft()) * c))}
    },_generatePosition:function(e) {
        var h = this.options,b = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,i = (/(html|body)/i).test(b[0].tagName);
        var d = e.pageX;
        var c = e.pageY;
        if (this.originalPosition) {
            if (this.containment) {
                if (e.pageX - this.offset.click.left < this.containment[0]) {
                    d = this.containment[0] + this.offset.click.left
                }
                if (e.pageY - this.offset.click.top < this.containment[1]) {
                    c = this.containment[1] + this.offset.click.top
                }
                if (e.pageX - this.offset.click.left > this.containment[2]) {
                    d = this.containment[2] + this.offset.click.left
                }
                if (e.pageY - this.offset.click.top > this.containment[3]) {
                    c = this.containment[3] + this.offset.click.top
                }
            }
            if (h.grid) {
                var g = this.originalPageY + Math.round((c - this.originalPageY) / h.grid[1]) * h.grid[1];
                c = this.containment ? (!(g - this.offset.click.top < this.containment[1] || g - this.offset.click.top > this.containment[3]) ? g : (!(g - this.offset.click.top < this.containment[1]) ? g - h.grid[1] : g + h.grid[1])) : g;
                var f = this.originalPageX + Math.round((d - this.originalPageX) / h.grid[0]) * h.grid[0];
                d = this.containment ? (!(f - this.offset.click.left < this.containment[0] || f - this.offset.click.left > this.containment[2]) ? f : (!(f - this.offset.click.left < this.containment[0]) ? f - h.grid[0] : f + h.grid[0])) : f
            }
        }
        return{top:(c - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (i ? 0 : b.scrollTop())))),left:(d - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : b.scrollLeft())))}
    },_clear:function() {
        this.helper.removeClass("ui-draggable-dragging");
        if (this.helper[0] != this.element[0] && !this.cancelHelperRemoval) {
            this.helper.remove()
        }
        this.helper = null;
        this.cancelHelperRemoval = false
    },_trigger:function(b, c, d) {
        d = d || this._uiHash();
        a.ui.plugin.call(this, b, [c,d]);
        if (b == "drag") {
            this.positionAbs = this._convertPositionTo("absolute")
        }
        return a.Widget.prototype._trigger.call(this, b, c, d)
    },plugins:{},_uiHash:function(b) {
        return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}
    }});
    a.extend(a.ui.draggable, {version:"1.8"});
    a.ui.plugin.add("draggable", "connectToSortable", {start:function(c, e) {
        var d = a(this).data("draggable"),f = d.options,b = a.extend({}, e, {item:d.element});
        d.sortables = [];
        a(f.connectToSortable).each(function() {
            var g = a.data(this, "sortable");
            if (g && !g.options.disabled) {
                d.sortables.push({instance:g,shouldRevert:g.options.revert});
                g._refreshItems();
                g._trigger("activate", c, b)
            }
        })
    },stop:function(c, e) {
        var d = a(this).data("draggable"),b = a.extend({}, e, {item:d.element});
        a.each(d.sortables, function() {
            if (this.instance.isOver) {
                this.instance.isOver = 0;
                d.cancelHelperRemoval = true;
                this.instance.cancelHelperRemoval = false;
                if (this.shouldRevert) {
                    this.instance.options.revert = true
                }
                this.instance._mouseStop(c);
                this.instance.options.helper = this.instance.options._helper;
                if (d.options.helper == "original") {
                    this.instance.currentItem.css({top:"auto",left:"auto"})
                }
            } else {
                this.instance.cancelHelperRemoval = false;
                this.instance._trigger("deactivate", c, b)
            }
        })
    },drag:function(c, f) {
        var e = a(this).data("draggable"),b = this;
        var d = function(i) {
            var n = this.offset.click.top,m = this.offset.click.left;
            var g = this.positionAbs.top,k = this.positionAbs.left;
            var j = i.height,l = i.width;
            var p = i.top,h = i.left;
            return a.ui.isOver(g + n, k + m, p, h, j, l)
        };
        a.each(e.sortables, function(g) {
            this.instance.positionAbs = e.positionAbs;
            this.instance.helperProportions = e.helperProportions;
            this.instance.offset.click = e.offset.click;
            if (this.instance._intersectsWith(this.instance.containerCache)) {
                if (!this.instance.isOver) {
                    this.instance.isOver = 1;
                    this.instance.currentItem = a(b).clone().appendTo(this.instance.element).data("sortable-item", true);
                    this.instance.options._helper = this.instance.options.helper;
                    this.instance.options.helper = function() {
                        return f.helper[0]
                    };
                    c.target = this.instance.currentItem[0];
                    this.instance._mouseCapture(c, true);
                    this.instance._mouseStart(c, true, true);
                    this.instance.offset.click.top = e.offset.click.top;
                    this.instance.offset.click.left = e.offset.click.left;
                    this.instance.offset.parent.left -= e.offset.parent.left - this.instance.offset.parent.left;
                    this.instance.offset.parent.top -= e.offset.parent.top - this.instance.offset.parent.top;
                    e._trigger("toSortable", c);
                    e.dropped = this.instance.element;
                    e.currentItem = e.element;
                    this.instance.fromOutside = e
                }
                if (this.instance.currentItem) {
                    this.instance._mouseDrag(c)
                }
            } else {
                if (this.instance.isOver) {
                    this.instance.isOver = 0;
                    this.instance.cancelHelperRemoval = true;
                    this.instance.options.revert = false;
                    this.instance._trigger("out", c, this.instance._uiHash(this.instance));
                    this.instance._mouseStop(c, true);
                    this.instance.options.helper = this.instance.options._helper;
                    this.instance.currentItem.remove();
                    if (this.instance.placeholder) {
                        this.instance.placeholder.remove()
                    }
                    e._trigger("fromSortable", c);
                    e.dropped = false
                }
            }
        })
    }});
    a.ui.plugin.add("draggable", "cursor", {start:function(c, d) {
        var b = a("body"),e = a(this).data("draggable").options;
        if (b.css("cursor")) {
            e._cursor = b.css("cursor")
        }
        b.css("cursor", e.cursor)
    },stop:function(b, c) {
        var d = a(this).data("draggable").options;
        if (d._cursor) {
            a("body").css("cursor", d._cursor)
        }
    }});
    a.ui.plugin.add("draggable", "iframeFix", {start:function(b, c) {
        var d = a(this).data("draggable").options;
        a(d.iframeFix === true ? "iframe" : d.iframeFix).each(function() {
            a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth + "px",height:this.offsetHeight + "px",position:"absolute",opacity:"0.001",zIndex:1000}).css(a(this).offset()).appendTo("body")
        })
    },stop:function(b, c) {
        a("div.ui-draggable-iframeFix").each(function() {
            this.parentNode.removeChild(this)
        })
    }});
    a.ui.plugin.add("draggable", "opacity", {start:function(c, d) {
        var b = a(d.helper),e = a(this).data("draggable").options;
        if (b.css("opacity")) {
            e._opacity = b.css("opacity")
        }
        b.css("opacity", e.opacity)
    },stop:function(b, c) {
        var d = a(this).data("draggable").options;
        if (d._opacity) {
            a(c.helper).css("opacity", d._opacity)
        }
    }});
    a.ui.plugin.add("draggable", "scroll", {start:function(c, d) {
        var b = a(this).data("draggable");
        if (b.scrollParent[0] != document && b.scrollParent[0].tagName != "HTML") {
            b.overflowOffset = b.scrollParent.offset()
        }
    },drag:function(d, e) {
        var c = a(this).data("draggable"),f = c.options,b = false;
        if (c.scrollParent[0] != document && c.scrollParent[0].tagName != "HTML") {
            if (!f.axis || f.axis != "x") {
                if ((c.overflowOffset.top + c.scrollParent[0].offsetHeight) - d.pageY < f.scrollSensitivity) {
                    c.scrollParent[0].scrollTop = b = c.scrollParent[0].scrollTop + f.scrollSpeed
                } else {
                    if (d.pageY - c.overflowOffset.top < f.scrollSensitivity) {
                        c.scrollParent[0].scrollTop = b = c.scrollParent[0].scrollTop - f.scrollSpeed
                    }
                }
            }
            if (!f.axis || f.axis != "y") {
                if ((c.overflowOffset.left + c.scrollParent[0].offsetWidth) - d.pageX < f.scrollSensitivity) {
                    c.scrollParent[0].scrollLeft = b = c.scrollParent[0].scrollLeft + f.scrollSpeed
                } else {
                    if (d.pageX - c.overflowOffset.left < f.scrollSensitivity) {
                        c.scrollParent[0].scrollLeft = b = c.scrollParent[0].scrollLeft - f.scrollSpeed
                    }
                }
            }
        } else {
            if (!f.axis || f.axis != "x") {
                if (d.pageY - a(document).scrollTop() < f.scrollSensitivity) {
                    b = a(document).scrollTop(a(document).scrollTop() - f.scrollSpeed)
                } else {
                    if (a(window).height() - (d.pageY - a(document).scrollTop()) < f.scrollSensitivity) {
                        b = a(document).scrollTop(a(document).scrollTop() + f.scrollSpeed)
                    }
                }
            }
            if (!f.axis || f.axis != "y") {
                if (d.pageX - a(document).scrollLeft() < f.scrollSensitivity) {
                    b = a(document).scrollLeft(a(document).scrollLeft() - f.scrollSpeed)
                } else {
                    if (a(window).width() - (d.pageX - a(document).scrollLeft()) < f.scrollSensitivity) {
                        b = a(document).scrollLeft(a(document).scrollLeft() + f.scrollSpeed)
                    }
                }
            }
        }
        if (b !== false && a.ui.ddmanager && !f.dropBehaviour) {
            a.ui.ddmanager.prepareOffsets(c, d)
        }
    }});
    a.ui.plugin.add("draggable", "snap", {start:function(c, d) {
        var b = a(this).data("draggable"),e = b.options;
        b.snapElements = [];
        a(e.snap.constructor != String ? (e.snap.items || ":data(draggable)") : e.snap).each(function() {
            var g = a(this);
            var f = g.offset();
            if (this != b.element[0]) {
                b.snapElements.push({item:this,width:g.outerWidth(),height:g.outerHeight(),top:f.top,left:f.left})
            }
        })
    },drag:function(u, p) {
        var g = a(this).data("draggable"),q = g.options;
        var y = q.snapTolerance;
        var x = p.offset.left,w = x + g.helperProportions.width,f = p.offset.top,e = f + g.helperProportions.height;
        for (var v = g.snapElements.length - 1; v >= 0; v--) {
            var s = g.snapElements[v].left,n = s + g.snapElements[v].width,m = g.snapElements[v].top,A = m + g.snapElements[v].height;
            if (!((s - y < x && x < n + y && m - y < f && f < A + y) || (s - y < x && x < n + y && m - y < e && e < A + y) || (s - y < w && w < n + y && m - y < f && f < A + y) || (s - y < w && w < n + y && m - y < e && e < A + y))) {
                if (g.snapElements[v].snapping) {
                    (g.options.snap.release && g.options.snap.release.call(g.element, u, a.extend(g._uiHash(), {snapItem:g.snapElements[v].item})))
                }
                g.snapElements[v].snapping = false;
                continue
            }
            if (q.snapMode != "inner") {
                var c = Math.abs(m - e) <= y;
                var z = Math.abs(A - f) <= y;
                var j = Math.abs(s - w) <= y;
                var k = Math.abs(n - x) <= y;
                if (c) {
                    p.position.top = g._convertPositionTo("relative", {top:m - g.helperProportions.height,left:0}).top - g.margins.top
                }
                if (z) {
                    p.position.top = g._convertPositionTo("relative", {top:A,left:0}).top - g.margins.top
                }
                if (j) {
                    p.position.left = g._convertPositionTo("relative", {top:0,left:s - g.helperProportions.width}).left - g.margins.left
                }
                if (k) {
                    p.position.left = g._convertPositionTo("relative", {top:0,left:n}).left - g.margins.left
                }
            }
            var h = (c || z || j || k);
            if (q.snapMode != "outer") {
                var c = Math.abs(m - f) <= y;
                var z = Math.abs(A - e) <= y;
                var j = Math.abs(s - x) <= y;
                var k = Math.abs(n - w) <= y;
                if (c) {
                    p.position.top = g._convertPositionTo("relative", {top:m,left:0}).top - g.margins.top
                }
                if (z) {
                    p.position.top = g._convertPositionTo("relative", {top:A - g.helperProportions.height,left:0}).top - g.margins.top
                }
                if (j) {
                    p.position.left = g._convertPositionTo("relative", {top:0,left:s}).left - g.margins.left
                }
                if (k) {
                    p.position.left = g._convertPositionTo("relative", {top:0,left:n - g.helperProportions.width}).left - g.margins.left
                }
            }
            if (!g.snapElements[v].snapping && (c || z || j || k || h)) {
                (g.options.snap.snap && g.options.snap.snap.call(g.element, u, a.extend(g._uiHash(), {snapItem:g.snapElements[v].item})))
            }
            g.snapElements[v].snapping = (c || z || j || k || h)
        }
    }});
    a.ui.plugin.add("draggable", "stack", {start:function(c, d) {
        var f = a(this).data("draggable").options;
        var e = a.makeArray(a(f.stack)).sort(function(h, g) {
            return(parseInt(a(h).css("zIndex"), 10) || 0) - (parseInt(a(g).css("zIndex"), 10) || 0)
        });
        if (!e.length) {
            return
        }
        var b = parseInt(e[0].style.zIndex) || 0;
        a(e).each(function(g) {
            this.style.zIndex = b + g
        });
        this[0].style.zIndex = b + e.length
    }});
    a.ui.plugin.add("draggable", "zIndex", {start:function(c, d) {
        var b = a(d.helper),e = a(this).data("draggable").options;
        if (b.css("zIndex")) {
            e._zIndex = b.css("zIndex")
        }
        b.css("zIndex", e.zIndex)
    },stop:function(b, c) {
        var d = a(this).data("draggable").options;
        if (d._zIndex) {
            a(c.helper).css("zIndex", d._zIndex)
        }
    }})
})(jQuery);
;
/*
 * jQuery UI Droppable 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Droppables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.mouse.js
 *	jquery.ui.draggable.js
 */
(function(a) {
    a.widget("ui.droppable", {widgetEventPrefix:"drop",options:{accept:"*",activeClass:false,addClasses:true,greedy:false,hoverClass:false,scope:"default",tolerance:"intersect"},_create:function() {
        var c = this.options,b = c.accept;
        this.isover = 0;
        this.isout = 1;
        this.accept = a.isFunction(b) ? b : function(e) {
            return e.is(b)
        };
        this.proportions = {width:this.element[0].offsetWidth,height:this.element[0].offsetHeight};
        a.ui.ddmanager.droppables[c.scope] = a.ui.ddmanager.droppables[c.scope] || [];
        a.ui.ddmanager.droppables[c.scope].push(this);
        (c.addClasses && this.element.addClass("ui-droppable"))
    },destroy:function() {
        var b = a.ui.ddmanager.droppables[this.options.scope];
        for (var c = 0; c < b.length; c++) {
            if (b[c] == this) {
                b.splice(c, 1)
            }
        }
        this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable");
        return this
    },_setOption:function(b, c) {
        if (b == "accept") {
            this.accept = a.isFunction(c) ? c : function(e) {
                return e.is(c)
            }
        }
        a.Widget.prototype._setOption.apply(this, arguments)
    },_activate:function(c) {
        var b = a.ui.ddmanager.current;
        if (this.options.activeClass) {
            this.element.addClass(this.options.activeClass)
        }
        (b && this._trigger("activate", c, this.ui(b)))
    },_deactivate:function(c) {
        var b = a.ui.ddmanager.current;
        if (this.options.activeClass) {
            this.element.removeClass(this.options.activeClass)
        }
        (b && this._trigger("deactivate", c, this.ui(b)))
    },_over:function(c) {
        var b = a.ui.ddmanager.current;
        if (!b || (b.currentItem || b.element)[0] == this.element[0]) {
            return
        }
        if (this.accept.call(this.element[0], (b.currentItem || b.element))) {
            if (this.options.hoverClass) {
                this.element.addClass(this.options.hoverClass)
            }
            this._trigger("over", c, this.ui(b))
        }
    },_out:function(c) {
        var b = a.ui.ddmanager.current;
        if (!b || (b.currentItem || b.element)[0] == this.element[0]) {
            return
        }
        if (this.accept.call(this.element[0], (b.currentItem || b.element))) {
            if (this.options.hoverClass) {
                this.element.removeClass(this.options.hoverClass)
            }
            this._trigger("out", c, this.ui(b))
        }
    },_drop:function(c, d) {
        var b = d || a.ui.ddmanager.current;
        if (!b || (b.currentItem || b.element)[0] == this.element[0]) {
            return false
        }
        var e = false;
        this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function() {
            var f = a.data(this, "droppable");
            if (f.options.greedy && !f.options.disabled && f.options.scope == b.options.scope && f.accept.call(f.element[0], (b.currentItem || b.element)) && a.ui.intersect(b, a.extend(f, {offset:f.element.offset()}), f.options.tolerance)) {
                e = true;
                return false
            }
        });
        if (e) {
            return false
        }
        if (this.accept.call(this.element[0], (b.currentItem || b.element))) {
            if (this.options.activeClass) {
                this.element.removeClass(this.options.activeClass)
            }
            if (this.options.hoverClass) {
                this.element.removeClass(this.options.hoverClass)
            }
            this._trigger("drop", c, this.ui(b));
            return this.element
        }
        return false
    },ui:function(b) {
        return{draggable:(b.currentItem || b.element),helper:b.helper,position:b.position,offset:b.positionAbs}
    }});
    a.extend(a.ui.droppable, {version:"1.8"});
    a.ui.intersect = function(q, j, o) {
        if (!j.offset) {
            return false
        }
        var e = (q.positionAbs || q.position.absolute).left,d = e + q.helperProportions.width,n = (q.positionAbs || q.position.absolute).top,m = n + q.helperProportions.height;
        var g = j.offset.left,c = g + j.proportions.width,p = j.offset.top,k = p + j.proportions.height;
        switch (o) {case"fit":return(g < e && d < c && p < n && m < k);break;case"intersect":return(g < e + (q.helperProportions.width / 2) && d - (q.helperProportions.width / 2) < c && p < n + (q.helperProportions.height / 2) && m - (q.helperProportions.height / 2) < k);break;case"pointer":var h = ((q.positionAbs || q.position.absolute).left + (q.clickOffset || q.offset.click).left),i = ((q.positionAbs || q.position.absolute).top + (q.clickOffset || q.offset.click).top),f = a.ui.isOver(i, h, p, g, j.proportions.height, j.proportions.width);return f;break;case"touch":return((n >= p && n <= k) || (m >= p && m <= k) || (n < p && m > k)) && ((e >= g && e <= c) || (d >= g && d <= c) || (e < g && d > c));break;default:return false;break
        }
    };
    a.ui.ddmanager = {current:null,droppables:{"default":[]},prepareOffsets:function(e, g) {
        var b = a.ui.ddmanager.droppables[e.options.scope] || [];
        var f = g ? g.type : null;
        var h = (e.currentItem || e.element).find(":data(droppable)").andSelf();
        droppablesLoop:for (var d = 0; d < b.length; d++) {
            if (b[d].options.disabled || (e && !b[d].accept.call(b[d].element[0], (e.currentItem || e.element)))) {
                continue
            }
            for (var c = 0; c < h.length; c++) {
                if (h[c] == b[d].element[0]) {
                    b[d].proportions.height = 0;
                    continue droppablesLoop
                }
            }
            b[d].visible = b[d].element.css("display") != "none";
            if (!b[d].visible) {
                continue
            }
            b[d].offset = b[d].element.offset();
            b[d].proportions = {width:b[d].element[0].offsetWidth,height:b[d].element[0].offsetHeight};
            if (f == "mousedown") {
                b[d]._activate.call(b[d], g)
            }
        }
    },drop:function(b, c) {
        var d = false;
        a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function() {
            if (!this.options) {
                return
            }
            if (!this.options.disabled && this.visible && a.ui.intersect(b, this, this.options.tolerance)) {
                d = d || this._drop.call(this, c)
            }
            if (!this.options.disabled && this.visible && this.accept.call(this.element[0], (b.currentItem || b.element))) {
                this.isout = 1;
                this.isover = 0;
                this._deactivate.call(this, c)
            }
        });
        return d
    },drag:function(b, c) {
        if (b.options.refreshPositions) {
            a.ui.ddmanager.prepareOffsets(b, c)
        }
        a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function() {
            if (this.options.disabled || this.greedyChild || !this.visible) {
                return
            }
            var e = a.ui.intersect(b, this, this.options.tolerance);
            var g = !e && this.isover == 1 ? "isout" : (e && this.isover == 0 ? "isover" : null);
            if (!g) {
                return
            }
            var f;
            if (this.options.greedy) {
                var d = this.element.parents(":data(droppable):eq(0)");
                if (d.length) {
                    f = a.data(d[0], "droppable");
                    f.greedyChild = (g == "isover" ? 1 : 0)
                }
            }
            if (f && g == "isover") {
                f.isover = 0;
                f.isout = 1;
                f._out.call(f, c)
            }
            this[g] = 1;
            this[g == "isout" ? "isover" : "isout"] = 0;
            this[g == "isover" ? "_over" : "_out"].call(this, c);
            if (f && g == "isout") {
                f.isout = 0;
                f.isover = 1;
                f._over.call(f, c)
            }
        })
    }}
})(jQuery);
;
/*
 * jQuery UI Resizable 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Resizables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(c) {
    c.widget("ui.resizable", c.ui.mouse, {widgetEventPrefix:"resize",options:{alsoResize:false,animate:false,animateDuration:"slow",animateEasing:"swing",aspectRatio:false,autoHide:false,containment:false,ghost:false,grid:false,handles:"e,s,se",helper:false,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1000},_create:function() {
        var e = this,j = this.options;
        this.element.addClass("ui-resizable");
        c.extend(this, {_aspectRatio:!!(j.aspectRatio),aspectRatio:j.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:j.helper || j.ghost || j.animate ? j.helper || "ui-resizable-helper" : null});
        if (this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)) {
            if (/relative/.test(this.element.css("position")) && c.browser.opera) {
                this.element.css({position:"relative",top:"auto",left:"auto"})
            }
            this.element.wrap(c('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")}));
            this.element = this.element.parent().data("resizable", this.element.data("resizable"));
            this.elementIsWrapper = true;
            this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")});
            this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0});
            this.originalResizeStyle = this.originalElement.css("resize");
            this.originalElement.css("resize", "none");
            this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"}));
            this.originalElement.css({margin:this.originalElement.css("margin")});
            this._proportionallyResize()
        }
        this.handles = j.handles || (!c(".ui-resizable-handle", this.element).length ? "e,s,se" : {n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"});
        if (this.handles.constructor == String) {
            if (this.handles == "all") {
                this.handles = "n,e,s,w,se,sw,ne,nw"
            }
            var k = this.handles.split(",");
            this.handles = {};
            for (var f = 0; f < k.length; f++) {
                var h = c.trim(k[f]),d = "ui-resizable-" + h;
                var g = c('<div class="ui-resizable-handle ' + d + '"></div>');
                if (/sw|se|ne|nw/.test(h)) {
                    g.css({zIndex:++j.zIndex})
                }
                if ("se" == h) {
                    g.addClass("ui-icon ui-icon-gripsmall-diagonal-se")
                }
                this.handles[h] = ".ui-resizable-" + h;
                this.element.append(g)
            }
        }
        this._renderAxis = function(p) {
            p = p || this.element;
            for (var m in this.handles) {
                if (this.handles[m].constructor == String) {
                    this.handles[m] = c(this.handles[m], this.element).show()
                }
                if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                    var n = c(this.handles[m], this.element),o = 0;
                    o = /sw|ne|nw|se|n|s/.test(m) ? n.outerHeight() : n.outerWidth();
                    var l = ["padding",/ne|nw|n/.test(m) ? "Top" : /se|sw|s/.test(m) ? "Bottom" : /^e$/.test(m) ? "Right" : "Left"].join("");
                    p.css(l, o);
                    this._proportionallyResize()
                }
                if (!c(this.handles[m]).length) {
                    continue
                }
            }
        };
        this._renderAxis(this.element);
        this._handles = c(".ui-resizable-handle", this.element).disableSelection();
        this._handles.mouseover(function() {
            if (!e.resizing) {
                if (this.className) {
                    var i = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)
                }
                e.axis = i && i[1] ? i[1] : "se"
            }
        });
        if (j.autoHide) {
            this._handles.hide();
            c(this.element).addClass("ui-resizable-autohide").hover(function() {
                c(this).removeClass("ui-resizable-autohide");
                e._handles.show()
            }, function() {
                if (!e.resizing) {
                    c(this).addClass("ui-resizable-autohide");
                    e._handles.hide()
                }
            })
        }
        this._mouseInit()
    },destroy:function() {
        this._mouseDestroy();
        var d = function(f) {
            c(f).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
        };
        if (this.elementIsWrapper) {
            d(this.element);
            var e = this.element;
            e.after(this.originalElement.css({position:e.css("position"),width:e.outerWidth(),height:e.outerHeight(),top:e.css("top"),left:e.css("left")})).remove()
        }
        this.originalElement.css("resize", this.originalResizeStyle);
        d(this.originalElement);
        return this
    },_mouseCapture:function(e) {
        var f = false;
        for (var d in this.handles) {
            if (c(this.handles[d])[0] == e.target) {
                f = true
            }
        }
        return !this.options.disabled && f
    },_mouseStart:function(f) {
        var i = this.options,e = this.element.position(),d = this.element;
        this.resizing = true;
        this.documentScroll = {top:c(document).scrollTop(),left:c(document).scrollLeft()};
        if (d.is(".ui-draggable") || (/absolute/).test(d.css("position"))) {
            d.css({position:"absolute",top:e.top,left:e.left})
        }
        if (c.browser.opera && (/relative/).test(d.css("position"))) {
            d.css({position:"relative",top:"auto",left:"auto"})
        }
        this._renderProxy();
        var j = b(this.helper.css("left")),g = b(this.helper.css("top"));
        if (i.containment) {
            j += c(i.containment).scrollLeft() || 0;
            g += c(i.containment).scrollTop() || 0
        }
        this.offset = this.helper.offset();
        this.position = {left:j,top:g};
        this.size = this._helper ? {width:d.outerWidth(),height:d.outerHeight()} : {width:d.width(),height:d.height()};
        this.originalSize = this._helper ? {width:d.outerWidth(),height:d.outerHeight()} : {width:d.width(),height:d.height()};
        this.originalPosition = {left:j,top:g};
        this.sizeDiff = {width:d.outerWidth() - d.width(),height:d.outerHeight() - d.height()};
        this.originalMousePosition = {left:f.pageX,top:f.pageY};
        this.aspectRatio = (typeof i.aspectRatio == "number") ? i.aspectRatio : ((this.originalSize.width / this.originalSize.height) || 1);
        var h = c(".ui-resizable-" + this.axis).css("cursor");
        c("body").css("cursor", h == "auto" ? this.axis + "-resize" : h);
        d.addClass("ui-resizable-resizing");
        this._propagate("start", f);
        return true
    },_mouseDrag:function(d) {
        var g = this.helper,f = this.options,l = {},p = this,i = this.originalMousePosition,m = this.axis;
        var q = (d.pageX - i.left) || 0,n = (d.pageY - i.top) || 0;
        var h = this._change[m];
        if (!h) {
            return false
        }
        var k = h.apply(this, [d,q,n]),j = c.browser.msie && c.browser.version < 7,e = this.sizeDiff;
        if (this._aspectRatio || d.shiftKey) {
            k = this._updateRatio(k, d)
        }
        k = this._respectSize(k, d);
        this._propagate("resize", d);
        g.css({top:this.position.top + "px",left:this.position.left + "px",width:this.size.width + "px",height:this.size.height + "px"});
        if (!this._helper && this._proportionallyResizeElements.length) {
            this._proportionallyResize()
        }
        this._updateCache(k);
        this._trigger("resize", d, this.ui());
        return false
    },_mouseStop:function(g) {
        this.resizing = false;
        var h = this.options,l = this;
        if (this._helper) {
            var f = this._proportionallyResizeElements,d = f.length && (/textarea/i).test(f[0].nodeName),e = d && c.ui.hasScroll(f[0], "left") ? 0 : l.sizeDiff.height,j = d ? 0 : l.sizeDiff.width;
            var m = {width:(l.size.width - j),height:(l.size.height - e)},i = (parseInt(l.element.css("left"), 10) + (l.position.left - l.originalPosition.left)) || null,k = (parseInt(l.element.css("top"), 10) + (l.position.top - l.originalPosition.top)) || null;
            if (!h.animate) {
                this.element.css(c.extend(m, {top:k,left:i}))
            }
            l.helper.height(l.size.height);
            l.helper.width(l.size.width);
            if (this._helper && !h.animate) {
                this._proportionallyResize()
            }
        }
        c("body").css("cursor", "auto");
        this.element.removeClass("ui-resizable-resizing");
        this._propagate("stop", g);
        if (this._helper) {
            this.helper.remove()
        }
        return false
    },_updateCache:function(d) {
        var e = this.options;
        this.offset = this.helper.offset();
        if (a(d.left)) {
            this.position.left = d.left
        }
        if (a(d.top)) {
            this.position.top = d.top
        }
        if (a(d.height)) {
            this.size.height = d.height
        }
        if (a(d.width)) {
            this.size.width = d.width
        }
    },_updateRatio:function(g, f) {
        var h = this.options,i = this.position,e = this.size,d = this.axis;
        if (g.height) {
            g.width = (e.height * this.aspectRatio)
        } else {
            if (g.width) {
                g.height = (e.width / this.aspectRatio)
            }
        }
        if (d == "sw") {
            g.left = i.left + (e.width - g.width);
            g.top = null
        }
        if (d == "nw") {
            g.top = i.top + (e.height - g.height);
            g.left = i.left + (e.width - g.width)
        }
        return g
    },_respectSize:function(k, f) {
        var i = this.helper,h = this.options,q = this._aspectRatio || f.shiftKey,p = this.axis,s = a(k.width) && h.maxWidth && (h.maxWidth < k.width),l = a(k.height) && h.maxHeight && (h.maxHeight < k.height),g = a(k.width) && h.minWidth && (h.minWidth > k.width),r = a(k.height) && h.minHeight && (h.minHeight > k.height);
        if (g) {
            k.width = h.minWidth
        }
        if (r) {
            k.height = h.minHeight
        }
        if (s) {
            k.width = h.maxWidth
        }
        if (l) {
            k.height = h.maxHeight
        }
        var e = this.originalPosition.left + this.originalSize.width,n = this.position.top + this.size.height;
        var j = /sw|nw|w/.test(p),d = /nw|ne|n/.test(p);
        if (g && j) {
            k.left = e - h.minWidth
        }
        if (s && j) {
            k.left = e - h.maxWidth
        }
        if (r && d) {
            k.top = n - h.minHeight
        }
        if (l && d) {
            k.top = n - h.maxHeight
        }
        var m = !k.width && !k.height;
        if (m && !k.left && k.top) {
            k.top = null
        } else {
            if (m && !k.top && k.left) {
                k.left = null
            }
        }
        return k
    },_proportionallyResize:function() {
        var j = this.options;
        if (!this._proportionallyResizeElements.length) {
            return
        }
        var f = this.helper || this.element;
        for (var e = 0; e < this._proportionallyResizeElements.length; e++) {
            var g = this._proportionallyResizeElements[e];
            if (!this.borderDif) {
                var d = [g.css("borderTopWidth"),g.css("borderRightWidth"),g.css("borderBottomWidth"),g.css("borderLeftWidth")],h = [g.css("paddingTop"),g.css("paddingRight"),g.css("paddingBottom"),g.css("paddingLeft")];
                this.borderDif = c.map(d, function(k, m) {
                    var l = parseInt(k, 10) || 0,n = parseInt(h[m], 10) || 0;
                    return l + n
                })
            }
            if (c.browser.msie && !(!(c(f).is(":hidden") || c(f).parents(":hidden").length))) {
                continue
            }
            g.css({height:(f.height() - this.borderDif[0] - this.borderDif[2]) || 0,width:(f.width() - this.borderDif[1] - this.borderDif[3]) || 0})
        }
    },_renderProxy:function() {
        var e = this.element,h = this.options;
        this.elementOffset = e.offset();
        if (this._helper) {
            this.helper = this.helper || c('<div style="overflow:hidden;"></div>');
            var d = c.browser.msie && c.browser.version < 7,f = (d ? 1 : 0),g = (d ? 2 : -1);
            this.helper.addClass(this._helper).css({width:this.element.outerWidth() + g,height:this.element.outerHeight() + g,position:"absolute",left:this.elementOffset.left - f + "px",top:this.elementOffset.top - f + "px",zIndex:++h.zIndex});
            this.helper.appendTo("body").disableSelection()
        } else {
            this.helper = this.element
        }
    },_change:{e:function(f, e, d) {
        return{width:this.originalSize.width + e}
    },w:function(g, e, d) {
        var i = this.options,f = this.originalSize,h = this.originalPosition;
        return{left:h.left + e,width:f.width - e}
    },n:function(g, e, d) {
        var i = this.options,f = this.originalSize,h = this.originalPosition;
        return{top:h.top + d,height:f.height - d}
    },s:function(f, e, d) {
        return{height:this.originalSize.height + d}
    },se:function(f, e, d) {
        return c.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [f,e,d]))
    },sw:function(f, e, d) {
        return c.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [f,e,d]))
    },ne:function(f, e, d) {
        return c.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [f,e,d]))
    },nw:function(f, e, d) {
        return c.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [f,e,d]))
    }},_propagate:function(e, d) {
        c.ui.plugin.call(this, e, [d,this.ui()]);
        (e != "resize" && this._trigger(e, d, this.ui()))
    },plugins:{},ui:function() {
        return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}
    }});
    c.extend(c.ui.resizable, {version:"1.8"});
    c.ui.plugin.add("resizable", "alsoResize", {start:function(e, f) {
        var d = c(this).data("resizable"),h = d.options;
        var g = function(i) {
            c(i).each(function() {
                c(this).data("resizable-alsoresize", {width:parseInt(c(this).width(), 10),height:parseInt(c(this).height(), 10),left:parseInt(c(this).css("left"), 10),top:parseInt(c(this).css("top"), 10)})
            })
        };
        if (typeof(h.alsoResize) == "object" && !h.alsoResize.parentNode) {
            if (h.alsoResize.length) {
                h.alsoResize = h.alsoResize[0];
                g(h.alsoResize)
            } else {
                c.each(h.alsoResize, function(i, j) {
                    g(i)
                })
            }
        } else {
            g(h.alsoResize)
        }
    },resize:function(f, h) {
        var e = c(this).data("resizable"),i = e.options,g = e.originalSize,k = e.originalPosition;
        var j = {height:(e.size.height - g.height) || 0,width:(e.size.width - g.width) || 0,top:(e.position.top - k.top) || 0,left:(e.position.left - k.left) || 0},d = function(l, m) {
            c(l).each(function() {
                var p = c(this),q = c(this).data("resizable-alsoresize"),o = {},n = m && m.length ? m : ["width","height","top","left"];
                c.each(n || ["width","height","top","left"], function(r, t) {
                    var s = (q[t] || 0) + (j[t] || 0);
                    if (s && s >= 0) {
                        o[t] = s || null
                    }
                });
                if (/relative/.test(p.css("position")) && c.browser.opera) {
                    e._revertToRelativePosition = true;
                    p.css({position:"absolute",top:"auto",left:"auto"})
                }
                p.css(o)
            })
        };
        if (typeof(i.alsoResize) == "object" && !i.alsoResize.nodeType) {
            c.each(i.alsoResize, function(l, m) {
                d(l, m)
            })
        } else {
            d(i.alsoResize)
        }
    },stop:function(e, f) {
        var d = c(this).data("resizable");
        if (d._revertToRelativePosition && c.browser.opera) {
            d._revertToRelativePosition = false;
            el.css({position:"relative"})
        }
        c(this).removeData("resizable-alsoresize-start")
    }});
    c.ui.plugin.add("resizable", "animate", {stop:function(h, m) {
        var n = c(this).data("resizable"),i = n.options;
        var g = n._proportionallyResizeElements,d = g.length && (/textarea/i).test(g[0].nodeName),e = d && c.ui.hasScroll(g[0], "left") ? 0 : n.sizeDiff.height,k = d ? 0 : n.sizeDiff.width;
        var f = {width:(n.size.width - k),height:(n.size.height - e)},j = (parseInt(n.element.css("left"), 10) + (n.position.left - n.originalPosition.left)) || null,l = (parseInt(n.element.css("top"), 10) + (n.position.top - n.originalPosition.top)) || null;
        n.element.animate(c.extend(f, l && j ? {top:l,left:j} : {}), {duration:i.animateDuration,easing:i.animateEasing,step:function() {
            var o = {width:parseInt(n.element.css("width"), 10),height:parseInt(n.element.css("height"), 10),top:parseInt(n.element.css("top"), 10),left:parseInt(n.element.css("left"), 10)};
            if (g && g.length) {
                c(g[0]).css({width:o.width,height:o.height})
            }
            n._updateCache(o);
            n._propagate("resize", h)
        }})
    }});
    c.ui.plugin.add("resizable", "containment", {start:function(e, q) {
        var s = c(this).data("resizable"),i = s.options,k = s.element;
        var f = i.containment,j = (f instanceof c) ? f.get(0) : (/parent/.test(f)) ? k.parent().get(0) : f;
        if (!j) {
            return
        }
        s.containerElement = c(j);
        if (/document/.test(f) || f == document) {
            s.containerOffset = {left:0,top:0};
            s.containerPosition = {left:0,top:0};
            s.parentData = {element:c(document),left:0,top:0,width:c(document).width(),height:c(document).height() || document.body.parentNode.scrollHeight}
        } else {
            var m = c(j),h = [];
            c(["Top","Right","Left","Bottom"]).each(function(p, o) {
                h[p] = b(m.css("padding" + o))
            });
            s.containerOffset = m.offset();
            s.containerPosition = m.position();
            s.containerSize = {height:(m.innerHeight() - h[3]),width:(m.innerWidth() - h[1])};
            var n = s.containerOffset,d = s.containerSize.height,l = s.containerSize.width,g = (c.ui.hasScroll(j, "left") ? j.scrollWidth : l),r = (c.ui.hasScroll(j) ? j.scrollHeight : d);
            s.parentData = {element:j,left:n.left,top:n.top,width:g,height:r}
        }
    },resize:function(f, p) {
        var s = c(this).data("resizable"),h = s.options,e = s.containerSize,n = s.containerOffset,l = s.size,m = s.position,q = s._aspectRatio || f.shiftKey,d = {top:0,left:0},g = s.containerElement;
        if (g[0] != document && (/static/).test(g.css("position"))) {
            d = n
        }
        if (m.left < (s._helper ? n.left : 0)) {
            s.size.width = s.size.width + (s._helper ? (s.position.left - n.left) : (s.position.left - d.left));
            if (q) {
                s.size.height = s.size.width / h.aspectRatio
            }
            s.position.left = h.helper ? n.left : 0
        }
        if (m.top < (s._helper ? n.top : 0)) {
            s.size.height = s.size.height + (s._helper ? (s.position.top - n.top) : s.position.top);
            if (q) {
                s.size.width = s.size.height * h.aspectRatio
            }
            s.position.top = s._helper ? n.top : 0
        }
        s.offset.left = s.parentData.left + s.position.left;
        s.offset.top = s.parentData.top + s.position.top;
        var k = Math.abs((s._helper ? s.offset.left - d.left : (s.offset.left - d.left)) + s.sizeDiff.width),r = Math.abs((s._helper ? s.offset.top - d.top : (s.offset.top - n.top)) + s.sizeDiff.height);
        var j = s.containerElement.get(0) == s.element.parent().get(0),i = /relative|absolute/.test(s.containerElement.css("position"));
        if (j && i) {
            k -= s.parentData.left
        }
        if (k + s.size.width >= s.parentData.width) {
            s.size.width = s.parentData.width - k;
            if (q) {
                s.size.height = s.size.width / s.aspectRatio
            }
        }
        if (r + s.size.height >= s.parentData.height) {
            s.size.height = s.parentData.height - r;
            if (q) {
                s.size.width = s.size.height * s.aspectRatio
            }
        }
    },stop:function(e, m) {
        var p = c(this).data("resizable"),f = p.options,k = p.position,l = p.containerOffset,d = p.containerPosition,g = p.containerElement;
        var i = c(p.helper),q = i.offset(),n = i.outerWidth() - p.sizeDiff.width,j = i.outerHeight() - p.sizeDiff.height;
        if (p._helper && !f.animate && (/relative/).test(g.css("position"))) {
            c(this).css({left:q.left - d.left - l.left,width:n,height:j})
        }
        if (p._helper && !f.animate && (/static/).test(g.css("position"))) {
            c(this).css({left:q.left - d.left - l.left,width:n,height:j})
        }
    }});
    c.ui.plugin.add("resizable", "ghost", {start:function(f, g) {
        var d = c(this).data("resizable"),h = d.options,e = d.size;
        d.ghost = d.originalElement.clone();
        d.ghost.css({opacity:0.25,display:"block",position:"relative",height:e.height,width:e.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof h.ghost == "string" ? h.ghost : "");
        d.ghost.appendTo(d.helper)
    },resize:function(e, f) {
        var d = c(this).data("resizable"),g = d.options;
        if (d.ghost) {
            d.ghost.css({position:"relative",height:d.size.height,width:d.size.width})
        }
    },stop:function(e, f) {
        var d = c(this).data("resizable"),g = d.options;
        if (d.ghost && d.helper) {
            d.helper.get(0).removeChild(d.ghost.get(0))
        }
    }});
    c.ui.plugin.add("resizable", "grid", {resize:function(d, l) {
        var n = c(this).data("resizable"),g = n.options,j = n.size,h = n.originalSize,i = n.originalPosition,m = n.axis,k = g._aspectRatio || d.shiftKey;
        g.grid = typeof g.grid == "number" ? [g.grid,g.grid] : g.grid;
        var f = Math.round((j.width - h.width) / (g.grid[0] || 1)) * (g.grid[0] || 1),e = Math.round((j.height - h.height) / (g.grid[1] || 1)) * (g.grid[1] || 1);
        if (/^(se|s|e)$/.test(m)) {
            n.size.width = h.width + f;
            n.size.height = h.height + e
        } else {
            if (/^(ne)$/.test(m)) {
                n.size.width = h.width + f;
                n.size.height = h.height + e;
                n.position.top = i.top - e
            } else {
                if (/^(sw)$/.test(m)) {
                    n.size.width = h.width + f;
                    n.size.height = h.height + e;
                    n.position.left = i.left - f
                } else {
                    n.size.width = h.width + f;
                    n.size.height = h.height + e;
                    n.position.top = i.top - e;
                    n.position.left = i.left - f
                }
            }
        }
    }});
    var b = function(d) {
        return parseInt(d, 10) || 0
    };
    var a = function(d) {
        return !isNaN(parseInt(d, 10))
    }
})(jQuery);
;
/*
 * jQuery UI Selectable 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Selectables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(a) {
    a.widget("ui.selectable", a.ui.mouse, {options:{appendTo:"body",autoRefresh:true,distance:0,filter:"*",tolerance:"touch"},_create:function() {
        var b = this;
        this.element.addClass("ui-selectable");
        this.dragged = false;
        var c;
        this.refresh = function() {
            c = a(b.options.filter, b.element[0]);
            c.each(function() {
                var d = a(this);
                var e = d.offset();
                a.data(this, "selectable-item", {element:this,$element:d,left:e.left,top:e.top,right:e.left + d.outerWidth(),bottom:e.top + d.outerHeight(),startselected:false,selected:d.hasClass("ui-selected"),selecting:d.hasClass("ui-selecting"),unselecting:d.hasClass("ui-unselecting")})
            })
        };
        this.refresh();
        this.selectees = c.addClass("ui-selectee");
        this._mouseInit();
        this.helper = a(document.createElement("div")).css({border:"1px dotted black"}).addClass("ui-selectable-helper")
    },destroy:function() {
        this.selectees.removeClass("ui-selectee").removeData("selectable-item");
        this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable");
        this._mouseDestroy();
        return this
    },_mouseStart:function(d) {
        var b = this;
        this.opos = [d.pageX,d.pageY];
        if (this.options.disabled) {
            return
        }
        var c = this.options;
        this.selectees = a(c.filter, this.element[0]);
        this._trigger("start", d);
        a(c.appendTo).append(this.helper);
        this.helper.css({"z-index":100,position:"absolute",left:d.clientX,top:d.clientY,width:0,height:0});
        if (c.autoRefresh) {
            this.refresh()
        }
        this.selectees.filter(".ui-selected").each(function() {
            var e = a.data(this, "selectable-item");
            e.startselected = true;
            if (!d.metaKey) {
                e.$element.removeClass("ui-selected");
                e.selected = false;
                e.$element.addClass("ui-unselecting");
                e.unselecting = true;
                b._trigger("unselecting", d, {unselecting:e.element})
            }
        });
        a(d.target).parents().andSelf().each(function() {
            var e = a.data(this, "selectable-item");
            if (e) {
                e.$element.removeClass("ui-unselecting").addClass("ui-selecting");
                e.unselecting = false;
                e.selecting = true;
                e.selected = true;
                b._trigger("selecting", d, {selecting:e.element});
                return false
            }
        })
    },_mouseDrag:function(i) {
        var c = this;
        this.dragged = true;
        if (this.options.disabled) {
            return
        }
        var e = this.options;
        var d = this.opos[0],h = this.opos[1],b = i.pageX,g = i.pageY;
        if (d > b) {
            var f = b;
            b = d;
            d = f
        }
        if (h > g) {
            var f = g;
            g = h;
            h = f
        }
        this.helper.css({left:d,top:h,width:b - d,height:g - h});
        this.selectees.each(function() {
            var j = a.data(this, "selectable-item");
            if (!j || j.element == c.element[0]) {
                return
            }
            var k = false;
            if (e.tolerance == "touch") {
                k = (!(j.left > b || j.right < d || j.top > g || j.bottom < h))
            } else {
                if (e.tolerance == "fit") {
                    k = (j.left > d && j.right < b && j.top > h && j.bottom < g)
                }
            }
            if (k) {
                if (j.selected) {
                    j.$element.removeClass("ui-selected");
                    j.selected = false
                }
                if (j.unselecting) {
                    j.$element.removeClass("ui-unselecting");
                    j.unselecting = false
                }
                if (!j.selecting) {
                    j.$element.addClass("ui-selecting");
                    j.selecting = true;
                    c._trigger("selecting", i, {selecting:j.element})
                }
            } else {
                if (j.selecting) {
                    if (i.metaKey && j.startselected) {
                        j.$element.removeClass("ui-selecting");
                        j.selecting = false;
                        j.$element.addClass("ui-selected");
                        j.selected = true
                    } else {
                        j.$element.removeClass("ui-selecting");
                        j.selecting = false;
                        if (j.startselected) {
                            j.$element.addClass("ui-unselecting");
                            j.unselecting = true
                        }
                        c._trigger("unselecting", i, {unselecting:j.element})
                    }
                }
                if (j.selected) {
                    if (!i.metaKey && !j.startselected) {
                        j.$element.removeClass("ui-selected");
                        j.selected = false;
                        j.$element.addClass("ui-unselecting");
                        j.unselecting = true;
                        c._trigger("unselecting", i, {unselecting:j.element})
                    }
                }
            }
        });
        return false
    },_mouseStop:function(d) {
        var b = this;
        this.dragged = false;
        var c = this.options;
        a(".ui-unselecting", this.element[0]).each(function() {
            var e = a.data(this, "selectable-item");
            e.$element.removeClass("ui-unselecting");
            e.unselecting = false;
            e.startselected = false;
            b._trigger("unselected", d, {unselected:e.element})
        });
        a(".ui-selecting", this.element[0]).each(function() {
            var e = a.data(this, "selectable-item");
            e.$element.removeClass("ui-selecting").addClass("ui-selected");
            e.selecting = false;
            e.selected = true;
            e.startselected = true;
            b._trigger("selected", d, {selected:e.element})
        });
        this._trigger("stop", d);
        this.helper.remove();
        return false
    }});
    a.extend(a.ui.selectable, {version:"1.8"})
})(jQuery);
;
/*
 * jQuery UI Sortable 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Sortables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(a) {
    a.widget("ui.sortable", a.ui.mouse, {widgetEventPrefix:"sort",options:{appendTo:"parent",axis:false,connectWith:false,containment:false,cursor:"auto",cursorAt:false,dropOnEmpty:true,forcePlaceholderSize:false,forceHelperSize:false,grid:false,handle:false,helper:"original",items:"> *",opacity:false,placeholder:false,revert:false,scroll:true,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1000},_create:function() {
        var b = this.options;
        this.containerCache = {};
        this.element.addClass("ui-sortable");
        this.refresh();
        this.floating = this.items.length ? (/left|right/).test(this.items[0].item.css("float")) : false;
        this.offset = this.element.offset();
        this._mouseInit()
    },destroy:function() {
        this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");
        this._mouseDestroy();
        for (var b = this.items.length - 1; b >= 0; b--) {
            this.items[b].item.removeData("sortable-item")
        }
        return this
    },_mouseCapture:function(e, f) {
        if (this.reverting) {
            return false
        }
        if (this.options.disabled || this.options.type == "static") {
            return false
        }
        this._refreshItems(e);
        var d = null,c = this,b = a(e.target).parents().each(function() {
            if (a.data(this, "sortable-item") == c) {
                d = a(this);
                return false
            }
        });
        if (a.data(e.target, "sortable-item") == c) {
            d = a(e.target)
        }
        if (!d) {
            return false
        }
        if (this.options.handle && !f) {
            var g = false;
            a(this.options.handle, d).find("*").andSelf().each(function() {
                if (this == e.target) {
                    g = true
                }
            });
            if (!g) {
                return false
            }
        }
        this.currentItem = d;
        this._removeCurrentsFromItems();
        return true
    },_mouseStart:function(e, f, b) {
        var g = this.options,c = this;
        this.currentContainer = this;
        this.refreshPositions();
        this.helper = this._createHelper(e);
        this._cacheHelperProportions();
        this._cacheMargins();
        this.scrollParent = this.helper.scrollParent();
        this.offset = this.currentItem.offset();
        this.offset = {top:this.offset.top - this.margins.top,left:this.offset.left - this.margins.left};
        this.helper.css("position", "absolute");
        this.cssPosition = this.helper.css("position");
        a.extend(this.offset, {click:{left:e.pageX - this.offset.left,top:e.pageY - this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});
        this.originalPosition = this._generatePosition(e);
        this.originalPageX = e.pageX;
        this.originalPageY = e.pageY;
        (g.cursorAt && this._adjustOffsetFromHelper(g.cursorAt));
        this.domPosition = {prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]};
        if (this.helper[0] != this.currentItem[0]) {
            this.currentItem.hide()
        }
        this._createPlaceholder();
        if (g.containment) {
            this._setContainment()
        }
        if (g.cursor) {
            if (a("body").css("cursor")) {
                this._storedCursor = a("body").css("cursor")
            }
            a("body").css("cursor", g.cursor)
        }
        if (g.opacity) {
            if (this.helper.css("opacity")) {
                this._storedOpacity = this.helper.css("opacity")
            }
            this.helper.css("opacity", g.opacity)
        }
        if (g.zIndex) {
            if (this.helper.css("zIndex")) {
                this._storedZIndex = this.helper.css("zIndex")
            }
            this.helper.css("zIndex", g.zIndex)
        }
        if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
            this.overflowOffset = this.scrollParent.offset()
        }
        this._trigger("start", e, this._uiHash());
        if (!this._preserveHelperProportions) {
            this._cacheHelperProportions()
        }
        if (!b) {
            for (var d = this.containers.length - 1; d >= 0; d--) {
                this.containers[d]._trigger("activate", e, c._uiHash(this))
            }
        }
        if (a.ui.ddmanager) {
            a.ui.ddmanager.current = this
        }
        if (a.ui.ddmanager && !g.dropBehaviour) {
            a.ui.ddmanager.prepareOffsets(this, e)
        }
        this.dragging = true;
        this.helper.addClass("ui-sortable-helper");
        this._mouseDrag(e);
        return true
    },_mouseDrag:function(f) {
        this.position = this._generatePosition(f);
        this.positionAbs = this._convertPositionTo("absolute");
        if (!this.lastPositionAbs) {
            this.lastPositionAbs = this.positionAbs
        }
        if (this.options.scroll) {
            var g = this.options,b = false;
            if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
                if ((this.overflowOffset.top + this.scrollParent[0].offsetHeight) - f.pageY < g.scrollSensitivity) {
                    this.scrollParent[0].scrollTop = b = this.scrollParent[0].scrollTop + g.scrollSpeed
                } else {
                    if (f.pageY - this.overflowOffset.top < g.scrollSensitivity) {
                        this.scrollParent[0].scrollTop = b = this.scrollParent[0].scrollTop - g.scrollSpeed
                    }
                }
                if ((this.overflowOffset.left + this.scrollParent[0].offsetWidth) - f.pageX < g.scrollSensitivity) {
                    this.scrollParent[0].scrollLeft = b = this.scrollParent[0].scrollLeft + g.scrollSpeed
                } else {
                    if (f.pageX - this.overflowOffset.left < g.scrollSensitivity) {
                        this.scrollParent[0].scrollLeft = b = this.scrollParent[0].scrollLeft - g.scrollSpeed
                    }
                }
            } else {
                if (f.pageY - a(document).scrollTop() < g.scrollSensitivity) {
                    b = a(document).scrollTop(a(document).scrollTop() - g.scrollSpeed)
                } else {
                    if (a(window).height() - (f.pageY - a(document).scrollTop()) < g.scrollSensitivity) {
                        b = a(document).scrollTop(a(document).scrollTop() + g.scrollSpeed)
                    }
                }
                if (f.pageX - a(document).scrollLeft() < g.scrollSensitivity) {
                    b = a(document).scrollLeft(a(document).scrollLeft() - g.scrollSpeed)
                } else {
                    if (a(window).width() - (f.pageX - a(document).scrollLeft()) < g.scrollSensitivity) {
                        b = a(document).scrollLeft(a(document).scrollLeft() + g.scrollSpeed)
                    }
                }
            }
            if (b !== false && a.ui.ddmanager && !g.dropBehaviour) {
                a.ui.ddmanager.prepareOffsets(this, f)
            }
        }
        this.positionAbs = this._convertPositionTo("absolute");
        if (!this.options.axis || this.options.axis != "y") {
            this.helper[0].style.left = this.position.left + "px"
        }
        if (!this.options.axis || this.options.axis != "x") {
            this.helper[0].style.top = this.position.top + "px"
        }
        for (var d = this.items.length - 1; d >= 0; d--) {
            var e = this.items[d],c = e.item[0],h = this._intersectsWithPointer(e);
            if (!h) {
                continue
            }
            if (c != this.currentItem[0] && this.placeholder[h == 1 ? "next" : "prev"]()[0] != c && !a.ui.contains(this.placeholder[0], c) && (this.options.type == "semi-dynamic" ? !a.ui.contains(this.element[0], c) : true)) {
                this.direction = h == 1 ? "down" : "up";
                if (this.options.tolerance == "pointer" || this._intersectsWithSides(e)) {
                    this._rearrange(f, e)
                } else {
                    break
                }
                this._trigger("change", f, this._uiHash());
                break
            }
        }
        this._contactContainers(f);
        if (a.ui.ddmanager) {
            a.ui.ddmanager.drag(this, f)
        }
        this._trigger("sort", f, this._uiHash());
        this.lastPositionAbs = this.positionAbs;
        return false
    },_mouseStop:function(c, d) {
        if (!c) {
            return
        }
        if (a.ui.ddmanager && !this.options.dropBehaviour) {
            a.ui.ddmanager.drop(this, c)
        }
        if (this.options.revert) {
            var b = this;
            var e = b.placeholder.offset();
            b.reverting = true;
            a(this.helper).animate({left:e.left - this.offset.parent.left - b.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),top:e.top - this.offset.parent.top - b.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)}, parseInt(this.options.revert, 10) || 500, function() {
                b._clear(c)
            })
        } else {
            this._clear(c, d)
        }
        return false
    },cancel:function() {
        var b = this;
        if (this.dragging) {
            this._mouseUp();
            if (this.options.helper == "original") {
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else {
                this.currentItem.show()
            }
            for (var c = this.containers.length - 1; c >= 0; c--) {
                this.containers[c]._trigger("deactivate", null, b._uiHash(this));
                if (this.containers[c].containerCache.over) {
                    this.containers[c]._trigger("out", null, b._uiHash(this));
                    this.containers[c].containerCache.over = 0
                }
            }
        }
        if (this.placeholder[0].parentNode) {
            this.placeholder[0].parentNode.removeChild(this.placeholder[0])
        }
        if (this.options.helper != "original" && this.helper && this.helper[0].parentNode) {
            this.helper.remove()
        }
        a.extend(this, {helper:null,dragging:false,reverting:false,_noFinalSort:null});
        if (this.domPosition.prev) {
            a(this.domPosition.prev).after(this.currentItem)
        } else {
            a(this.domPosition.parent).prepend(this.currentItem)
        }
        return this
    },serialize:function(d) {
        var b = this._getItemsAsjQuery(d && d.connected);
        var c = [];
        d = d || {};
        a(b).each(function() {
            var e = (a(d.item || this).attr(d.attribute || "id") || "").match(d.expression || (/(.+)[-=_](.+)/));
            if (e) {
                c.push((d.key || e[1] + "[]") + "=" + (d.key && d.expression ? e[1] : e[2]))
            }
        });
        return c.join("&")
    },toArray:function(d) {
        var b = this._getItemsAsjQuery(d && d.connected);
        var c = [];
        d = d || {};
        b.each(function() {
            c.push(a(d.item || this).attr(d.attribute || "id") || "")
        });
        return c
    },_intersectsWith:function(m) {
        var e = this.positionAbs.left,d = e + this.helperProportions.width,k = this.positionAbs.top,j = k + this.helperProportions.height;
        var f = m.left,c = f + m.width,n = m.top,i = n + m.height;
        var o = this.offset.click.top,h = this.offset.click.left;
        var g = (k + o) > n && (k + o) < i && (e + h) > f && (e + h) < c;
        if (this.options.tolerance == "pointer" || this.options.forcePointerForContainers || (this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width" : "height"] > m[this.floating ? "width" : "height"])) {
            return g
        } else {
            return(f < e + (this.helperProportions.width / 2) && d - (this.helperProportions.width / 2) < c && n < k + (this.helperProportions.height / 2) && j - (this.helperProportions.height / 2) < i)
        }
    },_intersectsWithPointer:function(d) {
        var e = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, d.top, d.height),c = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, d.left, d.width),g = e && c,b = this._getDragVerticalDirection(),f = this._getDragHorizontalDirection();
        if (!g) {
            return false
        }
        return this.floating ? (((f && f == "right") || b == "down") ? 2 : 1) : (b && (b == "down" ? 2 : 1))
    },_intersectsWithSides:function(e) {
        var c = a.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, e.top + (e.height / 2), e.height),d = a.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, e.left + (e.width / 2), e.width),b = this._getDragVerticalDirection(),f = this._getDragHorizontalDirection();
        if (this.floating && f) {
            return((f == "right" && d) || (f == "left" && !d))
        } else {
            return b && ((b == "down" && c) || (b == "up" && !c))
        }
    },_getDragVerticalDirection:function() {
        var b = this.positionAbs.top - this.lastPositionAbs.top;
        return b != 0 && (b > 0 ? "down" : "up")
    },_getDragHorizontalDirection:function() {
        var b = this.positionAbs.left - this.lastPositionAbs.left;
        return b != 0 && (b > 0 ? "right" : "left")
    },refresh:function(b) {
        this._refreshItems(b);
        this.refreshPositions();
        return this
    },_connectWith:function() {
        var b = this.options;
        return b.connectWith.constructor == String ? [b.connectWith] : b.connectWith
    },_getItemsAsjQuery:function(b) {
        var l = this;
        var g = [];
        var e = [];
        var h = this._connectWith();
        if (h && b) {
            for (var d = h.length - 1; d >= 0; d--) {
                var k = a(h[d]);
                for (var c = k.length - 1; c >= 0; c--) {
                    var f = a.data(k[c], "sortable");
                    if (f && f != this && !f.options.disabled) {
                        e.push([a.isFunction(f.options.items) ? f.options.items.call(f.element) : a(f.options.items, f.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),f])
                    }
                }
            }
        }
        e.push([a.isFunction(this.options.items) ? this.options.items.call(this.element, null, {options:this.options,item:this.currentItem}) : a(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]);
        for (var d = e.length - 1; d >= 0; d--) {
            e[d][0].each(function() {
                g.push(this)
            })
        }
        return a(g)
    },_removeCurrentsFromItems:function() {
        var d = this.currentItem.find(":data(sortable-item)");
        for (var c = 0; c < this.items.length; c++) {
            for (var b = 0; b < d.length; b++) {
                if (d[b] == this.items[c].item[0]) {
                    this.items.splice(c, 1)
                }
            }
        }
    },_refreshItems:function(b) {
        this.items = [];
        this.containers = [this];
        var h = this.items;
        var p = this;
        var f = [
            [a.isFunction(this.options.items) ? this.options.items.call(this.element[0], b, {item:this.currentItem}) : a(this.options.items, this.element),this]
        ];
        var l = this._connectWith();
        if (l) {
            for (var e = l.length - 1; e >= 0; e--) {
                var m = a(l[e]);
                for (var d = m.length - 1; d >= 0; d--) {
                    var g = a.data(m[d], "sortable");
                    if (g && g != this && !g.options.disabled) {
                        f.push([a.isFunction(g.options.items) ? g.options.items.call(g.element[0], b, {item:this.currentItem}) : a(g.options.items, g.element),g]);
                        this.containers.push(g)
                    }
                }
            }
        }
        for (var e = f.length - 1; e >= 0; e--) {
            var k = f[e][1];
            var c = f[e][0];
            for (var d = 0,n = c.length; d < n; d++) {
                var o = a(c[d]);
                o.data("sortable-item", k);
                h.push({item:o,instance:k,width:0,height:0,left:0,top:0})
            }
        }
    },refreshPositions:function(b) {
        if (this.offsetParent && this.helper) {
            this.offset.parent = this._getParentOffset()
        }
        for (var d = this.items.length - 1; d >= 0; d--) {
            var e = this.items[d];
            var c = this.options.toleranceElement ? a(this.options.toleranceElement, e.item) : e.item;
            if (!b) {
                e.width = c.outerWidth();
                e.height = c.outerHeight()
            }
            var f = c.offset();
            e.left = f.left;
            e.top = f.top
        }
        if (this.options.custom && this.options.custom.refreshContainers) {
            this.options.custom.refreshContainers.call(this)
        } else {
            for (var d = this.containers.length - 1; d >= 0; d--) {
                var f = this.containers[d].element.offset();
                this.containers[d].containerCache.left = f.left;
                this.containers[d].containerCache.top = f.top;
                this.containers[d].containerCache.width = this.containers[d].element.outerWidth();
                this.containers[d].containerCache.height = this.containers[d].element.outerHeight()
            }
        }
        return this
    },_createPlaceholder:function(d) {
        var b = d || this,e = b.options;
        if (!e.placeholder || e.placeholder.constructor == String) {
            var c = e.placeholder;
            e.placeholder = {element:function() {
                var f = a(document.createElement(b.currentItem[0].nodeName)).addClass(c || b.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
                if (!c) {
                    f.style.visibility = "hidden"
                }
                return f
            },update:function(f, g) {
                if (c && !e.forcePlaceholderSize) {
                    return
                }
                if (!g.height()) {
                    g.height(b.currentItem.innerHeight() - parseInt(b.currentItem.css("paddingTop") || 0, 10) - parseInt(b.currentItem.css("paddingBottom") || 0, 10))
                }
                if (!g.width()) {
                    g.width(b.currentItem.innerWidth() - parseInt(b.currentItem.css("paddingLeft") || 0, 10) - parseInt(b.currentItem.css("paddingRight") || 0, 10))
                }
            }}
        }
        b.placeholder = a(e.placeholder.element.call(b.element, b.currentItem));
        b.currentItem.after(b.placeholder);
        e.placeholder.update(b, b.placeholder)
    },_contactContainers:function(b) {
        var d = null,k = null;
        for (var f = this.containers.length - 1; f >= 0; f--) {
            if (a.ui.contains(this.currentItem[0], this.containers[f].element[0])) {
                continue
            }
            if (this._intersectsWith(this.containers[f].containerCache)) {
                if (d && a.ui.contains(this.containers[f].element[0], d.element[0])) {
                    continue
                }
                d = this.containers[f];
                k = f
            } else {
                if (this.containers[f].containerCache.over) {
                    this.containers[f]._trigger("out", b, this._uiHash(this));
                    this.containers[f].containerCache.over = 0
                }
            }
        }
        if (!d) {
            return
        }
        if (this.containers.length === 1) {
            this.containers[k]._trigger("over", b, this._uiHash(this));
            this.containers[k].containerCache.over = 1
        } else {
            if (this.currentContainer != this.containers[k]) {
                var h = 10000;
                var g = null;
                var c = this.positionAbs[this.containers[k].floating ? "left" : "top"];
                for (var e = this.items.length - 1; e >= 0; e--) {
                    if (!a.ui.contains(this.containers[k].element[0], this.items[e].item[0])) {
                        continue
                    }
                    var l = this.items[e][this.containers[k].floating ? "left" : "top"];
                    if (Math.abs(l - c) < h) {
                        h = Math.abs(l - c);
                        g = this.items[e]
                    }
                }
                if (!g && !this.options.dropOnEmpty) {
                    return
                }
                this.currentContainer = this.containers[k];
                g ? this._rearrange(b, g, null, true) : this._rearrange(b, null, this.containers[k].element, true);
                this._trigger("change", b, this._uiHash());
                this.containers[k]._trigger("change", b, this._uiHash(this));
                this.options.placeholder.update(this.currentContainer, this.placeholder);
                this.containers[k]._trigger("over", b, this._uiHash(this));
                this.containers[k].containerCache.over = 1
            }
        }
    },_createHelper:function(c) {
        var d = this.options;
        var b = a.isFunction(d.helper) ? a(d.helper.apply(this.element[0], [c,this.currentItem])) : (d.helper == "clone" ? this.currentItem.clone() : this.currentItem);
        if (!b.parents("body").length) {
            a(d.appendTo != "parent" ? d.appendTo : this.currentItem[0].parentNode)[0].appendChild(b[0])
        }
        if (b[0] == this.currentItem[0]) {
            this._storedCSS = {width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}
        }
        if (b[0].style.width == "" || d.forceHelperSize) {
            b.width(this.currentItem.width())
        }
        if (b[0].style.height == "" || d.forceHelperSize) {
            b.height(this.currentItem.height())
        }
        return b
    },_adjustOffsetFromHelper:function(b) {
        if (typeof b == "string") {
            b = b.split(" ")
        }
        if (a.isArray(b)) {
            b = {left:+b[0],top:+b[1] || 0}
        }
        if ("left" in b) {
            this.offset.click.left = b.left + this.margins.left
        }
        if ("right" in b) {
            this.offset.click.left = this.helperProportions.width - b.right + this.margins.left
        }
        if ("top" in b) {
            this.offset.click.top = b.top + this.margins.top
        }
        if ("bottom" in b) {
            this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top
        }
    },_getParentOffset:function() {
        this.offsetParent = this.helper.offsetParent();
        var b = this.offsetParent.offset();
        if (this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
            b.left += this.scrollParent.scrollLeft();
            b.top += this.scrollParent.scrollTop()
        }
        if ((this.offsetParent[0] == document.body) || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie)) {
            b = {top:0,left:0}
        }
        return{top:b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),left:b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)}
    },_getRelativeOffset:function() {
        if (this.cssPosition == "relative") {
            var b = this.currentItem.position();
            return{top:b.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),left:b.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()}
        } else {
            return{top:0,left:0}
        }
    },_cacheMargins:function() {
        this.margins = {left:(parseInt(this.currentItem.css("marginLeft"), 10) || 0),top:(parseInt(this.currentItem.css("marginTop"), 10) || 0)}
    },_cacheHelperProportions:function() {
        this.helperProportions = {width:this.helper.outerWidth(),height:this.helper.outerHeight()}
    },_setContainment:function() {
        var e = this.options;
        if (e.containment == "parent") {
            e.containment = this.helper[0].parentNode
        }
        if (e.containment == "document" || e.containment == "window") {
            this.containment = [0 - this.offset.relative.left - this.offset.parent.left,0 - this.offset.relative.top - this.offset.parent.top,a(e.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left,(a(e.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
        }
        if (!(/^(document|window|parent)$/).test(e.containment)) {
            var c = a(e.containment)[0];
            var d = a(e.containment).offset();
            var b = (a(c).css("overflow") != "hidden");
            this.containment = [d.left + (parseInt(a(c).css("borderLeftWidth"), 10) || 0) + (parseInt(a(c).css("paddingLeft"), 10) || 0) - this.margins.left,d.top + (parseInt(a(c).css("borderTopWidth"), 10) || 0) + (parseInt(a(c).css("paddingTop"), 10) || 0) - this.margins.top,d.left + (b ? Math.max(c.scrollWidth, c.offsetWidth) : c.offsetWidth) - (parseInt(a(c).css("borderLeftWidth"), 10) || 0) - (parseInt(a(c).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left,d.top + (b ? Math.max(c.scrollHeight, c.offsetHeight) : c.offsetHeight) - (parseInt(a(c).css("borderTopWidth"), 10) || 0) - (parseInt(a(c).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
        }
    },_convertPositionTo:function(f, h) {
        if (!h) {
            h = this.position
        }
        var c = f == "absolute" ? 1 : -1;
        var e = this.options,b = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,g = (/(html|body)/i).test(b[0].tagName);
        return{top:(h.top + this.offset.relative.top * c + this.offset.parent.top * c - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (g ? 0 : b.scrollTop())) * c)),left:(h.left + this.offset.relative.left * c + this.offset.parent.left * c - (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : b.scrollLeft()) * c))}
    },_generatePosition:function(e) {
        var h = this.options,b = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,i = (/(html|body)/i).test(b[0].tagName);
        if (this.cssPosition == "relative" && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0])) {
            this.offset.relative = this._getRelativeOffset()
        }
        var d = e.pageX;
        var c = e.pageY;
        if (this.originalPosition) {
            if (this.containment) {
                if (e.pageX - this.offset.click.left < this.containment[0]) {
                    d = this.containment[0] + this.offset.click.left
                }
                if (e.pageY - this.offset.click.top < this.containment[1]) {
                    c = this.containment[1] + this.offset.click.top
                }
                if (e.pageX - this.offset.click.left > this.containment[2]) {
                    d = this.containment[2] + this.offset.click.left
                }
                if (e.pageY - this.offset.click.top > this.containment[3]) {
                    c = this.containment[3] + this.offset.click.top
                }
            }
            if (h.grid) {
                var g = this.originalPageY + Math.round((c - this.originalPageY) / h.grid[1]) * h.grid[1];
                c = this.containment ? (!(g - this.offset.click.top < this.containment[1] || g - this.offset.click.top > this.containment[3]) ? g : (!(g - this.offset.click.top < this.containment[1]) ? g - h.grid[1] : g + h.grid[1])) : g;
                var f = this.originalPageX + Math.round((d - this.originalPageX) / h.grid[0]) * h.grid[0];
                d = this.containment ? (!(f - this.offset.click.left < this.containment[0] || f - this.offset.click.left > this.containment[2]) ? f : (!(f - this.offset.click.left < this.containment[0]) ? f - h.grid[0] : f + h.grid[0])) : f
            }
        }
        return{top:(c - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (i ? 0 : b.scrollTop())))),left:(d - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : b.scrollLeft())))}
    },_rearrange:function(g, f, c, e) {
        c ? c[0].appendChild(this.placeholder[0]) : f.item[0].parentNode.insertBefore(this.placeholder[0], (this.direction == "down" ? f.item[0] : f.item[0].nextSibling));
        this.counter = this.counter ? ++this.counter : 1;
        var d = this,b = this.counter;
        window.setTimeout(function() {
            if (b == d.counter) {
                d.refreshPositions(!e)
            }
        }, 0)
    },_clear:function(d, e) {
        this.reverting = false;
        var f = [],b = this;
        if (!this._noFinalSort && this.currentItem[0].parentNode) {
            this.placeholder.before(this.currentItem)
        }
        this._noFinalSort = null;
        if (this.helper[0] == this.currentItem[0]) {
            for (var c in this._storedCSS) {
                if (this._storedCSS[c] == "auto" || this._storedCSS[c] == "static") {
                    this._storedCSS[c] = ""
                }
            }
            this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
        } else {
            this.currentItem.show()
        }
        if (this.fromOutside && !e) {
            f.push(function(g) {
                this._trigger("receive", g, this._uiHash(this.fromOutside))
            })
        }
        if ((this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !e) {
            f.push(function(g) {
                this._trigger("update", g, this._uiHash())
            })
        }
        if (!a.ui.contains(this.element[0], this.currentItem[0])) {
            if (!e) {
                f.push(function(g) {
                    this._trigger("remove", g, this._uiHash())
                })
            }
            for (var c = this.containers.length - 1; c >= 0; c--) {
                if (a.ui.contains(this.containers[c].element[0], this.currentItem[0]) && !e) {
                    f.push((function(g) {
                        return function(h) {
                            g._trigger("receive", h, this._uiHash(this))
                        }
                    }).call(this, this.containers[c]));
                    f.push((function(g) {
                        return function(h) {
                            g._trigger("update", h, this._uiHash(this))
                        }
                    }).call(this, this.containers[c]))
                }
            }
        }
        for (var c = this.containers.length - 1; c >= 0; c--) {
            if (!e) {
                f.push((function(g) {
                    return function(h) {
                        g._trigger("deactivate", h, this._uiHash(this))
                    }
                }).call(this, this.containers[c]))
            }
            if (this.containers[c].containerCache.over) {
                f.push((function(g) {
                    return function(h) {
                        g._trigger("out", h, this._uiHash(this))
                    }
                }).call(this, this.containers[c]));
                this.containers[c].containerCache.over = 0
            }
        }
        if (this._storedCursor) {
            a("body").css("cursor", this._storedCursor)
        }
        if (this._storedOpacity) {
            this.helper.css("opacity", this._storedOpacity)
        }
        if (this._storedZIndex) {
            this.helper.css("zIndex", this._storedZIndex == "auto" ? "" : this._storedZIndex)
        }
        this.dragging = false;
        if (this.cancelHelperRemoval) {
            if (!e) {
                this._trigger("beforeStop", d, this._uiHash());
                for (var c = 0; c < f.length; c++) {
                    f[c].call(this, d)
                }
                this._trigger("stop", d, this._uiHash())
            }
            return false
        }
        if (!e) {
            this._trigger("beforeStop", d, this._uiHash())
        }
        this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
        if (this.helper[0] != this.currentItem[0]) {
            this.helper.remove()
        }
        this.helper = null;
        if (!e) {
            for (var c = 0; c < f.length; c++) {
                f[c].call(this, d)
            }
            this._trigger("stop", d, this._uiHash())
        }
        this.fromOutside = false;
        return true
    },_trigger:function() {
        if (a.Widget.prototype._trigger.apply(this, arguments) === false) {
            this.cancel()
        }
    },_uiHash:function(c) {
        var b = c || this;
        return{helper:b.helper,placeholder:b.placeholder || a([]),position:b.position,originalPosition:b.originalPosition,offset:b.positionAbs,item:b.currentItem,sender:c ? c.element : null}
    }});
    a.extend(a.ui.sortable, {version:"1.8"})
})(jQuery);
;
/*
 * jQuery UI Accordion 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Accordion
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function(a) {
    a.widget("ui.accordion", {options:{active:0,animated:"slide",autoHeight:true,clearStyle:false,collapsible:false,event:"click",fillSpace:false,header:"> li > :first-child,> :not(li):even",icons:{header:"ui-icon-triangle-1-e",headerSelected:"ui-icon-triangle-1-s"},navigation:false,navigationFilter:function() {
        return this.href.toLowerCase() == location.href.toLowerCase()
    }},_create:function() {
        var d = this.options,b = this;
        this.running = 0;
        this.element.addClass("ui-accordion ui-widget ui-helper-reset");
        if (this.element[0].nodeName == "UL") {
            this.element.children("li").addClass("ui-accordion-li-fix")
        }
        this.headers = this.element.find(d.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",
                function() {
                    a(this).addClass("ui-state-hover")
                }).bind("mouseleave.accordion",
                function() {
                    a(this).removeClass("ui-state-hover")
                }).bind("focus.accordion",
                function() {
                    a(this).addClass("ui-state-focus")
                }).bind("blur.accordion", function() {
            a(this).removeClass("ui-state-focus")
        });
        this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
        if (d.navigation) {
            var c = this.element.find("a").filter(d.navigationFilter);
            if (c.length) {
                var e = c.closest(".ui-accordion-header");
                if (e.length) {
                    this.active = e
                } else {
                    this.active = c.closest(".ui-accordion-content").prev()
                }
            }
        }
        this.active = this._findActive(this.active || d.active).toggleClass("ui-state-default").toggleClass("ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");
        this.active.next().addClass("ui-accordion-content-active");
        this._createIcons();
        if (a.browser.msie) {
            this.element.find("a").css("zoom", "1")
        }
        this.resize();
        this.element.attr("role", "tablist");
        this.headers.attr("role", "tab").bind("keydown",
                function(f) {
                    return b._keydown(f)
                }).next().attr("role", "tabpanel");
        this.headers.not(this.active || "").attr("aria-expanded", "false").attr("tabIndex", "-1").next().hide();
        if (!this.active.length) {
            this.headers.eq(0).attr("tabIndex", "0")
        } else {
            this.active.attr("aria-expanded", "true").attr("tabIndex", "0")
        }
        if (!a.browser.safari) {
            this.headers.find("a").attr("tabIndex", "-1")
        }
        if (d.event) {
            this.headers.bind((d.event) + ".accordion", function(f) {
                b._clickHandler.call(b, f, this);
                f.preventDefault()
            })
        }
    },_createIcons:function() {
        var b = this.options;
        if (b.icons) {
            a("<span/>").addClass("ui-icon " + b.icons.header).prependTo(this.headers);
            this.active.find(".ui-icon").toggleClass(b.icons.header).toggleClass(b.icons.headerSelected);
            this.element.addClass("ui-accordion-icons")
        }
    },_destroyIcons:function() {
        this.headers.children(".ui-icon").remove();
        this.element.removeClass("ui-accordion-icons")
    },destroy:function() {
        var c = this.options;
        this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role").unbind(".accordion").removeData("accordion");
        this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("tabindex");
        this.headers.find("a").removeAttr("tabindex");
        this._destroyIcons();
        var b = this.headers.next().css("display", "").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active");
        if (c.autoHeight || c.fillHeight) {
            b.css("height", "")
        }
        return this
    },_setOption:function(b, c) {
        a.Widget.prototype._setOption.apply(this, arguments);
        if (b == "active") {
            this.activate(c)
        }
        if (b == "icons") {
            this._destroyIcons();
            if (c) {
                this._createIcons()
            }
        }
    },_keydown:function(e) {
        var g = this.options,f = a.ui.keyCode;
        if (g.disabled || e.altKey || e.ctrlKey) {
            return
        }
        var d = this.headers.length;
        var b = this.headers.index(e.target);
        var c = false;
        switch (e.keyCode) {case f.RIGHT:case f.DOWN:c = this.headers[(b + 1) % d];break;case f.LEFT:case f.UP:c = this.headers[(b - 1 + d) % d];break;case f.SPACE:case f.ENTER:this._clickHandler({target:e.target}, e.target);e.preventDefault()
        }
        if (c) {
            a(e.target).attr("tabIndex", "-1");
            a(c).attr("tabIndex", "0");
            c.focus();
            return false
        }
        return true
    },resize:function() {
        var d = this.options,c;
        if (d.fillSpace) {
            if (a.browser.msie) {
                var b = this.element.parent().css("overflow");
                this.element.parent().css("overflow", "hidden")
            }
            c = this.element.parent().height();
            if (a.browser.msie) {
                this.element.parent().css("overflow", b)
            }
            this.headers.each(function() {
                c -= a(this).outerHeight(true)
            });
            this.headers.next().each(
                    function() {
                        a(this).height(Math.max(0, c - a(this).innerHeight() + a(this).height()))
                    }).css("overflow", "auto")
        } else {
            if (d.autoHeight) {
                c = 0;
                this.headers.next().each(
                        function() {
                            c = Math.max(c, a(this).height())
                        }).height(c)
            }
        }
        return this
    },activate:function(b) {
        this.options.active = b;
        var c = this._findActive(b)[0];
        this._clickHandler({target:c}, c);
        return this
    },_findActive:function(b) {
        return b ? typeof b == "number" ? this.headers.filter(":eq(" + b + ")") : this.headers.not(this.headers.not(b)) : b === false ? a([]) : this.headers.filter(":eq(0)")
    },_clickHandler:function(b, f) {
        var d = this.options;
        if (d.disabled) {
            return
        }
        if (!b.target) {
            if (!d.collapsible) {
                return
            }
            this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);
            this.active.next().addClass("ui-accordion-content-active");
            var h = this.active.next(),e = {options:d,newHeader:a([]),oldHeader:d.active,newContent:a([]),oldContent:h},c = (this.active = a([]));
            this._toggle(c, h, e);
            return
        }
        var g = a(b.currentTarget || f);
        var i = g[0] == this.active[0];
        d.active = d.collapsible && i ? false : a(".ui-accordion-header", this.element).index(g);
        if (this.running || (!d.collapsible && i)) {
            return
        }
        this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);
        if (!i) {
            g.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").find(".ui-icon").removeClass(d.icons.header).addClass(d.icons.headerSelected);
            g.next().addClass("ui-accordion-content-active")
        }
        var c = g.next(),h = this.active.next(),e = {options:d,newHeader:i && d.collapsible ? a([]) : g,oldHeader:this.active,newContent:i && d.collapsible ? a([]) : c,oldContent:h},j = this.headers.index(this.active[0]) > this.headers.index(g[0]);
        this.active = i ? a([]) : g;
        this._toggle(c, h, e, i, j);
        return
    },_toggle:function(b, i, g, j, k) {
        var d = this.options,m = this;
        this.toShow = b;
        this.toHide = i;
        this.data = g;
        var c = function() {
            if (!m) {
                return
            }
            return m._completed.apply(m, arguments)
        };
        this._trigger("changestart", null, this.data);
        this.running = i.size() === 0 ? b.size() : i.size();
        if (d.animated) {
            var f = {};
            if (d.collapsible && j) {
                f = {toShow:a([]),toHide:i,complete:c,down:k,autoHeight:d.autoHeight || d.fillSpace}
            } else {
                f = {toShow:b,toHide:i,complete:c,down:k,autoHeight:d.autoHeight || d.fillSpace}
            }
            if (!d.proxied) {
                d.proxied = d.animated
            }
            if (!d.proxiedDuration) {
                d.proxiedDuration = d.duration
            }
            d.animated = a.isFunction(d.proxied) ? d.proxied(f) : d.proxied;
            d.duration = a.isFunction(d.proxiedDuration) ? d.proxiedDuration(f) : d.proxiedDuration;
            var l = a.ui.accordion.animations,e = d.duration,h = d.animated;
            if (h && !l[h] && !a.easing[h]) {
                h = "slide"
            }
            if (!l[h]) {
                l[h] = function(n) {
                    this.slide(n, {easing:h,duration:e || 700})
                }
            }
            l[h](f)
        } else {
            if (d.collapsible && j) {
                b.toggle()
            } else {
                i.hide();
                b.show()
            }
            c(true)
        }
        i.prev().attr("aria-expanded", "false").attr("tabIndex", "-1").blur();
        b.prev().attr("aria-expanded", "true").attr("tabIndex", "0").focus()
    },_completed:function(b) {
        var c = this.options;
        this.running = b ? 0 : --this.running;
        if (this.running) {
            return
        }
        if (c.clearStyle) {
            this.toShow.add(this.toHide).css({height:"",overflow:""})
        }
        this.toHide.removeClass("ui-accordion-content-active");
        this._trigger("change", null, this.data)
    }});
    a.extend(a.ui.accordion, {version:"1.8",animations:{slide:function(j, h) {
        j = a.extend({easing:"swing",duration:300}, j, h);
        if (!j.toHide.size()) {
            j.toShow.animate({height:"show"}, j);
            return
        }
        if (!j.toShow.size()) {
            j.toHide.animate({height:"hide"}, j);
            return
        }
        var c = j.toShow.css("overflow"),g = 0,d = {},f = {},e = ["height","paddingTop","paddingBottom"],b;
        var i = j.toShow;
        b = i[0].style.width;
        i.width(parseInt(i.parent().width(), 10) - parseInt(i.css("paddingLeft"), 10) - parseInt(i.css("paddingRight"), 10) - (parseInt(i.css("borderLeftWidth"), 10) || 0) - (parseInt(i.css("borderRightWidth"), 10) || 0));
        a.each(e, function(k, m) {
            f[m] = "hide";
            var l = ("" + a.css(j.toShow[0], m)).match(/^([\d+-.]+)(.*)$/);
            d[m] = {value:l[1],unit:l[2] || "px"}
        });
        j.toShow.css({height:0,overflow:"hidden"}).show();
        j.toHide.filter(":hidden").each(j.complete).end().filter(":visible").animate(f, {step:function(k, l) {
            if (l.prop == "height") {
                g = (l.end - l.start === 0) ? 0 : (l.now - l.start) / (l.end - l.start)
            }
            j.toShow[0].style[l.prop] = (g * d[l.prop].value) + d[l.prop].unit
        },duration:j.duration,easing:j.easing,complete:function() {
            if (!j.autoHeight) {
                j.toShow.css("height", "")
            }
            j.toShow.css("width", b);
            j.toShow.css({overflow:c});
            j.complete()
        }})
    },bounceslide:function(b) {
        this.slide(b, {easing:b.down ? "easeOutBounce" : "swing",duration:b.down ? 1000 : 200})
    }}})
})(jQuery);
;
/*
 * jQuery UI Autocomplete 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Autocomplete
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.position.js
 */
(function(a) {
    a.widget("ui.autocomplete", {options:{minLength:1,delay:300},_create:function() {
        var b = this,c = this.element[0].ownerDocument;
        this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off").attr({role:"textbox","aria-autocomplete":"list","aria-haspopup":"true"}).bind("keydown.autocomplete",
                function(d) {
                    var e = a.ui.keyCode;
                    switch (d.keyCode) {case e.PAGE_UP:b._move("previousPage", d);break;case e.PAGE_DOWN:b._move("nextPage", d);break;case e.UP:b._move("previous", d);d.preventDefault();break;case e.DOWN:b._move("next", d);d.preventDefault();break;case e.ENTER:if (b.menu.active) {
                        d.preventDefault()
                    }case e.TAB:if (!b.menu.active) {
                        return
                    }b.menu.select();break;case e.ESCAPE:b.element.val(b.term);b.close(d);break;case e.SHIFT:case e.CONTROL:case 18:break;default:clearTimeout(b.searching);b.searching = setTimeout(function() {
                        b.search(null, d)
                    }, b.options.delay);break
                    }
                }).bind("focus.autocomplete",
                function() {
                    b.previous = b.element.val()
                }).bind("blur.autocomplete", function(d) {
            clearTimeout(b.searching);
            b.closing = setTimeout(function() {
                b.close(d)
            }, 150)
        });
        this._initSource();
        this.response = function() {
            return b._response.apply(b, arguments)
        };
        this.menu = a("<ul></ul>").addClass("ui-autocomplete").appendTo("body", c).menu({focus:function(e, f) {
            var d = f.item.data("item.autocomplete");
            if (false !== b._trigger("focus", null, {item:d})) {
                b.element.val(d.value)
            }
        },selected:function(e, f) {
            var d = f.item.data("item.autocomplete");
            if (false !== b._trigger("select", e, {item:d})) {
                b.element.val(d.value)
            }
            b.close(e);
            b.previous = b.element.val();
            if (b.element[0] !== c.activeElement) {
                b.element.focus()
            }
        },blur:function(d, e) {
            if (b.menu.element.is(":visible")) {
                b.element.val(b.term)
            }
        }}).zIndex(this.element.zIndex() + 1).css({top:0,left:0}).hide().data("menu");
        if (a.fn.bgiframe) {
            this.menu.element.bgiframe()
        }
    },destroy:function() {
        this.element.removeClass("ui-autocomplete-input ui-widget ui-widget-content").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup");
        this.menu.element.remove();
        a.Widget.prototype.destroy.call(this)
    },_setOption:function(b) {
        a.Widget.prototype._setOption.apply(this, arguments);
        if (b === "source") {
            this._initSource()
        }
    },_initSource:function() {
        var c,b;
        if (a.isArray(this.options.source)) {
            c = this.options.source;
            this.source = function(e, d) {
                var f = new RegExp(a.ui.autocomplete.escapeRegex(e.term), "i");
                d(a.grep(c, function(g) {
                    return f.test(g.label || g.value || g)
                }))
            }
        } else {
            if (typeof this.options.source === "string") {
                b = this.options.source;
                this.source = function(e, d) {
                    a.getJSON(b, e, d)
                }
            } else {
                this.source = this.options.source
            }
        }
    },search:function(c, b) {
        c = c != null ? c : this.element.val();
        if (c.length < this.options.minLength) {
            return this.close(b)
        }
        clearTimeout(this.closing);
        if (this._trigger("search") === false) {
            return
        }
        return this._search(c)
    },_search:function(b) {
        this.term = this.element.addClass("ui-autocomplete-loading").val();
        this.source({term:b}, this.response)
    },_response:function(b) {
        if (b.length) {
            b = this._normalize(b);
            this._suggest(b);
            this._trigger("open")
        } else {
            this.close()
        }
        this.element.removeClass("ui-autocomplete-loading")
    },close:function(b) {
        clearTimeout(this.closing);
        if (this.menu.element.is(":visible")) {
            this._trigger("close", b);
            this.menu.element.hide();
            this.menu.deactivate()
        }
        if (this.previous !== this.element.val()) {
            this._trigger("change", b)
        }
    },_normalize:function(b) {
        if (b.length && b[0].label && b[0].value) {
            return b
        }
        return a.map(b, function(c) {
            if (typeof c === "string") {
                return{label:c,value:c}
            }
            return a.extend({label:c.label || c.value,value:c.value || c.label}, c)
        })
    },_suggest:function(b) {
        var c = this.menu.element.empty().zIndex(this.element.zIndex() + 1),d,e;
        this._renderMenu(c, b);
        this.menu.deactivate();
        this.menu.refresh();
        this.menu.element.show().position({my:"left top",at:"left bottom",of:this.element,collision:"none"});
        d = c.width("").width();
        e = this.element.width();
        c.width(Math.max(d, e))
    },_renderMenu:function(d, c) {
        var b = this;
        a.each(c, function(e, f) {
            b._renderItem(d, f)
        })
    },_renderItem:function(b, c) {
        return a("<li></li>").data("item.autocomplete", c).append("<a>" + c.label + "</a>").appendTo(b)
    },_move:function(c, b) {
        if (!this.menu.element.is(":visible")) {
            this.search(null, b);
            return
        }
        if (this.menu.first() && /^previous/.test(c) || this.menu.last() && /^next/.test(c)) {
            this.element.val(this.term);
            this.menu.deactivate();
            return
        }
        this.menu[c]()
    },widget:function() {
        return this.menu.element
    }});
    a.extend(a.ui.autocomplete, {escapeRegex:function(b) {
        return b.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1")
    }})
}(jQuery));
(function(a) {
    a.widget("ui.menu", {_create:function() {
        var b = this;
        this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({role:"listbox","aria-activedescendant":"ui-active-menuitem"}).click(function(c) {
            c.preventDefault();
            b.select()
        });
        this.refresh()
    },refresh:function() {
        var c = this;
        var b = this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "menuitem");
        b.children("a").addClass("ui-corner-all").attr("tabindex", -1).mouseenter(
                function() {
                    c.activate(a(this).parent())
                }).mouseleave(function() {
            c.deactivate()
        })
    },activate:function(d) {
        this.deactivate();
        if (this.hasScroll()) {
            var e = d.offset().top - this.element.offset().top,b = this.element.attr("scrollTop"),c = this.element.height();
            if (e < 0) {
                this.element.attr("scrollTop", b + e)
            } else {
                if (e > c) {
                    this.element.attr("scrollTop", b + e - c + d.height())
                }
            }
        }
        this.active = d.eq(0).children("a").addClass("ui-state-hover").attr("id", "ui-active-menuitem").end();
        this._trigger("focus", null, {item:d})
    },deactivate:function() {
        if (!this.active) {
            return
        }
        this.active.children("a").removeClass("ui-state-hover").removeAttr("id");
        this._trigger("blur");
        this.active = null
    },next:function() {
        this.move("next", "li:first")
    },previous:function() {
        this.move("prev", "li:last")
    },first:function() {
        return this.active && !this.active.prev().length
    },last:function() {
        return this.active && !this.active.next().length
    },move:function(d, c) {
        if (!this.active) {
            this.activate(this.element.children(c));
            return
        }
        var b = this.active[d]();
        if (b.length) {
            this.activate(b)
        } else {
            this.activate(this.element.children(c))
        }
    },nextPage:function() {
        if (this.hasScroll()) {
            if (!this.active || this.last()) {
                this.activate(this.element.children(":first"));
                return
            }
            var d = this.active.offset().top,c = this.element.height(),b = this.element.children("li").filter(function() {
                var e = a(this).offset().top - d - c + a(this).height();
                return e < 10 && e > -10
            });
            if (!b.length) {
                b = this.element.children(":last")
            }
            this.activate(b)
        } else {
            this.activate(this.element.children(!this.active || this.last() ? ":first" : ":last"))
        }
    },previousPage:function() {
        if (this.hasScroll()) {
            if (!this.active || this.first()) {
                this.activate(this.element.children(":last"));
                return
            }
            var c = this.active.offset().top,b = this.element.height();
            result = this.element.children("li").filter(function() {
                var d = a(this).offset().top - c + b - a(this).height();
                return d < 10 && d > -10
            });
            if (!result.length) {
                result = this.element.children(":first")
            }
            this.activate(result)
        } else {
            this.activate(this.element.children(!this.active || this.first() ? ":last" : ":first"))
        }
    },hasScroll:function() {
        return this.element.height() < this.element.attr("scrollHeight")
    },select:function() {
        this._trigger("selected", null, {item:this.active})
    }})
}(jQuery));
;
/*
 * jQuery UI Button 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Button
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function(f) {
    var d,c = "ui-button ui-widget ui-state-default ui-corner-all",b = "ui-state-hover ui-state-active ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon ui-button-text-only",e = function(g) {
        f(":ui-button", g.target.form).each(function() {
            var h = f(this).data("button");
            setTimeout(function() {
                h.refresh()
            }, 1)
        })
    },a = function(h) {
        var g = h.name,i = h.form,j = f([]);
        if (g) {
            if (i) {
                j = f(i).find("[name='" + g + "']")
            } else {
                j = f("[name='" + g + "']", h.ownerDocument).filter(function() {
                    return !this.form
                })
            }
        }
        return j
    };
    f.widget("ui.button", {options:{text:true,label:null,icons:{primary:null,secondary:null}},_create:function() {
        this.element.closest("form").unbind("reset.button").bind("reset.button", e);
        this._determineButtonType();
        this.hasTitle = !!this.buttonElement.attr("title");
        var g = this,i = this.options,j = this.type === "checkbox" || this.type === "radio",k = "ui-state-hover" + (!j ? " ui-state-active" : ""),h = "ui-state-focus";
        if (i.label === null) {
            i.label = this.buttonElement.html()
        }
        if (this.element.is(":disabled")) {
            i.disabled = true
        }
        this.buttonElement.addClass(c).attr("role", "button").bind("mouseenter.button",
                function() {
                    if (i.disabled) {
                        return
                    }
                    f(this).addClass("ui-state-hover");
                    if (this === d) {
                        f(this).addClass("ui-state-active")
                    }
                }).bind("mouseleave.button",
                function() {
                    if (i.disabled) {
                        return
                    }
                    f(this).removeClass(k)
                }).bind("focus.button",
                function() {
                    f(this).addClass(h)
                }).bind("blur.button", function() {
            f(this).removeClass(h)
        });
        if (j) {
            this.element.bind("change.button", function() {
                g.refresh()
            })
        }
        if (this.type === "checkbox") {
            this.buttonElement.bind("click.button", function() {
                if (i.disabled) {
                    return false
                }
                f(this).toggleClass("ui-state-active");
                g.buttonElement.attr("aria-pressed", g.element[0].checked)
            })
        } else {
            if (this.type === "radio") {
                this.buttonElement.bind("click.button", function() {
                    if (i.disabled) {
                        return false
                    }
                    f(this).addClass("ui-state-active");
                    g.buttonElement.attr("aria-pressed", true);
                    var l = g.element[0];
                    a(l).not(l).map(
                            function() {
                                return f(this).button("widget")[0]
                            }).removeClass("ui-state-active").attr("aria-pressed", false)
                })
            } else {
                this.buttonElement.bind("mousedown.button",
                        function() {
                            if (i.disabled) {
                                return false
                            }
                            f(this).addClass("ui-state-active");
                            d = this;
                            f(document).one("mouseup", function() {
                                d = null
                            })
                        }).bind("mouseup.button",
                        function() {
                            if (i.disabled) {
                                return false
                            }
                            f(this).removeClass("ui-state-active")
                        }).bind("keydown.button",
                        function(l) {
                            if (i.disabled) {
                                return false
                            }
                            if (l.keyCode == f.ui.keyCode.SPACE || l.keyCode == f.ui.keyCode.ENTER) {
                                f(this).addClass("ui-state-active")
                            }
                        }).bind("keyup.button", function() {
                    f(this).removeClass("ui-state-active")
                });
                if (this.buttonElement.is("a")) {
                    this.buttonElement.keyup(function(l) {
                        if (l.keyCode === f.ui.keyCode.SPACE) {
                            f(this).click()
                        }
                    })
                }
            }
        }
        this._setOption("disabled", i.disabled)
    },_determineButtonType:function() {
        if (this.element.is(":checkbox")) {
            this.type = "checkbox"
        } else {
            if (this.element.is(":radio")) {
                this.type = "radio"
            } else {
                if (this.element.is("input")) {
                    this.type = "input"
                } else {
                    this.type = "button"
                }
            }
        }
        if (this.type === "checkbox" || this.type === "radio") {
            this.buttonElement = this.element.parents().last().find("[for=" + this.element.attr("id") + "]");
            this.element.addClass("ui-helper-hidden-accessible");
            var g = this.element.is(":checked");
            if (g) {
                this.buttonElement.addClass("ui-state-active")
            }
            this.buttonElement.attr("aria-pressed", g)
        } else {
            this.buttonElement = this.element
        }
    },widget:function() {
        return this.buttonElement
    },destroy:function() {
        this.element.removeClass("ui-helper-hidden-accessible");
        this.buttonElement.removeClass(c + " " + b).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
        if (!this.hasTitle) {
            this.buttonElement.removeAttr("title")
        }
        f.Widget.prototype.destroy.call(this)
    },_setOption:function(g, h) {
        f.Widget.prototype._setOption.apply(this, arguments);
        if (g === "disabled") {
            if (h) {
                this.element.attr("disabled", true)
            } else {
                this.element.removeAttr("disabled")
            }
        }
        this._resetButton()
    },refresh:function() {
        var g = this.element.is(":disabled");
        if (g !== this.options.disabled) {
            this._setOption("disabled", g)
        }
        if (this.type === "radio") {
            a(this.element[0]).each(function() {
                if (f(this).is(":checked")) {
                    f(this).button("widget").addClass("ui-state-active").attr("aria-pressed", true)
                } else {
                    f(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", false)
                }
            })
        } else {
            if (this.type === "checkbox") {
                if (this.element.is(":checked")) {
                    this.buttonElement.addClass("ui-state-active").attr("aria-pressed", true)
                } else {
                    this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", false)
                }
            }
        }
    },_resetButton:function() {
        if (this.type === "input") {
            if (this.options.label) {
                this.element.val(this.options.label)
            }
            return
        }
        var j = this.buttonElement,i = f("<span></span>").addClass("ui-button-text").html(this.options.label).appendTo(j.empty()).text(),h = this.options.icons,g = h.primary && h.secondary;
        if (h.primary || h.secondary) {
            j.addClass("ui-button-text-icon" + (g ? "s" : ""));
            if (h.primary) {
                j.prepend("<span class='ui-button-icon-primary ui-icon " + h.primary + "'></span>")
            }
            if (h.secondary) {
                j.append("<span class='ui-button-icon-secondary ui-icon " + h.secondary + "'></span>")
            }
            if (!this.options.text) {
                j.addClass(g ? "ui-button-icons-only" : "ui-button-icon-only").removeClass("ui-button-text-icons ui-button-text-icon");
                if (!this.hasTitle) {
                    j.attr("title", i)
                }
            }
        } else {
            j.addClass("ui-button-text-only")
        }
    }});
    f.widget("ui.buttonset", {_create:function() {
        this.element.addClass("ui-buttonset");
        this._init()
    },_init:function() {
        this.refresh()
    },_setOption:function(g, h) {
        if (g === "disabled") {
            this.buttons.button("option", g, h)
        }
        f.Widget.prototype._setOption.apply(this, arguments)
    },refresh:function() {
        this.buttons = this.element.find(":button, :submit, :reset, :checkbox, :radio, a, :data(button)").filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(
                function() {
                    return f(this).button("widget")[0]
                }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass("ui-corner-left").end().filter(":last").addClass("ui-corner-right").end().end()
    },destroy:function() {
        this.element.removeClass("ui-buttonset");
        this.buttons.map(
                function() {
                    return f(this).button("widget")[0]
                }).removeClass("ui-corner-left ui-corner-right").end().button("destroy");
        f.Widget.prototype.destroy.call(this)
    }})
}(jQuery));
;
/*
 * jQuery UI Dialog 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Dialog
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *  jquery.ui.button.js
 *	jquery.ui.draggable.js
 *	jquery.ui.mouse.js
 *	jquery.ui.position.js
 *	jquery.ui.resizable.js
 */
(function(b) {
    var a = "ui-dialog ui-widget ui-widget-content ui-corner-all ";
    b.widget("ui.dialog", {options:{autoOpen:true,buttons:{},closeOnEscape:true,closeText:"close",dialogClass:"",draggable:true,hide:null,height:"auto",maxHeight:false,maxWidth:false,minHeight:150,minWidth:150,modal:false,position:"center",resizable:true,show:null,stack:true,title:"",width:300,zIndex:1000},_create:function() {
        this.originalTitle = this.element.attr("title");
        var k = this,l = k.options,i = l.title || k.originalTitle || "&#160;",d = b.ui.dialog.getTitleId(k.element),j = (k.uiDialog = b("<div></div>")).appendTo(document.body).hide().addClass(a + l.dialogClass).css({zIndex:l.zIndex}).attr("tabIndex", -1).css("outline", 0).keydown(
                function(m) {
                    if (l.closeOnEscape && m.keyCode && m.keyCode === b.ui.keyCode.ESCAPE) {
                        k.close(m);
                        m.preventDefault()
                    }
                }).attr({role:"dialog","aria-labelledby":d}).mousedown(function(m) {
            k.moveToTop(false, m)
        }),f = k.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(j),e = (k.uiDialogTitlebar = b("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(j),h = b('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role", "button").hover(
                function() {
                    h.addClass("ui-state-hover")
                },
                function() {
                    h.removeClass("ui-state-hover")
                }).focus(
                function() {
                    h.addClass("ui-state-focus")
                }).blur(
                function() {
                    h.removeClass("ui-state-focus")
                }).click(
                function(m) {
                    k.close(m);
                    return false
                }).appendTo(e),g = (k.uiDialogTitlebarCloseText = b("<span></span>")).addClass("ui-icon ui-icon-closethick").text(l.closeText).appendTo(h),c = b("<span></span>").addClass("ui-dialog-title").attr("id", d).html(i).prependTo(e);
        if (b.isFunction(l.beforeclose) && !b.isFunction(l.beforeClose)) {
            l.beforeClose = l.beforeclose
        }
        e.find("*").add(e).disableSelection();
        if (l.draggable && b.fn.draggable) {
            k._makeDraggable()
        }
        if (l.resizable && b.fn.resizable) {
            k._makeResizable()
        }
        k._createButtons(l.buttons);
        k._isOpen = false;
        if (b.fn.bgiframe) {
            j.bgiframe()
        }
    },_init:function() {
        if (this.options.autoOpen) {
            this.open()
        }
    },destroy:function() {
        var c = this;
        if (c.overlay) {
            c.overlay.destroy()
        }
        c.uiDialog.hide();
        c.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");
        c.uiDialog.remove();
        if (c.originalTitle) {
            c.element.attr("title", c.originalTitle)
        }
        return c
    },widget:function() {
        return this.uiDialog
    },close:function(e) {
        var c = this,d;
        if (false === c._trigger("beforeClose", e)) {
            return
        }
        if (c.overlay) {
            c.overlay.destroy()
        }
        c.uiDialog.unbind("keypress.ui-dialog");
        c._isOpen = false;
        if (c.options.hide) {
            c.uiDialog.hide(c.options.hide, function() {
                c._trigger("close", e)
            })
        } else {
            c.uiDialog.hide();
            c._trigger("close", e)
        }
        b.ui.dialog.overlay.resize();
        if (c.options.modal) {
            d = 0;
            b(".ui-dialog").each(function() {
                if (this !== c.uiDialog[0]) {
                    d = Math.max(d, b(this).css("z-index"))
                }
            });
            b.ui.dialog.maxZ = d
        }
        return c
    },isOpen:function() {
        return this._isOpen
    },moveToTop:function(g, f) {
        var c = this,e = c.options,d;
        if ((e.modal && !g) || (!e.stack && !e.modal)) {
            return c._trigger("focus", f)
        }
        if (e.zIndex > b.ui.dialog.maxZ) {
            b.ui.dialog.maxZ = e.zIndex
        }
        if (c.overlay) {
            b.ui.dialog.maxZ += 1;
            c.overlay.$el.css("z-index", b.ui.dialog.overlay.maxZ = b.ui.dialog.maxZ)
        }
        d = {scrollTop:c.element.attr("scrollTop"),scrollLeft:c.element.attr("scrollLeft")};
        b.ui.dialog.maxZ += 1;
        c.uiDialog.css("z-index", b.ui.dialog.maxZ);
        c.element.attr(d);
        c._trigger("focus", f);
        return c
    },open:function() {
        if (this._isOpen) {
            return
        }
        var d = this,e = d.options,c = d.uiDialog;
        d.overlay = e.modal ? new b.ui.dialog.overlay(d) : null;
        if (c.next().length) {
            c.appendTo("body")
        }
        d._size();
        d._position(e.position);
        c.show(e.show);
        d.moveToTop(true);
        if (e.modal) {
            c.bind("keypress.ui-dialog", function(h) {
                if (h.keyCode !== b.ui.keyCode.TAB) {
                    return
                }
                var g = b(":tabbable", this),i = g.filter(":first"),f = g.filter(":last");
                if (h.target === f[0] && !h.shiftKey) {
                    i.focus(1);
                    return false
                } else {
                    if (h.target === i[0] && h.shiftKey) {
                        f.focus(1);
                        return false
                    }
                }
            })
        }
        b([]).add(c.find(".ui-dialog-content :tabbable:first")).add(c.find(".ui-dialog-buttonpane :tabbable:first")).add(c).filter(":first").focus();
        d._trigger("open");
        d._isOpen = true;
        return d
    },_createButtons:function(f) {
        var e = this,c = false,d = b("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix");
        e.uiDialog.find(".ui-dialog-buttonpane").remove();
        if (typeof f === "object" && f !== null) {
            b.each(f, function() {
                return !(c = true)
            })
        }
        if (c) {
            b.each(f, function(g, i) {
                var h = b('<button type="button"></button>').text(g).click(
                        function() {
                            i.apply(e.element[0], arguments)
                        }).appendTo(d);
                if (b.fn.button) {
                    h.button()
                }
            });
            d.appendTo(e.uiDialog)
        }
    },_makeDraggable:function() {
        var c = this,f = c.options,g = b(document),e;

        function d(h) {
            return{position:h.position,offset:h.offset}
        }

        c.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(h, i) {
            e = f.height === "auto" ? "auto" : b(this).height();
            b(this).height(b(this).height()).addClass("ui-dialog-dragging");
            c._trigger("dragStart", h, d(i))
        },drag:function(h, i) {
            c._trigger("drag", h, d(i))
        },stop:function(h, i) {
            f.position = [i.position.left - g.scrollLeft(),i.position.top - g.scrollTop()];
            b(this).removeClass("ui-dialog-dragging").height(e);
            c._trigger("dragStop", h, d(i));
            b.ui.dialog.overlay.resize()
        }})
    },_makeResizable:function(h) {
        h = (h === undefined ? this.options.resizable : h);
        var d = this,g = d.options,c = d.uiDialog.css("position"),f = (typeof h === "string" ? h : "n,e,s,w,se,sw,ne,nw");

        function e(i) {
            return{originalPosition:i.originalPosition,originalSize:i.originalSize,position:i.position,size:i.size}
        }

        d.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:d.element,maxWidth:g.maxWidth,maxHeight:g.maxHeight,minWidth:g.minWidth,minHeight:d._minHeight(),handles:f,start:function(i, j) {
            b(this).addClass("ui-dialog-resizing");
            d._trigger("resizeStart", i, e(j))
        },resize:function(i, j) {
            d._trigger("resize", i, e(j))
        },stop:function(i, j) {
            b(this).removeClass("ui-dialog-resizing");
            g.height = b(this).height();
            g.width = b(this).width();
            d._trigger("resizeStop", i, e(j));
            b.ui.dialog.overlay.resize()
        }}).css("position", c).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
    },_minHeight:function() {
        var c = this.options;
        if (c.height === "auto") {
            return c.minHeight
        } else {
            return Math.min(c.minHeight, c.height)
        }
    },_position:function(d) {
        var e = [],f = [0,0],c;
        d = d || b.ui.dialog.prototype.options.position;
        if (typeof d === "string" || (typeof d === "object" && "0" in d)) {
            e = d.split ? d.split(" ") : [d[0],d[1]];
            if (e.length === 1) {
                e[1] = e[0]
            }
            b.each(["left","top"], function(h, g) {
                if (+e[h] === e[h]) {
                    f[h] = e[h];
                    e[h] = g
                }
            })
        } else {
            if (typeof d === "object") {
                if ("left" in d) {
                    e[0] = "left";
                    f[0] = d.left
                } else {
                    if ("right" in d) {
                        e[0] = "right";
                        f[0] = -d.right
                    }
                }
                if ("top" in d) {
                    e[1] = "top";
                    f[1] = d.top
                } else {
                    if ("bottom" in d) {
                        e[1] = "bottom";
                        f[1] = -d.bottom
                    }
                }
            }
        }
        c = this.uiDialog.is(":visible");
        if (!c) {
            this.uiDialog.show()
        }
        this.uiDialog.css({top:0,left:0}).position({my:e.join(" "),at:e.join(" "),offset:f.join(" "),of:window,collision:"fit",using:function(h) {
            var g = b(this).css(h).offset().top;
            if (g < 0) {
                b(this).css("top", h.top - g)
            }
        }});
        if (!c) {
            this.uiDialog.hide()
        }
    },_setOption:function(f, g) {
        var d = this,c = d.uiDialog,h = c.is(":data(resizable)"),e = false;
        switch (f) {case"beforeclose":f = "beforeClose";break;case"buttons":d._createButtons(g);break;case"closeText":d.uiDialogTitlebarCloseText.text("" + g);break;case"dialogClass":c.removeClass(d.options.dialogClass).addClass(a + g);break;case"disabled":if (g) {
            c.addClass("ui-dialog-disabled")
        } else {
            c.removeClass("ui-dialog-disabled")
        }break;case"draggable":if (g) {
            d._makeDraggable()
        } else {
            c.draggable("destroy")
        }break;case"height":e = true;break;case"maxHeight":if (h) {
            c.resizable("option", "maxHeight", g)
        }e = true;break;case"maxWidth":if (h) {
            c.resizable("option", "maxWidth", g)
        }e = true;break;case"minHeight":if (h) {
            c.resizable("option", "minHeight", g)
        }e = true;break;case"minWidth":if (h) {
            c.resizable("option", "minWidth", g)
        }e = true;break;case"position":d._position(g);break;case"resizable":if (h && !g) {
            c.resizable("destroy")
        }if (h && typeof g === "string") {
            c.resizable("option", "handles", g)
        }if (!h && g !== false) {
            d._makeResizable(g)
        }break;case"title":b(".ui-dialog-title", d.uiDialogTitlebar).html("" + (g || "&#160;"));break;case"width":e = true;break
        }
        b.Widget.prototype._setOption.apply(d, arguments);
        if (e) {
            d._size()
        }
    },_size:function() {
        var d = this.options,c;
        this.element.css("width", "auto").hide();
        c = this.uiDialog.css({height:"auto",width:d.width}).height();
        this.element.css(d.height === "auto" ? {minHeight:Math.max(d.minHeight - c, 0),height:"auto"} : {minHeight:0,height:Math.max(d.height - c, 0)}).show();
        if (this.uiDialog.is(":data(resizable)")) {
            this.uiDialog.resizable("option", "minHeight", this._minHeight())
        }
    }});
    b.extend(b.ui.dialog, {version:"1.8",uuid:0,maxZ:0,getTitleId:function(c) {
        var d = c.attr("id");
        if (!d) {
            this.uuid += 1;
            d = this.uuid
        }
        return"ui-dialog-title-" + d
    },overlay:function(c) {
        this.$el = b.ui.dialog.overlay.create(c)
    }});
    b.extend(b.ui.dialog.overlay, {instances:[],oldInstances:[],maxZ:0,events:b.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),
            function(c) {
                return c + ".dialog-overlay"
            }).join(" "),create:function(d) {
        if (this.instances.length === 0) {
            setTimeout(function() {
                if (b.ui.dialog.overlay.instances.length) {
                    b(document).bind(b.ui.dialog.overlay.events, function(e) {
                        return(b(e.target).zIndex() >= b.ui.dialog.overlay.maxZ)
                    })
                }
            }, 1);
            b(document).bind("keydown.dialog-overlay", function(e) {
                if (d.options.closeOnEscape && e.keyCode && e.keyCode === b.ui.keyCode.ESCAPE) {
                    d.close(e);
                    e.preventDefault()
                }
            });
            b(window).bind("resize.dialog-overlay", b.ui.dialog.overlay.resize)
        }
        var c = (this.oldInstances.pop() || b("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({width:this.width(),height:this.height()});
        if (b.fn.bgiframe) {
            c.bgiframe()
        }
        this.instances.push(c);
        return c
    },destroy:function(c) {
        this.oldInstances.push(this.instances.splice(b.inArray(c, this.instances), 1)[0]);
        if (this.instances.length === 0) {
            b([document,window]).unbind(".dialog-overlay")
        }
        c.remove();
        var d = 0;
        b.each(this.instances, function() {
            d = Math.max(d, this.css("z-index"))
        });
        this.maxZ = d
    },height:function() {
        var d,c;
        if (b.browser.msie && b.browser.version < 7) {
            d = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
            c = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight);
            if (d < c) {
                return b(window).height() + "px"
            } else {
                return d + "px"
            }
        } else {
            return b(document).height() + "px"
        }
    },width:function() {
        var c,d;
        if (b.browser.msie && b.browser.version < 7) {
            c = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
            d = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
            if (c < d) {
                return b(window).width() + "px"
            } else {
                return c + "px"
            }
        } else {
            return b(document).width() + "px"
        }
    },resize:function() {
        var c = b([]);
        b.each(b.ui.dialog.overlay.instances, function() {
            c = c.add(this)
        });
        c.css({width:0,height:0}).css({width:b.ui.dialog.overlay.width(),height:b.ui.dialog.overlay.height()})
    }});
    b.extend(b.ui.dialog.overlay.prototype, {destroy:function() {
        b.ui.dialog.overlay.destroy(this.$el)
    }})
}(jQuery));
;
/*
 * jQuery UI Slider 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Slider
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(b) {
    var a = 5;
    b.widget("ui.slider", b.ui.mouse, {widgetEventPrefix:"slide",options:{animate:false,distance:0,max:100,min:0,orientation:"horizontal",range:false,step:1,value:0,values:null},_create:function() {
        var c = this,d = this.options;
        this._keySliding = false;
        this._mouseSliding = false;
        this._animateOff = true;
        this._handleIndex = null;
        this._detectOrientation();
        this._mouseInit();
        this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all");
        if (d.disabled) {
            this.element.addClass("ui-slider-disabled ui-disabled")
        }
        this.range = b([]);
        if (d.range) {
            if (d.range === true) {
                this.range = b("<div></div>");
                if (!d.values) {
                    d.values = [this._valueMin(),this._valueMin()]
                }
                if (d.values.length && d.values.length != 2) {
                    d.values = [d.values[0],d.values[0]]
                }
            } else {
                this.range = b("<div></div>")
            }
            this.range.appendTo(this.element).addClass("ui-slider-range");
            if (d.range == "min" || d.range == "max") {
                this.range.addClass("ui-slider-range-" + d.range)
            }
            this.range.addClass("ui-widget-header")
        }
        if (b(".ui-slider-handle", this.element).length == 0) {
            b('<a href="#"></a>').appendTo(this.element).addClass("ui-slider-handle")
        }
        if (d.values && d.values.length) {
            while (b(".ui-slider-handle", this.element).length < d.values.length) {
                b('<a href="#"></a>').appendTo(this.element).addClass("ui-slider-handle")
            }
        }
        this.handles = b(".ui-slider-handle", this.element).addClass("ui-state-default ui-corner-all");
        this.handle = this.handles.eq(0);
        this.handles.add(this.range).filter("a").click(
                function(e) {
                    e.preventDefault()
                }).hover(
                function() {
                    if (!d.disabled) {
                        b(this).addClass("ui-state-hover")
                    }
                },
                function() {
                    b(this).removeClass("ui-state-hover")
                }).focus(
                function() {
                    if (!d.disabled) {
                        b(".ui-slider .ui-state-focus").removeClass("ui-state-focus");
                        b(this).addClass("ui-state-focus")
                    } else {
                        b(this).blur()
                    }
                }).blur(function() {
            b(this).removeClass("ui-state-focus")
        });
        this.handles.each(function(e) {
            b(this).data("index.ui-slider-handle", e)
        });
        this.handles.keydown(
                function(j) {
                    var g = true;
                    var f = b(this).data("index.ui-slider-handle");
                    if (c.options.disabled) {
                        return
                    }
                    switch (j.keyCode) {case b.ui.keyCode.HOME:case b.ui.keyCode.END:case b.ui.keyCode.PAGE_UP:case b.ui.keyCode.PAGE_DOWN:case b.ui.keyCode.UP:case b.ui.keyCode.RIGHT:case b.ui.keyCode.DOWN:case b.ui.keyCode.LEFT:g = false;if (!c._keySliding) {
                        c._keySliding = true;
                        b(this).addClass("ui-state-active");
                        c._start(j, f)
                    }break
                    }
                    var h,e,i = c._step();
                    if (c.options.values && c.options.values.length) {
                        h = e = c.values(f)
                    } else {
                        h = e = c.value()
                    }
                    switch (j.keyCode) {case b.ui.keyCode.HOME:e = c._valueMin();break;case b.ui.keyCode.END:e = c._valueMax();break;case b.ui.keyCode.PAGE_UP:e = h + ((c._valueMax() - c._valueMin()) / a);break;case b.ui.keyCode.PAGE_DOWN:e = h - ((c._valueMax() - c._valueMin()) / a);break;case b.ui.keyCode.UP:case b.ui.keyCode.RIGHT:if (h == c._valueMax()) {
                        return
                    }e = h + i;break;case b.ui.keyCode.DOWN:case b.ui.keyCode.LEFT:if (h == c._valueMin()) {
                        return
                    }e = h - i;break
                    }
                    c._slide(j, f, e);
                    return g
                }).keyup(function(f) {
            var e = b(this).data("index.ui-slider-handle");
            if (c._keySliding) {
                c._keySliding = false;
                c._stop(f, e);
                c._change(f, e);
                b(this).removeClass("ui-state-active")
            }
        });
        this._refreshValue();
        this._animateOff = false
    },destroy:function() {
        this.handles.remove();
        this.range.remove();
        this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");
        this._mouseDestroy();
        return this
    },_mouseCapture:function(e) {
        var f = this.options;
        if (f.disabled) {
            return false
        }
        this.elementSize = {width:this.element.outerWidth(),height:this.element.outerHeight()};
        this.elementOffset = this.element.offset();
        var i = {x:e.pageX,y:e.pageY};
        var k = this._normValueFromMouse(i);
        var d = this._valueMax() - this._valueMin() + 1,g;
        var l = this,j;
        this.handles.each(function(m) {
            var n = Math.abs(k - l.values(m));
            if (d > n) {
                d = n;
                g = b(this);
                j = m
            }
        });
        if (f.range == true && this.values(1) == f.min) {
            g = b(this.handles[++j])
        }
        this._start(e, j);
        this._mouseSliding = true;
        l._handleIndex = j;
        g.addClass("ui-state-active").focus();
        var h = g.offset();
        var c = !b(e.target).parents().andSelf().is(".ui-slider-handle");
        this._clickOffset = c ? {left:0,top:0} : {left:e.pageX - h.left - (g.width() / 2),top:e.pageY - h.top - (g.height() / 2) - (parseInt(g.css("borderTopWidth"), 10) || 0) - (parseInt(g.css("borderBottomWidth"), 10) || 0) + (parseInt(g.css("marginTop"), 10) || 0)};
        k = this._normValueFromMouse(i);
        this._slide(e, j, k);
        this._animateOff = true;
        return true
    },_mouseStart:function(c) {
        return true
    },_mouseDrag:function(e) {
        var c = {x:e.pageX,y:e.pageY};
        var d = this._normValueFromMouse(c);
        this._slide(e, this._handleIndex, d);
        return false
    },_mouseStop:function(c) {
        this.handles.removeClass("ui-state-active");
        this._mouseSliding = false;
        this._stop(c, this._handleIndex);
        this._change(c, this._handleIndex);
        this._handleIndex = null;
        this._clickOffset = null;
        this._animateOff = false;
        return false
    },_detectOrientation:function() {
        this.orientation = this.options.orientation == "vertical" ? "vertical" : "horizontal"
    },_normValueFromMouse:function(e) {
        var d,i;
        if ("horizontal" == this.orientation) {
            d = this.elementSize.width;
            i = e.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)
        } else {
            d = this.elementSize.height;
            i = e.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)
        }
        var g = (i / d);
        if (g > 1) {
            g = 1
        }
        if (g < 0) {
            g = 0
        }
        if ("vertical" == this.orientation) {
            g = 1 - g
        }
        var f = this._valueMax() - this._valueMin(),j = g * f,c = j % this.options.step,h = this._valueMin() + j - c;
        if (c > (this.options.step / 2)) {
            h += this.options.step
        }
        return parseFloat(h.toFixed(5))
    },_start:function(e, d) {
        var c = {handle:this.handles[d],value:this.value()};
        if (this.options.values && this.options.values.length) {
            c.value = this.values(d);
            c.values = this.values()
        }
        this._trigger("start", e, c)
    },_slide:function(g, f, e) {
        var h = this.handles[f];
        if (this.options.values && this.options.values.length) {
            var c = this.values(f ? 0 : 1);
            if ((this.options.values.length == 2 && this.options.range === true) && ((f == 0 && e > c) || (f == 1 && e < c))) {
                e = c
            }
            if (e != this.values(f)) {
                var d = this.values();
                d[f] = e;
                var i = this._trigger("slide", g, {handle:this.handles[f],value:e,values:d});
                var c = this.values(f ? 0 : 1);
                if (i !== false) {
                    this.values(f, e, true)
                }
            }
        } else {
            if (e != this.value()) {
                var i = this._trigger("slide", g, {handle:this.handles[f],value:e});
                if (i !== false) {
                    this.value(e)
                }
            }
        }
    },_stop:function(e, d) {
        var c = {handle:this.handles[d],value:this.value()};
        if (this.options.values && this.options.values.length) {
            c.value = this.values(d);
            c.values = this.values()
        }
        this._trigger("stop", e, c)
    },_change:function(e, d) {
        if (!this._keySliding && !this._mouseSliding) {
            var c = {handle:this.handles[d],value:this.value()};
            if (this.options.values && this.options.values.length) {
                c.value = this.values(d);
                c.values = this.values()
            }
            this._trigger("change", e, c)
        }
    },value:function(c) {
        if (arguments.length) {
            this.options.value = this._trimValue(c);
            this._refreshValue();
            this._change(null, 0)
        }
        return this._value()
    },values:function(e, h) {
        if (arguments.length > 1) {
            this.options.values[e] = this._trimValue(h);
            this._refreshValue();
            this._change(null, e)
        }
        if (arguments.length) {
            if (b.isArray(arguments[0])) {
                var g = this.options.values,d = arguments[0];
                for (var f = 0,c = g.length; f < c; f++) {
                    g[f] = this._trimValue(d[f]);
                    this._change(null, f)
                }
                this._refreshValue()
            } else {
                if (this.options.values && this.options.values.length) {
                    return this._values(e)
                } else {
                    return this.value()
                }
            }
        } else {
            return this._values()
        }
    },_setOption:function(d, e) {
        var c,f = 0;
        if (jQuery.isArray(this.options.values)) {
            f = this.options.values.length
        }
        b.Widget.prototype._setOption.apply(this, arguments);
        switch (d) {case"disabled":if (e) {
            this.handles.filter(".ui-state-focus").blur();
            this.handles.removeClass("ui-state-hover");
            this.handles.attr("disabled", "disabled");
            this.element.addClass("ui-disabled")
        } else {
            this.handles.removeAttr("disabled");
            this.element.removeClass("ui-disabled")
        }case"orientation":this._detectOrientation();this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation);this._refreshValue();break;case"value":this._animateOff = true;this._refreshValue();this._change(null, 0);this._animateOff = false;break;case"values":this._animateOff = true;this._refreshValue();for (c = 0; c < f; c++) {
            this._change(null, c)
        }this._animateOff = false;break
        }
    },_step:function() {
        var c = this.options.step;
        return c
    },_value:function() {
        var c = this.options.value;
        c = this._trimValue(c);
        return c
    },_values:function(d) {
        if (arguments.length) {
            var g = this.options.values[d];
            g = this._trimValue(g);
            return g
        } else {
            var f = this.options.values.slice();
            for (var e = 0,c = f.length; e < c; e++) {
                f[e] = this._trimValue(f[e])
            }
            return f
        }
    },_trimValue:function(c) {
        if (c < this._valueMin()) {
            c = this._valueMin()
        }
        if (c > this._valueMax()) {
            c = this._valueMax()
        }
        return c
    },_valueMin:function() {
        var c = this.options.min;
        return c
    },_valueMax:function() {
        var c = this.options.max;
        return c
    },_refreshValue:function() {
        var g = this.options.range,e = this.options,m = this;
        var d = (!this._animateOff) ? e.animate : false;
        if (this.options.values && this.options.values.length) {
            var j,i;
            this.handles.each(function(q, o) {
                var p = (m.values(q) - m._valueMin()) / (m._valueMax() - m._valueMin()) * 100;
                var n = {};
                n[m.orientation == "horizontal" ? "left" : "bottom"] = p + "%";
                b(this).stop(1, 1)[d ? "animate" : "css"](n, e.animate);
                if (m.options.range === true) {
                    if (m.orientation == "horizontal") {
                        (q == 0) && m.range.stop(1, 1)[d ? "animate" : "css"]({left:p + "%"}, e.animate);
                        (q == 1) && m.range[d ? "animate" : "css"]({width:(p - lastValPercent) + "%"}, {queue:false,duration:e.animate})
                    } else {
                        (q == 0) && m.range.stop(1, 1)[d ? "animate" : "css"]({bottom:(p) + "%"}, e.animate);
                        (q == 1) && m.range[d ? "animate" : "css"]({height:(p - lastValPercent) + "%"}, {queue:false,duration:e.animate})
                    }
                }
                lastValPercent = p
            })
        } else {
            var k = this.value(),h = this._valueMin(),l = this._valueMax(),f = l != h ? (k - h) / (l - h) * 100 : 0;
            var c = {};
            c[m.orientation == "horizontal" ? "left" : "bottom"] = f + "%";
            this.handle.stop(1, 1)[d ? "animate" : "css"](c, e.animate);
            (g == "min") && (this.orientation == "horizontal") && this.range.stop(1, 1)[d ? "animate" : "css"]({width:f + "%"}, e.animate);
            (g == "max") && (this.orientation == "horizontal") && this.range[d ? "animate" : "css"]({width:(100 - f) + "%"}, {queue:false,duration:e.animate});
            (g == "min") && (this.orientation == "vertical") && this.range.stop(1, 1)[d ? "animate" : "css"]({height:f + "%"}, e.animate);
            (g == "max") && (this.orientation == "vertical") && this.range[d ? "animate" : "css"]({height:(100 - f) + "%"}, {queue:false,duration:e.animate})
        }
    }});
    b.extend(b.ui.slider, {version:"1.8"})
})(jQuery);
;
/*
 * jQuery UI Tabs 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Tabs
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function(c) {
    var b = 0,a = 0;
    c.widget("ui.tabs", {options:{add:null,ajaxOptions:null,cache:false,cookie:null,collapsible:false,disable:null,disabled:[],enable:null,event:"click",fx:null,idPrefix:"ui-tabs-",load:null,panelTemplate:"<div></div>",remove:null,select:null,show:null,spinner:"<em>Loading&#8230;</em>",tabTemplate:'<li><a href="#{href}"><span>#{label}</span></a></li>'},_create:function() {
        this._tabify(true)
    },_setOption:function(d, e) {
        if (d == "selected") {
            if (this.options.collapsible && e == this.options.selected) {
                return
            }
            this.select(e)
        } else {
            this.options[d] = e;
            this._tabify()
        }
    },_tabId:function(d) {
        return d.title && d.title.replace(/\s/g, "_").replace(/[^A-Za-z0-9\-_:\.]/g, "") || this.options.idPrefix + (++b)
    },_sanitizeSelector:function(d) {
        return d.replace(/:/g, "\\:")
    },_cookie:function() {
        var d = this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + (++a));
        return c.cookie.apply(null, [d].concat(c.makeArray(arguments)))
    },_ui:function(e, d) {
        return{tab:e,panel:d,index:this.anchors.index(e)}
    },_cleanup:function() {
        this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function() {
            var d = c(this);
            d.html(d.data("label.tabs")).removeData("label.tabs")
        })
    },_tabify:function(q) {
        this.list = this.element.find("ol,ul").eq(0);
        this.lis = c("li:has(a[href])", this.list);
        this.anchors = this.lis.map(function() {
            return c("a", this)[0]
        });
        this.panels = c([]);
        var r = this,f = this.options;
        var e = /^#.+/;
        this.anchors.each(function(u, o) {
            var s = c(o).attr("href");
            var v = s.split("#")[0],w;
            if (v && (v === location.toString().split("#")[0] || (w = c("base")[0]) && v === w.href)) {
                s = o.hash;
                o.href = s
            }
            if (e.test(s)) {
                r.panels = r.panels.add(r._sanitizeSelector(s))
            } else {
                if (s != "#") {
                    c.data(o, "href.tabs", s);
                    c.data(o, "load.tabs", s.replace(/#.*$/, ""));
                    var y = r._tabId(o);
                    o.href = "#" + y;
                    var x = c("#" + y);
                    if (!x.length) {
                        x = c(f.panelTemplate).attr("id", y).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(r.panels[u - 1] || r.list);
                        x.data("destroy.tabs", true)
                    }
                    r.panels = r.panels.add(x)
                } else {
                    f.disabled.push(u)
                }
            }
        });
        if (q) {
            this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
            this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
            this.lis.addClass("ui-state-default ui-corner-top");
            this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");
            if (f.selected === undefined) {
                if (location.hash) {
                    this.anchors.each(function(s, o) {
                        if (o.hash == location.hash) {
                            f.selected = s;
                            return false
                        }
                    })
                }
                if (typeof f.selected != "number" && f.cookie) {
                    f.selected = parseInt(r._cookie(), 10)
                }
                if (typeof f.selected != "number" && this.lis.filter(".ui-tabs-selected").length) {
                    f.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"))
                }
                f.selected = f.selected || (this.lis.length ? 0 : -1)
            } else {
                if (f.selected === null) {
                    f.selected = -1
                }
            }
            f.selected = ((f.selected >= 0 && this.anchors[f.selected]) || f.selected < 0) ? f.selected : 0;
            f.disabled = c.unique(f.disabled.concat(c.map(this.lis.filter(".ui-state-disabled"), function(s, o) {
                return r.lis.index(s)
            }))).sort();
            if (c.inArray(f.selected, f.disabled) != -1) {
                f.disabled.splice(c.inArray(f.selected, f.disabled), 1)
            }
            this.panels.addClass("ui-tabs-hide");
            this.lis.removeClass("ui-tabs-selected ui-state-active");
            if (f.selected >= 0 && this.anchors.length) {
                this.panels.eq(f.selected).removeClass("ui-tabs-hide");
                this.lis.eq(f.selected).addClass("ui-tabs-selected ui-state-active");
                r.element.queue("tabs", function() {
                    r._trigger("show", null, r._ui(r.anchors[f.selected], r.panels[f.selected]))
                });
                this.load(f.selected)
            }
            c(window).bind("unload", function() {
                r.lis.add(r.anchors).unbind(".tabs");
                r.lis = r.anchors = r.panels = null
            })
        } else {
            f.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"))
        }
        this.element[f.collapsible ? "addClass" : "removeClass"]("ui-tabs-collapsible");
        if (f.cookie) {
            this._cookie(f.selected, f.cookie)
        }
        for (var j = 0,p; (p = this.lis[j]); j++) {
            c(p)[c.inArray(j, f.disabled) != -1 && !c(p).hasClass("ui-tabs-selected") ? "addClass" : "removeClass"]("ui-state-disabled")
        }
        if (f.cache === false) {
            this.anchors.removeData("cache.tabs")
        }
        this.lis.add(this.anchors).unbind(".tabs");
        if (f.event != "mouseover") {
            var h = function(o, i) {
                if (i.is(":not(.ui-state-disabled)")) {
                    i.addClass("ui-state-" + o)
                }
            };
            var l = function(o, i) {
                i.removeClass("ui-state-" + o)
            };
            this.lis.bind("mouseover.tabs", function() {
                h("hover", c(this))
            });
            this.lis.bind("mouseout.tabs", function() {
                l("hover", c(this))
            });
            this.anchors.bind("focus.tabs", function() {
                h("focus", c(this).closest("li"))
            });
            this.anchors.bind("blur.tabs", function() {
                l("focus", c(this).closest("li"))
            })
        }
        var d,k;
        if (f.fx) {
            if (c.isArray(f.fx)) {
                d = f.fx[0];
                k = f.fx[1]
            } else {
                d = k = f.fx
            }
        }
        function g(i, o) {
            i.css({display:""});
            if (!c.support.opacity && o.opacity) {
                i[0].style.removeAttribute("filter")
            }
        }

        var m = k ? function(i, o) {
            c(i).closest("li").addClass("ui-tabs-selected ui-state-active");
            o.hide().removeClass("ui-tabs-hide").animate(k, k.duration || "normal", function() {
                g(o, k);
                r._trigger("show", null, r._ui(i, o[0]))
            })
        } : function(i, o) {
            c(i).closest("li").addClass("ui-tabs-selected ui-state-active");
            o.removeClass("ui-tabs-hide");
            r._trigger("show", null, r._ui(i, o[0]))
        };
        var n = d ? function(o, i) {
            i.animate(d, d.duration || "normal", function() {
                r.lis.removeClass("ui-tabs-selected ui-state-active");
                i.addClass("ui-tabs-hide");
                g(i, d);
                r.element.dequeue("tabs")
            })
        } : function(o, i, s) {
            r.lis.removeClass("ui-tabs-selected ui-state-active");
            i.addClass("ui-tabs-hide");
            r.element.dequeue("tabs")
        };
        this.anchors.bind(f.event + ".tabs", function() {
            var o = this,u = c(this).closest("li"),i = r.panels.filter(":not(.ui-tabs-hide)"),s = c(r._sanitizeSelector(this.hash));
            if ((u.hasClass("ui-tabs-selected") && !f.collapsible) || u.hasClass("ui-state-disabled") || u.hasClass("ui-state-processing") || r._trigger("select", null, r._ui(this, s[0])) === false) {
                this.blur();
                return false
            }
            f.selected = r.anchors.index(this);
            r.abort();
            if (f.collapsible) {
                if (u.hasClass("ui-tabs-selected")) {
                    f.selected = -1;
                    if (f.cookie) {
                        r._cookie(f.selected, f.cookie)
                    }
                    r.element.queue("tabs",
                            function() {
                                n(o, i)
                            }).dequeue("tabs");
                    this.blur();
                    return false
                } else {
                    if (!i.length) {
                        if (f.cookie) {
                            r._cookie(f.selected, f.cookie)
                        }
                        r.element.queue("tabs", function() {
                            m(o, s)
                        });
                        r.load(r.anchors.index(this));
                        this.blur();
                        return false
                    }
                }
            }
            if (f.cookie) {
                r._cookie(f.selected, f.cookie)
            }
            if (s.length) {
                if (i.length) {
                    r.element.queue("tabs", function() {
                        n(o, i)
                    })
                }
                r.element.queue("tabs", function() {
                    m(o, s)
                });
                r.load(r.anchors.index(this))
            } else {
                throw"jQuery UI Tabs: Mismatching fragment identifier."
            }
            if (c.browser.msie) {
                this.blur()
            }
        });
        this.anchors.bind("click.tabs", function() {
            return false
        })
    },destroy:function() {
        var d = this.options;
        this.abort();
        this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");
        this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
        this.anchors.each(function() {
            var e = c.data(this, "href.tabs");
            if (e) {
                this.href = e
            }
            var f = c(this).unbind(".tabs");
            c.each(["href","load","cache"], function(g, h) {
                f.removeData(h + ".tabs")
            })
        });
        this.lis.unbind(".tabs").add(this.panels).each(function() {
            if (c.data(this, "destroy.tabs")) {
                c(this).remove()
            } else {
                c(this).removeClass(["ui-state-default","ui-corner-top","ui-tabs-selected","ui-state-active","ui-state-hover","ui-state-focus","ui-state-disabled","ui-tabs-panel","ui-widget-content","ui-corner-bottom","ui-tabs-hide"].join(" "))
            }
        });
        if (d.cookie) {
            this._cookie(null, d.cookie)
        }
        return this
    },add:function(g, f, e) {
        if (e === undefined) {
            e = this.anchors.length
        }
        var d = this,i = this.options,k = c(i.tabTemplate.replace(/#\{href\}/g, g).replace(/#\{label\}/g, f)),j = !g.indexOf("#") ? g.replace("#", "") : this._tabId(c("a", k)[0]);
        k.addClass("ui-state-default ui-corner-top").data("destroy.tabs", true);
        var h = c("#" + j);
        if (!h.length) {
            h = c(i.panelTemplate).attr("id", j).data("destroy.tabs", true)
        }
        h.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");
        if (e >= this.lis.length) {
            k.appendTo(this.list);
            h.appendTo(this.list[0].parentNode)
        } else {
            k.insertBefore(this.lis[e]);
            h.insertBefore(this.panels[e])
        }
        i.disabled = c.map(i.disabled, function(m, l) {
            return m >= e ? ++m : m
        });
        this._tabify();
        if (this.anchors.length == 1) {
            i.selected = 0;
            k.addClass("ui-tabs-selected ui-state-active");
            h.removeClass("ui-tabs-hide");
            this.element.queue("tabs", function() {
                d._trigger("show", null, d._ui(d.anchors[0], d.panels[0]))
            });
            this.load(0)
        }
        this._trigger("add", null, this._ui(this.anchors[e], this.panels[e]));
        return this
    },remove:function(d) {
        var f = this.options,g = this.lis.eq(d).remove(),e = this.panels.eq(d).remove();
        if (g.hasClass("ui-tabs-selected") && this.anchors.length > 1) {
            this.select(d + (d + 1 < this.anchors.length ? 1 : -1))
        }
        f.disabled = c.map(c.grep(f.disabled, function(j, h) {
            return j != d
        }), function(j, h) {
            return j >= d ? --j : j
        });
        this._tabify();
        this._trigger("remove", null, this._ui(g.find("a")[0], e[0]));
        return this
    },enable:function(d) {
        var e = this.options;
        if (c.inArray(d, e.disabled) == -1) {
            return
        }
        this.lis.eq(d).removeClass("ui-state-disabled");
        e.disabled = c.grep(e.disabled, function(g, f) {
            return g != d
        });
        this._trigger("enable", null, this._ui(this.anchors[d], this.panels[d]));
        return this
    },disable:function(e) {
        var d = this,f = this.options;
        if (e != f.selected) {
            this.lis.eq(e).addClass("ui-state-disabled");
            f.disabled.push(e);
            f.disabled.sort();
            this._trigger("disable", null, this._ui(this.anchors[e], this.panels[e]))
        }
        return this
    },select:function(d) {
        if (typeof d == "string") {
            d = this.anchors.index(this.anchors.filter("[href$=" + d + "]"))
        } else {
            if (d === null) {
                d = -1
            }
        }
        if (d == -1 && this.options.collapsible) {
            d = this.options.selected
        }
        this.anchors.eq(d).trigger(this.options.event + ".tabs");
        return this
    },load:function(g) {
        var e = this,i = this.options,d = this.anchors.eq(g)[0],f = c.data(d, "load.tabs");
        this.abort();
        if (!f || this.element.queue("tabs").length !== 0 && c.data(d, "cache.tabs")) {
            this.element.dequeue("tabs");
            return
        }
        this.lis.eq(g).addClass("ui-state-processing");
        if (i.spinner) {
            var h = c("span", d);
            h.data("label.tabs", h.html()).html(i.spinner)
        }
        this.xhr = c.ajax(c.extend({}, i.ajaxOptions, {url:f,success:function(k, j) {
            c(e._sanitizeSelector(d.hash)).html(k);
            e._cleanup();
            if (i.cache) {
                c.data(d, "cache.tabs", true)
            }
            e._trigger("load", null, e._ui(e.anchors[g], e.panels[g]));
            try {
                i.ajaxOptions.success(k, j)
            } catch(l) {
            }
        },error:function(l, j, k) {
            e._cleanup();
            e._trigger("load", null, e._ui(e.anchors[g], e.panels[g]));
            try {
                i.ajaxOptions.error(l, j, g, d)
            } catch(k) {
            }
        }}));
        e.element.dequeue("tabs");
        return this
    },abort:function() {
        this.element.queue([]);
        this.panels.stop(false, true);
        this.element.queue("tabs", this.element.queue("tabs").splice(-2, 2));
        if (this.xhr) {
            this.xhr.abort();
            delete this.xhr
        }
        this._cleanup();
        return this
    },url:function(e, d) {
        this.anchors.eq(e).removeData("cache.tabs").data("load.tabs", d);
        return this
    },length:function() {
        return this.anchors.length
    }});
    c.extend(c.ui.tabs, {version:"1.8"});
    c.extend(c.ui.tabs.prototype, {rotation:null,rotate:function(f, h) {
        var d = this,i = this.options;
        var e = d._rotate || (d._rotate = function(j) {
            clearTimeout(d.rotation);
            d.rotation = setTimeout(function() {
                var k = i.selected;
                d.select(++k < d.anchors.length ? k : 0)
            }, f);
            if (j) {
                j.stopPropagation()
            }
        });
        var g = d._unrotate || (d._unrotate = !h ? function(j) {
            if (j.clientX) {
                d.rotate(null)
            }
        } : function(j) {
            t = i.selected;
            e()
        });
        if (f) {
            this.element.bind("tabsshow", e);
            this.anchors.bind(i.event + ".tabs", g);
            e()
        } else {
            clearTimeout(d.rotation);
            this.element.unbind("tabsshow", e);
            this.anchors.unbind(i.event + ".tabs", g);
            delete this._rotate;
            delete this._unrotate
        }
        return this
    }})
})(jQuery);
;
/*
 * jQuery UI Datepicker 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Datepicker
 *
 * Depends:
 *	jquery.ui.core.js
 */
(function($) {
    $.extend($.ui, {datepicker:{version:"1.8"}});
    var PROP_NAME = "datepicker";
    var dpuuid = new Date().getTime();

    function Datepicker() {
        this.debug = false;
        this._curInst = null;
        this._keyEvent = false;
        this._disabledInputs = [];
        this._datepickerShowing = false;
        this._inDialog = false;
        this._mainDivId = "ui-datepicker-div";
        this._inlineClass = "ui-datepicker-inline";
        this._appendClass = "ui-datepicker-append";
        this._triggerClass = "ui-datepicker-trigger";
        this._dialogClass = "ui-datepicker-dialog";
        this._disableClass = "ui-datepicker-disabled";
        this._unselectableClass = "ui-datepicker-unselectable";
        this._currentClass = "ui-datepicker-current-day";
        this._dayOverClass = "ui-datepicker-days-cell-over";
        this.regional = [];
        this.regional[""] = {closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:false,showMonthAfterYear:false,yearSuffix:""};
        this._defaults = {showOn:"focus",showAnim:"show",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:false,hideIfNoPrevNext:false,navigationAsDateFormat:false,gotoCurrent:false,changeMonth:false,changeYear:false,yearRange:"c-10:c+10",showOtherMonths:false,selectOtherMonths:false,showWeek:false,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"_default",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:true,showButtonPanel:false,autoSize:false};
        $.extend(this._defaults, this.regional[""]);
        this.dpDiv = $('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all ui-helper-hidden-accessible"></div>')
    }

    $.extend(Datepicker.prototype, {markerClassName:"hasDatepicker",log:function() {
        if (this.debug) {
            console.log.apply("", arguments)
        }
    },_widgetDatepicker:function() {
        return this.dpDiv
    },setDefaults:function(settings) {
        extendRemove(this._defaults, settings || {});
        return this
    },_attachDatepicker:function(target, settings) {
        var inlineSettings = null;
        for (var attrName in this._defaults) {
            var attrValue = target.getAttribute("date:" + attrName);
            if (attrValue) {
                inlineSettings = inlineSettings || {};
                try {
                    inlineSettings[attrName] = eval(attrValue)
                } catch(err) {
                    inlineSettings[attrName] = attrValue
                }
            }
        }
        var nodeName = target.nodeName.toLowerCase();
        var inline = (nodeName == "div" || nodeName == "span");
        if (!target.id) {
            target.id = "dp" + (++this.uuid)
        }
        var inst = this._newInst($(target), inline);
        inst.settings = $.extend({}, settings || {}, inlineSettings || {});
        if (nodeName == "input") {
            this._connectDatepicker(target, inst)
        } else {
            if (inline) {
                this._inlineDatepicker(target, inst)
            }
        }
    },_newInst:function(target, inline) {
        var id = target[0].id.replace(/([^A-Za-z0-9_])/g, "\\\\$1");
        return{id:id,input:target,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:inline,dpDiv:(!inline ? this.dpDiv : $('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))}
    },_connectDatepicker:function(target, inst) {
        var input = $(target);
        inst.append = $([]);
        inst.trigger = $([]);
        if (input.hasClass(this.markerClassName)) {
            return
        }
        this._attachments(input, inst);
        input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",
                function(event, key, value) {
                    inst.settings[key] = value
                }).bind("getData.datepicker", function(event, key) {
            return this._get(inst, key)
        });
        this._autoSize(inst);
        $.data(target, PROP_NAME, inst)
    },_attachments:function(input, inst) {
        var appendText = this._get(inst, "appendText");
        var isRTL = this._get(inst, "isRTL");
        if (inst.append) {
            inst.append.remove()
        }
        if (appendText) {
            inst.append = $('<span class="' + this._appendClass + '">' + appendText + "</span>");
            input[isRTL ? "before" : "after"](inst.append)
        }
        input.unbind("focus", this._showDatepicker);
        if (inst.trigger) {
            inst.trigger.remove()
        }
        var showOn = this._get(inst, "showOn");
        if (showOn == "focus" || showOn == "both") {
            input.focus(this._showDatepicker)
        }
        if (showOn == "button" || showOn == "both") {
            var buttonText = this._get(inst, "buttonText");
            var buttonImage = this._get(inst, "buttonImage");
            inst.trigger = $(this._get(inst, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({src:buttonImage,alt:buttonText,title:buttonText}) : $('<button type="button"></button>').addClass(this._triggerClass).html(buttonImage == "" ? buttonText : $("<img/>").attr({src:buttonImage,alt:buttonText,title:buttonText})));
            input[isRTL ? "before" : "after"](inst.trigger);
            inst.trigger.click(function() {
                if ($.datepicker._datepickerShowing && $.datepicker._lastInput == input[0]) {
                    $.datepicker._hideDatepicker()
                } else {
                    $.datepicker._showDatepicker(input[0])
                }
                return false
            })
        }
    },_autoSize:function(inst) {
        if (this._get(inst, "autoSize") && !inst.inline) {
            var date = new Date(2009, 12 - 1, 20);
            var dateFormat = this._get(inst, "dateFormat");
            if (dateFormat.match(/[DM]/)) {
                var findMax = function(names) {
                    var max = 0;
                    var maxI = 0;
                    for (var i = 0; i < names.length; i++) {
                        if (names[i].length > max) {
                            max = names[i].length;
                            maxI = i
                        }
                    }
                    return maxI
                };
                date.setMonth(findMax(this._get(inst, (dateFormat.match(/MM/) ? "monthNames" : "monthNamesShort"))));
                date.setDate(findMax(this._get(inst, (dateFormat.match(/DD/) ? "dayNames" : "dayNamesShort"))) + 20 - date.getDay())
            }
            inst.input.attr("size", this._formatDate(inst, date).length)
        }
    },_inlineDatepicker:function(target, inst) {
        var divSpan = $(target);
        if (divSpan.hasClass(this.markerClassName)) {
            return
        }
        divSpan.addClass(this.markerClassName).append(inst.dpDiv).bind("setData.datepicker",
                function(event, key, value) {
                    inst.settings[key] = value
                }).bind("getData.datepicker", function(event, key) {
            return this._get(inst, key)
        });
        $.data(target, PROP_NAME, inst);
        this._setDate(inst, this._getDefaultDate(inst), true);
        this._updateDatepicker(inst);
        this._updateAlternate(inst)
    },_dialogDatepicker:function(input, date, onSelect, settings, pos) {
        var inst = this._dialogInst;
        if (!inst) {
            var id = "dp" + (++this.uuid);
            this._dialogInput = $('<input type="text" id="' + id + '" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');
            this._dialogInput.keydown(this._doKeyDown);
            $("body").append(this._dialogInput);
            inst = this._dialogInst = this._newInst(this._dialogInput, false);
            inst.settings = {};
            $.data(this._dialogInput[0], PROP_NAME, inst)
        }
        extendRemove(inst.settings, settings || {});
        date = (date && date.constructor == Date ? this._formatDate(inst, date) : date);
        this._dialogInput.val(date);
        this._pos = (pos ? (pos.length ? pos : [pos.pageX,pos.pageY]) : null);
        if (!this._pos) {
            var browserWidth = document.documentElement.clientWidth;
            var browserHeight = document.documentElement.clientHeight;
            var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
            var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
            this._pos = [(browserWidth / 2) - 100 + scrollX,(browserHeight / 2) - 150 + scrollY]
        }
        this._dialogInput.css("left", (this._pos[0] + 20) + "px").css("top", this._pos[1] + "px");
        inst.settings.onSelect = onSelect;
        this._inDialog = true;
        this.dpDiv.addClass(this._dialogClass);
        this._showDatepicker(this._dialogInput[0]);
        if ($.blockUI) {
            $.blockUI(this.dpDiv)
        }
        $.data(this._dialogInput[0], PROP_NAME, inst);
        return this
    },_destroyDatepicker:function(target) {
        var $target = $(target);
        var inst = $.data(target, PROP_NAME);
        if (!$target.hasClass(this.markerClassName)) {
            return
        }
        var nodeName = target.nodeName.toLowerCase();
        $.removeData(target, PROP_NAME);
        if (nodeName == "input") {
            inst.append.remove();
            inst.trigger.remove();
            $target.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)
        } else {
            if (nodeName == "div" || nodeName == "span") {
                $target.removeClass(this.markerClassName).empty()
            }
        }
    },_enableDatepicker:function(target) {
        var $target = $(target);
        var inst = $.data(target, PROP_NAME);
        if (!$target.hasClass(this.markerClassName)) {
            return
        }
        var nodeName = target.nodeName.toLowerCase();
        if (nodeName == "input") {
            target.disabled = false;
            inst.trigger.filter("button").each(
                    function() {
                        this.disabled = false
                    }).end().filter("img").css({opacity:"1.0",cursor:""})
        } else {
            if (nodeName == "div" || nodeName == "span") {
                var inline = $target.children("." + this._inlineClass);
                inline.children().removeClass("ui-state-disabled")
            }
        }
        this._disabledInputs = $.map(this._disabledInputs, function(value) {
            return(value == target ? null : value)
        })
    },_disableDatepicker:function(target) {
        var $target = $(target);
        var inst = $.data(target, PROP_NAME);
        if (!$target.hasClass(this.markerClassName)) {
            return
        }
        var nodeName = target.nodeName.toLowerCase();
        if (nodeName == "input") {
            target.disabled = true;
            inst.trigger.filter("button").each(
                    function() {
                        this.disabled = true
                    }).end().filter("img").css({opacity:"0.5",cursor:"default"})
        } else {
            if (nodeName == "div" || nodeName == "span") {
                var inline = $target.children("." + this._inlineClass);
                inline.children().addClass("ui-state-disabled")
            }
        }
        this._disabledInputs = $.map(this._disabledInputs, function(value) {
            return(value == target ? null : value)
        });
        this._disabledInputs[this._disabledInputs.length] = target
    },_isDisabledDatepicker:function(target) {
        if (!target) {
            return false
        }
        for (var i = 0; i < this._disabledInputs.length; i++) {
            if (this._disabledInputs[i] == target) {
                return true
            }
        }
        return false
    },_getInst:function(target) {
        try {
            return $.data(target, PROP_NAME)
        } catch(err) {
            throw"Missing instance data for this datepicker"
        }
    },_optionDatepicker:function(target, name, value) {
        var inst = this._getInst(target);
        if (arguments.length == 2 && typeof name == "string") {
            return(name == "defaults" ? $.extend({}, $.datepicker._defaults) : (inst ? (name == "all" ? $.extend({}, inst.settings) : this._get(inst, name)) : null))
        }
        var settings = name || {};
        if (typeof name == "string") {
            settings = {};
            settings[name] = value
        }
        if (inst) {
            if (this._curInst == inst) {
                this._hideDatepicker()
            }
            var date = this._getDateDatepicker(target, true);
            extendRemove(inst.settings, settings);
            this._attachments($(target), inst);
            this._autoSize(inst);
            this._setDateDatepicker(target, date);
            this._updateDatepicker(inst)
        }
    },_changeDatepicker:function(target, name, value) {
        this._optionDatepicker(target, name, value)
    },_refreshDatepicker:function(target) {
        var inst = this._getInst(target);
        if (inst) {
            this._updateDatepicker(inst)
        }
    },_setDateDatepicker:function(target, date) {
        var inst = this._getInst(target);
        if (inst) {
            this._setDate(inst, date);
            this._updateDatepicker(inst);
            this._updateAlternate(inst)
        }
    },_getDateDatepicker:function(target, noDefault) {
        var inst = this._getInst(target);
        if (inst && !inst.inline) {
            this._setDateFromField(inst, noDefault)
        }
        return(inst ? this._getDate(inst) : null)
    },_doKeyDown:function(event) {
        var inst = $.datepicker._getInst(event.target);
        var handled = true;
        var isRTL = inst.dpDiv.is(".ui-datepicker-rtl");
        inst._keyEvent = true;
        if ($.datepicker._datepickerShowing) {
            switch (event.keyCode) {case 9:$.datepicker._hideDatepicker();handled = false;break;case 13:var sel = $("td." + $.datepicker._dayOverClass, inst.dpDiv).add($("td." + $.datepicker._currentClass, inst.dpDiv));if (sel[0]) {
                $.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0])
            } else {
                $.datepicker._hideDatepicker()
            }return false;break;case 27:$.datepicker._hideDatepicker();break;case 33:$.datepicker._adjustDate(event.target, (event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths")), "M");break;case 34:$.datepicker._adjustDate(event.target, (event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths")), "M");break;case 35:if (event.ctrlKey || event.metaKey) {
                $.datepicker._clearDate(event.target)
            }handled = event.ctrlKey || event.metaKey;break;case 36:if (event.ctrlKey || event.metaKey) {
                $.datepicker._gotoToday(event.target)
            }handled = event.ctrlKey || event.metaKey;break;case 37:if (event.ctrlKey || event.metaKey) {
                $.datepicker._adjustDate(event.target, (isRTL ? +1 : -1), "D")
            }handled = event.ctrlKey || event.metaKey;if (event.originalEvent.altKey) {
                $.datepicker._adjustDate(event.target, (event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths")), "M")
            }break;case 38:if (event.ctrlKey || event.metaKey) {
                $.datepicker._adjustDate(event.target, -7, "D")
            }handled = event.ctrlKey || event.metaKey;break;case 39:if (event.ctrlKey || event.metaKey) {
                $.datepicker._adjustDate(event.target, (isRTL ? -1 : +1), "D")
            }handled = event.ctrlKey || event.metaKey;if (event.originalEvent.altKey) {
                $.datepicker._adjustDate(event.target, (event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths")), "M")
            }break;case 40:if (event.ctrlKey || event.metaKey) {
                $.datepicker._adjustDate(event.target, +7, "D")
            }handled = event.ctrlKey || event.metaKey;break;default:handled = false
            }
        } else {
            if (event.keyCode == 36 && event.ctrlKey) {
                $.datepicker._showDatepicker(this)
            } else {
                handled = false
            }
        }
        if (handled) {
            event.preventDefault();
            event.stopPropagation()
        }
    },_doKeyPress:function(event) {
        var inst = $.datepicker._getInst(event.target);
        if ($.datepicker._get(inst, "constrainInput")) {
            var chars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat"));
            var chr = String.fromCharCode(event.charCode == undefined ? event.keyCode : event.charCode);
            return event.ctrlKey || (chr < " " || !chars || chars.indexOf(chr) > -1)
        }
    },_doKeyUp:function(event) {
        var inst = $.datepicker._getInst(event.target);
        if (inst.input.val() != inst.lastVal) {
            try {
                var date = $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), (inst.input ? inst.input.val() : null), $.datepicker._getFormatConfig(inst));
                if (date) {
                    $.datepicker._setDateFromField(inst);
                    $.datepicker._updateAlternate(inst);
                    $.datepicker._updateDatepicker(inst)
                }
            } catch(event) {
                $.datepicker.log(event)
            }
        }
        return true
    },_showDatepicker:function(input) {
        input = input.target || input;
        if (input.nodeName.toLowerCase() != "input") {
            input = $("input", input.parentNode)[0]
        }
        if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput == input) {
            return
        }
        var inst = $.datepicker._getInst(input);
        if ($.datepicker._curInst && $.datepicker._curInst != inst) {
            $.datepicker._curInst.dpDiv.stop(true, true)
        }
        var beforeShow = $.datepicker._get(inst, "beforeShow");
        extendRemove(inst.settings, (beforeShow ? beforeShow.apply(input, [input,inst]) : {}));
        inst.lastVal = null;
        $.datepicker._lastInput = input;
        $.datepicker._setDateFromField(inst);
        if ($.datepicker._inDialog) {
            input.value = ""
        }
        if (!$.datepicker._pos) {
            $.datepicker._pos = $.datepicker._findPos(input);
            $.datepicker._pos[1] += input.offsetHeight
        }
        var isFixed = false;
        $(input).parents().each(function() {
            isFixed |= $(this).css("position") == "fixed";
            return !isFixed
        });
        if (isFixed && $.browser.opera) {
            $.datepicker._pos[0] -= document.documentElement.scrollLeft;
            $.datepicker._pos[1] -= document.documentElement.scrollTop
        }
        var offset = {left:$.datepicker._pos[0],top:$.datepicker._pos[1]};
        $.datepicker._pos = null;
        inst.dpDiv.css({position:"absolute",display:"block",top:"-1000px"});
        $.datepicker._updateDatepicker(inst);
        offset = $.datepicker._checkOffset(inst, offset, isFixed);
        inst.dpDiv.css({position:($.datepicker._inDialog && $.blockUI ? "static" : (isFixed ? "fixed" : "absolute")),display:"none",left:offset.left + "px",top:offset.top + "px"});
        if (!inst.inline) {
            var showAnim = $.datepicker._get(inst, "showAnim");
            var duration = $.datepicker._get(inst, "duration");
            var postProcess = function() {
                $.datepicker._datepickerShowing = true;
                var borders = $.datepicker._getBorders(inst.dpDiv);
                inst.dpDiv.find("iframe.ui-datepicker-cover").css({left:-borders[0],top:-borders[1],width:inst.dpDiv.outerWidth(),height:inst.dpDiv.outerHeight()})
            };
            inst.dpDiv.zIndex($(input).zIndex() + 1);
            if ($.effects && $.effects[showAnim]) {
                inst.dpDiv.show(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess)
            } else {
                inst.dpDiv[showAnim || "show"]((showAnim ? duration : null), postProcess)
            }
            if (!showAnim || !duration) {
                postProcess()
            }
            if (inst.input.is(":visible") && !inst.input.is(":disabled")) {
                inst.input.focus()
            }
            $.datepicker._curInst = inst
        }
    },_updateDatepicker:function(inst) {
        var self = this;
        var borders = $.datepicker._getBorders(inst.dpDiv);
        inst.dpDiv.empty().append(this._generateHTML(inst)).find("iframe.ui-datepicker-cover").css({left:-borders[0],top:-borders[1],width:inst.dpDiv.outerWidth(),height:inst.dpDiv.outerHeight()}).end().find("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a").bind("mouseout",
                function() {
                    $(this).removeClass("ui-state-hover");
                    if (this.className.indexOf("ui-datepicker-prev") != -1) {
                        $(this).removeClass("ui-datepicker-prev-hover")
                    }
                    if (this.className.indexOf("ui-datepicker-next") != -1) {
                        $(this).removeClass("ui-datepicker-next-hover")
                    }
                }).bind("mouseover",
                function() {
                    if (!self._isDisabledDatepicker(inst.inline ? inst.dpDiv.parent()[0] : inst.input[0])) {
                        $(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
                        $(this).addClass("ui-state-hover");
                        if (this.className.indexOf("ui-datepicker-prev") != -1) {
                            $(this).addClass("ui-datepicker-prev-hover")
                        }
                        if (this.className.indexOf("ui-datepicker-next") != -1) {
                            $(this).addClass("ui-datepicker-next-hover")
                        }
                    }
                }).end().find("." + this._dayOverClass + " a").trigger("mouseover").end();
        var numMonths = this._getNumberOfMonths(inst);
        var cols = numMonths[1];
        var width = 17;
        if (cols > 1) {
            inst.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width", (width * cols) + "em")
        } else {
            inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("")
        }
        inst.dpDiv[(numMonths[0] != 1 || numMonths[1] != 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi");
        inst.dpDiv[(this._get(inst, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
        if (inst == $.datepicker._curInst && $.datepicker._datepickerShowing && inst.input && inst.input.is(":visible") && !inst.input.is(":disabled")) {
            inst.input.focus()
        }
    },_getBorders:function(elem) {
        var convert = function(value) {
            return{thin:1,medium:2,thick:3}[value] || value
        };
        return[parseFloat(convert(elem.css("border-left-width"))),parseFloat(convert(elem.css("border-top-width")))]
    },_checkOffset:function(inst, offset, isFixed) {
        var dpWidth = inst.dpDiv.outerWidth();
        var dpHeight = inst.dpDiv.outerHeight();
        var inputWidth = inst.input ? inst.input.outerWidth() : 0;
        var inputHeight = inst.input ? inst.input.outerHeight() : 0;
        var viewWidth = document.documentElement.clientWidth + $(document).scrollLeft();
        var viewHeight = document.documentElement.clientHeight + $(document).scrollTop();
        offset.left -= (this._get(inst, "isRTL") ? (dpWidth - inputWidth) : 0);
        offset.left -= (isFixed && offset.left == inst.input.offset().left) ? $(document).scrollLeft() : 0;
        offset.top -= (isFixed && offset.top == (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;
        offset.left -= Math.min(offset.left, (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ? Math.abs(offset.left + dpWidth - viewWidth) : 0);
        offset.top -= Math.min(offset.top, (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ? Math.abs(dpHeight + inputHeight) : 0);
        return offset
    },_findPos:function(obj) {
        var inst = this._getInst(obj);
        var isRTL = this._get(inst, "isRTL");
        while (obj && (obj.type == "hidden" || obj.nodeType != 1)) {
            obj = obj[isRTL ? "previousSibling" : "nextSibling"]
        }
        var position = $(obj).offset();
        return[position.left,position.top]
    },_hideDatepicker:function(input) {
        var inst = this._curInst;
        if (!inst || (input && inst != $.data(input, PROP_NAME))) {
            return
        }
        if (this._datepickerShowing) {
            var showAnim = this._get(inst, "showAnim");
            var duration = this._get(inst, "duration");
            var postProcess = function() {
                $.datepicker._tidyDialog(inst);
                this._curInst = null
            };
            if ($.effects && $.effects[showAnim]) {
                inst.dpDiv.hide(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess)
            } else {
                inst.dpDiv[(showAnim == "slideDown" ? "slideUp" : (showAnim == "fadeIn" ? "fadeOut" : "hide"))]((showAnim ? duration : null), postProcess)
            }
            if (!showAnim) {
                postProcess()
            }
            var onClose = this._get(inst, "onClose");
            if (onClose) {
                onClose.apply((inst.input ? inst.input[0] : null), [(inst.input ? inst.input.val() : ""),inst])
            }
            this._datepickerShowing = false;
            this._lastInput = null;
            if (this._inDialog) {
                this._dialogInput.css({position:"absolute",left:"0",top:"-100px"});
                if ($.blockUI) {
                    $.unblockUI();
                    $("body").append(this.dpDiv)
                }
            }
            this._inDialog = false
        }
    },_tidyDialog:function(inst) {
        inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
    },_checkExternalClick:function(event) {
        if (!$.datepicker._curInst) {
            return
        }
        var $target = $(event.target);
        if ($target[0].id != $.datepicker._mainDivId && $target.parents("#" + $.datepicker._mainDivId).length == 0 && !$target.hasClass($.datepicker.markerClassName) && !$target.hasClass($.datepicker._triggerClass) && $.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI)) {
            $.datepicker._hideDatepicker()
        }
    },_adjustDate:function(id, offset, period) {
        var target = $(id);
        var inst = this._getInst(target[0]);
        if (this._isDisabledDatepicker(target[0])) {
            return
        }
        this._adjustInstDate(inst, offset + (period == "M" ? this._get(inst, "showCurrentAtPos") : 0), period);
        this._updateDatepicker(inst)
    },_gotoToday:function(id) {
        var target = $(id);
        var inst = this._getInst(target[0]);
        if (this._get(inst, "gotoCurrent") && inst.currentDay) {
            inst.selectedDay = inst.currentDay;
            inst.drawMonth = inst.selectedMonth = inst.currentMonth;
            inst.drawYear = inst.selectedYear = inst.currentYear
        } else {
            var date = new Date();
            inst.selectedDay = date.getDate();
            inst.drawMonth = inst.selectedMonth = date.getMonth();
            inst.drawYear = inst.selectedYear = date.getFullYear()
        }
        this._notifyChange(inst);
        this._adjustDate(target)
    },_selectMonthYear:function(id, select, period) {
        var target = $(id);
        var inst = this._getInst(target[0]);
        inst._selectingMonthYear = false;
        inst["selected" + (period == "M" ? "Month" : "Year")] = inst["draw" + (period == "M" ? "Month" : "Year")] = parseInt(select.options[select.selectedIndex].value, 10);
        this._notifyChange(inst);
        this._adjustDate(target)
    },_clickMonthYear:function(id) {
        var target = $(id);
        var inst = this._getInst(target[0]);
        if (inst.input && inst._selectingMonthYear && !$.browser.msie) {
            inst.input.focus()
        }
        inst._selectingMonthYear = !inst._selectingMonthYear
    },_selectDay:function(id, month, year, td) {
        var target = $(id);
        if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
            return
        }
        var inst = this._getInst(target[0]);
        inst.selectedDay = inst.currentDay = $("a", td).html();
        inst.selectedMonth = inst.currentMonth = month;
        inst.selectedYear = inst.currentYear = year;
        this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear))
    },_clearDate:function(id) {
        var target = $(id);
        var inst = this._getInst(target[0]);
        this._selectDate(target, "")
    },_selectDate:function(id, dateStr) {
        var target = $(id);
        var inst = this._getInst(target[0]);
        dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
        if (inst.input) {
            inst.input.val(dateStr)
        }
        this._updateAlternate(inst);
        var onSelect = this._get(inst, "onSelect");
        if (onSelect) {
            onSelect.apply((inst.input ? inst.input[0] : null), [dateStr,inst])
        } else {
            if (inst.input) {
                inst.input.trigger("change")
            }
        }
        if (inst.inline) {
            this._updateDatepicker(inst)
        } else {
            this._hideDatepicker();
            this._lastInput = inst.input[0];
            if (typeof(inst.input[0]) != "object") {
                inst.input.focus()
            }
            this._lastInput = null
        }
    },_updateAlternate:function(inst) {
        var altField = this._get(inst, "altField");
        if (altField) {
            var altFormat = this._get(inst, "altFormat") || this._get(inst, "dateFormat");
            var date = this._getDate(inst);
            var dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
            $(altField).each(function() {
                $(this).val(dateStr)
            })
        }
    },noWeekends:function(date) {
        var day = date.getDay();
        return[(day > 0 && day < 6),""]
    },iso8601Week:function(date) {
        var checkDate = new Date(date.getTime());
        checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
        var time = checkDate.getTime();
        checkDate.setMonth(0);
        checkDate.setDate(1);
        return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1
    },parseDate:function(format, value, settings) {
        if (format == null || value == null) {
            throw"Invalid arguments"
        }
        value = (typeof value == "object" ? value.toString() : value + "");
        if (value == "") {
            return null
        }
        var shortYearCutoff = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff;
        var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
        var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
        var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
        var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
        var year = -1;
        var month = -1;
        var day = -1;
        var doy = -1;
        var literal = false;
        var lookAhead = function(match) {
            var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
            if (matches) {
                iFormat++
            }
            return matches
        };
        var getNumber = function(match) {
            lookAhead(match);
            var size = (match == "@" ? 14 : (match == "!" ? 20 : (match == "y" ? 4 : (match == "o" ? 3 : 2))));
            var digits = new RegExp("^\\d{1," + size + "}");
            var num = value.substring(iValue).match(digits);
            if (!num) {
                throw"Missing number at position " + iValue
            }
            iValue += num[0].length;
            return parseInt(num[0], 10)
        };
        var getName = function(match, shortNames, longNames) {
            var names = (lookAhead(match) ? longNames : shortNames);
            for (var i = 0; i < names.length; i++) {
                if (value.substr(iValue, names[i].length) == names[i]) {
                    iValue += names[i].length;
                    return i + 1
                }
            }
            throw"Unknown name at position " + iValue
        };
        var checkLiteral = function() {
            if (value.charAt(iValue) != format.charAt(iFormat)) {
                throw"Unexpected literal at position " + iValue
            }
            iValue++
        };
        var iValue = 0;
        for (var iFormat = 0; iFormat < format.length; iFormat++) {
            if (literal) {
                if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
                    literal = false
                } else {
                    checkLiteral()
                }
            } else {
                switch (format.charAt(iFormat)) {case"d":day = getNumber("d");break;case"D":getName("D", dayNamesShort, dayNames);break;case"o":doy = getNumber("o");break;case"m":month = getNumber("m");break;case"M":month = getName("M", monthNamesShort, monthNames);break;case"y":year = getNumber("y");break;case"@":var date = new Date(getNumber("@"));year = date.getFullYear();month = date.getMonth() + 1;day = date.getDate();break;case"!":var date = new Date((getNumber("!") - this._ticksTo1970) / 10000);year = date.getFullYear();month = date.getMonth() + 1;day = date.getDate();break;case"'":if (lookAhead("'")) {
                    checkLiteral()
                } else {
                    literal = true
                }break;default:checkLiteral()
                }
            }
        }
        if (year == -1) {
            year = new Date().getFullYear()
        } else {
            if (year < 100) {
                year += new Date().getFullYear() - new Date().getFullYear() % 100 + (year <= shortYearCutoff ? 0 : -100)
            }
        }
        if (doy > -1) {
            month = 1;
            day = doy;
            do{
                var dim = this._getDaysInMonth(year, month - 1);
                if (day <= dim) {
                    break
                }
                month++;
                day -= dim
            } while (true)
        }
        var date = this._daylightSavingAdjust(new Date(year, month - 1, day));
        if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day) {
            throw"Invalid date"
        }
        return date
    },ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:(((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),formatDate:function(format, date, settings) {
        if (!date) {
            return""
        }
        var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
        var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
        var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
        var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
        var lookAhead = function(match) {
            var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
            if (matches) {
                iFormat++
            }
            return matches
        };
        var formatNumber = function(match, value, len) {
            var num = "" + value;
            if (lookAhead(match)) {
                while (num.length < len) {
                    num = "0" + num
                }
            }
            return num
        };
        var formatName = function(match, value, shortNames, longNames) {
            return(lookAhead(match) ? longNames[value] : shortNames[value])
        };
        var output = "";
        var literal = false;
        if (date) {
            for (var iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
                        literal = false
                    } else {
                        output += format.charAt(iFormat)
                    }
                } else {
                    switch (format.charAt(iFormat)) {case"d":output += formatNumber("d", date.getDate(), 2);break;case"D":output += formatName("D", date.getDay(), dayNamesShort, dayNames);break;case"o":output += formatNumber("o", (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000, 3);break;case"m":output += formatNumber("m", date.getMonth() + 1, 2);break;case"M":output += formatName("M", date.getMonth(), monthNamesShort, monthNames);break;case"y":output += (lookAhead("y") ? date.getFullYear() : (date.getYear() % 100 < 10 ? "0" : "") + date.getYear() % 100);break;case"@":output += date.getTime();break;case"!":output += date.getTime() * 10000 + this._ticksTo1970;break;case"'":if (lookAhead("'")) {
                        output += "'"
                    } else {
                        literal = true
                    }break;default:output += format.charAt(iFormat)
                    }
                }
            }
        }
        return output
    },_possibleChars:function(format) {
        var chars = "";
        var literal = false;
        var lookAhead = function(match) {
            var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
            if (matches) {
                iFormat++
            }
            return matches
        };
        for (var iFormat = 0; iFormat < format.length; iFormat++) {
            if (literal) {
                if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
                    literal = false
                } else {
                    chars += format.charAt(iFormat)
                }
            } else {
                switch (format.charAt(iFormat)) {case"d":case"m":case"y":case"@":chars += "0123456789";break;case"D":case"M":return null;case"'":if (lookAhead("'")) {
                    chars += "'"
                } else {
                    literal = true
                }break;default:chars += format.charAt(iFormat)
                }
            }
        }
        return chars
    },_get:function(inst, name) {
        return inst.settings[name] !== undefined ? inst.settings[name] : this._defaults[name]
    },_setDateFromField:function(inst, noDefault) {
        if (inst.input.val() == inst.lastVal) {
            return
        }
        var dateFormat = this._get(inst, "dateFormat");
        var dates = inst.lastVal = inst.input ? inst.input.val() : null;
        var date,defaultDate;
        date = defaultDate = this._getDefaultDate(inst);
        var settings = this._getFormatConfig(inst);
        try {
            date = this.parseDate(dateFormat, dates, settings) || defaultDate
        } catch(event) {
            this.log(event);
            dates = (noDefault ? "" : dates)
        }
        inst.selectedDay = date.getDate();
        inst.drawMonth = inst.selectedMonth = date.getMonth();
        inst.drawYear = inst.selectedYear = date.getFullYear();
        inst.currentDay = (dates ? date.getDate() : 0);
        inst.currentMonth = (dates ? date.getMonth() : 0);
        inst.currentYear = (dates ? date.getFullYear() : 0);
        this._adjustInstDate(inst)
    },_getDefaultDate:function(inst) {
        return this._restrictMinMax(inst, this._determineDate(inst, this._get(inst, "defaultDate"), new Date()))
    },_determineDate:function(inst, date, defaultDate) {
        var offsetNumeric = function(offset) {
            var date = new Date();
            date.setDate(date.getDate() + offset);
            return date
        };
        var offsetString = function(offset) {
            try {
                return $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), offset, $.datepicker._getFormatConfig(inst))
            } catch(e) {
            }
            var date = (offset.toLowerCase().match(/^c/) ? $.datepicker._getDate(inst) : null) || new Date();
            var year = date.getFullYear();
            var month = date.getMonth();
            var day = date.getDate();
            var pattern = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;
            var matches = pattern.exec(offset);
            while (matches) {
                switch (matches[2] || "d") {case"d":case"D":day += parseInt(matches[1], 10);break;case"w":case"W":day += parseInt(matches[1], 10) * 7;break;case"m":case"M":month += parseInt(matches[1], 10);day = Math.min(day, $.datepicker._getDaysInMonth(year, month));break;case"y":case"Y":year += parseInt(matches[1], 10);day = Math.min(day, $.datepicker._getDaysInMonth(year, month));break
                }
                matches = pattern.exec(offset)
            }
            return new Date(year, month, day)
        };
        date = (date == null ? defaultDate : (typeof date == "string" ? offsetString(date) : (typeof date == "number" ? (isNaN(date) ? defaultDate : offsetNumeric(date)) : date)));
        date = (date && date.toString() == "Invalid Date" ? defaultDate : date);
        if (date) {
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0)
        }
        return this._daylightSavingAdjust(date)
    },_daylightSavingAdjust:function(date) {
        if (!date) {
            return null
        }
        date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
        return date
    },_setDate:function(inst, date, noChange) {
        var clear = !(date);
        var origMonth = inst.selectedMonth;
        var origYear = inst.selectedYear;
        date = this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));
        inst.selectedDay = inst.currentDay = date.getDate();
        inst.drawMonth = inst.selectedMonth = inst.currentMonth = date.getMonth();
        inst.drawYear = inst.selectedYear = inst.currentYear = date.getFullYear();
        if ((origMonth != inst.selectedMonth || origYear != inst.selectedYear) && !noChange) {
            this._notifyChange(inst)
        }
        this._adjustInstDate(inst);
        if (inst.input) {
            inst.input.val(clear ? "" : this._formatDate(inst))
        }
    },_getDate:function(inst) {
        var startDate = (!inst.currentYear || (inst.input && inst.input.val() == "") ? null : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
        return startDate
    },_generateHTML:function(inst) {
        var today = new Date();
        today = this._daylightSavingAdjust(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
        var isRTL = this._get(inst, "isRTL");
        var showButtonPanel = this._get(inst, "showButtonPanel");
        var hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext");
        var navigationAsDateFormat = this._get(inst, "navigationAsDateFormat");
        var numMonths = this._getNumberOfMonths(inst);
        var showCurrentAtPos = this._get(inst, "showCurrentAtPos");
        var stepMonths = this._get(inst, "stepMonths");
        var isMultiMonth = (numMonths[0] != 1 || numMonths[1] != 1);
        var currentDate = this._daylightSavingAdjust((!inst.currentDay ? new Date(9999, 9, 9) : new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
        var minDate = this._getMinMaxDate(inst, "min");
        var maxDate = this._getMinMaxDate(inst, "max");
        var drawMonth = inst.drawMonth - showCurrentAtPos;
        var drawYear = inst.drawYear;
        if (drawMonth < 0) {
            drawMonth += 12;
            drawYear--
        }
        if (maxDate) {
            var maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(), maxDate.getMonth() - (numMonths[0] * numMonths[1]) + 1, maxDate.getDate()));
            maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
            while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
                drawMonth--;
                if (drawMonth < 0) {
                    drawMonth = 11;
                    drawYear--
                }
            }
        }
        inst.drawMonth = drawMonth;
        inst.drawYear = drawYear;
        var prevText = this._get(inst, "prevText");
        prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText, this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)), this._getFormatConfig(inst)));
        var prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? '<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_' + dpuuid + ".datepicker._adjustDate('#" + inst.id + "', -" + stepMonths + ", 'M');\" title=\"" + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "e" : "w") + '">' + prevText + "</span></a>" : (hideIfNoPrevNext ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "e" : "w") + '">' + prevText + "</span></a>"));
        var nextText = this._get(inst, "nextText");
        nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText, this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)), this._getFormatConfig(inst)));
        var next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ? '<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_' + dpuuid + ".datepicker._adjustDate('#" + inst.id + "', +" + stepMonths + ", 'M');\" title=\"" + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "w" : "e") + '">' + nextText + "</span></a>" : (hideIfNoPrevNext ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? "w" : "e") + '">' + nextText + "</span></a>"));
        var currentText = this._get(inst, "currentText");
        var gotoDate = (this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate : today);
        currentText = (!navigationAsDateFormat ? currentText : this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));
        var controls = (!inst.inline ? '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_' + dpuuid + '.datepicker._hideDatepicker();">' + this._get(inst, "closeText") + "</button>" : "");
        var buttonPanel = (showButtonPanel) ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (isRTL ? controls : "") + (this._isInRange(inst, gotoDate) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_' + dpuuid + ".datepicker._gotoToday('#" + inst.id + "');\">" + currentText + "</button>" : "") + (isRTL ? "" : controls) + "</div>" : "";
        var firstDay = parseInt(this._get(inst, "firstDay"), 10);
        firstDay = (isNaN(firstDay) ? 0 : firstDay);
        var showWeek = this._get(inst, "showWeek");
        var dayNames = this._get(inst, "dayNames");
        var dayNamesShort = this._get(inst, "dayNamesShort");
        var dayNamesMin = this._get(inst, "dayNamesMin");
        var monthNames = this._get(inst, "monthNames");
        var monthNamesShort = this._get(inst, "monthNamesShort");
        var beforeShowDay = this._get(inst, "beforeShowDay");
        var showOtherMonths = this._get(inst, "showOtherMonths");
        var selectOtherMonths = this._get(inst, "selectOtherMonths");
        var calculateWeek = this._get(inst, "calculateWeek") || this.iso8601Week;
        var defaultDate = this._getDefaultDate(inst);
        var html = "";
        for (var row = 0; row < numMonths[0]; row++) {
            var group = "";
            for (var col = 0; col < numMonths[1]; col++) {
                var selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
                var cornerClass = " ui-corner-all";
                var calender = "";
                if (isMultiMonth) {
                    calender += '<div class="ui-datepicker-group';
                    if (numMonths[1] > 1) {
                        switch (col) {case 0:calender += " ui-datepicker-group-first";cornerClass = " ui-corner-" + (isRTL ? "right" : "left");break;case numMonths[1] - 1:calender += " ui-datepicker-group-last";cornerClass = " ui-corner-" + (isRTL ? "left" : "right");break;default:calender += " ui-datepicker-group-middle";cornerClass = "";break
                        }
                    }
                    calender += '">'
                }
                calender += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + cornerClass + '">' + (/all|left/.test(cornerClass) && row == 0 ? (isRTL ? next : prev) : "") + (/all|right/.test(cornerClass) && row == 0 ? (isRTL ? prev : next) : "") + this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, row > 0 || col > 0, monthNames, monthNamesShort) + '</div><table class="ui-datepicker-calendar"><thead><tr>';
                var thead = (showWeek ? '<th class="ui-datepicker-week-col">' + this._get(inst, "weekHeader") + "</th>" : "");
                for (var dow = 0; dow < 7; dow++) {
                    var day = (dow + firstDay) % 7;
                    thead += "<th" + ((dow + firstDay + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + '><span title="' + dayNames[day] + '">' + dayNamesMin[day] + "</span></th>"
                }
                calender += thead + "</tr></thead><tbody>";
                var daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
                if (drawYear == inst.selectedYear && drawMonth == inst.selectedMonth) {
                    inst.selectedDay = Math.min(inst.selectedDay, daysInMonth)
                }
                var leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
                var numRows = (isMultiMonth ? 6 : Math.ceil((leadDays + daysInMonth) / 7));
                var printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
                for (var dRow = 0; dRow < numRows; dRow++) {
                    calender += "<tr>";
                    var tbody = (!showWeek ? "" : '<td class="ui-datepicker-week-col">' + this._get(inst, "calculateWeek")(printDate) + "</td>");
                    for (var dow = 0; dow < 7; dow++) {
                        var daySettings = (beforeShowDay ? beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true,""]);
                        var otherMonth = (printDate.getMonth() != drawMonth);
                        var unselectable = (otherMonth && !selectOtherMonths) || !daySettings[0] || (minDate && printDate < minDate) || (maxDate && printDate > maxDate);
                        tbody += '<td class="' + ((dow + firstDay + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (otherMonth ? " ui-datepicker-other-month" : "") + ((printDate.getTime() == selectedDate.getTime() && drawMonth == inst.selectedMonth && inst._keyEvent) || (defaultDate.getTime() == printDate.getTime() && defaultDate.getTime() == selectedDate.getTime()) ? " " + this._dayOverClass : "") + (unselectable ? " " + this._unselectableClass + " ui-state-disabled" : "") + (otherMonth && !showOtherMonths ? "" : " " + daySettings[1] + (printDate.getTime() == currentDate.getTime() ? " " + this._currentClass : "") + (printDate.getTime() == today.getTime() ? " ui-datepicker-today" : "")) + '"' + ((!otherMonth || showOtherMonths) && daySettings[2] ? ' title="' + daySettings[2] + '"' : "") + (unselectable ? "" : ' onclick="DP_jQuery_' + dpuuid + ".datepicker._selectDay('#" + inst.id + "'," + printDate.getMonth() + "," + printDate.getFullYear() + ', this);return false;"') + ">" + (otherMonth && !showOtherMonths ? "&#xa0;" : (unselectable ? '<span class="ui-state-default">' + printDate.getDate() + "</span>" : '<a class="ui-state-default' + (printDate.getTime() == today.getTime() ? " ui-state-highlight" : "") + (printDate.getTime() == currentDate.getTime() ? " ui-state-active" : "") + (otherMonth ? " ui-priority-secondary" : "") + '" href="#">' + printDate.getDate() + "</a>")) + "</td>";
                        printDate.setDate(printDate.getDate() + 1);
                        printDate = this._daylightSavingAdjust(printDate)
                    }
                    calender += tbody + "</tr>"
                }
                drawMonth++;
                if (drawMonth > 11) {
                    drawMonth = 0;
                    drawYear++
                }
                calender += "</tbody></table>" + (isMultiMonth ? "</div>" + ((numMonths[0] > 0 && col == numMonths[1] - 1) ? '<div class="ui-datepicker-row-break"></div>' : "") : "");
                group += calender
            }
            html += group
        }
        html += buttonPanel + ($.browser.msie && parseInt($.browser.version, 10) < 7 && !inst.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : "");
        inst._keyEvent = false;
        return html
    },_generateMonthYearHeader:function(inst, drawMonth, drawYear, minDate, maxDate, secondary, monthNames, monthNamesShort) {
        var changeMonth = this._get(inst, "changeMonth");
        var changeYear = this._get(inst, "changeYear");
        var showMonthAfterYear = this._get(inst, "showMonthAfterYear");
        var html = '<div class="ui-datepicker-title">';
        var monthHtml = "";
        if (secondary || !changeMonth) {
            monthHtml += '<span class="ui-datepicker-month">' + monthNames[drawMonth] + "</span>"
        } else {
            var inMinYear = (minDate && minDate.getFullYear() == drawYear);
            var inMaxYear = (maxDate && maxDate.getFullYear() == drawYear);
            monthHtml += '<select class="ui-datepicker-month" onchange="DP_jQuery_' + dpuuid + ".datepicker._selectMonthYear('#" + inst.id + "', this, 'M');\" onclick=\"DP_jQuery_" + dpuuid + ".datepicker._clickMonthYear('#" + inst.id + "');\">";
            for (var month = 0; month < 12; month++) {
                if ((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth())) {
                    monthHtml += '<option value="' + month + '"' + (month == drawMonth ? ' selected="selected"' : "") + ">" + monthNamesShort[month] + "</option>"
                }
            }
            monthHtml += "</select>"
        }
        if (!showMonthAfterYear) {
            html += monthHtml + (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "")
        }
        if (secondary || !changeYear) {
            html += '<span class="ui-datepicker-year">' + drawYear + "</span>"
        } else {
            var years = this._get(inst, "yearRange").split(":");
            var thisYear = new Date().getFullYear();
            var determineYear = function(value) {
                var year = (value.match(/c[+-].*/) ? drawYear + parseInt(value.substring(1), 10) : (value.match(/[+-].*/) ? thisYear + parseInt(value, 10) : parseInt(value, 10)));
                return(isNaN(year) ? thisYear : year)
            };
            var year = determineYear(years[0]);
            var endYear = Math.max(year, determineYear(years[1] || ""));
            year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
            endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
            html += '<select class="ui-datepicker-year" onchange="DP_jQuery_' + dpuuid + ".datepicker._selectMonthYear('#" + inst.id + "', this, 'Y');\" onclick=\"DP_jQuery_" + dpuuid + ".datepicker._clickMonthYear('#" + inst.id + "');\">";
            for (; year <= endYear; year++) {
                html += '<option value="' + year + '"' + (year == drawYear ? ' selected="selected"' : "") + ">" + year + "</option>"
            }
            html += "</select>"
        }
        html += this._get(inst, "yearSuffix");
        if (showMonthAfterYear) {
            html += (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "") + monthHtml
        }
        html += "</div>";
        return html
    },_adjustInstDate:function(inst, offset, period) {
        var year = inst.drawYear + (period == "Y" ? offset : 0);
        var month = inst.drawMonth + (period == "M" ? offset : 0);
        var day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + (period == "D" ? offset : 0);
        var date = this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year, month, day)));
        inst.selectedDay = date.getDate();
        inst.drawMonth = inst.selectedMonth = date.getMonth();
        inst.drawYear = inst.selectedYear = date.getFullYear();
        if (period == "M" || period == "Y") {
            this._notifyChange(inst)
        }
    },_restrictMinMax:function(inst, date) {
        var minDate = this._getMinMaxDate(inst, "min");
        var maxDate = this._getMinMaxDate(inst, "max");
        date = (minDate && date < minDate ? minDate : date);
        date = (maxDate && date > maxDate ? maxDate : date);
        return date
    },_notifyChange:function(inst) {
        var onChange = this._get(inst, "onChangeMonthYear");
        if (onChange) {
            onChange.apply((inst.input ? inst.input[0] : null), [inst.selectedYear,inst.selectedMonth + 1,inst])
        }
    },_getNumberOfMonths:function(inst) {
        var numMonths = this._get(inst, "numberOfMonths");
        return(numMonths == null ? [1,1] : (typeof numMonths == "number" ? [1,numMonths] : numMonths))
    },_getMinMaxDate:function(inst, minMax) {
        return this._determineDate(inst, this._get(inst, minMax + "Date"), null)
    },_getDaysInMonth:function(year, month) {
        return 32 - new Date(year, month, 32).getDate()
    },_getFirstDayOfMonth:function(year, month) {
        return new Date(year, month, 1).getDay()
    },_canAdjustMonth:function(inst, offset, curYear, curMonth) {
        var numMonths = this._getNumberOfMonths(inst);
        var date = this._daylightSavingAdjust(new Date(curYear, curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));
        if (offset < 0) {
            date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()))
        }
        return this._isInRange(inst, date)
    },_isInRange:function(inst, date) {
        var minDate = this._getMinMaxDate(inst, "min");
        var maxDate = this._getMinMaxDate(inst, "max");
        return((!minDate || date.getTime() >= minDate.getTime()) && (!maxDate || date.getTime() <= maxDate.getTime()))
    },_getFormatConfig:function(inst) {
        var shortYearCutoff = this._get(inst, "shortYearCutoff");
        shortYearCutoff = (typeof shortYearCutoff != "string" ? shortYearCutoff : new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
        return{shortYearCutoff:shortYearCutoff,dayNamesShort:this._get(inst, "dayNamesShort"),dayNames:this._get(inst, "dayNames"),monthNamesShort:this._get(inst, "monthNamesShort"),monthNames:this._get(inst, "monthNames")}
    },_formatDate:function(inst, day, month, year) {
        if (!day) {
            inst.currentDay = inst.selectedDay;
            inst.currentMonth = inst.selectedMonth;
            inst.currentYear = inst.selectedYear
        }
        var date = (day ? (typeof day == "object" ? day : this._daylightSavingAdjust(new Date(year, month, day))) : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
        return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst))
    }});
    function extendRemove(target, props) {
        $.extend(target, props);
        for (var name in props) {
            if (props[name] == null || props[name] == undefined) {
                target[name] = props[name]
            }
        }
        return target
    }

    function isArray(a) {
        return(a && (($.browser.safari && typeof a == "object" && a.length) || (a.constructor && a.constructor.toString().match(/\Array\(\)/))))
    }

    $.fn.datepicker = function(options) {
        if (!$.datepicker.initialized) {
            $(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv);
            $.datepicker.initialized = true
        }
        var otherArgs = Array.prototype.slice.call(arguments, 1);
        if (typeof options == "string" && (options == "isDisabled" || options == "getDate" || options == "widget")) {
            return $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs))
        }
        if (options == "option" && arguments.length == 2 && typeof arguments[1] == "string") {
            return $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs))
        }
        return this.each(function() {
            typeof options == "string" ? $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this].concat(otherArgs)) : $.datepicker._attachDatepicker(this, options)
        })
    };
    $.datepicker = new Datepicker();
    $.datepicker.initialized = false;
    $.datepicker.uuid = new Date().getTime();
    $.datepicker.version = "1.8";
    window["DP_jQuery_" + dpuuid] = $
})(jQuery);
;
/*
 * jQuery UI Progressbar 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Progressbar
 *
 * Depends:
 *   jquery.ui.core.js
 *   jquery.ui.widget.js
 */
(function(a) {
    a.widget("ui.progressbar", {options:{value:0},_create:function() {
        this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this._valueMin(),"aria-valuemax":this._valueMax(),"aria-valuenow":this._value()});
        this.valueDiv = a("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);
        this._refreshValue()
    },destroy:function() {
        this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
        this.valueDiv.remove();
        a.Widget.prototype.destroy.apply(this, arguments)
    },value:function(b) {
        if (b === undefined) {
            return this._value()
        }
        this._setOption("value", b);
        return this
    },_setOption:function(b, c) {
        switch (b) {case"value":this.options.value = c;this._refreshValue();this._trigger("change");break
        }
        a.Widget.prototype._setOption.apply(this, arguments)
    },_value:function() {
        var b = this.options.value;
        if (typeof b !== "number") {
            b = 0
        }
        if (b < this._valueMin()) {
            b = this._valueMin()
        }
        if (b > this._valueMax()) {
            b = this._valueMax()
        }
        return b
    },_valueMin:function() {
        return 0
    },_valueMax:function() {
        return 100
    },_refreshValue:function() {
        var b = this.value();
        this.valueDiv[b === this._valueMax() ? "addClass" : "removeClass"]("ui-corner-right").width(b + "%");
        this.element.attr("aria-valuenow", b)
    }});
    a.extend(a.ui.progressbar, {version:"1.8"})
})(jQuery);
;
/*
 * jQuery UI Effects 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/
 */
jQuery.effects || (function(g) {
    g.effects = {};
    g.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor"], function(l, k) {
        g.fx.step[k] = function(m) {
            if (!m.colorInit) {
                m.start = j(m.elem, k);
                m.end = i(m.end);
                m.colorInit = true
            }
            m.elem.style[k] = "rgb(" + Math.max(Math.min(parseInt((m.pos * (m.end[0] - m.start[0])) + m.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt((m.pos * (m.end[1] - m.start[1])) + m.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt((m.pos * (m.end[2] - m.start[2])) + m.start[2], 10), 255), 0) + ")"
        }
    });
    function i(l) {
        var k;
        if (l && l.constructor == Array && l.length == 3) {
            return l
        }
        if (k = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(l)) {
            return[parseInt(k[1], 10),parseInt(k[2], 10),parseInt(k[3], 10)]
        }
        if (k = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(l)) {
            return[parseFloat(k[1]) * 2.55,parseFloat(k[2]) * 2.55,parseFloat(k[3]) * 2.55]
        }
        if (k = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(l)) {
            return[parseInt(k[1], 16),parseInt(k[2], 16),parseInt(k[3], 16)]
        }
        if (k = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(l)) {
            return[parseInt(k[1] + k[1], 16),parseInt(k[2] + k[2], 16),parseInt(k[3] + k[3], 16)]
        }
        if (k = /rgba\(0, 0, 0, 0\)/.exec(l)) {
            return a.transparent
        }
        return a[g.trim(l).toLowerCase()]
    }

    function j(m, k) {
        var l;
        do{
            l = g.curCSS(m, k);
            if (l != "" && l != "transparent" || g.nodeName(m, "body")) {
                break
            }
            k = "backgroundColor"
        } while (m = m.parentNode);
        return i(l)
    }

    var a = {aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]};
    var e = ["add","remove","toggle"],c = {border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};

    function f() {
        var n = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle,o = {},l,m;
        if (n && n.length && n[0] && n[n[0]]) {
            var k = n.length;
            while (k--) {
                l = n[k];
                if (typeof n[l] == "string") {
                    m = l.replace(/\-(\w)/g, function(p, q) {
                        return q.toUpperCase()
                    });
                    o[m] = n[l]
                }
            }
        } else {
            for (l in n) {
                if (typeof n[l] === "string") {
                    o[l] = n[l]
                }
            }
        }
        return o
    }

    function b(l) {
        var k,m;
        for (k in l) {
            m = l[k];
            if (m == null || g.isFunction(m) || k in c || (/scrollbar/).test(k) || (!(/color/i).test(k) && isNaN(parseFloat(m)))) {
                delete l[k]
            }
        }
        return l
    }

    function h(k, m) {
        var n = {_:0},l;
        for (l in m) {
            if (k[l] != m[l]) {
                n[l] = m[l]
            }
        }
        return n
    }

    g.effects.animateClass = function(k, l, n, m) {
        if (g.isFunction(n)) {
            m = n;
            n = null
        }
        return this.each(function() {
            var r = g(this),o = r.attr("style") || " ",s = b(f.call(this)),q,p = r.attr("className");
            g.each(e, function(t, u) {
                if (k[u]) {
                    r[u + "Class"](k[u])
                }
            });
            q = b(f.call(this));
            r.attr("className", p);
            r.animate(h(s, q), l, n, function() {
                g.each(e, function(t, u) {
                    if (k[u]) {
                        r[u + "Class"](k[u])
                    }
                });
                if (typeof r.attr("style") == "object") {
                    r.attr("style").cssText = "";
                    r.attr("style").cssText = o
                } else {
                    r.attr("style", o)
                }
                if (m) {
                    m.apply(this, arguments)
                }
            })
        })
    };
    g.fn.extend({_addClass:g.fn.addClass,addClass:function(l, k, n, m) {
        return k ? g.effects.animateClass.apply(this, [
            {add:l},
            k,
            n,
            m
        ]) : this._addClass(l)
    },_removeClass:g.fn.removeClass,removeClass:function(l, k, n, m) {
        return k ? g.effects.animateClass.apply(this, [
            {remove:l},
            k,
            n,
            m
        ]) : this._removeClass(l)
    },_toggleClass:g.fn.toggleClass,toggleClass:function(m, l, k, o, n) {
        if (typeof l == "boolean" || l === undefined) {
            if (!k) {
                return this._toggleClass(m, l)
            } else {
                return g.effects.animateClass.apply(this, [(l ? {add:m} : {remove:m}),k,o,n])
            }
        } else {
            return g.effects.animateClass.apply(this, [
                {toggle:m},
                l,
                k,
                o
            ])
        }
    },switchClass:function(k, m, l, o, n) {
        return g.effects.animateClass.apply(this, [
            {add:m,remove:k},
            l,
            o,
            n
        ])
    }});
    g.extend(g.effects, {version:"1.8",save:function(l, m) {
        for (var k = 0; k < m.length; k++) {
            if (m[k] !== null) {
                l.data("ec.storage." + m[k], l[0].style[m[k]])
            }
        }
    },restore:function(l, m) {
        for (var k = 0; k < m.length; k++) {
            if (m[k] !== null) {
                l.css(m[k], l.data("ec.storage." + m[k]))
            }
        }
    },setMode:function(k, l) {
        if (l == "toggle") {
            l = k.is(":hidden") ? "show" : "hide"
        }
        return l
    },getBaseline:function(l, m) {
        var n,k;
        switch (l[0]) {case"top":n = 0;break;case"middle":n = 0.5;break;case"bottom":n = 1;break;default:n = l[0] / m.height
        }
        switch (l[1]) {case"left":k = 0;break;case"center":k = 0.5;break;case"right":k = 1;break;default:k = l[1] / m.width
        }
        return{x:k,y:n}
    },createWrapper:function(k) {
        if (k.parent().is(".ui-effects-wrapper")) {
            return k.parent()
        }
        var l = {width:k.outerWidth(true),height:k.outerHeight(true),"float":k.css("float")},m = g("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0});
        k.wrap(m);
        m = k.parent();
        if (k.css("position") == "static") {
            m.css({position:"relative"});
            k.css({position:"relative"})
        } else {
            g.extend(l, {position:k.css("position"),zIndex:k.css("z-index")});
            g.each(["top","left","bottom","right"], function(n, o) {
                l[o] = k.css(o);
                if (isNaN(parseInt(l[o], 10))) {
                    l[o] = "auto"
                }
            });
            k.css({position:"relative",top:0,left:0})
        }
        return m.css(l).show()
    },removeWrapper:function(k) {
        if (k.parent().is(".ui-effects-wrapper")) {
            return k.parent().replaceWith(k)
        }
        return k
    },setTransition:function(l, n, k, m) {
        m = m || {};
        g.each(n, function(p, o) {
            unit = l.cssUnit(o);
            if (unit[0] > 0) {
                m[o] = unit[0] * k + unit[1]
            }
        });
        return m
    }});
    function d(l, k, m, n) {
        if (typeof l == "object") {
            n = k;
            m = null;
            k = l;
            l = k.effect
        }
        if (g.isFunction(k)) {
            n = k;
            m = null;
            k = {}
        }
        if (g.isFunction(m)) {
            n = m;
            m = null
        }
        if (typeof k == "number" || g.fx.speeds[k]) {
            n = m;
            m = k;
            k = {}
        }
        k = k || {};
        m = m || k.duration;
        m = g.fx.off ? 0 : typeof m == "number" ? m : g.fx.speeds[m] || g.fx.speeds._default;
        n = n || k.complete;
        return[l,k,m,n]
    }

    g.fn.extend({effect:function(n, m, p, q) {
        var l = d.apply(this, arguments),o = {options:l[1],duration:l[2],callback:l[3]},k = g.effects[n];
        return k && !g.fx.off ? k.call(this, o) : this
    },_show:g.fn.show,show:function(l) {
        if (!l || typeof l == "number" || g.fx.speeds[l]) {
            return this._show.apply(this, arguments)
        } else {
            var k = d.apply(this, arguments);
            k[1].mode = "show";
            return this.effect.apply(this, k)
        }
    },_hide:g.fn.hide,hide:function(l) {
        if (!l || typeof l == "number" || g.fx.speeds[l]) {
            return this._hide.apply(this, arguments)
        } else {
            var k = d.apply(this, arguments);
            k[1].mode = "hide";
            return this.effect.apply(this, k)
        }
    },__toggle:g.fn.toggle,toggle:function(l) {
        if (!l || typeof l == "number" || g.fx.speeds[l] || typeof l == "boolean" || g.isFunction(l)) {
            return this.__toggle.apply(this, arguments)
        } else {
            var k = d.apply(this, arguments);
            k[1].mode = "toggle";
            return this.effect.apply(this, k)
        }
    },cssUnit:function(k) {
        var l = this.css(k),m = [];
        g.each(["em","px","%","pt"], function(n, o) {
            if (l.indexOf(o) > 0) {
                m = [parseFloat(l),o]
            }
        });
        return m
    }});
    g.easing.jswing = g.easing.swing;
    g.extend(g.easing, {def:"easeOutQuad",swing:function(l, m, k, o, n) {
        return g.easing[g.easing.def](l, m, k, o, n)
    },easeInQuad:function(l, m, k, o, n) {
        return o * (m /= n) * m + k
    },easeOutQuad:function(l, m, k, o, n) {
        return -o * (m /= n) * (m - 2) + k
    },easeInOutQuad:function(l, m, k, o, n) {
        if ((m /= n / 2) < 1) {
            return o / 2 * m * m + k
        }
        return -o / 2 * ((--m) * (m - 2) - 1) + k
    },easeInCubic:function(l, m, k, o, n) {
        return o * (m /= n) * m * m + k
    },easeOutCubic:function(l, m, k, o, n) {
        return o * ((m = m / n - 1) * m * m + 1) + k
    },easeInOutCubic:function(l, m, k, o, n) {
        if ((m /= n / 2) < 1) {
            return o / 2 * m * m * m + k
        }
        return o / 2 * ((m -= 2) * m * m + 2) + k
    },easeInQuart:function(l, m, k, o, n) {
        return o * (m /= n) * m * m * m + k
    },easeOutQuart:function(l, m, k, o, n) {
        return -o * ((m = m / n - 1) * m * m * m - 1) + k
    },easeInOutQuart:function(l, m, k, o, n) {
        if ((m /= n / 2) < 1) {
            return o / 2 * m * m * m * m + k
        }
        return -o / 2 * ((m -= 2) * m * m * m - 2) + k
    },easeInQuint:function(l, m, k, o, n) {
        return o * (m /= n) * m * m * m * m + k
    },easeOutQuint:function(l, m, k, o, n) {
        return o * ((m = m / n - 1) * m * m * m * m + 1) + k
    },easeInOutQuint:function(l, m, k, o, n) {
        if ((m /= n / 2) < 1) {
            return o / 2 * m * m * m * m * m + k
        }
        return o / 2 * ((m -= 2) * m * m * m * m + 2) + k
    },easeInSine:function(l, m, k, o, n) {
        return -o * Math.cos(m / n * (Math.PI / 2)) + o + k
    },easeOutSine:function(l, m, k, o, n) {
        return o * Math.sin(m / n * (Math.PI / 2)) + k
    },easeInOutSine:function(l, m, k, o, n) {
        return -o / 2 * (Math.cos(Math.PI * m / n) - 1) + k
    },easeInExpo:function(l, m, k, o, n) {
        return(m == 0) ? k : o * Math.pow(2, 10 * (m / n - 1)) + k
    },easeOutExpo:function(l, m, k, o, n) {
        return(m == n) ? k + o : o * (-Math.pow(2, -10 * m / n) + 1) + k
    },easeInOutExpo:function(l, m, k, o, n) {
        if (m == 0) {
            return k
        }
        if (m == n) {
            return k + o
        }
        if ((m /= n / 2) < 1) {
            return o / 2 * Math.pow(2, 10 * (m - 1)) + k
        }
        return o / 2 * (-Math.pow(2, -10 * --m) + 2) + k
    },easeInCirc:function(l, m, k, o, n) {
        return -o * (Math.sqrt(1 - (m /= n) * m) - 1) + k
    },easeOutCirc:function(l, m, k, o, n) {
        return o * Math.sqrt(1 - (m = m / n - 1) * m) + k
    },easeInOutCirc:function(l, m, k, o, n) {
        if ((m /= n / 2) < 1) {
            return -o / 2 * (Math.sqrt(1 - m * m) - 1) + k
        }
        return o / 2 * (Math.sqrt(1 - (m -= 2) * m) + 1) + k
    },easeInElastic:function(l, n, k, u, r) {
        var o = 1.70158;
        var q = 0;
        var m = u;
        if (n == 0) {
            return k
        }
        if ((n /= r) == 1) {
            return k + u
        }
        if (!q) {
            q = r * 0.3
        }
        if (m < Math.abs(u)) {
            m = u;
            var o = q / 4
        } else {
            var o = q / (2 * Math.PI) * Math.asin(u / m)
        }
        return -(m * Math.pow(2, 10 * (n -= 1)) * Math.sin((n * r - o) * (2 * Math.PI) / q)) + k
    },easeOutElastic:function(l, n, k, u, r) {
        var o = 1.70158;
        var q = 0;
        var m = u;
        if (n == 0) {
            return k
        }
        if ((n /= r) == 1) {
            return k + u
        }
        if (!q) {
            q = r * 0.3
        }
        if (m < Math.abs(u)) {
            m = u;
            var o = q / 4
        } else {
            var o = q / (2 * Math.PI) * Math.asin(u / m)
        }
        return m * Math.pow(2, -10 * n) * Math.sin((n * r - o) * (2 * Math.PI) / q) + u + k
    },easeInOutElastic:function(l, n, k, u, r) {
        var o = 1.70158;
        var q = 0;
        var m = u;
        if (n == 0) {
            return k
        }
        if ((n /= r / 2) == 2) {
            return k + u
        }
        if (!q) {
            q = r * (0.3 * 1.5)
        }
        if (m < Math.abs(u)) {
            m = u;
            var o = q / 4
        } else {
            var o = q / (2 * Math.PI) * Math.asin(u / m)
        }
        if (n < 1) {
            return -0.5 * (m * Math.pow(2, 10 * (n -= 1)) * Math.sin((n * r - o) * (2 * Math.PI) / q)) + k
        }
        return m * Math.pow(2, -10 * (n -= 1)) * Math.sin((n * r - o) * (2 * Math.PI) / q) * 0.5 + u + k
    },easeInBack:function(l, m, k, p, o, n) {
        if (n == undefined) {
            n = 1.70158
        }
        return p * (m /= o) * m * ((n + 1) * m - n) + k
    },easeOutBack:function(l, m, k, p, o, n) {
        if (n == undefined) {
            n = 1.70158
        }
        return p * ((m = m / o - 1) * m * ((n + 1) * m + n) + 1) + k
    },easeInOutBack:function(l, m, k, p, o, n) {
        if (n == undefined) {
            n = 1.70158
        }
        if ((m /= o / 2) < 1) {
            return p / 2 * (m * m * (((n *= (1.525)) + 1) * m - n)) + k
        }
        return p / 2 * ((m -= 2) * m * (((n *= (1.525)) + 1) * m + n) + 2) + k
    },easeInBounce:function(l, m, k, o, n) {
        return o - g.easing.easeOutBounce(l, n - m, 0, o, n) + k
    },easeOutBounce:function(l, m, k, o, n) {
        if ((m /= n) < (1 / 2.75)) {
            return o * (7.5625 * m * m) + k
        } else {
            if (m < (2 / 2.75)) {
                return o * (7.5625 * (m -= (1.5 / 2.75)) * m + 0.75) + k
            } else {
                if (m < (2.5 / 2.75)) {
                    return o * (7.5625 * (m -= (2.25 / 2.75)) * m + 0.9375) + k
                } else {
                    return o * (7.5625 * (m -= (2.625 / 2.75)) * m + 0.984375) + k
                }
            }
        }
    },easeInOutBounce:function(l, m, k, o, n) {
        if (m < n / 2) {
            return g.easing.easeInBounce(l, m * 2, 0, o, n) * 0.5 + k
        }
        return g.easing.easeOutBounce(l, m * 2 - n, 0, o, n) * 0.5 + o * 0.5 + k
    }})
})(jQuery);
;
/*
 * jQuery UI Effects Blind 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Blind
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(a) {
    a.effects.blind = function(b) {
        return this.queue(function() {
            var d = a(this),c = ["position","top","left"];
            var h = a.effects.setMode(d, b.options.mode || "hide");
            var g = b.options.direction || "vertical";
            a.effects.save(d, c);
            d.show();
            var j = a.effects.createWrapper(d).css({overflow:"hidden"});
            var e = (g == "vertical") ? "height" : "width";
            var i = (g == "vertical") ? j.height() : j.width();
            if (h == "show") {
                j.css(e, 0)
            }
            var f = {};
            f[e] = h == "show" ? i : 0;
            j.animate(f, b.duration, b.options.easing, function() {
                if (h == "hide") {
                    d.hide()
                }
                a.effects.restore(d, c);
                a.effects.removeWrapper(d);
                if (b.callback) {
                    b.callback.apply(d[0], arguments)
                }
                d.dequeue()
            })
        })
    }
})(jQuery);
;
/*
 * jQuery UI Effects Bounce 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Bounce
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(a) {
    a.effects.bounce = function(b) {
        return this.queue(function() {
            var e = a(this),l = ["position","top","left"];
            var k = a.effects.setMode(e, b.options.mode || "effect");
            var n = b.options.direction || "up";
            var c = b.options.distance || 20;
            var d = b.options.times || 5;
            var g = b.duration || 250;
            if (/show|hide/.test(k)) {
                l.push("opacity")
            }
            a.effects.save(e, l);
            e.show();
            a.effects.createWrapper(e);
            var f = (n == "up" || n == "down") ? "top" : "left";
            var p = (n == "up" || n == "left") ? "pos" : "neg";
            var c = b.options.distance || (f == "top" ? e.outerHeight({margin:true}) / 3 : e.outerWidth({margin:true}) / 3);
            if (k == "show") {
                e.css("opacity", 0).css(f, p == "pos" ? -c : c)
            }
            if (k == "hide") {
                c = c / (d * 2)
            }
            if (k != "hide") {
                d--
            }
            if (k == "show") {
                var h = {opacity:1};
                h[f] = (p == "pos" ? "+=" : "-=") + c;
                e.animate(h, g / 2, b.options.easing);
                c = c / 2;
                d--
            }
            for (var j = 0; j < d; j++) {
                var o = {},m = {};
                o[f] = (p == "pos" ? "-=" : "+=") + c;
                m[f] = (p == "pos" ? "+=" : "-=") + c;
                e.animate(o, g / 2, b.options.easing).animate(m, g / 2, b.options.easing);
                c = (k == "hide") ? c * 2 : c / 2
            }
            if (k == "hide") {
                var h = {opacity:0};
                h[f] = (p == "pos" ? "-=" : "+=") + c;
                e.animate(h, g / 2, b.options.easing, function() {
                    e.hide();
                    a.effects.restore(e, l);
                    a.effects.removeWrapper(e);
                    if (b.callback) {
                        b.callback.apply(this, arguments)
                    }
                })
            } else {
                var o = {},m = {};
                o[f] = (p == "pos" ? "-=" : "+=") + c;
                m[f] = (p == "pos" ? "+=" : "-=") + c;
                e.animate(o, g / 2, b.options.easing).animate(m, g / 2, b.options.easing, function() {
                    a.effects.restore(e, l);
                    a.effects.removeWrapper(e);
                    if (b.callback) {
                        b.callback.apply(this, arguments)
                    }
                })
            }
            e.queue("fx", function() {
                e.dequeue()
            });
            e.dequeue()
        })
    }
})(jQuery);
;
/*
 * jQuery UI Effects Clip 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Clip
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(a) {
    a.effects.clip = function(b) {
        return this.queue(function() {
            var f = a(this),j = ["position","top","left","height","width"];
            var i = a.effects.setMode(f, b.options.mode || "hide");
            var k = b.options.direction || "vertical";
            a.effects.save(f, j);
            f.show();
            var c = a.effects.createWrapper(f).css({overflow:"hidden"});
            var e = f[0].tagName == "IMG" ? c : f;
            var g = {size:(k == "vertical") ? "height" : "width",position:(k == "vertical") ? "top" : "left"};
            var d = (k == "vertical") ? e.height() : e.width();
            if (i == "show") {
                e.css(g.size, 0);
                e.css(g.position, d / 2)
            }
            var h = {};
            h[g.size] = i == "show" ? d : 0;
            h[g.position] = i == "show" ? 0 : d / 2;
            e.animate(h, {queue:false,duration:b.duration,easing:b.options.easing,complete:function() {
                if (i == "hide") {
                    f.hide()
                }
                a.effects.restore(f, j);
                a.effects.removeWrapper(f);
                if (b.callback) {
                    b.callback.apply(f[0], arguments)
                }
                f.dequeue()
            }})
        })
    }
})(jQuery);
;
/*
 * jQuery UI Effects Drop 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Drop
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(a) {
    a.effects.drop = function(b) {
        return this.queue(function() {
            var e = a(this),d = ["position","top","left","opacity"];
            var i = a.effects.setMode(e, b.options.mode || "hide");
            var h = b.options.direction || "left";
            a.effects.save(e, d);
            e.show();
            a.effects.createWrapper(e);
            var f = (h == "up" || h == "down") ? "top" : "left";
            var c = (h == "up" || h == "left") ? "pos" : "neg";
            var j = b.options.distance || (f == "top" ? e.outerHeight({margin:true}) / 2 : e.outerWidth({margin:true}) / 2);
            if (i == "show") {
                e.css("opacity", 0).css(f, c == "pos" ? -j : j)
            }
            var g = {opacity:i == "show" ? 1 : 0};
            g[f] = (i == "show" ? (c == "pos" ? "+=" : "-=") : (c == "pos" ? "-=" : "+=")) + j;
            e.animate(g, {queue:false,duration:b.duration,easing:b.options.easing,complete:function() {
                if (i == "hide") {
                    e.hide()
                }
                a.effects.restore(e, d);
                a.effects.removeWrapper(e);
                if (b.callback) {
                    b.callback.apply(this, arguments)
                }
                e.dequeue()
            }})
        })
    }
})(jQuery);
;
/*
 * jQuery UI Effects Explode 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Explode
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(a) {
    a.effects.explode = function(b) {
        return this.queue(function() {
            var k = b.options.pieces ? Math.round(Math.sqrt(b.options.pieces)) : 3;
            var e = b.options.pieces ? Math.round(Math.sqrt(b.options.pieces)) : 3;
            b.options.mode = b.options.mode == "toggle" ? (a(this).is(":visible") ? "hide" : "show") : b.options.mode;
            var h = a(this).show().css("visibility", "hidden");
            var l = h.offset();
            l.top -= parseInt(h.css("marginTop"), 10) || 0;
            l.left -= parseInt(h.css("marginLeft"), 10) || 0;
            var g = h.outerWidth(true);
            var c = h.outerHeight(true);
            for (var f = 0; f < k; f++) {
                for (var d = 0; d < e; d++) {
                    h.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-d * (g / e),top:-f * (c / k)}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:g / e,height:c / k,left:l.left + d * (g / e) + (b.options.mode == "show" ? (d - Math.floor(e / 2)) * (g / e) : 0),top:l.top + f * (c / k) + (b.options.mode == "show" ? (f - Math.floor(k / 2)) * (c / k) : 0),opacity:b.options.mode == "show" ? 0 : 1}).animate({left:l.left + d * (g / e) + (b.options.mode == "show" ? 0 : (d - Math.floor(e / 2)) * (g / e)),top:l.top + f * (c / k) + (b.options.mode == "show" ? 0 : (f - Math.floor(k / 2)) * (c / k)),opacity:b.options.mode == "show" ? 1 : 0}, b.duration || 500)
                }
            }
            setTimeout(function() {
                b.options.mode == "show" ? h.css({visibility:"visible"}) : h.css({visibility:"visible"}).hide();
                if (b.callback) {
                    b.callback.apply(h[0])
                }
                h.dequeue();
                a("div.ui-effects-explode").remove()
            }, b.duration || 500)
        })
    }
})(jQuery);
;
/*
 * jQuery UI Effects Fold 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Fold
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(a) {
    a.effects.fold = function(b) {
        return this.queue(function() {
            var e = a(this),k = ["position","top","left"];
            var h = a.effects.setMode(e, b.options.mode || "hide");
            var o = b.options.size || 15;
            var n = !(!b.options.horizFirst);
            var g = b.duration ? b.duration / 2 : a.fx.speeds._default / 2;
            a.effects.save(e, k);
            e.show();
            var d = a.effects.createWrapper(e).css({overflow:"hidden"});
            var i = ((h == "show") != n);
            var f = i ? ["width","height"] : ["height","width"];
            var c = i ? [d.width(),d.height()] : [d.height(),d.width()];
            var j = /([0-9]+)%/.exec(o);
            if (j) {
                o = parseInt(j[1], 10) / 100 * c[h == "hide" ? 0 : 1]
            }
            if (h == "show") {
                d.css(n ? {height:0,width:o} : {height:o,width:0})
            }
            var m = {},l = {};
            m[f[0]] = h == "show" ? c[0] : o;
            l[f[1]] = h == "show" ? c[1] : 0;
            d.animate(m, g, b.options.easing).animate(l, g, b.options.easing, function() {
                if (h == "hide") {
                    e.hide()
                }
                a.effects.restore(e, k);
                a.effects.removeWrapper(e);
                if (b.callback) {
                    b.callback.apply(e[0], arguments)
                }
                e.dequeue()
            })
        })
    }
})(jQuery);
;
/*
 * jQuery UI Effects Highlight 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Highlight
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(a) {
    a.effects.highlight = function(b) {
        return this.queue(function() {
            var d = a(this),c = ["backgroundImage","backgroundColor","opacity"],f = a.effects.setMode(d, b.options.mode || "show"),e = {backgroundColor:d.css("backgroundColor")};
            if (f == "hide") {
                e.opacity = 0
            }
            a.effects.save(d, c);
            d.show().css({backgroundImage:"none",backgroundColor:b.options.color || "#ffff99"}).animate(e, {queue:false,duration:b.duration,easing:b.options.easing,complete:function() {
                (f == "hide" && d.hide());
                a.effects.restore(d, c);
                (f == "show" && !a.support.opacity && this.style.removeAttribute("filter"));
                (b.callback && b.callback.apply(this, arguments));
                d.dequeue()
            }})
        })
    }
})(jQuery);
;
/*
 * jQuery UI Effects Pulsate 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Pulsate
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(a) {
    a.effects.pulsate = function(b) {
        return this.queue(function() {
            var d = a(this),e = a.effects.setMode(d, b.options.mode || "show");
            times = ((b.options.times || 5) * 2) - 1;
            duration = b.duration ? b.duration / 2 : a.fx.speeds._default / 2,isVisible = d.is(":visible"),animateTo = 0;
            if (!isVisible) {
                d.css("opacity", 0).show();
                animateTo = 1
            }
            if ((e == "hide" && isVisible) || (e == "show" && !isVisible)) {
                times--
            }
            for (var c = 0; c < times; c++) {
                d.animate({opacity:animateTo}, duration, b.options.easing);
                animateTo = (animateTo + 1) % 2
            }
            d.animate({opacity:animateTo}, duration, b.options.easing, function() {
                if (animateTo == 0) {
                    d.hide()
                }
                (b.callback && b.callback.apply(this, arguments))
            });
            d.queue("fx",
                    function() {
                        d.dequeue()
                    }).dequeue()
        })
    }
})(jQuery);
;
/*
 * jQuery UI Effects Scale 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Scale
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(a) {
    a.effects.puff = function(b) {
        return this.queue(function() {
            var f = a(this),g = a.effects.setMode(f, b.options.mode || "hide"),e = parseInt(b.options.percent, 10) || 150,d = e / 100,c = {height:f.height(),width:f.width()};
            a.extend(b.options, {fade:true,mode:g,percent:g == "hide" ? e : 100,from:g == "hide" ? c : {height:c.height * d,width:c.width * d}});
            f.effect("scale", b.options, b.duration, b.callback);
            f.dequeue()
        })
    };
    a.effects.scale = function(b) {
        return this.queue(function() {
            var g = a(this);
            var d = a.extend(true, {}, b.options);
            var j = a.effects.setMode(g, b.options.mode || "effect");
            var h = parseInt(b.options.percent, 10) || (parseInt(b.options.percent, 10) == 0 ? 0 : (j == "hide" ? 0 : 100));
            var i = b.options.direction || "both";
            var c = b.options.origin;
            if (j != "effect") {
                d.origin = c || ["middle","center"];
                d.restore = true
            }
            var f = {height:g.height(),width:g.width()};
            g.from = b.options.from || (j == "show" ? {height:0,width:0} : f);
            var e = {y:i != "horizontal" ? (h / 100) : 1,x:i != "vertical" ? (h / 100) : 1};
            g.to = {height:f.height * e.y,width:f.width * e.x};
            if (b.options.fade) {
                if (j == "show") {
                    g.from.opacity = 0;
                    g.to.opacity = 1
                }
                if (j == "hide") {
                    g.from.opacity = 1;
                    g.to.opacity = 0
                }
            }
            d.from = g.from;
            d.to = g.to;
            d.mode = j;
            g.effect("size", d, b.duration, b.callback);
            g.dequeue()
        })
    };
    a.effects.size = function(b) {
        return this.queue(function() {
            var c = a(this),n = ["position","top","left","width","height","overflow","opacity"];
            var m = ["position","top","left","overflow","opacity"];
            var j = ["width","height","overflow"];
            var p = ["fontSize"];
            var k = ["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"];
            var f = ["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"];
            var g = a.effects.setMode(c, b.options.mode || "effect");
            var i = b.options.restore || false;
            var e = b.options.scale || "both";
            var o = b.options.origin;
            var d = {height:c.height(),width:c.width()};
            c.from = b.options.from || d;
            c.to = b.options.to || d;
            if (o) {
                var h = a.effects.getBaseline(o, d);
                c.from.top = (d.height - c.from.height) * h.y;
                c.from.left = (d.width - c.from.width) * h.x;
                c.to.top = (d.height - c.to.height) * h.y;
                c.to.left = (d.width - c.to.width) * h.x
            }
            var l = {from:{y:c.from.height / d.height,x:c.from.width / d.width},to:{y:c.to.height / d.height,x:c.to.width / d.width}};
            if (e == "box" || e == "both") {
                if (l.from.y != l.to.y) {
                    n = n.concat(k);
                    c.from = a.effects.setTransition(c, k, l.from.y, c.from);
                    c.to = a.effects.setTransition(c, k, l.to.y, c.to)
                }
                if (l.from.x != l.to.x) {
                    n = n.concat(f);
                    c.from = a.effects.setTransition(c, f, l.from.x, c.from);
                    c.to = a.effects.setTransition(c, f, l.to.x, c.to)
                }
            }
            if (e == "content" || e == "both") {
                if (l.from.y != l.to.y) {
                    n = n.concat(p);
                    c.from = a.effects.setTransition(c, p, l.from.y, c.from);
                    c.to = a.effects.setTransition(c, p, l.to.y, c.to)
                }
            }
            a.effects.save(c, i ? n : m);
            c.show();
            a.effects.createWrapper(c);
            c.css("overflow", "hidden").css(c.from);
            if (e == "content" || e == "both") {
                k = k.concat(["marginTop","marginBottom"]).concat(p);
                f = f.concat(["marginLeft","marginRight"]);
                j = n.concat(k).concat(f);
                c.find("*[width]").each(function() {
                    child = a(this);
                    if (i) {
                        a.effects.save(child, j)
                    }
                    var q = {height:child.height(),width:child.width()};
                    child.from = {height:q.height * l.from.y,width:q.width * l.from.x};
                    child.to = {height:q.height * l.to.y,width:q.width * l.to.x};
                    if (l.from.y != l.to.y) {
                        child.from = a.effects.setTransition(child, k, l.from.y, child.from);
                        child.to = a.effects.setTransition(child, k, l.to.y, child.to)
                    }
                    if (l.from.x != l.to.x) {
                        child.from = a.effects.setTransition(child, f, l.from.x, child.from);
                        child.to = a.effects.setTransition(child, f, l.to.x, child.to)
                    }
                    child.css(child.from);
                    child.animate(child.to, b.duration, b.options.easing, function() {
                        if (i) {
                            a.effects.restore(child, j)
                        }
                    })
                })
            }
            c.animate(c.to, {queue:false,duration:b.duration,easing:b.options.easing,complete:function() {
                if (c.to.opacity === 0) {
                    c.css("opacity", c.from.opacity)
                }
                if (g == "hide") {
                    c.hide()
                }
                a.effects.restore(c, i ? n : m);
                a.effects.removeWrapper(c);
                if (b.callback) {
                    b.callback.apply(this, arguments)
                }
                c.dequeue()
            }})
        })
    }
})(jQuery);
;
/*
 * jQuery UI Effects Shake 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Shake
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(a) {
    a.effects.shake = function(b) {
        return this.queue(function() {
            var e = a(this),l = ["position","top","left"];
            var k = a.effects.setMode(e, b.options.mode || "effect");
            var n = b.options.direction || "left";
            var c = b.options.distance || 20;
            var d = b.options.times || 3;
            var g = b.duration || b.options.duration || 140;
            a.effects.save(e, l);
            e.show();
            a.effects.createWrapper(e);
            var f = (n == "up" || n == "down") ? "top" : "left";
            var p = (n == "up" || n == "left") ? "pos" : "neg";
            var h = {},o = {},m = {};
            h[f] = (p == "pos" ? "-=" : "+=") + c;
            o[f] = (p == "pos" ? "+=" : "-=") + c * 2;
            m[f] = (p == "pos" ? "-=" : "+=") + c * 2;
            e.animate(h, g, b.options.easing);
            for (var j = 1; j < d; j++) {
                e.animate(o, g, b.options.easing).animate(m, g, b.options.easing)
            }
            e.animate(o, g, b.options.easing).animate(h, g / 2, b.options.easing, function() {
                a.effects.restore(e, l);
                a.effects.removeWrapper(e);
                if (b.callback) {
                    b.callback.apply(this, arguments)
                }
            });
            e.queue("fx", function() {
                e.dequeue()
            });
            e.dequeue()
        })
    }
})(jQuery);
;
/*
 * jQuery UI Effects Slide 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Slide
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(a) {
    a.effects.slide = function(b) {
        return this.queue(function() {
            var e = a(this),d = ["position","top","left"];
            var i = a.effects.setMode(e, b.options.mode || "show");
            var h = b.options.direction || "left";
            a.effects.save(e, d);
            e.show();
            a.effects.createWrapper(e).css({overflow:"hidden"});
            var f = (h == "up" || h == "down") ? "top" : "left";
            var c = (h == "up" || h == "left") ? "pos" : "neg";
            var j = b.options.distance || (f == "top" ? e.outerHeight({margin:true}) : e.outerWidth({margin:true}));
            if (i == "show") {
                e.css(f, c == "pos" ? -j : j)
            }
            var g = {};
            g[f] = (i == "show" ? (c == "pos" ? "+=" : "-=") : (c == "pos" ? "-=" : "+=")) + j;
            e.animate(g, {queue:false,duration:b.duration,easing:b.options.easing,complete:function() {
                if (i == "hide") {
                    e.hide()
                }
                a.effects.restore(e, d);
                a.effects.removeWrapper(e);
                if (b.callback) {
                    b.callback.apply(this, arguments)
                }
                e.dequeue()
            }})
        })
    }
})(jQuery);
;
/*
 * jQuery UI Effects Transfer 1.8
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Transfer
 *
 * Depends:
 *	jquery.effects.core.js
 */
(function(a) {
    a.effects.transfer = function(b) {
        return this.queue(function() {
            var f = a(this),h = a(b.options.to),e = h.offset(),g = {top:e.top,left:e.left,height:h.innerHeight(),width:h.innerWidth()},d = f.offset(),c = a('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(b.options.className).css({top:d.top,left:d.left,height:f.innerHeight(),width:f.innerWidth(),position:"absolute"}).animate(g, b.duration, b.options.easing, function() {
                c.remove();
                (b.callback && b.callback.apply(f[0], arguments));
                f.dequeue()
            })
        })
    }
})(jQuery);
;