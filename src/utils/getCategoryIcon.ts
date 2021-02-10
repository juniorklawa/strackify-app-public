import { CATEGORIES } from '../models/CategoriesEnum';

const getCategoryIcon = (item: any) => {
  switch (item.category) {
    case CATEGORIES.FANTASY:
      return require('../assets/fantasy.png');
    case CATEGORIES.ACTION_ADVENTURE:
      return require('../assets/action_adventure.png');
    case CATEGORIES.SCIENCE_FICTION:
      return require('../assets/science_fiction.png');
    case CATEGORIES.ROMANCE:
      return require('../assets/romance.png');
    case CATEGORIES.HISTORIC:
      return require('../assets/historic.png');
    case CATEGORIES.SPIRITUALITY:
      return require('../assets/spirituality.png');
    case CATEGORIES.DRAMA:
      return require('../assets/drama.png');
    case CATEGORIES.BIOGRAPHY:
      return require('../assets/biography.png');
    case CATEGORIES.TERROR_HORROR:
      return require('../assets/terror_horror.png');
    default:
      null;
  }
};

export default getCategoryIcon;
