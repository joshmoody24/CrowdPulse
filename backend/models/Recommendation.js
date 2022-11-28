import { DataTypes } from 'sequelize';
import sequelize from "../sequelize.js";

const Recommendation = sequelize.define('Recommendation', {
  // Model attributes are defined here
  recommendation_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  spotify_song_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  artist: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  // Other model options go here
});
export default Recommendation;