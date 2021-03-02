const Sequelize = require('sequelize');
const SortModel = require('./models/sort');
const sequelize = new Sequelize(
  'testdb',
  'postgres',
  'admin',
  {
    dialect: 'postgres',
  }
);
//---------создаем модель таблицы
const Sort = SortModel(sequelize, Sequelize);

sequelize
  .authenticate()
  .then(() => console.log('Connected.'))
  .catch((err) => console.error('Connection error: ', err));
//-----------синхронизация с БД-----------------
/*sequelize.sync().then(result=>{
  console.log(result);
})
.catch(err=> console.log(err));*/

module.exports = {
  Sort,  
}