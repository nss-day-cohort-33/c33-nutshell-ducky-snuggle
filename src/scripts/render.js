const RENDER = {
  insertComponent: function(infoArray, component) {
    for (let i = 0; i < infoArray.length; i++) {
      targetContainer.appendChild(component(infoArray[i]));
    }
  }
};

