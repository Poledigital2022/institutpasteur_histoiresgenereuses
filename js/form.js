(function ($) {
    $(document).ready(function () {

        $('#form-1').on('click', '.form-submit', function(e) {

            var $form = $('#form-1');

            $form.find('#error').html('');
            $form.find('#success').html('');

            $form.validate({
                errorLabelContainer: $form.find('#error'),
                rules: {
                    'civilite': {
                        required: true
                    },
                    'email': {
                        required: true,
                        email: true
                    },
                    'NOM': {
                        required: true,
                        minlength: 2
                    },
                    'PRENOM': {
                        required: true,
                        minlength: 2
                    },
                },
                messages: {
                    'email': {
                        required: '&nbsp;',
                        email: '&nbsp;'
                    },
                    'nom': {
                        required: '&nbsp;',
                        minlength: '&nbsp;'
                    },
                    'prenom': {
                        required: '&nbsp;',
                        minlength: '&nbsp;'
                    },
                    'TELEPHONE': {
                        number: '&nbsp;',
						maxlength: '&nbsp;',
						minlength: '&nbsp;',
						digits: '&nbsp;',
						maxlength: '&nbsp;',
                    },
					
                }
            });

            // If the form is invalid, do not submit it and return
            if (!$form.valid()) {

                $form.find('#error').html('Merci de bien vouloir compléter tous les champs du formulaire');
                return false;
            }

        });

        $('#form-1').on('submit', function() {
            var gender = $('.radios input:checked').next('label').text();
            // $.ajax({
            //     url : 'https://ediis.emsecure.net/contentrenderer/Body.aspx',
            //     data : {
            //         ID : 'NcWNPCL2RiXu%2B4ouPafURNXAMcLNDCDDCRcpjHUd9tCh5nnDfBEHt9y9awCPlanJ5D_RCQ1j3oNNNI',
            //         MAIL : $('#email').val(),
            //         NOM : $('#NOM').val(),
            //         PRENOM : $('#PRENOM').val(),
            //         TELEPHONE : $('#TELEPHONE').val(),
            //         COMMENTAIRE : $('#COMMENTAIRE').val()
            //     },
            //     method : 'GET',
            //         async : false
            // })
            // .done(function(data) {
            //     if ( console && console.log ) {
            //         console.log( document.getElementById('error').innerHTML = data );
            //         $('#success').html('Merci, votre message a bien été envoyé.');
            //         dataLayer.push({
            //             "event": "shareStory",
            //             "gender": gender
            //         });
            //     }
            // });
            
            var data = {
              civilite : $('.form-item.radios input:checked').val(),
              email : $('#email').val(),
              nom : $('#NOM').val(),
              prenom : $('#PRENOM').val(),
              tel : $('#TELEPHONE').val(),
              message : $('#COMMENTAIRE').val()
            };

            var genderShareStory;
            if ($('.form-item.radios input:checked').val()=='MME') genderShareStory = 'Madame';
            if ($('.form-item.radios input:checked').val()=='M') genderShareStory = 'Monsieur';

            dataLayer.push({
                "event": "shareStory",
                "gender": genderShareStory
            });
            
            $.ajax({
                type 		: 'POST', // define the type of HTTP verb we want to use (POST for our form)
                url 		: 'inc/ajax.insert.php', // the url where we want to POST
                data 		: data, // our data object
                dataType 	: 'json', // what type of data do we expect back from the server
                encode 		: true,
                complete: function(xmlHttp) {
                    console.log("merci");
                    location.href="merci.html";
                }
            });
            //$('#success').html('Merci, votre message a bien été envoyé.');
            

            return false;

        });


        $('.owl-dot').on('click', function(e) {
            /*dataLayer.push({
                "event":"readStory"
            });*/
        });

    });
	
	


})(jQuery);

function validateKeyStrokes(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 32 && charCode < 65) || (charCode > 90 && charCode < 97) || (charCode > 122 && charCode < 192)) {
        return false;
    }
    return true;
}