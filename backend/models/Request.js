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
  }
}, {
  // Other model options go here
});

// this automatically creates a database table if necessary
await Request.sync();

export default Request;