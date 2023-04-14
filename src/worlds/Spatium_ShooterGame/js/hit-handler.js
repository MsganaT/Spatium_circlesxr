
      AFRAME.registerComponent('hit-handler', {
        dependencies: ['material'],
  
        init: function () {
          var color;
          var el = this.el;
          var sceneEl = CIRCLES.getCirclesSceneElement();

          color = new THREE.Color();
          color.set('#666');
          el.components.material.material.color.copy(color);
          el.addEventListener('hit', () => {
            color.addScalar(0.05);
            el.components.material.material.color.copy(color);
          });
         
        
          el.addEventListener('die', () => {
            color.setRGB(1, 0, 0);
            el.components.material.material.color.copy(color);
            sceneEl.setAttribute('spawn-enemies',{event: 'enemy-died'});
            sceneEl.emit('enemy-died');
            el.setAttribute('visible', false);
            el.parentNode.removeChild(el);
         
           // el.object3D.position.y = this.hidingPos;
            //this.stop();
          });
        }
      });