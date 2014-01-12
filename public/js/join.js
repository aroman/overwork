var validate = function (event) {
    var target = $(event.target);
    var val = target.val();

    if (!val) return;

    var error = "";

    switch (target.attr('name')) {
        case 'email':
            if (!validator.isEmail(val)) {
                error = "Invalid <i class='fa fa-frown-o'></i>";
            }
            break;
        case 'firstname':
            if (!validator.isLength(val, 1, 20)) {
                error = "Must be 2-20 characers";
            }
            else if (!validator.isAlpha(val)) {
                error = "No numbers please"
            }
            break;
        case 'lastname':
            if (!validator.isLength(val, 1, 20)) {
                error = "Must be 2-20 characers";
            }
            else if (!validator.isAlpha(val)) {
                error = "No numbers please"
            }
            break;
        case 'password':
            if (!validator.isLength(val, 6, 30)) {
                error = "Must be 6-30 characers";
            }
            break;
        case 'verify':
            if (!validator.equals(val, $("input[name=password]").val())) {
                error = "Doesn't match <i class='fa fa-frown-o'></i>";
            }
            break;
    }

    $(".error-" + target.attr('name')).html(error);
    if (error) {
        target.parent().addClass("has-error");
    } else {
        target.parent().removeClass("has-error");
    }
};

$(".form-control").on('keyup', _.throttle(validate, 100));
