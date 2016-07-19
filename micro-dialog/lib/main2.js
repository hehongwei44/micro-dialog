require.config({
    baseUrl: 'lib',
    paths: {
        jquery: 'jquery',
        dialog: '../com.jfz.dialog/dialog'
    }
});

require(['dialog'], function (dialog) {
    var $test = $("#test");
    var $test1 = $("#test1");
    var $test2 = $("#test2");
    var $test3 = $("#test3");
    var $jfz_dialog = $("#jfz_dialog");
    var $dialog_close = $("#dialog_close");

    $test.bind("click", function () {
        dialog.init();
    });

    $test1.bind("click", function () {
        dialog.show();
    });

    $test2.bind("click", function () {
        dialog.remove();
    });

    $test3.bind("click",function(){
        dialog.loadByInline($jfz_dialog.show());

    });

    $dialog_close.bind("click",function(){
        dialog.hide();
    });

});




