var viewer = {
    init: function(basePath) {
        viewer.sd = new SD(basePath);

        viewer.canvas = $(".Canvas");
        viewer.selectAnimation = $(".selectAnimation");

        
        viewer.selectAnimation.change(function() {
            viewer.changeAnimation(this.selectedIndex);
        });

        viewer.app = new PIXI.Application(512, 512, { transparent: true });
        viewer.canvas.html(viewer.app.view);
    },
    changeCanvas : function(skeletonData) {
        viewer.app.stage.removeChildren();

        viewer.spine = new PIXI.spine.Spine(skeletonData);
        var animations = viewer.spine.spineData.animations;
        var stringAnimations = "";
        for(var i = 0; i < animations.length; i++) {
            if (animations[i].name == "stand")
                stringAnimations += "<option value=\"" + animations[i].name + "\" selected>" + animations[i].name + "</option>";
            else
                stringAnimations += "<option value=\"" + animations[i].name + "\">" + animations[i].name + "</option>";
        }
        viewer.selectAnimation.html(stringAnimations);
        viewer.spine.state.setAnimation(0, "stand", true);
        viewer.app.stage.addChild(viewer.spine);
        viewer.spine.position.set(viewer.app.view.width * 0.5 , viewer.app.view.height * 0.8);
    },
    changeAnimation : function(num) {
        var name = viewer.spine.spineData.animations[num].name;
        viewer.spine.state.setAnimation(0, name, true);
    },
    onResize: function() {
        var element = document.getElementById("containerSD");
        var positionInfo = element.getBoundingClientRect();
        var width = positionInfo.width;
        if (width > 512){
            width = 512;
        }
        var height = width;
        viewer.app.view.style.width = width + "px";
        viewer.app.view.style.height = height + "px";
        viewer.app.renderer.resize(width, height);
        viewer.spine.position.set(width * 0.5 , height * 0.8);
    },
    removeSd : function() {
        viewer.app.stage.removeChildren();
    },
    loadSd: function(sd) {               
        viewer.sd.load(sd, viewer);
    },
    sdWidth: function (){
        return viewer.app.view.width;
    }
};
 