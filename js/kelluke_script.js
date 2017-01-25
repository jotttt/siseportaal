/*jshint multistr: true, browser: true, jquery: true*/
$(document).ready(function() {
    // FUNCTIONS
    //--------------------------------------------
    // update message count on webpage
    function updateMsgCount(msgs) {
        $('#qm-count').empty().append(msgs.length);
    }
    // sort messages according to their type
    function sortMessages(msgs) {
        var sortedMessages = [[],[],[]];

        for (var i in msgs) {
            if (msgs[i].msg_type === 'test' ) {
                sortedMessages[0].push(msgs[i]);
            }
            else if (msgs[i].msg_type === 'notification') {
                sortedMessages[1].push(msgs[i]);
            }
            else if (msgs[i].msg_type === 'chat') {
                sortedMessages[2].push(msgs[i]);
            }
            else {
                console.log(msgs[i] + '<-- this quick message type not found');
            }
        }
        return sortedMessages;
    }
    // insert messages to webpage
    function insertMessages(msgs) {
        var type = [['Test', 'Notification', 'Chat'],['danger', 'warning', 'success']];
        var data = '';

        for (var i in msgs) {
            if (msgs[i].length === 0) {
                continue;
            }
            else {
                data += '<div class="panel" id="panel_'+ i +'"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-target="#collapse-'+ i +'" href="#collapse-'+ i +'">'+ type[0][i] +' <span class="badge badge-'+ type[1][i] +'">'+ msgs[i].length +'</span></a></h4></div><div id="collapse-'+ i +'" class="panel-collapse collapse"><div class="panel-body">';

                for (var j in msgs[i]) {
                    data += '<div class="level-2"><a href="'+ msgs[i][j].link +'"><i class="fa fa-angle-right"></i> '+ msgs[i][j].message +'</a></div>';
                }

                data += '</div></div></div>';

                $('#qm-container').empty().append(data);
            }
        }
    }

    // PROGRAM FLOW
    //--------------------------------------------
    // ajax request to GET the data
    function executeQuery() {
        $.ajax({
            type: "GET",
            url: 'https://portal-dev.ttu.ee/api/poll:mq',
            cache: false,
            crossDomain: true,
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            success: function (msgs) {
                // get all messages into array
                var userMsgsArray = [];
                for (var key in msgs) {
                    // skip loop if the property is from prototype
                    if (!msgs.hasOwnProperty(key)) {continue;}
                    userMsgsArray.push(msgs[key]);
                }
                updateMsgCount(userMsgsArray);
                insertMessages(sortMessages(userMsgsArray));
                console.log(sortMessages(userMsgsArray));
            }
        });
        setTimeout(executeQuery, 10000);
    }

    setTimeout(executeQuery, 10000);

    // create quick message prototype
    /*function QuickMessage(id, type, creator, created, message, link, recipient, alarmDate, expireDate) {
    this.id = id;
    this.type = type;
    this.creator = creator;
    this.created = created;
    this.message = message;
    this.link = link;
    this.recipient = recipient;
    this.alarmDate = alarmDate;
    this.expireDate = expireDate;
/ SAMPLE MESSAGES
var sampleQuickMessage1 = new QuickMessage ('ASD1234', 2,'Sander Marandi', '1111-11-11T12:00:00Z', 'See on kiirs6num!!!', 'https://www.google.com', 'Ivo Tamm', '1111-11-11T12:00:00Z', '1111-11-11T12:00:00Z');
var sampleQuickMessage2 = new QuickMessage ('FGH4321', 0,'Pille Tamm', '1111-11-11T12:00:00Z', 'Vau, milline teavitus!!!', 'https://www.google.com', 'Ivo Tamm', '1111-11-11T12:00:00Z', '1111-11-11T12:00:00Z');
var sampleQuickMessage3 = new QuickMessage ('LOK4321', 0,'Siim Soone', '1111-11-11T12:00:00Z', 'Veel üks teavitus!!!', 'https://www.google.com', 'Ivo Tamm', '1111-11-11T12:00:00Z', '1111-11-11T12:00:00Z');
var sampleQuickMessage4 = new QuickMessage ('QWE5678', 1,'Kalev Saar', '1111-11-11T12:00:00Z', 'Ooooo koosk6lastus!!!', 'Ivo Tamm', 'https://www.google.com', '1111-11-11T12:00:00Z', '1111-11-11T12:00:00Z');
*/
});
