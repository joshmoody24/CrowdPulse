import Request from "./Request.js";
import Recommendation from "./Recommendation.js";

Request.hasMany(Recommendation, {onDelete: 'cascade', hooks: true});
Recommendation.belongsTo(Request);

await Request.sync();
await Recommendation.sync();

export { Request };
export { Recommendation };