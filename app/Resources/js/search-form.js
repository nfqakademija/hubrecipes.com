/**
 * Created by elvinas on 4/2/14.
 */

$(function(){

    if (sessionStorage.getItem('showmodal')!=='done') {
        $("#travelModal").modal("show");
        sessionStorage.setItem('showmodal','done');
    };

    if (sessionStorage.getItem('needSearch') === 'yes') {
        $(".search-form").slideDown("slow");
        sessionStorage.setItem('needSearch', 'no');
    }

    $("#newSearch").click(function(){
        sessionStorage.setItem('needSearch', 'yes')
    });

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
    });

    //close search form
    $('#up-search').click(function () {
        $(this).parent().parent().parent().parent().slideUp("slow");
    });

    var like_ingredients, unlike_ingredients, pageNr, bstr;
    pageNr = 0;
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

    function addIngredientButton() {
        var add_rodykle, k, p, divCount;
        k = $(this).children();
        divCount = $('div#ing').length;
        add_rodykle = $(this).parent();
        $.post(existsUrl, { data: p = $('input[type="text"]#ing').last().val()},
            function (data) {
                if (data.exists == 'yes') {
                    if (!exists(p)) {
                        $(k).attr('class', 'glyphicon glyphicon-minus-sign');
                        $(k).parent().attr('id', 'min-ing');
                        $('input[type="text"]#ing').last().prop('readonly', true);
                        if (divCount % 4 == 0){
                            $(add_rodykle).parent().after($(
                                '<div id="ing-row" class="row">' +
                                    '<div id="ing" class="form-inline col-md-3 input-group-sm">' +
                                    '<input id="ing" name="likeIngredients[]" type="text" class="form-control" placeholder="Ingredient" autocomplete="off" > ' +
                                    '<button id="add-ing" type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-plus-sign"></span></button>' +
                                    '</div>' +
                                '<div>'
                            ));
                        } else {
                            $(add_rodykle).after($(
                                '<div id="ing" class="form-inline col-md-3 input-group-sm">' +
                                    '<input id="ing" name="likeIngredients[]" type="text" class="form-control" placeholder="Ingredient" autocomplete="off" > ' +
                                    '<button id="add-ing" type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-plus-sign"></span></button>' +
                                    '</div>'
                            ));
                        }
                        like_ingredients.push(p);
                    }
                }
            }
        )
    }

    function addIngredientKey(e){
        if (e.keyCode == 13) {
            e.preventDefault();
            var add_rodykle, k, p, th, divCount;
            divCount = $('div#ing').length;
            th = this;
            k = $(this).parent().children('button').children('span');
            add_rodykle = $(this).parent();
            $.post(existsUrl, { data: p = $(this).val()},
                function (data) {
                    if (data.exists == 'yes') {
                        if (!exists(p)) {
                            $(k).attr('class', 'glyphicon glyphicon-minus-sign');
                            $(k).parent().attr('id', 'min-ing');
                            $(th).prop('readonly', true);
                            if (divCount % 4 == 0){
                                $(add_rodykle).parent().after($(
                                    '<div id="ing-row" class="row">' +
                                        '<div id="ing" class="form-inline col-md-3 input-group-sm">' +
                                        '<input id="ing" name="likeIngredients[]" type="text" class="form-control" placeholder="Ingredient" autocomplete="off" > ' +
                                        '<button id="add-ing" type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-plus-sign"></span></button>' +
                                        '</div>' +
                                    '<div>'
                                ));
                            } else {
                                $(add_rodykle).after($(
                                    '<div id="ing" class="form-inline col-md-3 input-group-sm">' +
                                        '<input id="ing" name="likeIngredients[]" type="text" class="form-control" placeholder="Ingredient" autocomplete="off" > ' +
                                        '<button id="add-ing" type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-plus-sign"></span></button>' +
                                        '</div>'
                                ));
                            }
                            like_ingredients.push(p);
                        }
                    }
                }
            )
        }
    }

    function addNoIngredientButton() {
        var add_rodykle, k, p, divCount;
        k = $(this).children();
        add_rodykle = $(this).parent();
        divCount = $('div#no-ing').length;
        $.post(existsUrl, { data: p = $('input[type="text"]#no-ing').last().val()},
            function (data) {
                if (data.exists == 'yes') {
                    if (!exists(p)) {
                        unlike_ingredients.push(p);
                        $(k).attr('class', 'glyphicon glyphicon-minus-sign');
                        $(k).parent().attr('id', 'min-no-ing');
                        $('input[type="text"]#no-ing').last().prop('readonly', true);
                        if (divCount % 4 == 0){
                            $(add_rodykle).parent().after($(
                                '<div id="no-ing-row" class="row">' +
                                    '<div id="no-ing" class="form-inline col-md-3  input-group-sm">'    +
                                        '<input id="no-ing" name="unlikeIngredients[]" type="text" class="form-control" placeholder="Ingredient" autocomplete="off" >'   +
                                        '<button id="add-no-ing" type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-plus-sign"></span></button>'  +
                                    '</div>' +
                                '</div>'
                            ))
                        } else {
                            $(add_rodykle).after($(
                                '<div id="no-ing" class="form-inline col-md-3  input-group-sm">'    +
                                    '<input id="no-ing" name="unlikeIngredients[]" type="text" class="form-control" placeholder="Ingredient" autocomplete="off" >'   +
                                    '<button id="add-no-ing" type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-plus-sign"></span></button>'  +
                                '</div>'
                            ));
                        }
                        unlike_ingredients.push(p);
                    }
                }
            }
        );
    }

    function addNoIngredientKey(e){
        if (e.keyCode == 13) {
            e.preventDefault();
            var add_rodykle, k, p, th, divCount;
            th = this;
            k = $(this).parent().children('button').children('span');
            divCount = $('div#no-ing').length;
            add_rodykle = $(this).parent();
            $.post(existsUrl, { data: p = $(this).val()},
                function (data) {
                    if (data.exists == 'yes') {
                        if (!exists(p)) {
                            $(k).attr('class', 'glyphicon glyphicon-minus-sign');
                            $(k).parent().attr('id', 'min-no-ing');
                            $(th).prop('readonly', true);
                            if (divCount % 4 == 0){
                                $(add_rodykle).parent().after($(
                                    '<div id="no-ing-row" class="row"><div id="no-ing" class="form-inline col-md-3  input-group-sm">'    +
                                        '<input id="no-ing" name="unlikeIngredients[]" type="text" class="form-control" placeholder="Ingredient" autocomplete="off" >'   +
                                        '<button style="margin-left: 3.5px" id="add-no-ing" type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-plus-sign"></span></button>'  +
                                        '</div></div>'
                                ))
                            } else {
                                $(add_rodykle).after($(
                                    '<div id="no-ing" class="form-inline col-md-3  input-group-sm">'    +
                                        '<input id="no-ing" name="unlikeIngredients[]" type="text" class="form-control" placeholder="Ingredient" autocomplete="off" >'   +
                                        '<button style="margin-left: 3.5px" id="add-no-ing" type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-plus-sign"></span></button>'  +
                                        '</div>'
                                ));
                            }
                            unlike_ingredients.push(p);
                        }
                    }
                }
            );
        }
    }

    function loadMore(){
        $('#load-more-div').hide();
        $('#preloader').show();
        var i, j, str, t, div_count_in_row ,row_count, ing;
        div_count_in_row = 4;
        $.post(loadMoreUrl, {
                start: k,
                cuisine: cuisine,
                sour: sour,
                salty: salty,
                sweet: sweet,
                spicy: spicy,
                bitter: bitter,
                savory: savory,
                timee: timee,
                typeS: typeS,
                like: likeI,
                unlike: unlikeI
            },
            function(data){

                str = '';
                t = 0;
                if(data.res.matches.length > 0){
                    if(data.res.matches.length < 4){
                        div_count_in_row = data.res.matches.length;
                        row_count = 1;
                    } else {
                        row_count = Math.ceil(data.res.matches.length/4);
                    }
                    for(var i = 0; i < row_count ; i++){
                        if((i == row_count - 1)){
                            div_count_in_row = data.res.matches.length - t;
                        }
                        str = str + '<div class="row">';

                        for(var j = 0; j < div_count_in_row; j++){
                            str = str + '<div class="col-md-3"> <div class="thumbnail">'
                            str = str + '<a href="' + baseUrl +'recipe/' + data.res.matches[t].id + '">'+ '<img src="'+data.res.matches[t].imageUrlsBySize['90'].replace('s90', 's360') + '" alt="' + data.res.matches[t].recipeName + '"></a>';
                            str = str + '<div class="caption">';
                            str = str + '<a class="rec-name" href="' + baseUrl +'recipe/' + data.res.matches[t].id + '">' + '<h4>' + data.res.matches[t].recipeName + '</h4></a>';
                            str = str + '<div>';
                            for(var ing = 0; ing < data.res.matches[t].ingredients.length; ing++){
                                if(ing != data.res.matches[t].ingredients.length-1){
                                    str = str + data.res.matches[t].ingredients[ing] + ', ';
                                }else{
                                    str = str + data.res.matches[t].ingredients[ing] + '.';
                                }
                            }
                            str = str + '</div></div></div></div>';
                            t++;
                        }

                        str = str + '</div>';
                    }
                    k = k + data.res.matches.length;

                    $('#load').before($(str));
                    $('#load-more-div').show();
                    $('#preloader').hide();
                } else {
                    $('#load').remove();
                    $('.row:last').after($('<div class="text-center"><h4>No more results...</h4></div>'))
                }
            })
    }

    function loadMoreHomePage(){
        var i, j, str, t, div_count_in_row ,row_count, ing;
        div_count_in_row = 4;
        $('#load-more-div').hide();
        $('#preloader').show();
        $.post(loadMoreHomePageItemsUrl,{},
            function(data){
                str = '';
                t = 0;
                if(data.response.matches.length > 0){
                    if(data.response.matches.length < 4){
                        div_count_in_row = data.response.matches.length;
                        row_count = 1;
                    } else {
                        row_count = Math.ceil(data.response.matches.length/4);
                    }
                    for(var i = 0; i < row_count ; i++){
                        if((i == row_count - 1)){
                            div_count_in_row = data.response.matches.length - t;
                        }
                        str = str + '<div class="row">';
                        for(var j = 0; j < div_count_in_row; j++){
                            str = str + '<div class="col-md-3"> <div class="thumbnail">'
                            str = str + '<a href="' + baseUrl +'recipe/' + data.response.matches[t].id + '">'+ '<img src="'+data.response.matches[t].imageUrlsBySize['90'].replace('s90', 's360') + '" alt="' + data.response.matches[t].recipeName + '"></a>';
                            str = str + '<div class="caption">';
                            str = str + '<a class="rec-name" href="' + baseUrl +'recipe/' + data.response.matches[t].id + '">' + '<h4>' + data.response.matches[t].recipeName + '</h4></a>';
                            str = str + '<div>';

                            for(var ing = 0; ing < data.response.matches[t].ingredients.length; ing++){
                                if(ing != data.response.matches[t].ingredients.length-1){
                                    str = str + data.response.matches[t].ingredients[ing] + ', ';
                                }else{
                                    str = str + data.response.matches[t].ingredients[ing] + '.';
                                }
                            }
                            str = str + '</div></div></div></div>';
                            t++;
                        }
                        str = str + '</div>';
                    }
                    pageNr = pageNr + 1;
                    history.pushState({},"", pageNr);
                    $('#load').before($(str));
                    $('#load-more-div').show();
                    $('#preloader').hide();
                } else {
                    $('#load').remove();
                    $('.row:last').after($('<div class="text-center"><h4>No more results...</h4></div>'))
                }
            })
    }

    function autoComplete(){

        $(this).typeahead({
            source: function (query, process) {
                return $.post(autoCompleteUrl, { data: query},
                    function (data) {
                        return process(data.suggestions);
                    });
            },
            items: 8
        });
    }

    //add like ingredient
    $('body').delegate('#add-ing', 'click', addIngredientButton);

    $('body').delegate('#ing', 'keypress', addIngredientKey);

    //delete ingredient
    $('body').delegate('#min-ing', 'click', function () {
        $(this).parent().remove();
        deleteIngredient($(this).parent().children('#ing').val(), 'like');
    });

    //add unlike ingredient
    $('body').delegate('#add-no-ing', 'click', addNoIngredientButton);

    $('body').delegate('#no-ing', 'keypress', addNoIngredientKey);

    //delete unlike ingredient
    $('body').delegate('#min-no-ing', 'click', function () {
        $(this).parent().remove();
        deleteIngredient($(this).parent().children('#no-ing').val(), 'unlike');
    });

    //auto complete
    $('body').delegate('#ing, #no-ing', 'keyup', autoComplete);

    if ((window.location.href.indexOf('results') > 0) || (window.location.href.indexOf('Cuisine') > 0) ){

        if(sour != ""){
            $('#Sour').slider('setValue', parseFloat(sour));
        }

        if(salty != ""){
            $('#Salty').slider('setValue', parseFloat(salty));
        }

        if(sweet != ""){
            $('#Sweet').slider('setValue', parseFloat(sweet));
        }

        if(spicy != ""){
            $('#Spicy').slider('setValue', parseFloat(spicy));
        }

        if(bitter != ""){
            $('#Bitter').slider('setValue', parseFloat(bitter));
        }

        if(savory != "") {
            $('#Savory').slider('setValue', parseFloat(savory));
        }

        if(timee != ""){
            $('#Time').slider('setValue', parseFloat(timee)/60);
        }

        if(typeS != "-"){
            $('#type').val(typeS);
        }

        if(cuisine != "-"){
            $('#Cuisine').val(cuisine);
        }

        if(likeI.length > 0){
            for(i = 0; i < likeI.length; i++){
                if (((i+1)%4 == 0) && (i != 0)){
                    $('#add-ing:last').parent().remove();
                    $('div#ing:last').after($(
                        '<div id="ing" class="form-inline col-md-3  input-group-sm">' +
                            '<input id="ing" name="likeIngredients[]" type="text" class="form-control" autocomplete="off" value="' + likeI[i].replace(/%20/gi,' ') + '" readonly>' +
                            '<button style="margin-left: 3.5px" id="min-ing" type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-minus-sign"></span></button>' +
                        '</div>'
                    ));
                    $('.search-form').find('div#ing-row').last().after($(
                        '<div id="ing-row" class="row"><div id="ing" class="form-inline col-md-3  input-group-sm">' +
                            '<input id="ing" name="likeIngredients[]" type="text" class="form-control" autocomplete="off">' +
                            '<button style="margin-left: 3.5px" id="add-ing" type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-plus-sign"></span></button>' +
                            '</div></div>'
                    ));
                    like_ingredients.push(likeI[i].replace(/%20/gi,' '));
                } else {
                $('div#ing:last').before($(
                    '<div id="ing" class="form-inline col-md-3  input-group-sm">' +
                        '<input id="ing" name="likeIngredients[]" type="text" class="form-control" autocomplete="off" value="' + likeI[i].replace(/%20/gi,' ') + '" readonly>' +
                        '<button style="margin-left: 3.5px" id="min-ing" type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-minus-sign"></span></button>' +
                    '</div>'
                ));
                like_ingredients.push(likeI[i].replace(/%20/gi,' '));
                }
            }
        }

        if(unlikeI.length > 0){
            for(i = 0; i < unlikeI.length; i++){
                if (((i+1)%4 == 0) && (i != 0)){
                    $('#add-no-ing:last').parent().remove();
                    $('div#no-ing:last').after($(
                        '<div id="no-ing" class="form-inline col-md-3  input-group-sm">' +
                            '<input id="no-ing" name="unlikeIngredients[]" type="text" class="form-control" autocomplete="off" value="' + unlikeI[i].replace(/%20/gi,' ') + '" readonly>' +
                            '<button style="margin-left: 3.5px" id="min-ing" type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-minus-sign"></span></button>' +
                            '</div>'
                    ));
                    $('.search-form').find('div#no-ing-row').last().after($(
                        '<div id="no-ing-row" class="row"><div id="no-ing" class="form-inline col-md-3  input-group-sm">' +
                            '<input id="no-ing" name="unlikeIngredients[]" type="text" class="form-control" autocomplete="off">' +
                            '<button style="margin-left: 3.5px" id="add-no-ing" type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-plus-sign"></span></button>' +
                            '</div></div>'
                    ));
                    unlike_ingredients.push(unlikeI[i].replace(/%20/gi,' '));
                } else {
                    $('div#no-ing:last').before($(
                        '<div id="no-ing" class="form-inline col-md-3  input-group-sm">' +
                            '<input id="no-ing" name="unlikeIngredients[]" type="text" class="form-control" autocomplete="off" value="' + unlikeI[i].replace(/%20/gi,' ') + '" readonly>' +
                            '<button style="margin-left: 3.5px" id="min-no-ing" type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-minus-sign"></span></button>' +
                            '</div>'
                    ));
                    unlike_ingredients.push(unlikeI[i].replace(/%20/gi,' '));
                }
            }
        }
        var k = 16;
        $('#load-more').click(loadMore);
    }
    var k = 16;
    $("a[name='home']").click(loadMoreHomePage);

    function loadMoreByEmotion(emotionUrl){
        $('#load-more-div').hide();
        $('#preloader').show();
        var i, j, str, t, div_count_in_row ,row_count, ing;
        div_count_in_row = 4;
        $.post(emotionUrl, {
                start: k
            },
            function(data){
                str = '';
                t = 0;
                if(data.res.matches.length > 0){
                    if(data.res.matches.length < 4){
                        div_count_in_row = data.res.matches.length;
                        row_count = 1;
                    } else {
                        row_count = Math.ceil(data.res.matches.length/4);
                    }
                    for(var i = 0; i < row_count ; i++){
                        if((i == row_count - 1)){
                            div_count_in_row = data.res.matches.length - t;
                        }
                        str = str + '<div class="row">';

                        for(var j = 0; j < div_count_in_row; j++){
                            str = str + '<div class="col-md-3"> <div class="thumbnail">'
                            str = str + '<a href="' + baseUrl +'recipe/' + data.res.matches[t].id + '">'+ '<img src="'+data.res.matches[t].imageUrlsBySize['90'].replace('s90', 's360') + '" alt="' + data.res.matches[t].recipeName + '"></a>';
                            str = str + '<div class="caption">';
                            str = str + '<a class="rec-name" href="' + baseUrl +'recipe/' + data.res.matches[t].id + '">' + '<h4>' + data.res.matches[t].recipeName + '</h4></a>';
                            str = str + '<div>';
                            for(var ing = 0; ing < data.res.matches[t].ingredients.length; ing++){
                                if(ing != data.res.matches[t].ingredients.length-1){
                                    str = str + data.res.matches[t].ingredients[ing] + ', ';
                                }else{
                                    str = str + data.res.matches[t].ingredients[ing] + '.';
                                }
                            }
                            str = str + '</div></div></div></div>';
                            t++;
                        }

                        str = str + '</div>';
                    }
                    k = k + data.res.matches.length;

                    $('#load').before($(str));
                    $('#load-more-div').show();
                    $('#preloader').hide();
                } else {
                    $('#load').remove();
                    $('.row:last').after($('<div class="text-center"><h4>No more results...</h4></div>'))
                }
            })
    }
    if (window.location.href.indexOf('happy') > 0){
        $('#load-more').click(function(){
            loadMoreByEmotion(happy);
        });
    }
    if (window.location.href.indexOf('sad') > 0){
        $('#load-more').click(function(){
            loadMoreByEmotion(sad);
        });
    }

    if (window.location.href.indexOf('angry') > 0){
        $('#load-more').click(function(){
            loadMoreByEmotion(angry);
        });
    }


    if (window.location.href.indexOf('surprised') > 0){
        $('#load-more').click(function(){
            loadMoreByEmotion(surprised);
        });
    }
});