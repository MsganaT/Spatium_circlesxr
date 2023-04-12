AFRAME.registerComponent('attach-gun', {
    init: function() {
        
        // locks movement attaches gun to player camera
        CIRCLES.getAvatarRigElement().setAttribute('movement-controls', {enabled:false});
        CIRCLES.getMainCameraElement().setAttribute('shooter','');
        CIRCLES.getMainCameraElement().setAttribute('click-to-shoot', '');
        var cursorAttachment = document.querySelector('#cursor');
        CIRCLES.getMainCameraElement().appendChild(cursorAttachment);
        
            /** 
            CIRCLES.getCirclesSceneElement().addEventListener(CIRCLES.EVENTS.READY, function() {
                //tried to include code here but it would not run 

            
                 
                CIRCLES.getAvatarRigElement().setAttribute('movement-controls', {enabled:false});
                console.log("movement locked");
                CIRCLES.getMainCameraElement().setAttribute('shooter','');
                CIRCLES.getMainCameraElement().setAttribute('click-to-shoot', '');

             
        
            });

               */
    }

});