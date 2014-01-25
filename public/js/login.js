// Dope hack so we don't have to re-validate
// the entire form on every keystroke. <3 underscore
// Only contains inputs which aren't pre-filled at
// the start to make browser autocomplete work.
invalid_inputs = _.compact(_.map($(".form-control"), function (input) {
    if (!$(input).val()) return $(input).attr('name');
}));

$("button[type=submit]").prop('disabled', !_.isEmpty(invalid_inputs));

var validate = function (event) {
    var target = $(event.target);
    var name = target.attr('name');
    var val = target.val();

    var error = null;

    switch (name) {
        case 'email':
            if (!validator.isEmail(val)) {
                error = "Invalid <i class='fa fa-frown-o'></i>";
            }
            else {
                var password_input = $("input[name=password]");
                if (!password_input.val() && !password_input.parent().hasClass("has-error")) {
                    password_input.trigger('keyup');
                }
            }
            break;
        case 'password':
            if (!validator.isLength(val, 1)) {
                error = "";
            }
            break;
    }

    if (!_.isNull(error)) {
        target.parent().addClass("has-error");
        invalid_inputs = _.uniq(_.union(invalid_inputs, [name]));
    } else {
        target.parent().removeClass("has-error");
        invalid_inputs = _.without(invalid_inputs, name);
    }

    val && $(".error-" + name).html(error);
    $("button[type=submit]").prop('disabled', !_.isEmpty(invalid_inputs));
};

$(".form-control").on('keyup', _.throttle(validate, 100));
