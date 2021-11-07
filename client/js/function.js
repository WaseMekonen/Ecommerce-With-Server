function removeItemFromCartById(id,array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id == id) {
        array.splice(i, 1);
      }
    }
  }