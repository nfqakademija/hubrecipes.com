/**
 * Created by elvinas on 4/2/14.
 */
$(function(){
    $('#travelModal').modal('show');

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
        $('.search-form').slideToggle("slow");
    })

//close search form
    $('#up-search').click(function () {
        $(this).parent().parent().slideUp("slow");
    })

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

    function deleteIngredient(ing, which) {
        if (which == 'like') {
            var index = like_ingredients.indexOf(ing);
            if (index > -1) {
                like_ingredients.splice(index, 1);
            }
        } else {
            var index = unlike_ingredients.indexOf(ing);
            if (index > -1) {
                unlike_ingredients.splice(index, 1);
            }
        }
    }

    //add like ingredient
    $('body').delegate('#add-ing', 'click', function () {
        var add_rodykle, k, p;
        k = $(this).children();
        add_rodykle = $(this).parent();
        $.post('/app_dev.php/exists', { data: p = $('input[type="text"]#ing').last().val()},
            function (data) {
                if (data.exists == 'yes') {
                    if (!exists(p)) {
                        $(k).attr('class', 'glyphicon glyphicon-minus-sign');
                        $(k).parent().attr('id', 'min-ing');
                        $('input[type="text"]#ing').last().prop('readonly', true);
                        $(add_rodykle).after($(
                            '<div id="ing" class="form-inline col-md-3  input-group-sm">' +
                                '<input id="ing" name="likeIngredients[]" type="text" class="form-control" autocomplete="off">' +
                                '<button style="margin-left: 3.5px" id="add-ing" type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-plus-sign"></span></button>' +
                                '</div>'
                        ));
                        like_ingredients.push(p);
                    }
                }
            }
        )
    });

    $('body').delegate('#ing', 'keypress', function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            var add_rodykle, k, p, th;
            th = this;
            k = $(this).parent().children('button').children('span');
            add_rodykle = $(this).parent();
            $.post('/app_dev.php/exists', { data: p = $(this).val()},
                function (data) {
                    if (data.exists == 'yes') {
                        if (!exists(p)) {
                            $(k).attr('class', 'glyphicon glyphicon-minus-sign');
                            $(k).parent().attr('id', 'min-ing');
                            $(th).prop('readonly', true);
                            $(add_rodykle).after($(
                                '<div id="ing" class="form-inline col-md-3  input-group-sm">' +
                                    '<input id="ing" name="likeIngredients[]" type="text" class="form-control" autocomplete="off">' +
                                    '<button style="margin-left: 3.5px" id="add-ing" type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-plus-sign"></span></button>' +
                                    '</div>'
                            ));
                            like_ingredients.push(p);
                        }
                    }
                    /*if (data.exists == 'no') {
                     //galima parodyt kokia nors pagalba
                     }*/
                }
            )
        }
    });

//delete ingredient
    $('body').delegate('#min-ing', 'click', function () {
        $(this).parent().remove();
        deleteIngredient($(this).parent().children('#ing').val(), 'like');
    });

//add unlike ingredient
    $('body').delegate('#add-no-ing', 'click', function () {
        var add_rodykle, k, p;
        k = $(this).children();
        add_rodykle = $(this).parent();
        $.post('/app_dev.php/exists', { data: p = $('input[type="text"]#no-ing').last().val()},
            function (data) {
                if (data.exists == 'yes') {
                    if (!exists(p)) {
                        unlike_ingredients.push(p);
                        $(k).attr('class', 'glyphicon glyphicon-minus-sign');
                        $(k).parent().attr('id', 'min-no-ing');
                        $('input[type="text"]#no-ing').last().prop('readonly', true);
                        $(add_rodykle).after($(
                            '<div id="no-ing" class="form-inline col-md-3  input-group-sm">'    +
                                '<input id="no-ing" name="unlikeIngredients[]" type="text" class="form-control" autocomplete="off">'   +
                                '<button style="margin-left: 3.5px" id="add-no-ing" type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-plus-sign"></span></button>'  +
                                '</div>'
                        ));
                    }
                }
                /*if (data.exists == 'no') {
                 //Galima parodyt kokia nors pagalba
                 }*/
            }
        );
    });

    $('body').delegate('#no-ing', 'keypress', function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            var add_rodykle, k, p, th;
            th = this;
            k = $(this).parent().children('button').children('span');
            add_rodykle = $(this).parent();
            $.post('/app_dev.php/exists', { data: p = $(this).val()},
                function (data) {
                    if (data.exists == 'yes') {
                        if (!exists(p)) {
                            $(k).attr('class', 'glyphicon glyphicon-minus-sign');
                            $(k).parent().attr('id', 'min-no-ing');
                            $(th).prop('readonly', true);
                            $(add_rodykle).after($(
                                '<div id="no-ing" class="form-inline col-md-3  input-group-sm">'    +
                                    '<input id="no-ing" name="unlikeIngredients[]" type="text" class="form-control" autocomplete="off">'   +
                                    '<button style="margin-left: 3.5px" id="add-no-ing" type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-plus-sign"></span></button>'  +
                                    '</div>'
                            ));
                            unlike_ingredients.push(p);
                        }
                    }
                    /*if (data.exists == 'no') {
                     //Galima parodyt kokia nors pagalba
                     }*/
                }
            );
        }
    });

//delete unlike ingredient
    $('body').delegate('#min-no-ing', 'click', function () {
        $(this).parent().remove();
        deleteIngredient($(this).parent().children('#no-ing').val(), 'unlike');
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
});



