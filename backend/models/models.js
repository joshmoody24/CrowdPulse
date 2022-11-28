import Request from "./Request.js";
import Recommendation from "./Recommendation.js";

Request.hasMany(Recommendation);
Recommendation.belongsTo(Request);

await Request.sync();
await Recommendation.sync();

export default {
    Request, 
    Recommendation
};