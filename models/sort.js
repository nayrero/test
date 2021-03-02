module.exports = (sequelize, DataTypes) => sequelize.define("sort", {

    sort_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    sort_data: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
    
  });
