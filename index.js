'use strict';

function getCanvasCoord(canvas, evt) {
  var boundingRect = canvas.getBoundingClientRect();
  var x = evt.clientX - boundingRect.left;
  var y = evt.clientY - boundingRect.top;
  return { x, y };
};

function draw(ctx, rect) {
  ctx.save();
  rect.movable === true ? ctx.fillStyle = "green" : ctx.fillStyle = "red";
  ctx.translate(rect.origin.x, rect.origin.y);
  ctx.rotate(rect.angle * Math.PI / 180);
  ctx.scale(rect.scaleX, rect.scaleY);
  ctx.fillRect(0, 0, rect.width, rect.height);
  ctx.restore();
};

(
  function (document) {
    var mouseDelta = null;
    var rect1 = {
      width: 60,
      height: 40,
      movable: false,
      angle: 30,
      scaleX: 2,
      scaleY: 2,
      origin: {
        x: 120,
        y: 20
      }
    };

    var rect2 = {
      width: 60,
      height: 40,
      movable: false,
      angle: 0,
      scaleX: 1,
      scaleY: 1,
      origin: {
        x: 10,
        y: 10
      }
    };
    var canvas = document.getElementById("mycanvas");

    canvas.onmousedown = function (evt) {
      rect1.movable = true;
      var coords = getCanvasCoord(canvas, evt);
      mouseDelta = {
        dx: coords.x - rect1.origin.x,
        dy: coords.y - rect1.origin.y
      }
    };

    canvas.onmouseup = function (evt) {
      rect1.movable = false;
      mouseDelta = null;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      draw(ctx, rect1);
      draw(ctx, rect2);
    };

    canvas.onmousemove = function (evt) {
      if (rect1.movable) {
        var coords = getCanvasCoord(canvas, evt);
        rect1.origin = {
          x: coords.x - mouseDelta.dx,
          y: coords.y - mouseDelta.dy
        };
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw(ctx, rect1);
        draw(ctx, rect2);
      }
    };

    canvas.onmouseout = function (evt) {
      rect1.movable = false;
    };

    var ctx = canvas.getContext("2d");

    draw(ctx, rect1);
    draw(ctx, rect2);
  }
)(document);



