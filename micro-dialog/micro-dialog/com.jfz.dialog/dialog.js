/*该对话框插件依赖于jquery*/
define(['jquery'], function ($) {

    var dialogTemp = '', settings = '',
        isIE6 = !-[1, ] && !window.XMLHttpRequest;

    //对话框容器模版
    dialogTemp = "<div class='dialog-cnt'>" +
        "<div class='dialog-mask' id='j_dialogMask'></div>" +
        "<div class='dialog-body' id='j_dialogBody'></div>" +
        "</div>";

    if (isIE6) {
        var $$html = document.getElementsByTagName('html')[0],

            restoreHtml = function () {
                //恢复滚轮
                document.body.onmousewheel = function () {
                    event.returnValue = true;
                }
                //恢复滚动条
                $$html.style.overflowY = 'scroll';
            };
    }

    var Dialog = function () {
        this.init();
    };

    /**
     * 对话框的初始化操作
     * */
    Dialog.prototype.init = function () {

        //如果页面上不存在对话框的话,追加到页面上去,存在的话，则不执行任何代码
        if ($(".dialog-cnt").length === 0) {

            this.$dialog = $(dialogTemp).appendTo("body").hide();
            this.$dialogMask = this.$dialog.find(".dialog-mask");
            this.$dialogBody = this.$dialog.find(".dialog-body");

            with (this) {
                //容器的样式
                $dialog.css({
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%'
                });
                //遮罩层的样式
                $dialogMask.css({
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    background: '#000',    //背景色
                    opacity: '0.5',      //透明度
                    filter: 'alpha(opacity=50)'

                });
                //主题内容的样式
                $dialogBody.css({
                    'position': 'fixed',
                    'z-index': 99999,
                    '_position': 'absolute'
                });
                //居中定位
                draw();

            }
            ;
        }

    };

    /**
     * 显示对话框
     * */
    Dialog.prototype.show = function () {
        this.$dialog.show();

        if (isIE6) {
            position = function () {

                html = $$html,
                    dd = document.documentElement,
                    db = document.body,
                    dom = dd || db,
                    getScroll = function (win) {
                        return {
                            left: Math.max(dd.scrollLeft, db.scrollLeft),
                            top: Math.max(dd.scrollTop, db.scrollTop)
                        };
                    };

                if (isIE6 && document.body.currentStyle.backgroundAttachment !== 'fixed') {
                    html.style.backgroundImage = 'url(about:blank)';
                    html.style.backgroundAttachment = 'fixed';
                }


                return {
                    fixed: isIE6 ? function (elem) {
                        var style = elem.style,
                            doc = getScroll(),
                            dom = '(document.documentElement || document.body)',
                            left = parseInt(style.left) - doc.left,
                            top = parseInt(style.top) - doc.top;
                        this.absolute(elem);
                        style.setExpression('left', 'eval(' + dom + '.scrollLeft + ' + left + ') + "px"');
                        style.setExpression('top', 'eval(' + dom + '.scrollTop + ' + top + ') + "px"');
                    } : function (elem) {
                        elem.style.position = 'fixed';
                    },

                    absolute: isIE6 ? function (elem) {
                        var style = elem.style;
                        style.position = 'absolute';
                        style.removeExpression('left');
                        style.removeExpression('top');
                    } : function (elem) {
                        elem.style.position = 'absolute';
                    }
                };
            }();

            var $$j_dialogMask = document.getElementById('j_dialogMask');
            var $$j_dialogBody = document.getElementById('j_dialogBody');

            //IE6静止滚动
            document.body.onmousewheel = function () {
                event.returnValue = false;
            }
            $$html.style.overflowY = 'visible';

            position.fixed($$j_dialogMask);
            position.fixed($$j_dialogBody);
        }
        //居中定位
        this.draw();
    };

    /**
     * 对话框的隐藏操作
     * */
    Dialog.prototype.hide = function () {
        this.$dialog.hide();

        if (isIE6) {
            restoreHtml();
        }
    };

    /**
     * 删除对话框的节点
     * */
    Dialog.prototype.remove = function () {
        this.$dialog.remove();

        if (isIE6) {
            restoreHtml();
        }
    }

    /**
     * 对话框的销毁操作
     * */
    Dialog.prototype.destroy = function () {
        this.$dialog = null;
        this.$dialogMask = null;
        this.$dialogBody = null;
    };

    /**
     * 加载内联元素
     * */
    Dialog.prototype.loadByInline = function (html) {
        this.$dialogBody.append(html);
    };

    /**
     * 加载ajax元素
     * @param:url 请求的url地址
     * */
    Dialog.prototype.loadByURL = function (url) {
        var that = this;
        $.ajax({
            'type': 'GET',
            'url': url,
            'success': function (info) {
                that.$dialogBody.append(info);
            },
            'error': function (info) {
                that.$dialogBody.append("数据加载有误,请重试加载");
            }
        });
    };

    /**
     * 加载iframe元素
     * @param : ifram->iframe的配置参数
     * ifrma.src : iframe的url地址
     * iframe.widht : ifrmae的宽度
     * ifrmae.height : ifrmae的高度
     * */
    Dialog.prototype.loadByIframe = function (iframe) {
        var default_options = {
            'width': iframe.width,
            'height': iframe.height,
            'marginheight': '0',
            'marginwidth': '0',
            'frameborder': '0',
            'src': iframe.src
        };

        this.$dialogBody.append($('<iframe>').attr(default_options));
    };

    /**
     *  居中显示对话框
     * */
    Dialog.prototype.draw = function () {
        var
        /* 获得视窗的高度和宽度
         viewport_width = $(window).width(),
         viewport_height = $(window).height(),*/

        // 获取对话框的高度和宽度
            dialog_width = this.$dialogBody.width(),
            dialog_height = this.$dialogBody.height();

        this.$dialogBody.css({
            'top': '50%',
            'left': '50%',
            'margin-top': -dialog_height / 2,
            'margin-left': -dialog_width / 2
        });

    };

    return new Dialog(settings);
});