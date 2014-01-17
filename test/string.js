var test = require('tape');
var bufferedchannel = require('..');
var peerpair = require('peerpair');
var peers = peerpair();
var channels;
var bcs;

test('create test connections', function(t) {
  t.plan(2);
  peers.createChannelsAndConnect('test', function(err, dcs) {
    t.ifError(err);
    channels = dcs;
    t.equal(channels.length, 2, 'have two channels');
  });
});

test('have dc connectivity', function(t) {
  t.plan(1);

  channels[1].onmessage = function(evt) {
    t.equal(evt.data, 'hi', 'got hi from channel:0');
  };

  channels[0].send('hi');
});

test('create buffered channels for existing channels', function(t) {
  t.plan(2);
  bcs = channels.map(bufferedchannel);

  t.equal(bcs.length, 2, 'created 2 buffered channels');
  t.equal(typeof bcs[0].send, 'function', 'buffered channels have a send function');
});