import { DataTypes } from 'sequelize';
import sequelize from "../sequelize.js";

const Request = sequelize.define('Request', {
  // Model attributes are defined here
  request_id: {
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
  vote_count: {
    type: DataTypes.INTEGER.UNSIGNED
  },
  request_played: {
    type: DataTypes.BOOLEAN
  },
  album_art: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bpm: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  length: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  key: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  // Other model options go here
});
export default Request;