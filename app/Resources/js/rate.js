/**
 * Created by miezis on 4/8/14.
 */

$('#rating').slider({
    formater: function (value) {
        return 'Current value: ' + value;
    }
});