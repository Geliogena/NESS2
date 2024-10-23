

import { registerSchema, getTable } from '../db/fileDB.js';


const newspostSchema = {
  id: Number,
  title: String,
  text: String,
  createDate: Date,
};

registerSchema('newspost', newspostSchema);


const newspostTable = getTable('newspost');


const createNewspostIfNotExists = (title, text) => {
  
  let existingPost = newspostTable.getAll().find(post => (post.title === title) && (post.text === text));
  
  if (!existingPost) {
   
    const newNewspost = newspostTable.create({
      title,
      text,
      createDate: new Date(), 
    });
    console.log('New newspost created:', newNewspost);
    return newNewspost;
  } else {
    console.log('Newspost already exists:', existingPost);
    return existingPost;
  }
};


const newNewspost = createNewspostIfNotExists(
  'Всесвіт не такий, як ми уявляємо: телескоп Вебб додав загадок про космос',
   'Космічний телескоп Вебб за 2 роки роботи зміг виявити найраніші та найдальші галактики, які існували лише через 300 млн років після Великого вибуху. З одного боку, ці відкриття узгодять із стандартною космологічною моделлю, але з іншого — є несподіваними. Багато хто з перших галактик сяє набагато яскравіше, ніж очікували астрономи, враховуючи той факт, що вони вже існували через відносно якийсь час після народження Всесвіту. Чим яскравіше галактики, то більше в них зірок, отже вони мають велику масу. Вважалося, що для набуття таких характеристик галактикам потрібні мільярди років. Як можна пояснити ці відкриття? І чи руйнують вони наші уявлення про космологію чи вимагають зміни віку Всесвіту? Про це пише Live Science.'
  
);




