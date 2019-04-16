var pixiTai;
(function (pixiTai) {
    PIXI.loader
        .add('moc', "https://deo68x5sknl6a.cloudfront.net/Ships/256_Tai_Yuan/Live2D/skin2/taiyuan_2.moc3", { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.BUFFER })
        .add('texture', "https://deo68x5sknl6a.cloudfront.net/Ships/256_Tai_Yuan/Live2D/skin2/texture_00.png")
        .add('texture_1', "https://deo68x5sknl6a.cloudfront.net/Ships/256_Tai_Yuan/Live2D/skin2/texture_01.png")
        .add('physics', "Live2D/256_Tai_Yuan/skin2/taiyuan_2.physics3.json", { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON })
        .add('idle', "Live2D/256_Tai_Yuan/skin2/idle.motion3.json", { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON })        
        .add('login', "Live2D/256_Tai_Yuan/skin2/login.motion3.json", { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON })
        .load(function (loader, resources) {
        var app = new PIXI.Application(1402, 940, { transparent: true });
        document.getElementById("l2dContainer").appendChild(app.view);
        var moc = Live2DCubismCore.Moc.fromArrayBuffer(resources['moc'].data);
        var model = new LIVE2DCUBISMPIXI.ModelBuilder()
            .setMoc(moc)
            .setTimeScale(1)
            .addTexture(0, resources['texture'].texture)
            .addTexture(1, resources['texture_1'].texture)
            .setPhysics3Json(resources['physics'].data)
            .addAnimatorLayer("base")
            .build();
        app.stage.addChild(model);
        app.stage.addChild(model.masks);
        var idle = LIVE2DCUBISMFRAMEWORK.Animation.fromMotion3Json(resources['idle'].data);
        var login = LIVE2DCUBISMFRAMEWORK.Animation.fromMotion3Json(resources['login'].data);
        model.animator
            .getLayer("base")
            .play(login);
        app.ticker.add(function (deltaTime) {
            model.update(deltaTime);
            model.masks.update(app.renderer);
        });
        var onResize = function (event) {
            if (event === void 0) { event = null; }
            var element = document.getElementById("l2dContainer");
            var positionInfo = element.getBoundingClientRect();
            console.log(positionInfo.width);
            var width = positionInfo.width;
            var height = (width / 701.0) * 470.0;
            app.view.style.width = width + "px";
            app.view.style.height = height + "px";
            document.getElementById("skinDisplayContainer").style.height = height + "px";
            app.renderer.resize(width, height);
            model.position = new PIXI.Point((width * 0.5), (height * 0.5));
            model.scale = new PIXI.Point((model.position.x * 0.10), (model.position.x * 0.10));
            model.masks.resize(app.view.width, app.view.height);
        };
        onResize();
        window.onresize = onResize;

        var onFinishAnim = function (arg) {
            model.animator.getLayer("base").play(idle);
        }
        login.addAnimationCallback(onFinishAnim)

        
    });
})(pixiTai || (pixiTai = {}));