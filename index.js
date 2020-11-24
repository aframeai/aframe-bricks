/* global AFRAME */

// import local version of LDrawLoader for now
require('./LDrawLoader.js');

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

/**
 * Bricks component for A-Frame.
 */
AFRAME.registerComponent('bricks', {

    schema: { 
    src: { type: "model" },
    steps: { type: "int" },
  },

  init: function () {
    this.model = null;
    this.ldrawLoader = new THREE.LDrawLoader();
    this.isBuggy = AFRAME.version !== "1.0.4-blocks-mod";
  },

  update: function (oldData) {
    // load new model if the source has changed
    if(this.data.src !== oldData.src) {
      this.resetMesh();
      this.loadModel(this.data.src, this.data.steps);
    }
    if((this.data.steps !== oldData.steps) && this.model) {
      this.setStep(this.data.steps);
    }
  },

  remove: function () {
    if (!this.model) {
      return;
    }
    this.resetMesh();
  },

  resetMesh: function () {
    this.el.removeObject3D("mesh");
  },

  pause: function() {
    // hide the model in the aframe inspector
    // (since a Three.js bug in Mesh.intersect results in an infinte loop)
    if(this.isBuggy) {
      console.log("Three.js has a bug that prevents previews of Brick models.");
      console.log("Using Edges-only preview in the Inspector");
      if(this.data.steps) {
        // hide faces of all bricks
        console.log("CHILDREN", this.model.children);
        this.model.children.forEach( brick => this.hide(brick) );
      } else {
        // hide faces of the model
        this.show(this.model);
      }
    }
  },

  play: function() {
    // show the model again
    if(this.isBuggy) {
      if(this.data.steps) {
        this.model.children.forEach( brick => this.show(brick) );
      } else {
        this.show(this.model);
      }
    }
  },

  show: function(obj) {
    // show the brick surface
    obj.children[0].visible = true;
  },

  hide: function(obj) {
    // hide the brick surface
    obj.children[0].visible = false;
  },

  loadModel: function (url, steps) {

    let el = this.el;
    let ldrawLoader = this.ldrawLoader;

    // separate objects into individual building steps
    ldrawLoader.separateObjects = true;

    ldrawLoader.load(url, (model) => {
      console.log("Construction Steps", model.userData.numConstructionSteps );
      console.log(model);
      this.model = model;
      model.scale.y = -1;
      if( steps ) {
        this.setStep( steps );
      }
      el.setObject3D('mesh', model);
      el.emit("model-loaded", { format: "ldraw", model: model });
    });
  },

  setStep: function(step) {
    this.model.traverse( c => {
      if ( c.isGroup ) {
        c.visible = c.userData.constructionStep <= step;
      }
    });
  }

});


// register block

let meshMixin = AFRAME.primitives.getMeshMixin();

AFRAME.registerPrimitive(
  "a-bricks",
  AFRAME.utils.extendDeep({}, meshMixin, {
    defaultComponents: {
      "bricks": {},
    },
    mappings: {
      src: "bricks.src",
      steps: "bricks.steps"
    },
  })
);


