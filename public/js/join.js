// Dope hack so we don't have to re-validate
// the entire form on every keystroke. <3 underscore
invalid_inputs = _.map($(".form-control"), function (input) {
    return $(input).attr('name');
});

var validate = function (event) {
    var target = $(event.target);
    var name = target.attr('name');
    var val = target.val();

    var error = "";

    switch (name) {
        case 'email':
            if (!validator.isEmail(val)) {
                error = "Invalid <i class='fa fa-frown-o'></i>";
            }
            break;
        case 'firstname':
            if (!validator.isLength(val, 2, 20)) {
                error = "Must be 2-20 characers";
            }
            else if (!validator.isAlpha(val)) {
                error = "Letters only"
            }
            break;
        case 'lastname':
            if (!validator.isLength(val, 1, 20)) {
                error = "Must be less than 20 characers";
            }
            else if (!validator.isAlpha(val)) {
                error = "Letters only"
            }
            break;
        case 'password':
            if (!validator.isLength(val, 6, 30)) {
                error = "Must be 6-30 characers";
            }
            // force validation of 'verify' field in case it matched
            // before (it's not empty) but now we've changed the password
            else if ($("input[name=verify]").val())  {
                $("input[name=verify]").trigger('input');
            }
            break;
        case 'verify':
            if (!validator.equals(val, $("input[name=password]").val())) {
                error = "Doesn't match <i class='fa fa-frown-o'></i>";
            }
            break;
    }

    if (error) {
        target.parent().addClass("has-error");
        invalid_inputs = _.uniq(_.union(invalid_inputs, [name]));
    } else {
        target.parent().removeClass("has-error");
        invalid_inputs = _.without(invalid_inputs, name);
    }

    val && $(".error-" + name).html(error);
    $("button[type=submit]").prop('disabled', !_.isEmpty(invalid_inputs));
};

$(".form-control").bind('input', validate);
