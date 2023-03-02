export const getSearchItems = function (text) {
  const searchedItems = { allCollections: [] };
  menu.allCollections.forEach((element) => {
    if (element.name === "Recommended" || element.name === "Accompaniments") {
      const newItem = {
        name: element.name,
        subTitle: element.subTitle,
        type: element.type,
        entities: [],
      };
      element.entities.forEach((e) => {
          const food = menu.items[e.id.toString()];
          if (food.name.toUpperCase().indexOf(text.toUpperCase()) > -1) {
            newItem.entities.push(e);
          }
      });
      searchedItems.allCollections.push(newItem);
    } else {
      const newItem = {
        name: element.name,
        subTitle: element.subTitle,
        type: element.type,
        widgets: [],
      };
      const array = [];
      element.widgets.forEach((e) => {
        const newWidget = { name: e.name, type: e.type, entities: [] };
        e.entities.forEach((e) => {
          const food = menu.items[e.id.toString()];
          if (food.name.toUpperCase().indexOf(text.toUpperCase()) > -1) {
            newWidget.entities.push(e);
          }
        });
        array.push(newWidget);
      });
      newItem.widgets=array
      searchedItems.allCollections.push(newItem);
    }
  });
  return searchedItems;
};
