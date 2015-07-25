Items = new Mongo.Collection("items");
var latency = {total: 0, count: 0};
setInterval(function() {
  var avgLatency = latency.total/latency.count;
  console.log("LATENCY:", avgLatency.toFixed(2), "COUNT:", latency.count);
  latency = {total: 0, count: 0};
}, 2000);

if(Meteor.isClient) {
  Start = function() {
    var totalSubs = 100;
    function addSub() {
      Meteor.subscribe('item', function() {
        totalSubs--;
        if(totalSubs === 0) {
          console.log("Adds Added!");
          setInterval(function() {
            for(var lc=0; lc<1; lc++) {
              var start = Date.now();
              Meteor.call('go', function() {
                latency.total += Date.now() - start;
                latency.count++;
              });
            }
          }, 15);
        } else {
          addSub();
        }
      });
    }

    addSub();


  };
}

if(Meteor.isServer) {
  Meteor.publish('item', function() {
    var id = Math.ceil(Math.random() * 999999);
    return Items.find({abc: {$gt: id}});
  });

  Meteor.methods({
    go: function() {
      this.unblock();
      var start = Date.now();
      var id = Math.ceil(Math.random() * 1000) + 999999;
      Items.upsert({_id: "1000"}, {$set: {id: id}});
      
      latency.total += Date.now() - start;
      latency.count++;
    }
  });
}