import { CATEGORIES } from '../models/CategoriesEnum';

const getCategoryTitle = (category: string) => {
  switch (category) {
    case CATEGORIES.FANTASY:
      return 'Fantasia';
    case CATEGORIES.ACTION_ADVENTURE:
      return 'Ação/Aventura';
    case CATEGORIES.SCIENCE_FICTION:
      return 'Ficção científica';
    case CATEGORIES.ROMANCE:
      return 'Romance';
    case CATEGORIES.HISTORIC:
      return 'Histórico';
    case CATEGORIES.SPIRITUALITY:
      return 'Espiritualidade';
    case CATEGORIES.DRAMA:
      return 'Drama';
    case CATEGORIES.BIOGRAPHY:
      return 'Biografia';
    case CATEGORIES.TERROR_HORROR:
      return 'Terror/Horror';
    default:
      null;
  }
};

export default getCategoryTitle;
