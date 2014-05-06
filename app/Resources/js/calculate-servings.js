/**
 * Created by elvinas on 5/5/14.
 */
$(function(){
    var byDefault=[];

    function isInteger(possibleInteger) {
        return Object.prototype.toString.call(possibleInteger) !== "[object Array]" && /^[\d]+$/.test(possibleInteger);
    }

    function toDeci(fraction) {
        var result,wholeNum=0, frac, deci=0;
        if(fraction.search('/') >=0){
            if(fraction.search('-') >=0){
                var wholeNum = fraction.split('-');
                frac = wholeNum[1];
                wholeNum = parseInt(wholeNum,10);
            }else{
                frac = fraction;
            }
            if(fraction.search('/') >=0){
                frac =  frac.split('/');
                deci = parseInt(frac[0], 10) / parseInt(frac[1], 10);
            }
            result = wholeNum+deci;
        }else{
            result = fraction
        }
        return result;
    }

    function calculate(){
        var str, i, j, value, results, slice, k, newServingsNum, servingsNum;
        $('#alert').hide(); //alert
        results = [];

        servingsNum = parseInt($('#numberOfServings').val()); // by recipe
        newServingsNum = $('#newServings').val(); // new value

        if(isInteger(newServingsNum) && newServingsNum > 0){
            if (byDefault.length == 0){
                j = 0;
                $("li#ing").each(function( index ) {
                    value = 0;
                    str = $( this ).text().trim().split(' ');     //split by spaces
                    k = 0;
                    for(i = 0; i < 2; i++){
                        if(str.length >= i + 1)
                            if (str[i].match(/\d+/g) != null) {
                                if(str[i].indexOf('(') == -1)
                                    if(str[i].match(/\-/g) != null){
                                        slice = str[i].split('-');
                                        if((slice[0].match(/\d+/g) != null) && (slice[1].match(/\d+/g) != null))
                                        {
                                            k++;
                                            value = (parseInt(slice[0]) + parseInt(slice[1]))/2;

                                        } else if (slice[0].match(/\d+/g) != null){
                                            //value = value + parseInt(str[i].split('-')[0]);
                                        }

                                    } else if (eval(str[i]) > -1) {
                                        value = value + eval(str[i]);
                                        k++;
                                    }
                            }
                    }

                    byDefault[j] = value / servingsNum;

                    if (byDefault[j] != 0){
                        results[j] = byDefault[j] * newServingsNum;
                        if(isInteger(results[j]) && results[j] !=0){
                            results[j] = results[j] + ' ';
                        } else if(!isInteger(results[j])){
                            results[j] = Math.round(results[j] * 10) / 10 + ' ';
                        }
                    } else if (byDefault[j] == 0){
                        results[j] = '';
                    }

                    for (i = k; i < str.length; i++){
                        results[j] = results[j] + str[i]+ ' ';
                    }

                    $( this).html(results[j]);
                    j++;
                });
            }
            else if (byDefault.length > 0) {
                j = 0;
                results = [];
                $("li#ing").each(function( index ) {
                    value = 0;
                    k = 0;
                    str = $( this ).text().trim().split(' ');
                    if (str[0].match(/\d+/g) != null) {
                        if(str[0].match(/\-/g) != null){
                            slice = str[0].split('-');
                            if((slice[0].match(/\d+/g) != null) && (slice[1].match(/\d+/g) != null))
                            {
                                k++;
                                value = (parseInt(slice[0]) + parseInt(slice[1]))/2;
                            } else if (slice[0].match(/\d+/g) != null) {
                                //value = value + parseInt(str[i].split('-')[0]);
                            }
                        } else if (eval(str[0]) > -1) {
                            value = value + eval(str[0]);
                            k++;
                        }
                    }

                    if (byDefault[j] != 0){
                        results[j] = byDefault[j] * newServingsNum;
                        if(isInteger(results[j]) && results[j] != 0){
                            results[j] = results[j] + ' ';
                        } else if(!isInteger(results[j])){
                            results[j] = Math.round(results[j] * 10) / 10 + ' ';
                        }
                    } else if (byDefault[j] == 0){
                        results[j] = '';
                    }

                    for (i = k; i < str.length; i++){
                        results[j] = results[j] + str[i]+ ' ';
                    }

                    $( this).html(results[j]);
                    j++;
                });
            }
        } else {
            $('#alert').show();
        }
    }

    $('#newServingsCalc').click(calculate);

});