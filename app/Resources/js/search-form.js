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
    })

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
                    alert();
                    $('#add-ing').parent().remove();
                    $('div#ing:last').after($(
                        '<div id="ing" class="form-inline col-md-3  input-group-sm">' +
                            '<input id="ing" name="likeIngredients[]" type="text" class="form-control" autocomplete="off" value="' + likeI[i] + '" readonly>' +
                            '<button style="margin-left: 3.5px" id="min-ing" type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-minus-sign"></span></button>' +
                        '</div>'
                    ));
                    $('#ing-row').after($(
                        '<div id="ing-row" class="row"><div id="ing" class="form-inline col-md-3  input-group-sm">' +
                            '<input id="ing" name="likeIngredients[]" type="text" class="form-control" autocomplete="off">' +
                            '<button style="margin-left: 3.5px" id="add-ing" type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-plus-sign"></span></button>' +
                        '</div></div>'
                    ));
                    like_ingredients.push(likeI[i]);
                } else {
                $('div#ing:last').before($(
                    '<div id="ing" class="form-inline col-md-3  input-group-sm">' +
                        '<input id="ing" name="likeIngredients[]" type="text" class="form-control" autocomplete="off" value="' + likeI[i] + '" readonly>' +
                        '<button style="margin-left: 3.5px" id="min-ing" type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-minus-sign"></span></button>' +
                    '</div>'
                ));
                like_ingredients.push(likeI[i]);
                }
            }
        }

        if(unlikeI.length > 0){
            for(i = 0; i < unlikeI.length; i++){
                if (((i+1)%4 == 0) && (i != 0)){
                    alert();
                    $('#add-no-ing').parent().remove();
                    $('div#no-ing:last').after($(
                        '<div id="no-ing" class="form-inline col-md-3  input-group-sm">' +
                            '<input id="no-ing" name="unlikeIngredients[]" type="text" class="form-control" autocomplete="off" value="' + unlikeI[i] + '" readonly>' +
                            '<button style="margin-left: 3.5px" id="min-ing" type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-minus-sign"></span></button>' +
                            '</div>'
                    ));
                    $('#no-ing-row').after($(
                        '<div id="ing-row" class="row"><div id="no-ing" class="form-inline col-md-3  input-group-sm">' +
                            '<input id="no-ing" name="unlikeIngredients[]" type="text" class="form-control" autocomplete="off">' +
                            '<button style="margin-left: 3.5px" id="add-no-ing" type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-plus-sign"></span></button>' +
                            '</div></div>'
                    ));
                    unlike_ingredients.push(unlikeI[i]);
                } else {
                    $('div#no-ing:last').before($(
                        '<div id="no-ing" class="form-inline col-md-3  input-group-sm">' +
                            '<input id="no-ing" name="unlikeIngredients[]" type="text" class="form-control" autocomplete="off" value="' + unlikeI[i] + '" readonly>' +
                            '<button style="margin-left: 3.5px" id="min-no-ing" type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-minus-sign"></span></button>' +
                            '</div>'
                    ));
                    unlike_ingredients.push(unlikeI[i]);
                }
            }
        }
        var k = 16;
        $('#load-more').click(function() {
            var i, j, str, t, div_count_in_row ,row_count, ing;
            div_count_in_row = 4;
            $.post('/app_dev.php/loadMoreCuisine', {
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
                    console.log(data.res);
                    //console.log(data.res);
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
                            console.log(row_count);
                            if((i == row_count - 1)){
                                div_count_in_row = data.res.matches.length - t;
                            }
                            str = str + '<div class="row">';
                            for(var j = 0; j < div_count_in_row; j++){
                                str = str + '<div class="col-md-3"> <div class="thumbnail">'
                                str = str + '<a href="http://hubrecipes.dev/app_dev.php/recipe/' + data.res.matches[t].id + '">'+ '<img src="'+data.res.matches[t].imageUrlsBySize['90'].replace('s90', 's360') + '" alt="bla"></a>';
                                str = str + '<div class="caption">';
                                str = str + '<a href="http://hubrecipes.dev/app_dev.php/recipe/' + data.res.matches[t].id + '">' + '<h5>' + data.res.matches[t].recipeName + '</h5></a>';
                                str = str + '<div>';

                                for(var ing = 0; ing < data.res.matches[t].ingredients.length; ing++){
                                    str = str + data.res.matches[t].ingredients[ing] + ' ';
                                }
                                str = str + '</div></div></div></div>';
                                t++;
                            }
                            str = str + '</div>';
                        }
                        k = k + data.res.matches.length;
                        $('#load').before($(str));
                    } else {
                        $('#load').remove();
                        $('.row:last').after($('<div class="text-center"><h4>No more results...</h4></div>'))
                    }
                })
        });
    }

  if(window.location.href === 'http://hubrecipes.dev/app_dev.php/'){

      $('#load-more').click(function() {
          var i, j, str, t, div_count_in_row ,row_count, ing;

          div_count_in_row = 4;
          $.post('/app_dev.php/',{},
              function(data){
                  console.log(data.res);
                  //console.log(data.res);
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
                          console.log(row_count);
                          if((i == row_count - 1)){
                              div_count_in_row = data.res.matches.length - t;
                          }
                          str = str + '<div class="row">';
                          for(var j = 0; j < div_count_in_row; j++){
                              str = str + '<div class="col-md-3"> <div class="thumbnail">'
                              str = str + '<a href="http://hubrecipes.dev/app_dev.php/recipe/' + data.res.matches[t].id + '">'+ '<img src="'+data.res.matches[t].imageUrlsBySize['90'].replace('s90', 's360') + '" alt="bla"></a>';
                              str = str + '<div class="caption">';
                              str = str + '<a href="http://hubrecipes.dev/app_dev.php/recipe/' + data.res.matches[t].id + '">' + '<h5>' + data.res.matches[t].recipeName + '</h5></a>';
                              str = str + '<div>';

                              for(var ing = 0; ing < data.res.matches[t].ingredients.length; ing++){
                                  str = str + data.res.matches[t].ingredients[ing] + ' ';
                              }
                              str = str + '</div></div></div></div>';
                              t++;
                          }
                          str = str + '</div>';
                      }
                      k = k + data.res.matches.length;
                      $('#load').before($(str));
                  } else {
                      $('#load').remove();
                      $('.row:last').after($('<div class="text-center"><h4>No more results...</h4></div>'))
                  }
              })
      });
  }

});



