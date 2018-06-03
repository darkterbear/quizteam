import axios from 'axios';
import querystring from 'query-string';

const baseUrl = 'http://138.197.207.244:3000/'
const quizletURLRegex = RegExp('(https:\/\/quizlet.com\/)[0-9]+');

var createRoom = function(quizletUrl, callback) {
    const url = baseUrl + 'api/room/create';

    if (!quizletURLRegex.test(quizletUrl)) {
        callback({
            status: 1
        });
        return false;
    }
    
    var second = quizletUrl.split('quizlet.com/')[1];

    var id = second.substring(0, second.indexOf('/'));
    
    var data = querystring.stringify({
        quizletSetID: id
    });
    axios.post(url, data).then((resp) => {
        console.log(resp);
    });
    
}

export { createRoom };
