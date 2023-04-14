AFRAME.registerComponent ('spawn-enemies',{
    schema:{
        enemies_per_wave:{ type:'number', default: 5},
        waves:{type:'number', default: 3},
        event:{ type: 'string', default: 'spawn'},
        //difficulty: {type:'string', default: 'easy'},
    },


    /** initialize listeners and variables */

    // example from https://github.com/supermedium/aframe-super-shooter-kit/blob/master/examples/supercraft/components/enemy.js
    // example from https://www.html5gamedevs.com/topic/21551-spawning-enemies/
    init: function(){
        
        //AFRAME documentation suggested moving eveything to update function since it is called after init when the component is first attached
    },

    update: function(event){

        
        var thisEl = this.el;
        var data = this.data;
        var sceneEl = CIRCLES.getCirclesSceneElement();

        var windowWidthMin = -3.2;
        var windowWidthMax = 5.2;
        var windowHeightMin =1.37;
        var windowHeightMax =4;
        var windowDepth = -8.2;
        var fixedScaler = 0.087;

        var enemyCounter = data.enemies_per_wave;
        var enemiesArray = [];

        console.log('the current event is: ' +data.event);
   

        if(data.event === 'spawn'){

            for (let i = 0; i < data.enemies_per_wave; i++) {
                var randomXPosition = Math.random() * (windowWidthMax- (windowWidthMin )) + windowWidthMin ;
                var randomYPosition = Math.random() * (windowHeightMax - windowHeightMin ) + windowHeightMin ;
                console.log("randomX", randomXPosition);
                console.log("randomY", randomYPosition);

                var interval = 5000;

                let newEl = document.createElement('a-entity');
                sceneEl.appendChild(newEl);
                newEl.classList.add('target');
                newEl.setAttribute('target',{ static:false});
                newEl.setAttribute('gltf-model', "#ufo-model");
                newEl.setAttribute('animation-mixer','');
                newEl.setAttribute('hit-handler', '');
                newEl.object3D.scale.set(fixedScaler, fixedScaler, fixedScaler);
                newEl.object3D.position.set(randomXPosition, randomYPosition, windowDepth);

                enemiesArray.push(newEl);
                console.log('enemies to defeat: ' + enemyCounter);
                console.log('waves to complete in the creation: ' + data.waves);
            
        }
    }
    
        


       if(data.event === 'enemy-died'){
          
        thisEl.addEventListener('enemy-died', function() {
            enemyCounter --; 
            console.log('enemies left: '+ enemyCounter);

            if(enemyCounter === 0 && data.waves !== 0){
                data.waves --;
                data.event = 'spawn';
                sceneEl.emit('spawn');
              }

              if(data.waves === 0){
                sceneEl.querySelector('#hub_link').setAttribute('visible' ,true);
             }

        });
       
        }

    }

});

