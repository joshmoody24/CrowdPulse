import Request from "./Request.js";
import Recommendation from "./Recommendation.js";

Request.hasMany(Recommendation);
Recommendation.belongsTo(Request, {onDelete: 'CASCADE'});

await Request.sync();
await Recommendation.sync();

export default {
    Request, 
    Recommendation
};