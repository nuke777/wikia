var pixiL2D;
(function (pixiL2D) {
    PIXI.loader
        .add('moc', "https://deo68x5sknl6a.cloudfront.net/Ships/166_Yukikaze/Live2D/skin1/xuefeng.moc3", { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.BUFFER })
        .add('texture', "https://deo68x5sknl6a.cloudfront.net/Ships/166_Yukikaze/Live2D/skin1/texture_00.png")
        .add('texture_1', "https://deo68x5sknl6a.cloudfront.net/Ships/166_Yukikaze/Live2D/skin1/texture_01.png")
        .add('texture_2', "https://deo68x5sknl6a.cloudfront.net/Ships/166_Yukikaze/Live2D/skin1/texture_02.png")
        .add('texture_3', "https://deo68x5sknl6a.cloudfront.net/Ships/166_Yukikaze/Live2D/skin1/texture_03.png")
        .add('texture_4', "https://deo68x5sknl6a.cloudfront.net/Ships/166_Yukikaze/Live2D/skin1/texture_04.png")
        .add('texture_5', "https://deo68x5sknl6a.cloudfront.net/Ships/166_Yukikaze/Live2D/skin1/texture_05.png")
        .add('physics', "https://deo68x5sknl6a.cloudfront.net/Ships/166_Yukikaze/Live2D/skin1/xuefeng.physics3.json", { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON })
        .add('idle', "https://deo68x5sknl6a.cloudfront.net/Ships/166_Yukikaze/Live2D/skin1/idle.motion3.json", { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON })
        .add('login', "https://deo68x5sknl6a.cloudfront.net/Ships/166_Yukikaze/Live2D/skin1/login.motion3.json", { xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON })
        .load(function (loader, resources) {
        var app = new PIXI.Application(558, 1026, { transparent: true });
        document.getElementById("l2dContainer").appendChild(app.view);
        var moc = Live2DCubismCore.Moc.fromArrayBuffer(resources['moc'].data);
        var model = new LIVE2DCUBISMPIXI.ModelBuilder()
            .setMoc(moc)
            .setTimeScale(1)
            .addTexture(0, resources['texture'].texture)
            .addTexture(1, resources['texture_1'].texture)
            .addTexture(2, resources['texture_2'].texture)
            .addTexture(3, resources['texture_3'].texture)
            .addTexture(4, resources['texture_4'].texture)
            .addTexture(5, resources['texture_5'].texture)
            .setPhysics3Json(resources['physics'].data)
            .addAnimatorLayer("base", LIVE2DCUBISMFRAMEWORK.BuiltinAnimationBlenders.OVERRIDE, 1)
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
            var height = (width / 31.0) * 57.0;
            app.view.style.width = width + "px";
            app.view.style.height = height + "px";
            document.getElementById("skinDisplayContainer").style.height = height + "px";
            app.renderer.resize(width, height);
            model.position = new PIXI.Point((width * 0.5), (height * 0.5));
            model.scale = new PIXI.Point((model.position.x * 0.135), (model.position.x * 0.135));
            model.masks.resize(app.view.width, app.view.height);
        };
        onResize();
        window.onresize = onResize;

        var onFinishAnim = function (arg) {
            model.animator.getLayer("base").play(idle);
        }
        login.addAnimationCallback(onFinishAnim)

        
    });
})(pixiL2D || (pixiL2D = {}));
