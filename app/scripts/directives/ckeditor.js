(function () {
    'use strict';

    CKEDITOR.disableAutoInline = true;

    angular.module('quizzesApp').directive('ckEditor', function(alert) {
        return {
            require: '?ngModel',
            link: function ($scope, elm, attr, ngModel) {

                CKEDITOR.plugins.addExternal('worldskillsimages', '/ckeditor/worldskillsimages/', 'plugin.js');

                var isReady = false;
                var data = [];
                var options = {
                    enterMode : CKEDITOR.ENTER_BR,
                    height: 80,
                    contentsCss: 'ckeditor/contents.css',
                    removePlugins : 'stylescombo,elementspath,resize,liststyle,image,specialchar,horizontalrule,table,tabletools,contextmenu',
                    extraPlugins : 'worldskillsimages',
                    toolbarGroups : [
                        {name : 'basicstyles', groups : [ 'basicstyles', 'cleanup' ]},
                        {name : 'styles'},
                        {name : 'insert'},
                        {name : 'tools'},
                        {name : 'document', groups : [ 'mode' ]}
                    ],
                    format_tags : 'pre',
                    uiColor: '#e8e8e8'
                };
                var ck = CKEDITOR.replace(elm[0], options);

                function setData() {
                    if (!data.length) {
                        return;
                    }

                    var d = data.splice(0, 1);
                    ck.setData(d[0] || '<span></span>', function () {
                        setData();
                        isReady = true;
                    });
                }

                ck.on('instanceReady', function (e) {
                    if (ngModel) {
                        setData();
                    }
                });
                
                elm.bind('$destroy', function () {
                    ck.destroy(false);
                });

                if (ngModel) {
                    ck.on('change', function () {
                        $scope.$apply(function () {
                            var data = ck.getData();
                            if (data == '<span></span>') {
                                data = null;
                            }
                            ngModel.$setViewValue(data);
                        });
                    });

                    ngModel.$render = function (value) {
                        if (ngModel.$viewValue === undefined) {
                            ngModel.$setViewValue(null);
                            ngModel.$viewValue = null;
                        }

                        data.push(ngModel.$viewValue);

                        if (isReady) {
                            isReady = false;
                            setData();
                        }
                    };
                }
            }
        };
    });

})();
