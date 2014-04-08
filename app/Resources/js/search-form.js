/**
 * Created by elvinas on 4/2/14.
 */

var like_ingredients, unlike_ingredients;
like_ingredients = new Array();
unlike_ingredients = new Array();

function exists(ing) {
    var index = like_ingredients.indexOf(ing);
    if (index > -1) return true;

    index = unlike_ingredients.indexOf(ing);
    if (index > -1) return true;

    return false;
}

function deleteIngredient(ing, which){
    if(which == 'like'){
        var index = like_ingredients.indexOf(ing);
        if (index > -1) {
            like_ingredients.splice(index, 1);
        };
    } else {
        var index = unlike_ingredients.indexOf(ing);
        if (index > -1) {
            unlike_ingredients.splice(index, 1);
        };
    }
}

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

$('#Spicy').slider({
    formater: function (value) {
        return 'Current value: ' + value;
    }
});

$('#Bitter').slider({
    formater: function (value) {
        return 'Current value: ' + value;
    }
});

$('#Savory').slider({
    formater: function (value) {
        return 'Current value: ' + value;
    }
});

$('#Time').slider({
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
    var add_rodykle, k, p;
    k = $(this).children();
    add_rodykle = $(this).parent().parent();
    $.post('/app_dev.php/exists', { data: p = $('input[type="text"]#ing').last().val()},
        function (data) {
            if (data.exists == 'yes') {
                if (!exists(p)) {
                    like_ingredients.push(p);
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
            }
            if (data.exists == 'no') {
                //galima parodyt kokia nors pagalba
            }
        }
    )
});

//delete ingredient
$('body').delegate('#min-ing', 'click', function () {
    $(this).parent().parent().remove();
    deleteIngredient($(this).parent().children(".form-group").children('#ing').val(), 'like');
});

//add unlike ingredient
$('body').delegate('#add-no-ing', 'click', function () {
    var add_rodykle, k, p;
    k = $(this).children();
    add_rodykle = $(this).parent().parent();
    $.post('/app_dev.php/exists', { data: p = $('input[type="text"]#no-ing').last().val()},
        function (data) {
            if (data.exists == 'yes') {
                if (!exists(p)) {
                    unlike_ingredients.push(p);
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
            }
            if (data.exists == 'no') {
                //Galima parodyt kokia nors pagalba
            }
        }
    );
});

//delete unlike ingredient
$('body').delegate('#min-no-ing', 'click', function () {
    $(this).parent().parent().remove();
    deleteIngredient($(this).parent().children(".form-group").children('#no-ing').val(), 'unlike');
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

$('#find').click(function() {
    var sour, salty, sweet, spicy, bitter, savory, time, type;
    sour = $('#Sour').val();
    salty = $('#Salty').val();
    sweet = $('#Sweet').val();
    spicy = $('#Spicy').val();
    bitter = $('#Bitter').val();
    savory = $('#Savory').val();
    time = $('#Time').val();
    type = $('#type').val();
    //console.log(like_ingredients);
    //console.log(unlike_ingredients);
})
