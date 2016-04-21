!(function(ns){
    function EventProxy(target){
        target.eventProxy = this;
        this.target = target;
        this.handlers = {};
    }
    EventProxy.prototype = {
        constructor : EventProxy,
        on : function(type, handler){
            if(typeof this.handlers[type] === 'undefined') this.handlers[type] = [];
            this.handlers[type].push(handler);
            return this;
        },
        off : function(type, handler){
            if(this.handlers[type] instanceof Array){
                if(typeof handler === 'undefined'){
                    delete this.handlers[type];
                }else{
                    var handlers = this.handlers[type];
                    for(var i = 0, l = handlers.length;  i < l; i++){
                        if(handlers[i] === handler){
                            handlers.splice(i, 1);
                            break;
                        }
                    }
                }
            }
            return this;
        },
        trigger : function(event){
            if(typeof event !== 'object') event = { type : event };
            if(arguments.length > 1) event.data = arguments[1];
            if(this.handlers[event.type] instanceof Array){
                event.target = this.target;
                var handlers = this.handlers[event.type];
                for(var i = 0, l = handlers.length;  i < l; i++){
                    handlers[i](event);
                }
            }
            return this;
        },
        unset : function(){
            delete this.target.eventProxy;
            delete this.target;
        }
    };
    ns.EventProxy = {
        setTo : function(target){
            return new EventProxy(target);
        },
        unsetFrom : function(target){
            if(target.eventProxy instanceof EventProxy){
                target.eventProxy.unset();
            }
        }
    };
})(window);