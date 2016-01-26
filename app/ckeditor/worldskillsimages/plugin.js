CKEDITOR.plugins.add( 'worldskillsimages', {
    icons: 'uploadimage',
    init: function (editor) {

        editor.addCommand('uploadimage', new CKEDITOR.dialogCommand('uploadimageDialog', {
            allowedContent: 'img[alt,!src]',
            requiredContent: 'img[alt,src]'
        }));

        editor.ui.addButton( 'UploadImage', {
            label: 'Upload image',
            command: 'uploadimage',
            toolbar: 'insert'
        });

        CKEDITOR.dialog.add( 'uploadimageDialog', function (editor) {

            // get the Angular injector.
            var injector = angular.element(document.body).injector();

            // get the services
            var $upload = injector.get('$upload'),
                $q = injector.get('$q'),
                WorldSkills = injector.get('WorldSkills'),
                WORLDSKILLS_API_IMAGES = injector.get('WORLDSKILLS_API_IMAGES');

            var deferred,
                image;

            return {
                title: 'Upload image',
                minWidth: 300,
                minHeight: 100,
                onShow: function () {

                    deferred = $q.defer();
                    image = deferred.promise;

                    this.getContentElement('upload', 'image').getInputElement().$.addEventListener('change', function (evt) {

                        var files = [],
                            fileList,
                            i;
                        fileList = evt.__files_ || evt.target.files;
                        if (fileList != null) {
                            for (i = 0; i < fileList.length; i++) {
                                files.push(fileList.item(i));
                            }
                        }

                        $upload.upload({
                            url: WORLDSKILLS_API_IMAGES,
                            file: files[0],
                        }).success(function(data, status, headers, config) {
                            deferred.resolve(data);
                        });

                    });

                },
                onOk: function() {

                    image.then(function (image) {

                        var img = editor.document.createElement('img');
                        img.setAttribute( 'src', image.thumbnail);
                        img.setAttribute( 'alt', '');

                        editor.insertElement(img);

                    });
                },
                contents: [
                    {
                        id: 'upload',
                        elements: [
                            {
                                type: 'file',
                                id: 'image',
                                label: 'Image',
                            }
                        ]
                    }
                ]
            };
        });

    }
});
