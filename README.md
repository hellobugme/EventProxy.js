# EventProxy.js

JavaScript 事件代理

* Author : Kainan Hong <<1037714455@qq.com>>
* Source : https://github.com/hellobugme/EventProxy.js/

## Feature

* 给对象扩展自定义事件功能

## Methods

* `EventProxy.setTo(target)`
<br/>给对象扩展事件代理
* `EventProxy.unsetTo(target)`
<br/>删除对象的事件代理
* `target.eventProxy.on(type, handler)`
<br/>添加事件侦听
* `target.eventProxy.off(type, handler)`
<br/>删除事件侦听
* `target.eventProxy.trigger(type, data)`
<br/>触发事件

## Example

```javascript
var btn = document.getElementById('btn');

// 给对象扩展事件代理
EventProxy.setTo(btn);

// 添加事件侦听
btn.eventProxy.on('test', function(event){
    console.info('test trigger!', event);
});

btn.onclick = function(){
    // 触发事件
    btn.eventProxy.trigger('test', {
        type  : 'abc',
        value : Math.random()
    });

    // 删除事件侦听
    // btn.eventProxy.off('test');

    // 删除对象的事件代理
    // EventProxy.unsetFrom(btn);
};
```
