var htmlParser = require('html-parser');
var board_array = [];
var lightsUpFile = require('./LightsUp.js');
var CellType = lightsUpFile.CellType;
// var lightsUp = lightsUpFile.LightsUp;

var board_html = '<tbody><tr><td><img name="l_0_0" class="l" src="nd.gif"></td><td><img name="l_0_1" class="l" src="nd.gif"></td><td class="t"><img width="17" height="17" src="li00.gif"></td><td><img name="l_0_3" class="l" src="nd.gif"></td><td class="t"><img width="17" height="17" src="li0.gif"></td><td><img name="l_0_5" class="l" src="nd.gif"></td><td><img name="l_0_6" class="l" src="nd.gif"></td></tr><tr><td><img name="l_1_0" class="l" src="nd.gif"></td><td><img name="l_1_1" class="l" src="nd.gif"></td><td><img name="l_1_2" class="l" src="nd.gif"></td><td><img name="l_1_3" class="l" src="nd.gif"></td><td><img name="l_1_4" class="l" src="nd.gif"></td><td><img name="l_1_5" class="l" src="nd.gif"></td><td><img name="l_1_6" class="l" src="nd.gif"></td></tr><tr><td class="t"><img width="17" height="17" src="li0.gif"></td><td><img name="l_2_1" class="l" src="nd.gif"></td><td><img name="l_2_2" class="l" src="nd.gif"></td><td><img name="l_2_3" class="l" src="nd.gif"></td><td><img name="l_2_4" class="l" src="nd.gif"></td><td><img name="l_2_5" class="l" src="nd.gif"></td><td class="t"><img width="17" height="17" src="li0.gif"></td></tr><tr><td><img name="l_3_0" class="l" src="nd.gif"></td><td><img name="l_3_1" class="l" src="nd.gif"></td><td><img name="l_3_2" class="l" src="nd.gif"></td><td class="t"><img width="17" height="17" src="li1.gif"></td><td><img name="l_3_4" class="l" src="nd.gif"></td><td><img name="l_3_5" class="l" src="nd.gif"></td><td><img name="l_3_6" class="l" src="nd.gif"></td></tr><tr><td class="t"><img width="17" height="17" src="li2.gif"></td><td><img name="l_4_1" class="l" src="nd.gif"></td><td><img name="l_4_2" class="l" src="nd.gif"></td><td><img name="l_4_3" class="l" src="nd.gif"></td><td><img name="l_4_4" class="l" src="nd.gif"></td><td><img name="l_4_5" class="l" src="nd.gif"></td><td class="t"><img width="17" height="17" src="li00.gif"></td></tr><tr><td><img name="l_5_0" class="l" src="nd.gif"></td><td><img name="l_5_1" class="l" src="nd.gif"></td><td><img name="l_5_2" class="l" src="nd.gif"></td><td><img name="l_5_3" class="l" src="nd.gif"></td><td><img name="l_5_4" class="l" src="nd.gif"></td><td><img name="l_5_5" class="l" src="nd.gif"></td><td><img name="l_5_6" class="l" src="nd.gif"></td></tr><tr><td><img name="l_6_0" class="l" src="nd.gif"></td><td><img name="l_6_1" class="l" src="nd.gif"></td><td class="t"><img width="17" height="17" src="li00.gif"></td><td><img name="l_6_3" class="l" src="nd.gif"></td><td class="t"><img width="17" height="17" src="li00.gif"></td><td><img name="l_6_5" class="l" src="nd.gif"></td><td><img name="l_6_6" class="l" src="nd.gif"></td></tr></tbody>'

htmlParser.parse(board_html, {
    attribute: function(name, value) {
        if(name == 'src'){
            if(value == 'nd.gif')
                board_array.push(CellType.NO_LIGHT);
            else if(value == 'li00.gif')
                board_array.push(CellType.BLOCK);
            else if(value == 'li0.gif')
                board_array.push(CellType.ZERO_LIGHTS);
            else if(value == 'li1.gif')
                board_array.push(CellType.ONE_LIGHT);
            else if(value == 'li2.gif')
                board_array.push(CellType.TWO_LIGHTS);
            else if(value == 'li3.gif')
                board_array.push(CellType.THREE_LIGHTS);
            else if(value == 'li4.gif')
                board_array.push(CellType.FOUR_LIGHTS);
        }
        //console.log(board_array);
        },
});

function toMatrix(){
    var n = Math.sqrt(board_array.length);
    var data = new Array();
    var k = 0;
    for (var i = 0; i < n; i++) {
        data[i] = new Array();
        for (var j = 0; j < n; j++) {
            data[i][j] = board_array[k];
            k++;
        }
    }
    return data;
}

toMatrix();
