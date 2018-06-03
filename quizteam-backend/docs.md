###Client Emit Messages:

roomAdmin- (room, adminSecret) {
    @room- Number, code representing room
    @adminSecret- String, 
}

setRoom- (room) {
    @room- Number, code representing room
}

submitAction- (room, action) {
    @room- Number, code representing room
    @action- Number, index of the card pressed
}

###Server Emit Messages:

updateScore- (score) {
    @score- Integer, new score 
}

roomAdminResponse- (message) {
    @message- String, 'success' or 'unauthorized/room not found'
}

setRoomResponse- (message) {
    @message- String, 'success' or 'room doesnt exist'
}

startGame- () {

}

addCard- (card) {
    @card- Card, add card to client list
}

swapCards- (oldcard, newcard) {
    @oldcard- Number, index of card pressed
    @newcard- Card, replacement card
}

updateNumberOfPlayers- (players) {
    @players- Number, number of players joined
}