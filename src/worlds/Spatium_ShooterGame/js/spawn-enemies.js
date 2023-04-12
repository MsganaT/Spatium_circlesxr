AFRAME.registerComponent ('spawn-enemies',{
    schema:{
        enemies_per_wave:{ type:'number', default: 5},
        waves:{type:'number', default: 3},
        //difficulty: {type:'string', default: 'easy'},
    },


    /** initialize listeners and variables */

    // example from https://github.com/supermedium/aframe-super-shooter-kit/blob/master/examples/supercraft/components/enemy.js
    // example from https://www.html5gamedevs.com/topic/21551-spawning-enemies/
    init: function(){

        var thisEl = this.el;
        var sceneEl = CIRCLES.getCirclesSceneElement();

        var windowWidthMin = -3.2;
        var windowWidthMax = 5.2;
        var windowHeightMin =1.37;
        var windowHeightMax =4;
        var windowDepth = -8.2;
        var fixedScaler = 0.087;

        this.enemiesArray = [];
        console.log(this.enemiesArray.length);

        for (let i = 0; i < 5; i++) {
            var randomXPosition = Math.random() * (windowWidthMax- (windowWidthMin )) + windowWidthMin ;
            var randomYPosition = Math.random() * (windowHeightMax - windowHeightMin ) + windowHeightMin ;
            console.log("randomX", randomXPosition);
            console.log("randomY", randomYPosition);

            var interval = 5000;

            this.tweenAppear = null;      
            this.tweenDisappear = null;
            this.vulnerable = false;

            let newEl = document.createElement('a-entity');
            sceneEl.appendChild(newEl);
            newEl.classList.add('target');
            newEl.setAttribute('target',{ static:false});
            newEl.setAttribute('gltf-model', "#ufo-model");
            newEl.setAttribute('animation-mixer','');
            newEl.setAttribute('hit-handler', '');
            newEl.object3D.scale.set(fixedScaler, fixedScaler, fixedScaler);
            newEl.object3D.position.set(randomXPosition, randomYPosition, windowDepth);

            this.enemiesArray.push(newEl);
            console.log(this.enemiesArray.length);
    }
    console.log('done loop');

    

    },

    update: function(event){
  

    }

});

