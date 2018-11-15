import ActorModel from "../models/Actor";

export const ActorList = (req, res) => {
  ActorModel.find({}, (err, docs) => res.json({ error: err, data: JSON.parse(JSON.stringify(docs)) }));
};