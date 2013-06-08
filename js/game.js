window.onload = function(){
  // define dom elements
  var $intro = document.getElementById('intro');
  var $play = document.getElementById('play');
  var $outro = document.getElementById('outro');
  var $playAgain = document.getElementById('playAgain');
  var $stage = document.getElementById('stage');
  var $monster = document.getElementById('monster');
  var $clouds = document.getElementById('clouds');
  var $moon = document.getElementById('moon');

  // audio gubbins
  var roar = document.getElementById('roar');
  var roarArr = [
    'bear_growl1',
    'bear_growl2'
  ];
  var roarArrLength = roarArr.length;
  var randSrc = null;

  // $intro
  $play.onclick = function(){
    var v = 1;
    setInterval(function(){
      if (v < 0) {
        $intro.style.display = "none";
      } else {
        v = v - .01;
        $intro.style.opacity = v;
      }
    }, 10);
    return false;
  };

  $playAgain.onclick = function(){
    score = 0;
    $score.innerHTML = score;
    var v = 1;
    var hideOutro = setInterval(function(){
      if (v < 0) {
        clearInterval(hideOutro);
        $outro.style.display = 'none';
        var j = 0;
        var setStage = setInterval(function(){
          j = j + .01;
          $stage.style.display = "block";
          if (j > 1) {
            clearInterval(setStage);
          } else {
            $stage.style.opacity = j;
          }
        }, 10);
        positionMonster();
        positionBuildings();
      } else {
        v = v - .01;
        $outro.style.opacity = v;
      }
    }, 10);
    return false;
  };

  function removeElementsByClass(className){
    elements = document.getElementsByClassName(className);
    while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
    }
  }

  // position the monster
  function positionMonster(){
    $monster.style.opacity = 1;
    $monster.setAttribute('style', 'left:' + Math.floor(Math.random() * 677) + 'px; z-index:' + (Math.floor(Math.random() * 4) + 1) + '00');
  }
  positionMonster();

  // position the buildings
  function positionBuildings(){
    removeElementsByClass('building');
    var b = 10;
    var placeEm = setInterval(function(){
      if (b < 1) {
        clearInterval(placeEm);
      } else {
        b = b - 1;
        var building = document.createElement('div');
        if (b > 0) {
          building.setAttribute('style','z-index: 300; box-shadow: 0 0 3px #000; background-color: #090909; height: ' + (Math.floor(Math.random() * 140) + 50) + 'px; width: ' + (Math.floor(Math.random() * 50) + 100) + 'px; position: absolute; bottom: 0; left: ' + Math.floor(Math.random() * 650) + 'px');
        }
        if (b > 3) {
          building.setAttribute('style','z-index: 200; box-shadow: 0 0 3px #000; background-color: #060606; height: ' + (Math.floor(Math.random() * 140) + 50) + 'px; width: ' + (Math.floor(Math.random() * 50) + 100) + 'px; position: absolute; bottom: 0; left: ' + Math.floor(Math.random() * 650) + 'px');
        }
        if (b > 8) {
          building.setAttribute('style','z-index: 100; box-shadow: 0 0 3px #000; background-color: #030303; height: ' + (Math.floor(Math.random() * 140) + 50) + 'px; width: ' + (Math.floor(Math.random() * 50) + 100) + 'px; position: absolute; bottom: 0; left: ' + Math.floor(Math.random() * 650) + 'px');
        }
        building.setAttribute('class', 'building');
        $stage.appendChild(building);
      }
    });
  }
  positionBuildings();

  var score = 0;
  var $score = document.getElementById('score');

  $monster.onclick = function(){
    randSrc = 'audio/' + roarArr[Math.floor(Math.random() * roarArrLength)] + ".wav";
    console.log(randSrc);
    roar.src = randSrc;
    roar.load();
    roar.play();
    $monster.style.backgroundPosition = "-123px 0";
    setTimeout(function(){
      $monster.style.backgroundPosition = "0 0";
      var i = 1;
      var unsetMonster = setInterval(function(){
        i = i - .01;
        if (i < 0) {
          clearInterval(unsetMonster);
        } else {
          $monster.style.opacity = i;
        }
      }, 10);
    }, 1000);
    setTimeout(function(){
      j = 1;
      var unsetStage = setInterval(function(){
        j = j - .01;
        if (j < 0) {
          clearInterval(unsetStage);
        } else {
          $stage.style.opacity = j;
        }
      }, 10);
    }, 2000);
    setTimeout(function(){
      if (score > 5) {
        score = 5;
        roar.src = "audio/winsound.wav";
        roar.load();
        roar.play();
        var g = 0;
        var setOutro = setInterval(function(){
          g = g + .01;
          if (g > 1){
            $outro.style.display = 'block';
            clearInterval(setOutro);
          } else {
            $outro.style.opacity = g;
          }
        }, 10);
      } else {
        var j = 0;
        var setStage = setInterval(function(){
          j = j + .01;
          $monster.style.display = 'block';
          $stage.style.display = "block";
          if (j > 1) {
            clearInterval(setStage);
          } else {
            $stage.style.opacity = j;
          }
        }, 10);
        positionMonster();
        positionBuildings();
        score = score + 1;
        $score.innerHTML = score;
      }
    }, 3000);
  };

  // animate some stuff I guess
  var $cloud1 = document.getElementById("c1");
  var cloud1Counter = 75;
  var countDir1 = true;
  setInterval(function(){
    if (cloud1Counter > 100) {
      countDir1 = false;
    } else if (cloud1Counter < 75) {
      countDir1 = true;
    }
    if (countDir1 === true) {
      cloud1Counter = cloud1Counter + 1;
    } else {
      cloud1Counter = cloud1Counter - 1;
    }
    $cloud1.setAttribute("style", "height:" + cloud1Counter + "px");
  }, 75);
  var $cloud2 = document.getElementById("c2");
  var cloud2Counter = 83;
  var countDir2 = true;
  setInterval(function(){
    if (cloud2Counter > 100) {
      countDir2 = false;
    } else if (cloud1Counter < 75) {
      countDir2 = true;
    }
    if (countDir2 === true) {
      cloud2Counter = cloud2Counter + 1;
    } else {
      cloud2Counter = cloud2Counter - 1;
    }
    $cloud2.setAttribute("style", "height:" + cloud2Counter + "px");
  }, 75);
  var $cloud3 = document.getElementById("c3");
  var cloud3Counter = 100;
  var countDir3 = true;
  setInterval(function(){
    if (cloud3Counter > 100) {
      countDir3 = false;
    } else if (cloud3Counter < 75) {
      countDir3 = true;
    }
    if (countDir3 === true) {
      cloud3Counter = cloud3Counter + 1;
    } else {
      cloud3Counter = cloud3Counter - 1;
    }
    $cloud3.setAttribute("style", "height:" + cloud3Counter + "px");
  }, 75);

  // lovely smooth rotation of the moon
  var m = 0;
  setInterval(function(){
    m = m + 1;
    if (m === (360 * 16)) {
      m = 0;
    }
    $moon.setAttribute("style", "-webkit-transform: rotate(" + (m / 16) + "deg);");
  }, 25);

};
