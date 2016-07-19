##概述

这是一款即简单拓展性又强且兼容性良好的的对话框组件。

##组件依赖

* requirejs
* jQuery

核心代码比较简单，可以单独抽出来，配合seajs等其他js框架或者库。

##组件特点

* 模块化,方便导入。
* 底层抽象,只提供容器给对话框。
* 面向对象编写,方便拓展。
* 兼容IE6+ 、FF、Chrome等浏览器。

##API介绍

* init: 对话框的初始化操作,理论上只调用一次.当new一个实例化时,自动调用该方法.其作用是将容器模版添加到body上。
* show: 显示对话框容器。
* hide: 隐藏对话框容器。
* remove: 把对话框容器从body节点中删除。
* destory: 销毁示例对象中容器的引用。
* loadByInline: 加载html元素，参数可以是字符串节点、dom引用、html结构...
* loadByURL : 通过ajax从后台请求html结构.参数是一个后台地址.
* loadByIframe: 加载iframe框架.配置参数见源码.
* draw: 居中显示对话框.

##LiENCE

代码开源无限制，欢迎大家讨论，提出问题



