import { DataTypes } from 'sequelize';
import sequelize from "../sequelize.js";

const Song = sequelize.define('Song', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  // Other model options go here
});

// this automatically creates a database table if necessary
await Song.sync();

export default Song;