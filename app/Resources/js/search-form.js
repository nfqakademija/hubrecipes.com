/**
 * Created by elvinas on 4/2/14.
 */


$('#Sour').slider({
    formater: function (value) {
        return 'Current value: ' + value;
    }
});

$('#Salty').slider({
    formater: function (value) {
        return 'Current value: ' + value;
    }
});

$('#Sweet').slider({
    formater: function (value) {
        return 'Current value: ' + value;
    }
});

$('#Meaty').slider({
    formater: function (value) {
        return 'Current value: ' + value;
    }
});

$('#Bitter').slider({
    formater: function (value) {
        return 'Current value: ' + value;
    }
});

//Open search form
$('#open-search').click(function () {
    $('.search-form').slideDown("slow");
})

//close search form
$('#up-search').click(function () {
    $(this).parent().parent().parent().slideUp("slow");
})

//add like ingredient
$('body').delegate('#add-ing', 'click', function () {
    var add_rodykle, this_rodykle, k;
    k = $(this).children();
    add_rodykle = $(this).parent().parent();
    this_rodykle = $(this).parent().parent().parent();
    $.post('/app_dev.php/exists', { data: $('input[type="text"]#ing').last().val()},
        function (data) {
            if (data.exists == 'yes') {
                $(k).attr('class', 'glyphicon glyphicon-minus-sign');
                $(k).parent().attr('id', 'min-ing');
                $('input[type="text"]#ing').last().prop('readonly', true);
                $(add_rodykle).after($(
                    '<div id="ing" class="col-md-3 ">' +
                        '<form class="form-inline" role="form">' +
                        '<div class="form-group input-group-sm">' +
                        '<input id="ing" type="text" class="form-control " placeholder="Ingredient" autocomplete="off">' +
                        '</div>' +
                        '<button id="add-ing" type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-plus-sign"></span></button>' +
                        '</form>' +
                        '</div>'));
            }
            if (data.exists == 'no') {
                //galima parodyt kokia nors pagalba
            }
        }
    )
});

//delete ingredient
$('body').delegate('#min-ing', 'click', function () {
    var add_rodykle, this_rodykle, k;
    add_rodykle = $(this).parent().parent().remove();
    this_rodykle = $(this).parent().parent().parent();
});

//add unlike ingredient
$('body').delegate('#add-no-ing', 'click', function () {
    var add_rodykle, this_rodykle, k;
    k = $(this).children();
    add_rodykle = $(this).parent().parent();
    this_rodykle = $(this).parent().parent().parent();
    $.post('/app_dev.php/exists', { data: $('input[type="text"]#no-ing').last().val()},
        function (data) {
            if (data.exists == 'yes') {
                $(k).attr('class', 'glyphicon glyphicon-minus-sign');
                $(k).parent().attr('id', 'min-no-ing');
                $('input[type="text"]#no-ing').last().prop('readonly', true);
                $(add_rodykle).after($(
                    '<div id="no-ing" class="col-md-3 ">' +
                        '<form class="form-inline" role="form">' +
                        '<div class="form-group input-group-sm">' +
                        '<input id="no-ing" type="text" class="form-control " placeholder="Ingredient" autocomplete="off">' +
                        '</div>' +
                        '<button id="add-no-ing" type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-plus-sign"></span></button>' +
                        '</form>' +
                        '</div>'));
            }
            if (data.exists == 'no') {
                //Galima parodyt kokia nors pagalba
            }
        }
    );
});

//delete unlike ingredient
$('body').delegate('#min-no-ing', 'click', function () {
    var add_rodykle, this_rodykle, k;
    add_rodykle = $(this).parent().parent().remove();
    this_rodykle = $(this).parent().parent().parent();
});

//auto complete
$('body').delegate('input[type="text"]', 'keyup', function () {
    $(this).typeahead({
        source: function (query, process) {
            return $.post('/app_dev.php/autoComplete', { data: query},
                function (data) {
                    return process(data.suggestions);
                });
        },
        items: 5,
        minLength: 1
    });
});
