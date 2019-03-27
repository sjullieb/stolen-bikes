import { PingPongBall } from "./../src/ping-pong.js"

describe('Ping Pong Ball', function() {

  var reusablePingPong;

  beforeEach(function(){
    reusablePingPong = new PingPongBall(5);
  });

  it('should test whether a ping pong ball is created with the correct size', function() {
    expect(reusablePingPong.radius).toEqual(5);
  });
});
