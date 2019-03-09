function SD(basePath) {
    this.basePath = basePath;
    this.loader = new PIXI.loaders.Loader(this.basePath);
}

SD.prototype = {
    spineData : {},
    load: function(name, v) {
        if (!this.spineData[name]) {
            var skelpath = name+'.skel';
            var atlaspath = name+'.atlas';
            var texpath = name+'.png';

            this.loader.add(name+'_atlas', atlaspath, { "type" : "atlas" })
            this.loader.add(name+'_skel', skelpath, { "xhrType" : "arraybuffer" })
            this.loader.add(name+'_tex', texpath)

            this.loader.load((loader, resources) => {
                var skelBin = new SkeletonBinary();
                skelBin.data = new Uint8Array(resources[name+'_skel'].data);
                skelBin.initJson();

                var rawSkeletonData = skelBin.json;
                var rawAtlasData = resources[name+'_atlas'].data;

                var spineAtlas = new PIXI.spine.core.TextureAtlas(rawAtlasData, function(line, callback) {
                    callback(PIXI.BaseTexture.from(name+'_tex'));
                });
                var spineAtlasLoader = new PIXI.spine.core.AtlasAttachmentLoader(spineAtlas);
                var spineJsonParser = new PIXI.spine.core.SkeletonJson(spineAtlasLoader);
                var skeletonData = spineJsonParser.readSkeletonData(rawSkeletonData);

                this.spineData[name] = skeletonData;
                v.changeCanvas(skeletonData);
            });
        } else {
            v.changeCanvas(this.spineData[name]);
        }
    }
}